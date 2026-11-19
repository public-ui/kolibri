import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import ts from 'typescript';

import type { DesignNode, ValueSource } from '../spec/types.js';

/**
 * Reads the element tree of a block from its functional component: the JSX already names every
 * element through the BEM registry (`alertBem('closer')`, `BEM_CLASS_ALERT__CONTENT`), so the tree,
 * the conditions (`hasCloser && …`) and the embedded components (`<ButtonFC class={…} hideLabel />`)
 * come from the code instead of a second specification.
 *
 * The reader follows the patterns of `internal/functional-components`: `bem.forBlock()` helpers,
 * class constants, `BemRootNodeFC`, embedded `…FC` components from sibling folders and local render
 * helpers. Whatever it cannot read (spread props, computed tags) it reports in `unread`.
 */
export interface FcTree {
	block: string;
	file: string;
	tree: DesignNode;
	/** Expressions the reader skipped, for the coverage report. */
	unread: string[];
}

interface FileContext {
	file: string;
	source: ts.SourceFile;
	/** `alertBem` → `kol-alert` */
	bemFunctions: Map<string, string>;
	/** `BEM_CLASS_ALERT__CLOSER` → `{ block, element }` */
	classConstants: Map<string, { block: string; element?: string }>;
	/** `ButtonFC` → absolute path of its module */
	imports: Map<string, string>;
	/** local functions and arrow constants that return JSX (`renderIcon`, `AlertIconFC` when local) */
	locals: Map<string, ts.Node>;
	/** every variable declaration of the file by name, to tell props from local constants */
	declarations: Map<string, ts.VariableDeclaration | ts.BindingElement>;
}

const CONTEXTS = new Map<string, FileContext>();

/** Functions being read: a component that renders itself (nested navigation, tree items) is read one level deep. */
const ACTIVE = new Set<ts.Node>();

function within<T>(fn: ts.Node, empty: T, read: () => T): T {
	if (ACTIVE.has(fn)) return empty;
	ACTIVE.add(fn);
	try {
		return read();
	} finally {
		ACTIVE.delete(fn);
	}
}

function context(file: string): FileContext {
	const cached = CONTEXTS.get(file);
	if (cached) return cached;
	const source = ts.createSourceFile(file, readFileSync(file, 'utf-8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
	const result: FileContext = {
		file,
		source,
		bemFunctions: new Map(),
		classConstants: new Map(),
		declarations: new Map(),
		imports: new Map(),
		locals: new Map(),
	};
	for (const statement of source.statements) {
		if (ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text.startsWith('.')) {
			const target = resolve(dirname(file), statement.moduleSpecifier.text);
			for (const element of statement.importClause?.namedBindings && ts.isNamedImports(statement.importClause.namedBindings)
				? statement.importClause.namedBindings.elements
				: []) {
				result.imports.set(element.name.text, target.endsWith('.tsx') ? target : `${target}.tsx`);
			}
		}
		if (ts.isFunctionDeclaration(statement) && statement.name) result.locals.set(statement.name.text, statement);
		if (!ts.isVariableStatement(statement)) continue;
		for (const declaration of statement.declarationList.declarations) {
			if (!ts.isIdentifier(declaration.name) || !declaration.initializer) continue;
			const name = declaration.name.text;
			const init = declaration.initializer;
			if (ts.isCallExpression(init) && init.expression.getText(source) === 'bem.forBlock' && ts.isStringLiteral(init.arguments[0])) {
				result.bemFunctions.set(name, init.arguments[0].text);
			} else if (ts.isCallExpression(init) && ts.isIdentifier(init.expression) && result.bemFunctions.has(init.expression.text)) {
				const element = init.arguments[0] && ts.isStringLiteral(init.arguments[0]) ? init.arguments[0].text : undefined;
				result.classConstants.set(name, { block: result.bemFunctions.get(init.expression.text) as string, element });
			} else if (ts.isArrowFunction(init) || ts.isFunctionExpression(init)) {
				result.locals.set(name, init);
			}
		}
	}
	const collect = (node: ts.Node): void => {
		if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
			if (!result.declarations.has(node.name.text)) result.declarations.set(node.name.text, node);
			if (node.initializer && (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer)) && !result.locals.has(node.name.text)) {
				result.locals.set(node.name.text, node.initializer);
			}
		}
		if (ts.isBindingElement(node) && ts.isIdentifier(node.name) && !result.declarations.has(node.name.text)) result.declarations.set(node.name.text, node);
		ts.forEachChild(node, collect);
	};
	collect(source);
	CONTEXTS.set(file, result);
	return result;
}

