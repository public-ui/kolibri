import fs from 'node:fs';
import path from 'node:path';
import * as ts from 'typescript';

/**
 * Pins the member order of every Stencil component class (ARC42 § Web Component Layer, member order):
 * statics, `@Element`, `@State`, other fields, constructor, each `@Prop` followed by its `@Watch`
 * methods, `@Event`, `@Method`, the lifecycle methods in the order of `LIFECYCLE`, `@Listen`, helpers
 * and handlers, `render`. A property may come earlier than its group when the initializer of a later
 * property reads it, because property initializers run in declaration order.
 *
 * For every class under `src`, it also checks that no property initializer reads an own property that
 * is declared after it: directly, through an own method, getter or arrow-function property it calls.
 * A read through a callee that receives `this` (e.g. `new Behavior(this)`) is not traced.
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

const findClassFiles = (dir: string): string[] =>
	fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			return findClassFiles(full);
		}
		return /\.tsx?$/.test(entry.name) &&
			!/\.(spec|test|e2e)\.tsx?$/.test(entry.name) &&
			!entry.name.endsWith('.d.ts') &&
			/\bclass\b/.test(fs.readFileSync(full, 'utf8'))
			? [full]
			: [];
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

/** Nested code that does not run while the surrounding expression is evaluated. */
const isDeferred = (node: ts.Node): boolean =>
	ts.isArrowFunction(node) ||
	ts.isFunctionExpression(node) ||
	ts.isFunctionDeclaration(node) ||
	ts.isClassExpression(node) ||
	ts.isMethodDeclaration(node) ||
	ts.isGetAccessor(node) ||
	ts.isSetAccessor(node);

/** `this.<name>` reads of `node` that run immediately, and the names of the own members it calls. */
const immediateAccess = (node: ts.Node): { reads: Set<string>; calls: Set<string> } => {
	const reads = new Set<string>();
	const calls = new Set<string>();
	const visit = (child: ts.Node): void => {
		if (child !== node && isDeferred(child)) return;
		if (ts.isPropertyAccessExpression(child) && child.expression.kind === ts.SyntaxKind.ThisKeyword) {
			reads.add(child.name.text);
			if (ts.isCallExpression(child.parent) && child.parent.expression === child) calls.add(child.name.text);
		}
		ts.forEachChild(child, visit);
	};
	visit(node);
	return { reads, calls };
};

/** Own members by name; of a getter/setter pair the getter, which runs on a read. */
const membersByName = (members: readonly ts.ClassElement[]): Map<string, ts.ClassElement> => {
	const byName = new Map<string, ts.ClassElement>();
	members.forEach((member) => {
		const name = memberName(member);
		if (!byName.has(name) || ts.isGetAccessor(member)) byName.set(name, member);
	});
	return byName;
};

const isFunctionInitializer = (member: ts.ClassElement): boolean =>
	ts.isPropertyDeclaration(member) && !!member.initializer && (ts.isArrowFunction(member.initializer) || ts.isFunctionExpression(member.initializer));

/**
 * Own properties an initializer reads during construction: directly, through own methods and getters
 * it reads or calls, and through arrow-function properties it calls. An arrow or function initializer
 * itself runs later, so it reads nothing during construction.
 */
const constructionReads = (member: ts.ClassElement, byName: Map<string, ts.ClassElement>): Set<string> => {
	const result = new Set<string>();
	if (!ts.isPropertyDeclaration(member) || !member.initializer || isFunctionInitializer(member)) return result;
	const seen = new Set<string>();
	const walk = (node: ts.Node): void => {
		const { reads, calls } = immediateAccess(node);
		reads.forEach((name) => {
			const target = byName.get(name);
			if (!target || seen.has(name)) return;
			if (ts.isPropertyDeclaration(target)) {
				result.add(name);
				if (calls.has(name) && isFunctionInitializer(target)) {
					seen.add(name);
					walk((target.initializer as ts.ArrowFunction | ts.FunctionExpression).body);
				}
			} else if ((ts.isMethodDeclaration(target) || ts.isGetAccessor(target)) && target.body) {
				seen.add(name);
				walk(target.body);
			}
		});
	};
	walk(member.initializer);
	return result;
};

