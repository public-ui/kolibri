import type { ShapeNode } from '../render/dom-to-shapes.js';

/**
 * Base components: the functional components with a BEM block of their own (`InputContainerFC`,
 * `AlertFC`, `IconFC`) inside the root of a web component. Web components share them, so each one
 * becomes a library component of its own, and the web component shows an instance of it. A change
 * of the functional component then reaches every web component through the library.
 *
 * The variant properties of a base component are the axes of the web component that change it.
 * Values that look alike merge into one, named after the first: `InputContainerFC` follows
 * `Message` only with `none` and `error`, because the other message types leave it unchanged. Each
 * variant is rendered inside the web component, so styles that depend on the parent block are part
 * of it.
 */
interface BaseComponent {
	id: string;
	/** Name of the variant set and of the component: the functional component (`AlertFC`). */
	set: string;
	properties: [string, string][];
	shapes: ShapeNode;
}

export interface ComposedVariant {
	properties: [string, string][];
	shapes: ShapeNode;
}

/** Base components of one export, shared by all its web components. */
export interface BaseRegistry {
	/** By id, in the order they were found: inner base components before the ones that show them. */
	components: Map<string, { base: BaseComponent; signature: string }>;
	/** Appearance per claimed id: two renderings never share one. */
	claims: Map<string, string>;
	/** Property names per set: all members of a set share them. */
	sets: Map<string, string>;
}

export function createBaseRegistry(): BaseRegistry {
	return { claims: new Map(), components: new Map(), sets: new Map() };
}

/**
 * Replaces the base components in the shapes of all variants of one web component by instances
 * and registers the base components. Nested base components (`InputFC` in `InputContainerFC`)
 * become instances inside the base component.
 */
export function extractBaseComponents(variants: ComposedVariant[], registry: BaseRegistry): ShapeNode[] {
	const occurrences = new Map<string, { base: string; signatures: Map<number, string> }>();
	variants.forEach((variant, index) =>
		walk(variant.shapes, '', true, (shape, path) => {
			if (!occurrences.has(path)) occurrences.set(path, { base: shape.base as string, signatures: new Map() });
			occurrences.get(path)?.signatures.set(index, signatureOf(relative(shape)));
		}),
	);
	const namings = new Map<string, Naming>();
	for (const [path, occurrence] of occurrences) namings.set(path, nameVariants(variants, occurrence, path, registry));

	return variants.map((variant, index) => replace(variant.shapes, '', true, index, namings, registry));
}

interface Naming {
	set: string;
	/** Per variant of the web component: the property values of the base component. */
	properties: Map<number, [string, string][]>;
}

function walk(shape: ShapeNode, path: string, root: boolean, visit: (shape: ShapeNode, path: string) => void): void {
	if (!root && shape.base) visit(shape, path);
	const counts = new Map<string, number>();
	for (const child of shape.children) walk(child, childPath(path, child, counts), false, visit);
}

/** Layer path by name, numbered from the second layer of the same name on, as the Penpot plugin keys layers. */
function childPath(path: string, child: ShapeNode, counts: Map<string, number>): string {
	const count = counts.get(child.name) ?? 0;
	counts.set(child.name, count + 1);
	return `${path}/${count === 0 ? child.name : `${child.name}#${count}`}`;
}

/**
 * The property values of one base component per variant of the web component. An axis counts when
 * two variants that differ only in it render the base component differently; values that never
 * differ merge. Without a unique result every axis counts with all its values.
 */