/**
 * What an identifier in the JSX stands for: a prop of the component (destructured from the props or
 * a parameter), a literal (`const label = translate('kol-close-alert')` gives the i18n key) or a
 * local value the reader does not follow.
 */
function resolveIdentifier(name: string, ctx: FileContext): ValueSource | undefined {
	const declaration = ctx.declarations.get(name);
	if (!declaration || ts.isBindingElement(declaration)) return /^[A-Z_]+$/.test(name) ? undefined : { prop: attributeOf(name) };
	const init = declaration.initializer;
	if (init && (ts.isStringLiteral(init) || ts.isNoSubstitutionTemplateLiteral(init))) return { literal: init.text };
	if (init && ts.isCallExpression(init) && init.expression.getText(ctx.source) === 'translate' && init.arguments[0] && ts.isStringLiteral(init.arguments[0])) {
		return { literal: init.arguments[0].text };
	}
	return undefined;
}

/** Index of all functional components: the block each one renders as its root. */
export function indexFunctionalComponents(fcRoot: string): Map<string, string> {
	const index = new Map<string, string>();
	for (const folder of readdirSync(fcRoot, { withFileTypes: true })) {
		if (!folder.isDirectory()) continue;
		for (const name of readdirSync(join(fcRoot, folder.name))) {
			if (!name.endsWith('.tsx') || name.includes('.spec.') || name.includes('snapshot')) continue;
			const file = join(fcRoot, folder.name, name);
			const block = rootBlock(context(file));
			if (block && !index.has(block)) index.set(block, file);
		}
	}
	return index;
}

/** The block a file renders as its root: `<BemRootNodeFC block="…">` or a root class `xBem({…})`. */
function rootBlock(ctx: FileContext): string | undefined {
	let found: string | undefined;
	const visit = (node: ts.Node): void => {
		if (found) return;
		if ((ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) && node.tagName.getText(ctx.source) === 'BemRootNodeFC') {
			const block = attribute(node, 'block');
			if (block?.initializer && ts.isStringLiteral(block.initializer)) found = block.initializer.text;
		}
		if ((ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) && !found) {
			const cls = attribute(node, 'class');
			const bemClass = cls ? classOf(cls, ctx) : undefined;
			if (bemClass && bemClass.element === undefined) found = bemClass.block;
		}
		ts.forEachChild(node, visit);
	};
	visit(ctx.source);
	return found;
}

export function extractFcTree(file: string, block: string, index: Map<string, string>): FcTree {
	const ctx = context(file);
	const unread: string[] = [];
	const roots = jsxReturns(ctx.source, ctx)
		.map((jsx) => readJsx(jsx, ctx, block, index, unread))
		.flat();
	const root = roots.find((node) => node.element === undefined) ?? roots[0] ?? { tag: 'div', kind: 'frame' };
	return { block, file, tree: root, unread: [...new Set(unread)].sort() };
}

