import fs from 'node:fs';
import path from 'node:path';
import * as ts from 'typescript';

/**
 * Pins the render contract of every Stencil component (ARC42 § Web Component Layer): `render()`
 * returns a bare `<Host>` with exactly one child, the component's functional component (`<…FC>`) or a
 * call of a render helper of the class or one of its base classes that returns it
 * (`{this.renderButtonFC()}`).
 *
 * `HOST_ATTRIBUTES` lists the documented exceptions that set an attribute on the host.
 * `kol-toast-container` and `kol-tooltip-wc` are deprecated and keep their own render.
 */
const HOST_ATTRIBUTES: Record<string, string[]> = {
	'select/component.tsx': ['class'],
	'table-stateful/component.tsx': ['class'],
	'tree/component.tsx': ['tabindex'],
};

const EXCLUDED = ['toaster/shadow.tsx', 'tooltip/component.tsx'];

const COMPONENTS = path.join(__dirname);
const SRC = path.join(COMPONENTS, '..');

const sourceFiles = (dir: string): string[] =>
	fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) return sourceFiles(full);
		return /\.tsx?$/.test(entry.name) && !/\.(spec|e2e)\.tsx?$/.test(entry.name) && !entry.name.endsWith('.d.ts') ? [full] : [];
	});

/** Every class declaration under `src` by name, to resolve the base classes of a component. */
const CLASSES = new Map<string, ts.ClassDeclaration>(
	sourceFiles(SRC).flatMap((file) => {
		const text = fs.readFileSync(file, 'utf8');
		if (!/\bclass\b/.test(text)) return [];
		const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
		return source.statements.filter(ts.isClassDeclaration).flatMap((cls) => (cls.name ? [[cls.name.text, cls] as const] : []));
	}),
);

const componentFiles = (): string[] =>
	fs
		.readdirSync(COMPONENTS, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.flatMap((entry) =>
			fs
				.readdirSync(path.join(COMPONENTS, entry.name))
				.filter((name) => /\.tsx$/.test(name) && !/\.spec\.tsx$/.test(name))
				.map((name) => `${entry.name}/${name}`),
		)
		.filter((file) => !EXCLUDED.includes(file) && fs.readFileSync(path.join(COMPONENTS, file), 'utf8').includes('@Component('));

const unwrap = (node: ts.Expression): ts.Expression => (ts.isParenthesizedExpression(node) ? unwrap(node.expression) : node);

const tagName = (node: ts.JsxElement | ts.JsxSelfClosingElement): string => (ts.isJsxElement(node) ? node.openingElement.tagName : node.tagName).getText();

const lastReturn = (method: ts.MethodDeclaration): ts.Expression | undefined => {
	const returned = method.body?.statements.filter(ts.isReturnStatement).pop()?.expression;
	return returned ? unwrap(returned) : undefined;
};

const isFcElement = (node: ts.Node | undefined): boolean =>
	node !== undefined && (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) && tagName(node).endsWith('FC');

/** The method `name` of the class or, if it does not declare it, of the nearest base class that does. */
const findMethod = (cls: ts.ClassDeclaration | undefined, name: string): ts.MethodDeclaration | undefined => {
	if (!cls) return undefined;
	const own = cls.members.find((member): member is ts.MethodDeclaration => ts.isMethodDeclaration(member) && member.name.getText() === name);
	if (own) return own;
	const base = cls.heritageClauses?.find((clause) => clause.token === ts.SyntaxKind.ExtendsKeyword)?.types[0]?.expression.getText();
	return base ? findMethod(CLASSES.get(base), name) : undefined;
};

const isFcChild = (cls: ts.ClassDeclaration, child: ts.JsxChild): boolean => {
	if (isFcElement(child)) return true;
	if (ts.isJsxExpression(child) && child.expression && ts.isCallExpression(child.expression)) {
		const callee = child.expression.expression;
		if (ts.isPropertyAccessExpression(callee) && callee.expression.kind === ts.SyntaxKind.ThisKeyword) {
			const helper = findMethod(cls, callee.name.text);
			return helper !== undefined && isFcElement(lastReturn(helper));
		}
	}
	return false;
};

const checkRender = (file: string): string[] => {
	const text = fs.readFileSync(path.join(COMPONENTS, file), 'utf8');
	const source = ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
	const problems: string[] = [];
	const visit = (node: ts.Node): void => {
		if (ts.isClassDeclaration(node) && text.includes('@Component(')) {
			const render = node.members.find((member): member is ts.MethodDeclaration => ts.isMethodDeclaration(member) && member.name.getText() === 'render');
			const root = render ? lastReturn(render) : undefined;
			if (!root) {
				problems.push('render() returns nothing');
				return;
			}
			if (!(ts.isJsxElement(root) || ts.isJsxSelfClosingElement(root)) || tagName(root) !== 'Host') {
				problems.push('render() does not return <Host>');
				return;
			}
			const attributes = (ts.isJsxElement(root) ? root.openingElement : root).attributes.properties.map((attribute) => attribute.name?.getText() ?? '...');
			const allowed = HOST_ATTRIBUTES[file] ?? [];
			attributes.filter((name) => !allowed.includes(name)).forEach((name) => problems.push(`<Host> carries the undocumented attribute ${name}`));
			const children = ts.isJsxElement(root) ? root.children.filter((child) => !(ts.isJsxText(child) && child.containsOnlyTriviaWhiteSpaces)) : [];
			if (children.length !== 1 || !isFcChild(node, children[0])) {
				problems.push(`<Host> has ${children.length} children instead of exactly one functional component`);
			}
		}
		ts.forEachChild(node, visit);
	};
	visit(source);
	return problems;
};

describe('Stencil component render', () => {
	const files = componentFiles();

	it('finds the components', () => {
		expect(files.length).toBeGreaterThan(40);
	});

	it.each(files)('%s renders one functional component in a bare <Host>', (file) => {
		expect(checkRender(file)).toEqual([]);
	});
});
