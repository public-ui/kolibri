import fs from 'node:fs';
import path from 'node:path';
import * as ts from 'typescript';

/**
 * Pins the member order of every Stencil component class (ARC42 § Web Component Layer, member order):
 * statics, `@Element`, `@State`, other fields, constructor, `@Prop`, `@Event`, `@Method`, the
 * lifecycle methods in the order of `LIFECYCLE`, `@Listen`, helpers and handlers, `render`. A `@Watch`
 * method directly follows the `@Prop` or `@State` it observes. A property may come earlier than its group when the initializer of a later
 * property reads it, because property initializers run in declaration order.
 *
 * For every class under `src`, it also checks that no property initializer reads an own property that
 * is declared after it: directly, through an own method, getter or arrow-function property it calls.
 * A read through a callee that receives `this` (e.g. `new Behavior(this)`) and a synchronously run
 * callback (an IIFE, an array callback) are not traced.
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

const findSourceFiles = (dir: string): string[] =>
	fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			return findSourceFiles(full);
		}
		return /\.tsx?$/.test(entry.name) && !/\.(spec|test|e2e)\.tsx?$/.test(entry.name) && !entry.name.endsWith('.d.ts') ? [full] : [];
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

/** `checkClass` and `initializationProblems` both read the construction reads of every member; they are computed once. */
const constructionReadsCache = new WeakMap<ts.ClassElement, Set<string>>();

/**
 * Own properties an initializer reads during construction: directly, through own getters it reads, and
 * through own methods and arrow-function properties it calls. An arrow or function initializer itself
 * runs later, so it reads nothing during construction. Callbacks that run synchronously (an IIFE, an
 * array callback) are treated as deferred and not traced.
 */
const constructionReads = (member: ts.ClassElement, byName: Map<string, ts.ClassElement>): Set<string> => {
	const cached = constructionReadsCache.get(member);
	if (cached) return cached;
	const result = new Set<string>();
	constructionReadsCache.set(member, result);
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
			} else if (((ts.isMethodDeclaration(target) && calls.has(name)) || ts.isGetAccessor(target)) && target.body) {
				// A getter runs on every read, a method only when it is called; a method reference reads nothing.
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
	// Members a watcher may observe: a watcher directly follows its @Prop or @State.
	const watchableNames = members.filter((member) => groupOf(member) === 'prop' || groupOf(member) === 'state').map(memberName);
	let rank = -1;
	let lastWatchable: string | undefined;
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
				.filter((target) => byName.has(target) && !watchableNames.includes(target))
				.forEach((target) => problems.push(`${name} watches ${target}, which is no @Prop or @State; the member order places watchers of those only`));
			const targets = watched.filter((target) => watchableNames.includes(target)).sort((a, b) => watchableNames.indexOf(a) - watchableNames.indexOf(b));
			if (targets.length > 0) {
				// The watcher follows its first watched member directly, or another watcher of that member.
				if (lastWatchable !== targets[0] || !['prop', 'state', 'watch'].includes(previousGroup as Group)) {
					problems.push(`${name} does not directly follow ${targets[0]}`);
				}
			} else if (watched.every((target) => !byName.has(target))) {
				// A watcher of an inherited prop belongs to the prop group.
				const propRank = GROUPS.indexOf('prop');
				if (rank > propRank) {
					problems.push(`${name} (watch of an inherited prop) comes after ${GROUPS[rank]}`);
				} else {
					rank = propRank;
				}
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
		if (group === 'prop' || group === 'state') lastWatchable = name;
		if (group === 'lifecycle') {
			const index = LIFECYCLE.indexOf(name);
			if (index < lifecycleIndex) problems.push(`${name} is out of the lifecycle order`);
			lifecycleIndex = index;
		}
		previousGroup = group;
	});
	return problems;
};

type SourceInfo = { file: string; text: string; source: ts.SourceFile };

/** Every source file under `src` that declares a class, read and parsed once. */
const SOURCES: SourceInfo[] = findSourceFiles(SRC).flatMap((file) => {
	const text = fs.readFileSync(file, 'utf8');
	return /\bclass\b/.test(text) ? [{ file, text, source: ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX) }] : [];
});

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
	const components = SOURCES.filter(({ text }) => text.includes('@Component('));

	it('finds the components', () => {
		expect(components.length).toBeGreaterThan(40);
	});

	it.each(components.map(({ file, source }) => [path.relative(SRC, file), source]))('%s follows the member order', (_name, source) => {
		const problems = classesOf(source)
			.filter((cls): cls is ts.ClassDeclaration => ts.isClassDeclaration(cls) && decoratorNames(cls).includes('Component'))
			.flatMap(checkClass);
		expect(problems).toEqual([]);
	});
});

describe('Property initialization order', () => {
	it('reads no property in an initializer before it is declared', () => {
		const problems = SOURCES.flatMap(({ file, source }) =>
			classesOf(source)
				.flatMap(initializationProblems)
				.map((problem) => `${path.relative(SRC, file)}: ${problem}`),
		);
		expect(problems).toEqual([]);
	});
});