/** The JSX the exported functional component returns (the last top-level JSX in the file). */
function jsxReturns(node: ts.Node, ctx: FileContext): ts.JsxChild[] {
	const exported: ts.JsxChild[] = [];
	for (const statement of ctx.source.statements) {
		if (!ts.isVariableStatement(statement) || !statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)) continue;
		for (const declaration of statement.declarationList.declarations) {
			if (declaration.initializer && (ts.isArrowFunction(declaration.initializer) || ts.isFunctionExpression(declaration.initializer))) {
				const jsx = returnedJsx(declaration.initializer);
				if (jsx) exported.push(jsx);
			}
		}
	}
	return exported.length > 0 ? [exported[exported.length - 1]] : node === ctx.source ? [] : [];
}

/** The JSX a function returns; with several returns the last one (the full render after early exits). */
function returnedJsx(fn: ts.Node): ts.JsxChild | undefined {
	if ((ts.isArrowFunction(fn) || ts.isFunctionExpression(fn)) && !ts.isBlock(fn.body)) return unwrap(fn.body);
	let last: ts.JsxChild | undefined;
	const visit = (node: ts.Node): void => {
		if (node !== fn && (ts.isArrowFunction(node) || ts.isFunctionExpression(node) || ts.isFunctionDeclaration(node))) return;
		if (ts.isReturnStatement(node) && node.expression) {
			const jsx = unwrap(node.expression);
			if (jsx) last = jsx;
		}
		ts.forEachChild(node, visit);
	};
	ts.forEachChild(fn, visit);
	return last;
}

function unwrap(expression: ts.Node): ts.JsxChild | undefined {
	let node = expression;
	while (ts.isParenthesizedExpression(node)) node = node.expression;
	return ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node) ? node : undefined;
}

function attribute(node: ts.JsxOpeningElement | ts.JsxSelfClosingElement, name: string): ts.JsxAttribute | undefined {
	return node.attributes.properties.find((property): property is ts.JsxAttribute => ts.isJsxAttribute(property) && property.name.getText() === name);
}

/** The BEM class inside a `class` expression: a class constant or a call of a `forBlock` helper. */
function classOf(attr: ts.JsxAttribute, ctx: FileContext): { block: string; element?: string } | undefined {
	let found: { block: string; element?: string } | undefined;
	const visit = (node: ts.Node): void => {
		if (found) return;
		if (ts.isIdentifier(node) && ctx.classConstants.has(node.text)) found = ctx.classConstants.get(node.text);
		if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && ctx.bemFunctions.has(node.expression.text)) {
			const first = node.arguments[0];
			found = { block: ctx.bemFunctions.get(node.expression.text) as string, element: first && ts.isStringLiteral(first) ? first.text : undefined };
		}
		ts.forEachChild(node, visit);
	};
	if (attr.initializer) visit(attr.initializer);
	return found;
}

/** `hasCloser` → `_has-closer`, the attribute name the BEM dialect binds. */
function attributeOf(identifier: string): string {
	return `_${identifier.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}`;
}

/** The prop a condition tests: `hasCloser`, `!!label?.length`, `smartButton` → its first identifier. */
function conditionProp(expression: ts.Expression, ctx: FileContext): string | undefined {
	let node: ts.Node = expression;
	while (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) node = node.left;
	while (ts.isPrefixUnaryExpression(node) || ts.isParenthesizedExpression(node)) node = ts.isParenthesizedExpression(node) ? node.expression : node.operand;
	if (ts.isCallExpression(node) && node.arguments[0]) node = node.arguments[0];
	while (ts.isPropertyAccessExpression(node) || ts.isPropertyAccessChain(node)) node = node.expression;
	if (!ts.isIdentifier(node)) return undefined;
	const resolved = resolveIdentifier(node.text, ctx);
	return resolved && 'prop' in resolved ? resolved.prop : undefined;
}

const FLOATING = new Set(['PopoverFC', 'TooltipFC']);

const TEXT_PROPS = new Set(['_badge-text', '_description', '_label', '_text']);