function nameVariants(
	variants: ComposedVariant[],
	occurrence: { base: string; signatures: Map<number, string> },
	path: string,
	registry: BaseRegistry,
): Naming {
	const axes = variants[0]?.properties.map(([name]) => name) ?? [];
	const present = [...occurrence.signatures.keys()];
	const labels = axes.map((_, axis) => mergedValues(variants, occurrence.signatures, present, axis));
	const counted = axes.map((_, axis) => new Set(labels[axis].values()).size > 1);
	const valuesOf = (index: number, all: boolean): [string, string][] =>
		axes.flatMap((name, axis) => {
			const value = variants[index].properties[axis][1];
			if (all) return [[name, value] as [string, string]];
			return counted[axis] ? [[name, labels[axis].get(value) ?? value] as [string, string]] : [];
		});
	const unique = (all: boolean): boolean => {
		const seen = new Map<string, string>();
		return present.every((index) => {
			const key = JSON.stringify(valuesOf(index, all));
			const signature = occurrence.signatures.get(index) as string;
			if (seen.has(key)) return seen.get(key) === signature;
			seen.set(key, signature);
			return true;
		});
	};
	const all = !unique(false);
	const properties = new Map(present.map((index) => [index, valuesOf(index, all)]));
	const names = JSON.stringify((properties.get(present[0]) ?? []).map(([name]) => name));
	const idOf = (set: string, index: number): string => [set, ...(properties.get(index) ?? []).map(([, value]) => value)].join('.');
	const fits = (set: string): boolean =>
		(registry.sets.get(set) ?? names) === names &&
		present.every((index) => (registry.claims.get(idOf(set, index)) ?? occurrence.signatures.get(index)) === occurrence.signatures.get(index));
	// The same functional component elsewhere with other axes or another look gets the layer path as suffix,
	// joined by `›`: a slash in a component name starts a group path in Penpot and Figma.
	const layers = path.split('/').filter(Boolean);
	const candidates = [occurrence.base, ...layers.map((_, start) => `${occurrence.base} ${layers.slice(layers.length - 1 - start).join(' › ')}`)];
	const set = candidates.find(fits);
	if (!set) throw new Error(`${path}: no unique name for the base component ${occurrence.base}`);
	registry.sets.set(set, names);
	for (const index of present) registry.claims.set(idOf(set, index), occurrence.signatures.get(index) as string);
	return { set, properties };
}

/** Value → label of its group: values whose variants never differ for this base component share the first value. */
function mergedValues(variants: ComposedVariant[], signatures: Map<number, string>, present: number[], axis: number): Map<string, string> {
	const values: string[] = [];
	for (const index of present) {
		const value = variants[index].properties[axis][1];
		if (!values.includes(value)) values.push(value);
	}
	const distinct = new Set<string>();
	const groups = new Map<string, number[]>();
	for (const index of present) {
		const others = JSON.stringify(variants[index].properties.filter((_, position) => position !== axis));
		groups.set(others, [...(groups.get(others) ?? []), index]);
	}
	for (const members of groups.values()) {
		for (const first of members) {
			for (const second of members) {
				if (signatures.get(first) === signatures.get(second)) continue;
				distinct.add(`${variants[first].properties[axis][1]}|${variants[second].properties[axis][1]}`);
			}
		}
	}
	const classes: string[][] = [];
	for (const value of values) {
		const target = classes.find((members) => members.every((member) => !distinct.has(`${member}|${value}`)));
		if (target) target.push(value);
		else classes.push([value]);
	}
	return new Map(classes.flatMap((members) => members.map((member) => [member, members[0]] as [string, string])));
}

function replace(shape: ShapeNode, path: string, root: boolean, index: number, namings: Map<string, Naming>, registry: BaseRegistry): ShapeNode {
	const counts = new Map<string, number>();
	const children = shape.children.map((child) => replace(child, childPath(path, child, counts), false, index, namings, registry));
	const { base: _base, ...rest } = shape;
	const node: ShapeNode = { ...rest, children };
	const naming = root ? undefined : namings.get(path);
	if (!naming) return node;
	const properties = naming.properties.get(index) ?? [];
	const id = [naming.set, ...properties.map(([, value]) => value)].join('.');
	const shapes = relative(node);
	const signature = signatureOf(shapes);
	const known = registry.components.get(id);
	if (known && known.signature !== signature) throw new Error(`${id}: two different renderings share one base component variant`);
	if (!known) registry.components.set(id, { base: { id, set: naming.set, properties, shapes }, signature });
	return {
		name: node.name,
		classes: node.classes,
		kind: 'instance',
		component: id,
		x: node.x,
		y: node.y,
		width: node.width,
		height: node.height,
		...(node.inline ? { inline: true } : {}),
		...(node.minWidth !== undefined ? { minWidth: node.minWidth } : {}),
		...(node.minHeight !== undefined ? { minHeight: node.minHeight } : {}),
		children: [],
	};
}

/** The subtree with coordinates relative to its root. */
function relative(shape: ShapeNode): ShapeNode {
	const move = (node: ShapeNode): ShapeNode => {
		const { base: _base, ...rest } = node;
		return { ...rest, x: round(node.x - shape.x), y: round(node.y - shape.y), children: node.children.map(move) };
	};
	return move(shape);
}

/**
 * What a variant looks like. Classes name the theming contract and change nothing visible on
 * their own; position and size follow from the layout of the web component, which sizes every
 * instance anew.
 */
function signatureOf(shape: ShapeNode): string {
	const visual = (node: ShapeNode): unknown => {
		const { children, classes: _classes, height: _height, width: _width, x: _x, y: _y, ...rest } = node;
		return { ...rest, children: children.map(visual) };
	};
	return JSON.stringify(visual(shape));
}

function round(value: number): number {
	return Math.round(value * 100) / 100;
}
