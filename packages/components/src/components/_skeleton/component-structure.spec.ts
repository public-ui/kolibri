import fs from 'node:fs';
import path from 'node:path';
import * as ts from 'typescript';

/**
 * Pins the member order of every Stencil component class (ARC42 § Web Component Layer, member order):
 * statics, `@Element`, `@State`, other fields, constructor, each `@Prop` followed by its `@Watch`
 * methods, `@Event`, `@Method`, lifecycle methods in Stencil order, `@Listen`, helpers and handlers,
 * `render`. A property may come earlier than its group when the initializer of a later property
 * reads it, because property initializers run in declaration order.
 */
const LIFECYCLE = [
	'connectedCallback',
	'componentWillLoad',
	'componentDidLoad',
	'componentShouldUpdate',
	'componentWillUpdate',
	'componentDidUpdate',
	'componentWillRender',
	'componentDidRender',
	'disconnectedCallback',
];
const GROUPS = ['static', 'element', 'state', 'field', 'constructor', 'prop', 'event', 'method', 'lifecycle', 'listen', 'helper', 'render'] as const;
type Group = (typeof GROUPS)[number] | 'watch';

const SRC = path.join(__dirname, '..', '..');

const findComponentFiles = (dir: string): string[] =>
	fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			return findComponentFiles(full);
		}
		return /\.tsx$/.test(entry.name) && !/\.(spec|test|e2e)\.tsx$/.test(entry.name) && fs.readFileSync(full, 'utf8').includes('@Component(') ? [full] : [];
	});

const decoratorNames = (member: ts.Node): string[] =>
	(ts.canHaveDecorators(member) ? (ts.getDecorators(member) ?? []) : []).map((decorator) =>
		ts.isCallExpression(decorator.expression) ? decorator.expression.expression.getText() : decorator.expression.getText(),
	);

const memberName = (member: ts.ClassElement): string => (member.name ? member.name.getText() : 'constructor');

const groupOf = (member: ts.ClassElement): Group => {
	const decorators = decoratorNames(member);
	if ((ts.getModifiers(member as ts.HasModifiers) ?? []).some((modifier) => modifier.kind === ts.SyntaxKind.StaticKeyword)) return 'static';
	if (decorators.includes('Element')) return 'element';
	if (decorators.includes('State')) return 'state';
	if (decorators.includes('Prop')) return 'prop';
	if (decorators.includes('Watch')) return 'watch';
	if (decorators.includes('Event')) return 'event';
	if (decorators.includes('Method')) return 'method';
	if (decorators.includes('Listen')) return 'listen';
	if (ts.isConstructorDeclaration(member)) return 'constructor';
	if (ts.isMethodDeclaration(member) && LIFECYCLE.includes(memberName(member))) return 'lifecycle';
	if (ts.isMethodDeclaration(member) && memberName(member) === 'render') return 'render';
	if (ts.isPropertyDeclaration(member)) {
		const initializer = member.initializer;
		return initializer && (ts.isArrowFunction(initializer) || ts.isFunctionExpression(initializer)) ? 'helper' : 'field';
	}
	return 'helper';
};

/** `this.<name>` reads of property initializers, which run during construction. */
const readsInInitializers = (members: readonly ts.ClassElement[]): Set<string> => {
	const reads = new Set<string>();
	const visit = (node: ts.Node, root: ts.Node): void => {
		if (node !== root && (ts.isArrowFunction(node) || ts.isFunctionExpression(node))) return;
		if (ts.isPropertyAccessExpression(node) && node.expression.kind === ts.SyntaxKind.ThisKeyword) reads.add(node.name.text);
		ts.forEachChild(node, (child) => visit(child, root));
	};
	members.forEach((member) => {
		if (ts.isPropertyDeclaration(member) && member.initializer && !ts.isArrowFunction(member.initializer)) visit(member.initializer, member.initializer);
	});
	return reads;
};

const checkClass = (cls: ts.ClassDeclaration): string[] => {
	const problems: string[] = [];
	const members = cls.members;
	const readEarly = readsInInitializers(members);
	const propNames = members.filter((member) => groupOf(member) === 'prop').map(memberName);
	let rank = -1;
	let lastProp: string | undefined;
	let previousGroup: Group | undefined;
	let lifecycleIndex = -1;

	members.forEach((member) => {
		const group = groupOf(member);
		const name = memberName(member);
		if (group === 'watch') {
			const targets = (ts.getDecorators(member as ts.HasDecorators) ?? [])
				.map((decorator) => decorator.expression)
				.filter((expression): expression is ts.CallExpression => ts.isCallExpression(expression) && expression.expression.getText() === 'Watch')
				.map((expression) => (expression.arguments[0] as ts.StringLiteral).text)
				.filter((target) => propNames.includes(target))
				.sort((a, b) => propNames.indexOf(a) - propNames.indexOf(b));
			if (targets.length > 0) {
				// The watcher follows its first prop directly, or another watcher of that prop.
				if (lastProp !== targets[0] || (previousGroup !== 'prop' && previousGroup !== 'watch')) {
					problems.push(`${name} does not directly follow its prop ${targets[0]}`);
				}
			} else if (rank > GROUPS.indexOf('prop')) {
				// A watcher of an inherited prop stays in the prop group.
				problems.push(`${name} (watch of an inherited prop) comes after ${GROUPS[rank]}`);
			}
			previousGroup = group;
			return;
		}
		const groupRank = GROUPS.indexOf(group);
		// A property another initializer reads may stand before its group and does not move the group position.
		const isReadEarly = ts.isPropertyDeclaration(member) && readEarly.has(name);
		if (!isReadEarly) {
			if (groupRank < rank) {
				problems.push(`${name} (${group}) comes after ${GROUPS[rank]}`);
			} else {
				rank = groupRank;
			}
		}
		if (group === 'prop') lastProp = name;
		if (group === 'lifecycle') {
			const index = LIFECYCLE.indexOf(name);
			if (index < lifecycleIndex) problems.push(`${name} is out of the lifecycle order`);
			lifecycleIndex = index;
		}
		previousGroup = group;
	});
	return problems;
};

describe('Stencil component member order', () => {
	const files = findComponentFiles(SRC);

	it('finds the components', () => {
		expect(files.length).toBeGreaterThan(40);
	});

	it.each(files.map((file) => [path.relative(SRC, file), file]))('%s follows the member order', (_name, file) => {
		const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
		const problems: string[] = [];
		source.forEachChild((node) => {
			if (ts.isClassDeclaration(node) && decoratorNames(node).includes('Component')) problems.push(...checkClass(node));
		});
		expect(problems).toEqual([]);
	});
});