function readJsx(node: ts.JsxChild, ctx: FileContext, block: string, index: Map<string, string>, unread: string[], when?: string): DesignNode[] {
	if (ts.isJsxText(node)) return [];
	if (ts.isJsxFragment(node)) return node.children.flatMap((child) => readJsx(child, ctx, block, index, unread, when));
	if (ts.isJsxExpression(node)) return node.expression ? readExpression(node.expression, ctx, block, index, unread, when) : [];
	const opening = ts.isJsxElement(node) ? node.openingElement : node;
	const children = ts.isJsxElement(node) ? node.children : [];
	const tagName = opening.tagName.getText(ctx.source);
	const cls = attribute(opening, 'class');
	const clsText = cls?.initializer?.getText(ctx.source) ?? '';
	// Floating layers (tooltip) open on interaction and take no place in the layout of the library.
	if (clsText.includes('visually-hidden') || tagName === 'br' || tagName === 'slot' || FLOATING.has(tagName)) return [];
	const bemClass = cls ? classOf(cls, ctx) : undefined;
	const condition = when ? { when: { prop: when } } : {};

	if (tagName === 'BemRootNodeFC') {
		const component = attribute(opening, 'component');
		const tag = component?.initializer && ts.isStringLiteral(component.initializer) ? component.initializer.text : 'div';
		return [{ tag, kind: 'frame', ...condition, children: readChildren(children, ctx, block, index, unread) }];
	}

	if (/^[A-Z]\w*FC$/.test(tagName)) {
		const target = ctx.imports.get(tagName);
		const embedded = target ? rootBlock(context(target)) : undefined;
		if (target && embedded && embedded !== block) {
			return [
				{
					...(bemClass?.block === block && bemClass.element ? { element: bemClass.element } : {}),
					tag: embedded === 'kol-icon' ? 'i' : 'div',
					kind: embedded === 'kol-icon' ? 'icon' : 'frame',
					embeds: embedded,
					embedProps: embedProps(opening, ctx, unread),
					...(embedded === 'kol-icon' ? { glyph: embedProps(opening, ctx, unread)._icons ?? { literal: 'icon' } } : {}),
					...condition,
				},
			];
		}
		const local = target ? localComponent(target, tagName) : ctx.locals.has(tagName) ? { ctx, node: ctx.locals.get(tagName) as ts.Node } : undefined;
		const jsx = local ? returnedJsx(local.node) : undefined;
		if (jsx && local) return within(local.node, [], () => readJsx(jsx, local.ctx, block, index, unread, when));
		unread.push(`<${tagName}>`);
		return [];
	}

	const tag = /^[a-z]/.test(tagName) ? tagName : 'div';
	const inner = readChildren(children, ctx, block, index, unread);
	if (!bemClass || bemClass.block !== block || bemClass.element === undefined) {
		// An element without an own BEM element class is a wrapper: its children belong to the parent.
		if (bemClass?.element === undefined && bemClass?.block === block) return [{ tag, kind: 'frame', ...condition, children: inner }];
		return inner.map((child) => (when && !child.when ? { ...child, when: { prop: when } } : child));
	}
	const textChild = inner.find((child) => child.kind === 'text' && child.element === undefined && child.when === undefined);
	const slot = inner.find((child) => child.kind === 'slot' && child.element === undefined);
	const rest = inner.filter((child) => child !== textChild && child !== slot);
	return [
		{
			element: bemClass.element,
			tag,
			kind: slot ? 'slot' : textChild && rest.length === 0 ? 'text' : 'frame',
			...(tag === 'button' || tag === 'a' || bemClass.element === 'interactive-element' ? { interactive: true } : {}),
			...(attribute(opening, 'hidden') ? { hidden: true } : {}),
			...(textChild?.text ? { text: textChild.text } : slot?.text ? { text: slot.text } : {}),
			...condition,
			...(rest.length > 0 ? { children: rest } : {}),
		},
	];
}

function readChildren(
	children: ts.NodeArray<ts.JsxChild> | never[],
	ctx: FileContext,
	block: string,
	index: Map<string, string>,
	unread: string[],
): DesignNode[] {
	return [...children].flatMap((child) => readJsx(child, ctx, block, index, unread));
}