/** Initializers that read an own property declared after them, so they would see `undefined`. */
const initializationProblems = (cls: ts.ClassLikeDeclaration): string[] => {
	const members = cls.members;
	const byName = membersByName(members);
	const problems: string[] = [];
	members.forEach((member, index) => {
		constructionReads(member, byName).forEach((name) => {
			if (members.indexOf(byName.get(name) as ts.ClassElement) > index) {
				problems.push(`${cls.name?.text ?? 'class'}.${memberName(member)} reads ${name} before it is initialized`);
			}
		});
	});
	return problems;
};

const checkClass = (cls: ts.ClassDeclaration): string[] => {
	const problems: string[] = [];
	const members = cls.members;
	const byName = membersByName(members);
	const readEarly = new Set<string>();
	members.forEach((member) => constructionReads(member, byName).forEach((name) => readEarly.add(name)));
	const propNames = members.filter((member) => groupOf(member) === 'prop').map(memberName);
	let rank = -1;
	let lastProp: string | undefined;
	let previousGroup: Group | undefined;
	let lifecycleIndex = -1;

	members.forEach((member) => {
		const group = groupOf(member);
		const name = memberName(member);
		if (group === 'watch') {
			const watched = (ts.getDecorators(member as ts.HasDecorators) ?? [])
				.map((decorator) => decorator.expression)
				.filter((expression): expression is ts.CallExpression => ts.isCallExpression(expression) && expression.expression.getText() === 'Watch')
				.map((expression) => (expression.arguments[0] as ts.StringLiteral).text);
			watched
				.filter((target) => byName.has(target) && !propNames.includes(target))
				.forEach((target) => problems.push(`${name} watches ${target}, which is no @Prop; the member order places watchers of props only`));
			const targets = watched.filter((target) => propNames.includes(target)).sort((a, b) => propNames.indexOf(a) - propNames.indexOf(b));
			if (targets.length > 0) {
				// The watcher follows its first prop directly, or another watcher of that prop.
				if (lastProp !== targets[0] || (previousGroup !== 'prop' && previousGroup !== 'watch')) {
					problems.push(`${name} does not directly follow its prop ${targets[0]}`);
				}
			} else if (watched.every((target) => !byName.has(target)) && rank > GROUPS.indexOf('prop')) {
				// A watcher of an inherited prop stays in the prop group.
				problems.push(`${name} (watch of an inherited prop) comes after ${GROUPS[rank]}`);
			}
			previousGroup = group;
			return;
		}
		const groupRank = GROUPS.indexOf(group);
		// A property another initializer reads may stand ahead of its group, never behind it, and does not move the group position.
		const isReadEarly = ts.isPropertyDeclaration(member) && readEarly.has(name);
		if (groupRank < rank) {
			problems.push(`${name} (${group}) comes after ${GROUPS[rank]}`);
		} else if (!isReadEarly) {
			rank = groupRank;
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

const parse = (file: string): ts.SourceFile => ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);

const classesOf = (source: ts.SourceFile): ts.ClassLikeDeclaration[] => {
	const classes: ts.ClassLikeDeclaration[] = [];
	const visit = (node: ts.Node): void => {
		if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) classes.push(node);
		ts.forEachChild(node, visit);
	};
	visit(source);
	return classes;
};

describe('Stencil component member order', () => {
	const files = findClassFiles(SRC).filter((file) => fs.readFileSync(file, 'utf8').includes('@Component('));

	it('finds the components', () => {
		expect(files.length).toBeGreaterThan(40);
	});

	it.each(files.map((file) => [path.relative(SRC, file), file]))('%s follows the member order', (_name, file) => {
		const problems = classesOf(parse(file))
			.filter((cls): cls is ts.ClassDeclaration => ts.isClassDeclaration(cls) && decoratorNames(cls).includes('Component'))
			.flatMap(checkClass);
		expect(problems).toEqual([]);
	});
});

describe('Property initialization order', () => {
	it('reads no property in an initializer before it is declared', () => {
		const problems = findClassFiles(SRC).flatMap((file) =>
			classesOf(parse(file))
				.flatMap(initializationProblems)
				.map((problem) => `${path.relative(SRC, file)}: ${problem}`),
		);
		expect(problems).toEqual([]);
	});
});
