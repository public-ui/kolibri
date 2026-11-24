import fs from 'node:fs';
import path from 'node:path';
import * as ts from 'typescript';

/**
 * Pins the render contract of every Stencil component (ARC42 § Web Component Layer): `render()`
 * returns a bare `<Host>` with exactly one child, the component's functional component (`<…FC>`) or a
 * call of an own render helper that returns it (`{this.renderButtonFC()}`).
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

const isFcChild = (child: ts.JsxChild): boolean => {
	if ((ts.isJsxElement(child) || ts.isJsxSelfClosingElement(child)) && tagName(child).endsWith('FC')) return true;
	if (ts.isJsxExpression(child) && child.expression && ts.isCallExpression(child.expression)) {
		const callee = child.expression.expression;
		return ts.isPropertyAccessExpression(callee) && callee.expression.kind === ts.SyntaxKind.ThisKeyword && callee.name.text.startsWith('render');
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
			const returned = render?.body?.statements.filter(ts.isReturnStatement).pop()?.expression;
			if (!returned) {
				problems.push('render() returns nothing');
				return;
			}
			const root = unwrap(returned);
			if (!(ts.isJsxElement(root) || ts.isJsxSelfClosingElement(root)) || tagName(root) !== 'Host') {
				problems.push('render() does not return <Host>');
				return;
			}
			const attributes = (ts.isJsxElement(root) ? root.openingElement : root).attributes.properties.map((attribute) => attribute.name?.getText() ?? '...');
			const allowed = HOST_ATTRIBUTES[file] ?? [];
			attributes.filter((name) => !allowed.includes(name)).forEach((name) => problems.push(`<Host> carries the undocumented attribute ${name}`));
			const children = ts.isJsxElement(root) ? root.children.filter((child) => !(ts.isJsxText(child) && child.containsOnlyTriviaWhiteSpaces)) : [];
			if (children.length !== 1 || !isFcChild(children[0])) {
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