function readExpression(expression: ts.Expression, ctx: FileContext, block: string, index: Map<string, string>, unread: string[], when?: string): DesignNode[] {
	if (ts.isParenthesizedExpression(expression)) return readExpression(expression.expression, ctx, block, index, unread, when);
	if (ts.isBinaryExpression(expression) && expression.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
		const prop = conditionProp(expression.left, ctx);
		return readExpression(expression.right, ctx, block, index, unread, prop ?? when);
	}
	if (ts.isConditionalExpression(expression)) return readExpression(expression.whenTrue, ctx, block, index, unread, when);
	const jsx = unwrap(expression);
	if (jsx) return readJsx(jsx, ctx, block, index, unread, when);
	if (ts.isIdentifier(expression)) {
		if (expression.text === 'children') return [{ tag: 'slot', kind: 'slot', text: { prop: '_slot' } }];
		const text = resolveIdentifier(expression.text, ctx);
		if (text) return [{ tag: 'span', kind: 'text', text }];
	}
	if (ts.isArrayLiteralExpression(expression)) {
		return expression.elements.flatMap((element) => readExpression(element, ctx, block, index, unread, when));
	}
	if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression) || ts.isTemplateExpression(expression)) return [];
	// A list (`items.map((item) => <li …/>)`) shows one sample entry in the library.
	if (ts.isCallExpression(expression) && ts.isPropertyAccessExpression(expression.expression) && expression.expression.name.text === 'map') {
		const callback = expression.arguments[0];
		const body = callback && (ts.isArrowFunction(callback) || ts.isFunctionExpression(callback)) ? callback : undefined;
		if (body) {
			return within(body, [], () => {
				if (!ts.isBlock(body.body)) return readExpression(body.body, ctx, block, index, unread, when);
				const jsx = returnedJsx(body);
				return jsx ? readJsx(jsx, ctx, block, index, unread, when) : [];
			});
		}
	}
	if (ts.isCallExpression(expression)) {
		const callee = expression.expression.getText(ctx.source);
		const local = ctx.locals.get(callee);
		const fnJsx = local ? returnedJsx(local) : undefined;
		if (fnJsx && local) {
			const position = expression.arguments.find((arg): arg is ts.StringLiteral => ts.isStringLiteral(arg))?.text;
			const exit = earlyExit(local, expression, ctx);
			return within(local, [], () => readJsx(fnJsx, ctx, block, index, unread, when)).map((node) => {
				const placed = position && node.kind === 'icon' ? iconAt(node, position) : node;
				return exit && !placed.when ? { ...placed, when: exit } : placed;
			});
		}
		const arg = expression.arguments[0];
		if (arg && ts.isIdentifier(arg) && TEXT_PROPS.has(attributeOf(arg.text))) return [{ tag: 'span', kind: 'text', text: { prop: attributeOf(arg.text) } }];
	}
	unread.push(expression.getText(ctx.source).slice(0, 60));
	return [];
}

/**
 * The condition of an early `return null` in a render helper, mapped onto the prop passed for the
 * parameter: `renderLabel(label, hideLabel)` with `if (hideLabel) return null` renders only while
 * `_hide-label` is false.
 */
