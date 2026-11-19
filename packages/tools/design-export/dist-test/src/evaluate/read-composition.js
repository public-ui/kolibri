import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import ts from 'typescript';
/**
 * Reads the functional components of a web component's `render()` and the `@design` tags of its
 * props. Returns `undefined` without a component file or without any `@design` tag: such a
 * component stays on the BEM path.
 */
export function readWebComponent(componentsRoot, tag) {
	const file = join(componentsRoot, 'src', 'components', tag.replace(/^kol-/, ''), 'component.tsx');
	if (!existsSync(file)) return undefined;
	const source = ts.createSourceFile(file, readFileSync(file, 'utf-8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
	const imports = new Map();
	const annotations = {};
	const defaults = {};
	let render;
	for (const statement of source.statements) {
		if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier)) {
			const bindings = statement.importClause?.namedBindings;
			if (bindings && ts.isNamedImports(bindings)) {
				for (const element of bindings.elements) imports.set(element.name.text, statement.moduleSpecifier.text);
			}
		}
		if (!ts.isClassDeclaration(statement)) continue;
		for (const member of statement.members) {
			if (ts.isMethodDeclaration(member) && member.name.getText(source) === 'render') render = member;
			if (!ts.isPropertyDeclaration(member) || !hasDecorator(member, 'Prop')) continue;
			const fallback = member.initializer ? literalOf(member.initializer) : undefined;
			if (fallback !== undefined) defaults[member.name.getText(source)] = fallback;
			const annotation = readAnnotation(member);
			if (annotation) annotations[member.name.getText(source)] = annotation;
		}
	}
	if (Object.keys(annotations).length === 0 || !render?.body) return undefined;
	const resolveModule = (name) => {
		const specifier = imports.get(name);
		if (!specifier?.startsWith('.')) return undefined;
		const absolute = resolve(dirname(file), specifier);
		const base = ['.tsx', '.ts'].some((extension) => existsSync(absolute + extension)) ? absolute : join(absolute, 'index');
		return relative(join(componentsRoot, 'src'), base).split('\\').join('/');
	};
	const composition = [];
	const visit = (node, into) => {
		if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
			const opening = ts.isJsxElement(node) ? node.openingElement : node;
			const name = opening.tagName.getText(source);
			const module = /FC$/.test(name) ? resolveModule(name) : undefined;
			if (module) {
				const entry = { module, exportName: name, attributes: {}, spread: false, children: [] };
				for (const property of opening.attributes.properties) {
					if (ts.isJsxSpreadAttribute(property)) entry.spread = true;
					else if (property.initializer) {
						const value = readAttribute(property.initializer);
						if (value) entry.attributes[property.name.getText(source)] = value;
					} else entry.attributes[property.name.getText(source)] = { literal: true };
				}
				into.push(entry);
				if (ts.isJsxElement(node)) node.children.forEach((child) => visit(child, entry.children));
				return;
			}
		}
		ts.forEachChild(node, (child) => visit(child, into));
	};
	visit(render.body, composition);
	return { tag, file, annotations, composition, defaults };
}
function hasDecorator(member, name) {
	return (ts.getDecorators(member) ?? []).some((decorator) => {
		const expression = decorator.expression;
		return ts.isCallExpression(expression) && ts.isIdentifier(expression.expression) && expression.expression.text === name;
	});
}
function readAnnotation(member) {
	const tag = ts.getJSDocTags(member).find((entry) => entry.tagName.text === 'design');
	if (!tag) return undefined;
	const comment = (typeof tag.comment === 'string' ? tag.comment : (ts.getTextOfJSDocComment(tag.comment) ?? '')).trim();
	const [kind, ...rest] = comment.split(/\s+/);
	const text = rest.join(' ');
	switch (kind) {
		case 'variant':
			return { kind };
		case 'content':
		case 'toggle':
			if (!text) throw new Error(`@design ${kind} needs a sample text: ${member.name.getText()}`);
			return { kind, text };
		case 'sample':
			return { kind, value: parseSample(text) };
		case 'state':
			if (!text) throw new Error(`@design state needs a value: ${member.name.getText()}`);
			return { kind, value: text };
		default:
			throw new Error(`Unknown @design tag "${comment}" at ${member.name.getText()}`);
	}
}
function parseSample(text) {
	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
}
function literalOf(expression) {
	if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) return expression.text;
	if (ts.isNumericLiteral(expression)) return Number(expression.text);
	if (expression.kind === ts.SyntaxKind.TrueKeyword) return true;
	if (expression.kind === ts.SyntaxKind.FalseKeyword) return false;
	return undefined;
}
/** A literal, or `this.getRenderProp('x')` / `this.state._x` as the prop `_x`. */
function readAttribute(initializer) {
	if (ts.isStringLiteral(initializer)) return { literal: initializer.text };
	if (!ts.isJsxExpression(initializer) || !initializer.expression) return undefined;
	const expression = initializer.expression;
	if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) return { literal: expression.text };
	if (ts.isNumericLiteral(expression)) return { literal: Number(expression.text) };
	if (expression.kind === ts.SyntaxKind.TrueKeyword) return { literal: true };
	if (expression.kind === ts.SyntaxKind.FalseKeyword) return { literal: false };
	if (ts.isCallExpression(expression) && /\.getRenderProp$/.test(expression.expression.getText())) {
		const [argument] = expression.arguments;
		if (argument && ts.isStringLiteral(argument)) return { prop: `_${argument.text}` };
	}
	return undefined;
}
