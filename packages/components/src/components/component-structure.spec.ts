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
 * Traced are reads of own properties and getters and calls of own methods and arrow-function
 * properties, also nested through the called bodies; every other path is not, e.g. a callee that
 * receives `this` (`new Behavior(this)`), a synchronously run callback (an IIFE, an array callback),
 * `call`/`apply`/`bind` and element access.
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

const SRC = path.join(__dirname, '..');

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

const membersByNameCache = new WeakMap<readonly ts.ClassElement[], Map<string, ts.ClassElement>>();

/**
 * Own members by name; of a getter/setter pair the getter, which runs on a read. One map per member
 * list, so the construction reads computed against it are shared by both checks.
 */
const membersByName = (members: readonly ts.ClassElement[]): Map<string, ts.ClassElement> => {
	const cached = membersByNameCache.get(members);
	if (cached) return cached;
	const byName = new Map<string, ts.ClassElement>();
	members.forEach((member) => {
		const name = memberName(member);
		if (!byName.has(name) || ts.isGetAccessor(member)) byName.set(name, member);
	});
	membersByNameCache.set(members, byName);
	return byName;
};

const isFunctionInitializer = (member: ts.ClassElement): boolean =>
	ts.isPropertyDeclaration(member) && !!member.initializer && (ts.isArrowFunction(member.initializer) || ts.isFunctionExpression(member.initializer));

/** Construction reads per member map and member; `checkClass` and `initializationProblems` share them. */
const constructionReadsCache = new WeakMap<Map<string, ts.ClassElement>, Map<ts.ClassElement, Set<string>>>();

/**
 * Own properties an initializer reads during construction: directly, through own getters it reads, and
 * through own methods and arrow-function properties it calls. An arrow or function initializer itself
 * runs later, so it reads nothing during construction. Callbacks that run synchronously (an IIFE, an
 * array callback) are treated as deferred and not traced.
 */