function earlyExit(fn: ts.Node, call: ts.CallExpression, ctx: FileContext): { prop: string; value?: boolean } | undefined {
	if (!(ts.isArrowFunction(fn) || ts.isFunctionExpression(fn) || ts.isFunctionDeclaration(fn)) || !fn.body || !ts.isBlock(fn.body)) return undefined;
	for (const statement of fn.body.statements) {
		if (!ts.isIfStatement(statement)) continue;
		const then = ts.isBlock(statement.thenStatement) ? statement.thenStatement.statements[0] : statement.thenStatement;
		if (!then || !ts.isReturnStatement(then) || then.expression?.kind !== ts.SyntaxKind.NullKeyword) continue;
		const negated = ts.isPrefixUnaryExpression(statement.expression) && statement.expression.operator === ts.SyntaxKind.ExclamationToken;
		const tested = negated ? (statement.expression as ts.PrefixUnaryExpression).operand : statement.expression;
		if (!ts.isIdentifier(tested)) continue;
		const index = fn.parameters.findIndex((parameter) => ts.isIdentifier(parameter.name) && parameter.name.text === tested.text);
		const argument = index >= 0 ? call.arguments[index] : undefined;
		const resolved = argument && ts.isIdentifier(argument) ? resolveIdentifier(argument.text, ctx) : undefined;
		if (resolved && 'prop' in resolved) return negated ? { prop: resolved.prop } : { prop: resolved.prop, value: false };
	}
	return undefined;
}

/**
 * An icon rendered per position (`renderIcon(left, 'left')` in `SpanFC`): the position is the element
 * modifier, and the icon exists when `_icons` names it. A plain string in `_icons` is the left icon.
 */
function iconAt(node: DesignNode, position: string): DesignNode {
	const source = position === 'left' ? '_icons' : `_icons.${position}`;
	return { ...node, modifiers: { [position]: { prop: source } }, when: { prop: source }, glyph: { prop: source } };
}

function localComponent(file: string, name: string): { ctx: FileContext; node: ts.Node } | undefined {
	const ctx = context(file);
	const node = ctx.locals.get(name);
	return node ? { ctx, node } : undefined;
}

/** Props an embedding passes: literals as values, identifiers as references to the host's props. */
function embedProps(opening: ts.JsxOpeningElement | ts.JsxSelfClosingElement, ctx: FileContext, unread: string[]): Record<string, ValueSource> {
	const props: Record<string, ValueSource> = {};
	for (const property of opening.attributes.properties) {
		if (ts.isJsxSpreadAttribute(property)) {
			unread.push(`{...${property.expression.getText(ctx.source)}}`);
			continue;
		}
		const name = property.name.getText(ctx.source);
		if (name === 'class' || name.startsWith('handle') || name.startsWith('ref') || name.startsWith('on')) continue;
		const key = attributeOf(name);
		const value = literal(property.initializer, ctx);
		if (value !== undefined) props[key] = { literal: value };
		else if (
			property.initializer &&
			ts.isJsxExpression(property.initializer) &&
			property.initializer.expression &&
			ts.isIdentifier(property.initializer.expression)
		) {
			const resolved = resolveIdentifier(property.initializer.expression.text, ctx);
			if (resolved) props[key] = resolved;
		}
	}
	return props;
}

/** A literal attribute value: bare attribute → `true`, string, boolean, the first string of an array or object (`variant={['normal']}`, `icons={{ left: { icon: 'kolicon-cross' } }}`). */
function literal(initializer: ts.JsxAttributeValue | undefined, ctx: FileContext): boolean | string | undefined {
	if (initializer === undefined) return true;
	if (ts.isStringLiteral(initializer)) return initializer.text;
	if (!ts.isJsxExpression(initializer) || !initializer.expression) return undefined;
	const expression = initializer.expression;
	if (expression.kind === ts.SyntaxKind.TrueKeyword) return true;
	if (expression.kind === ts.SyntaxKind.FalseKeyword) return false;
	if (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression)) return expression.text;
	if (ts.isArrayLiteralExpression(expression) || ts.isObjectLiteralExpression(expression)) {
		let first: string | undefined;
		const visit = (node: ts.Node): void => {
			if (first === undefined && ts.isStringLiteral(node) && !ts.isPropertyAssignment(node.parent)) first = node.text;
			if (first === undefined && ts.isStringLiteral(node) && ts.isPropertyAssignment(node.parent) && node.parent.initializer === node) first = node.text;
			ts.forEachChild(node, visit);
		};
		visit(expression);
		if (first !== undefined) return first;
	}
	void ctx;
	return undefined;
}