const constructionReads = (member: ts.ClassElement, byName: Map<string, ts.ClassElement>): Set<string> => {
	const readsByMember = constructionReadsCache.get(byName) ?? new Map<ts.ClassElement, Set<string>>();
	constructionReadsCache.set(byName, readsByMember);
	const cached = readsByMember.get(member);
	if (cached) return cached;
	const result = new Set<string>();
	readsByMember.set(member, result);
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

/** The name of the class a class declaration extends, if any. */
const baseName = (cls: ts.ClassDeclaration): string | undefined =>
	cls.heritageClauses?.find((clause) => clause.token === ts.SyntaxKind.ExtendsKeyword)?.types[0]?.expression.getText();

/**
 * The classes that implement a web component without being one: `BaseWebComponent` and every class
 * without `@Component` that extends it, directly or through another base (`button/base.tsx`,
 * `form-field/base-web-component.tsx`, `PageSizeSelect`, …). They hold the orchestrator code of the
 * elements (ARC42 § 9, decision 16), so they follow the same member order.
 */
const WEB_COMPONENT_BASES = (() => {
	const declarations = SOURCES.flatMap(({ file, source }) =>
		classesOf(source)
			.filter((cls): cls is ts.ClassDeclaration => ts.isClassDeclaration(cls) && cls.name !== undefined)
			.map((cls) => ({ cls, file })),
	);
	const byName = new Map(declarations.map((declaration) => [declaration.cls.name?.text, declaration.cls]));
	const extendsBaseWebComponent = (cls: ts.ClassDeclaration | undefined): boolean => {
		if (!cls) return false;
		if (cls.name?.text === 'BaseWebComponent') return true;
		const base = baseName(cls);
		return base !== undefined && extendsBaseWebComponent(byName.get(base));
	};
	return declarations.filter(({ cls }) => !decoratorNames(cls).includes('Component') && extendsBaseWebComponent(cls));
})();

describe('Web component base class member order', () => {
	it('finds the base classes', () => {
		expect(WEB_COMPONENT_BASES.length).toBeGreaterThan(10);
	});

	it.each(WEB_COMPONENT_BASES.map(({ cls, file }) => [`${path.relative(SRC, file)} ${cls.name?.text}`, cls]))('%s follows the member order', (_name, cls) => {
		expect(checkClass(cls)).toEqual([]);
	});
});

/**
 * `componentWillLoad` applies a prop through its watcher (`this.watchLabel(this._label)`), so the first
 * value and every later change run the same code. It never applies a prop definition itself
 * (`labelProp.apply(this._label, …)`). Where the watcher reacts to a change beyond applying the value, the
 * component calls the `apply…` method the watcher delegates to; a watcher that only hands the value on to
 * that method is called itself.
 */
const bypassedWatchers = (cls: ts.ClassDeclaration): string[] => {
	const methods = cls.members.filter((member): member is ts.MethodDeclaration => ts.isMethodDeclaration(member));
	const componentWillLoad = methods.find((method) => memberName(method) === 'componentWillLoad');
	/** The watcher of a prop and, if its body only hands the value on to one own method, that method. */
	const watcherOf = (prop: string): { name: string; delegate?: string } | undefined => {
		const watcher = methods.find((method) =>
			(ts.getDecorators(method) ?? []).some(
				(decorator) =>
					ts.isCallExpression(decorator.expression) &&
					decorator.expression.expression.getText() === 'Watch' &&
					(decorator.expression.arguments[0] as ts.StringLiteral | undefined)?.text === prop,
			),
		);
		if (!watcher) return undefined;
		const [statement, ...rest] = watcher.body?.statements ?? [];
		const parameter = watcher.parameters[0]?.name.getText();
		const call = statement && ts.isExpressionStatement(statement) ? statement.expression : undefined;
		const delegates =
			rest.length === 0 &&
			call !== undefined &&
			ts.isCallExpression(call) &&
			ts.isPropertyAccessExpression(call.expression) &&
			call.expression.expression.kind === ts.SyntaxKind.ThisKeyword &&
			call.arguments.length === 1 &&
			call.arguments[0].getText() === parameter;
		return { name: memberName(watcher), delegate: delegates ? call.expression.name.text : undefined };
	};
	const problems: string[] = [];
	const visit = (node: ts.Node): void => {
		const firstArgument = ts.isCallExpression(node) ? node.arguments[0] : undefined;
		if (
			ts.isCallExpression(node) &&
			ts.isPropertyAccessExpression(node.expression) &&
			firstArgument !== undefined &&
			ts.isPropertyAccessExpression(firstArgument) &&
			firstArgument.expression.kind === ts.SyntaxKind.ThisKeyword
		) {
			const prop = firstArgument.name.text;
			const callee = node.expression;
			if (callee.name.text === 'apply' && /Prop$/.test(callee.expression.getText())) {
				problems.push(`componentWillLoad applies ${prop} with ${callee.expression.getText()} instead of calling its watcher`);
			} else if (callee.expression.kind === ts.SyntaxKind.ThisKeyword && node.arguments.length === 1) {
				const watcher = watcherOf(prop);
				if (watcher?.delegate === callee.name.text) {
					problems.push(`componentWillLoad calls ${callee.name.text} for ${prop}, which ${watcher.name} only hands on to; call ${watcher.name}`);
				}
			}
		}
		ts.forEachChild(node, visit);
	};
	if (componentWillLoad?.body) visit(componentWillLoad.body);
	return problems;
};

describe('Stencil component initialization', () => {
	it.each(SOURCES.filter(({ text }) => text.includes('@Component(')).map(({ file, source }) => [path.relative(SRC, file), source]))(
		'%s applies its props in componentWillLoad through the watchers',
		(_name, source) => {
			const problems = classesOf(source)
				.filter((cls): cls is ts.ClassDeclaration => ts.isClassDeclaration(cls) && decoratorNames(cls).includes('Component'))
				.flatMap(bypassedWatchers);
			expect(problems).toEqual([]);
		},
	);
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

describe('Interaction test files', () => {
	/** ARC42 § 9, decision 14: `<component>.e2e.ts`, further files `<component>.<topic>.e2e.ts`. */
	const misnamed = fs
		.readdirSync(__dirname, { withFileTypes: true })
		.filter((entry) => entry.isDirectory())
		.flatMap((entry) =>
			fs
				.readdirSync(path.join(__dirname, entry.name))
				.filter((name) => name.endsWith('.e2e.ts') && name !== `${entry.name}.e2e.ts` && !new RegExp(`^${entry.name}\\.[a-z0-9-]+\\.e2e\\.ts$`).test(name))
				.map((name) => `${entry.name}/${name}`),
		);

	it('are named after their component folder', () => {
		expect(misnamed).toEqual([]);
	});
});

describe('Item files', () => {
	/**
	 * ARC42 § Embedded Components (Items): an item that several components share is `<fc>/item.ts(x)`
	 * and imported from outside its own component; an item that only one embedding component needs is
	 * `<component>/<what it renders>-item.ts(x)` with the factory `create<Component><What>Item`.
	 */
	const FC_DIR = path.join(SRC, 'internal', 'functional-components');
	const sourceFiles = (dir: string): string[] =>
		fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
			const full = path.join(dir, entry.name);
			if (entry.isDirectory()) return sourceFiles(full);
			return /\.tsx?$/.test(entry.name) && !/\.(spec|e2e)\.tsx?$/.test(entry.name) && !entry.name.endsWith('.d.ts') ? [full] : [];
		});
	const allFiles = sourceFiles(SRC).map((file) => ({ file, text: fs.readFileSync(file, 'utf8') }));
	const pascal = (kebab: string): string => kebab.replace(/(^|-)([a-z0-9])/g, (_match, _dash: string, char: string) => char.toUpperCase());
	const problems = allFiles
		.filter(({ file, text }) => file.startsWith(FC_DIR) && /export (const|function) create\w+Item\b/.test(text))
		.flatMap(({ file, text }) => {
			const folder = path.basename(path.dirname(file));
			const name = path.basename(file).replace(/\.tsx?$/, '');
			const relative = path.relative(SRC, file);
			if (name === 'item') {
				const ownDirs = [path.join(SRC, 'components', folder), path.join(FC_DIR, folder)];
				const importer = allFiles.find(
					({ file: other, text: otherText }) =>
						!ownDirs.some((dir) => other.startsWith(dir + path.sep)) && new RegExp(`['"][^'"]*/${folder}/item['"]`).test(otherText),
				);
				return importer ? [] : [`${relative} is used by its own component only; name it <what it renders>-item`];
			}
			if (name.endsWith('-item')) {
				const factory = `create${pascal(folder)}${pascal(name.slice(0, -'-item'.length))}Item`;
				return text.includes(`export const ${factory}`) || text.includes(`export function ${factory}`)
					? []
					: [`${relative} names its factory other than ${factory}`];
			}
			return [`${relative} has an item factory but is no item file`];
		});

	it('are named after what they render and who uses them', () => {
		expect(problems).toEqual([]);
	});
});
