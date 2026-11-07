import type { TokenBinding } from './bind-tokens.js';
import { bindTokens } from './bind-tokens.js';
import type { StyleAxes } from './derive-axes.js';
import { UNSET_VARIANT } from './derive-axes.js';
import type { ThemeToken } from './extract-tokens.js';
import type { ShapeNode } from './render/dom-to-shapes.js';
import type { Scenario } from './render/render-svg.js';
import type { ComponentBem } from './types.js';

/** One component of the plugin payload: a variant of a set or a single component. */
export interface PenpotComponent {
	id: string;
	tag: string;
	/** The variant set this component belongs to; absent for a single component. */
	set?: string;
	/** Variant property values in property order: `Variant`, `Disabled`, then the switches `Hover` and `Focus`. */
	properties: [string, string][];
	shapes: ShapeNode;
}

export interface PenpotImport {
	schema: '2.0';
	themeName: string;
	version: { components: string; theme: string };
	/** Per variant set: the property names and where the `Variant` values come from. */
	sets: Record<string, { properties: string[]; variantSource?: string }>;
	components: PenpotComponent[];
}

export interface PenpotImportInput {
	themeName: string;
	version: { components: string; theme: string };
	tokens: ThemeToken[];
	bems: ComponentBem[];
	axes: Record<string, StyleAxes>;
	scenarios: Scenario[];
	/** Captured states per scenario id. */
	states: Record<string, string[]>;
	/** Shape trees by `<scenario id>#<scheme>#<state>`. */
	shapes: Record<string, ShapeNode>;
}

export interface PenpotImportReport {
	binding: TokenBinding;
	/** Scenarios of the unset `_variant` that render like one of its values. */
	droppedUnset: string[];
	/** Layer names that are neither a registered block nor an element of their block. */
	unregisteredLayers: string[];
}

/**
 * Builds the payload of the Penpot plugin from rendered shape trees: pure and deterministic, the
 * same input gives the same output. Colors are bound to theme tokens through the light and the
 * dark rendering, every layer name is checked against the BEM registry, and the unset `_variant`
 * is dropped where it renders like one of its values.
 */
export function buildPenpotImport(input: PenpotImportInput): { payload: PenpotImport; report: PenpotImportReport } {
	const report: PenpotImportReport = { binding: { ambiguous: [], unbound: [] }, droppedUnset: [], unregisteredLayers: [] };
	const shapeOf = (id: string, scheme: 'dark' | 'light', state: string) => input.shapes[`${id}#${scheme}#${state}`];
	const statesOf = (scenario: Scenario) => input.states[scenario.id] ?? scenario.states ?? ['default'];

	const scenarios = input.scenarios.filter((scenario) => {
		const unset = scenario.axes?.find(([name, value]) => name === 'Variant' && value === UNSET_VARIANT);
		if (!unset) return true;
		const twin = input.scenarios.find(
			(other) =>
				other !== scenario &&
				other.tag === scenario.tag &&
				JSON.stringify(other.axes?.filter(([name]) => name !== 'Variant')) === JSON.stringify(scenario.axes?.filter(([name]) => name !== 'Variant')) &&
				statesOf(scenario).every((state) => sameLook(shapeOf(scenario.id, 'light', state), shapeOf(other.id, 'light', state))),
		);
		if (twin) report.droppedUnset.push(`${scenario.id} = ${twin.id}`);
		return twin === undefined;
	});

	const components: PenpotComponent[] = [];
	const sets: PenpotImport['sets'] = {};
	for (const scenario of scenarios) {
		const states = statesOf(scenario);
		const switches = states.length > 1;
		const variantSet = (scenario.axes?.length ?? 0) > 0 || switches;
		for (const state of states) {
			const light = shapeOf(scenario.id, 'light', state);
			if (!light) continue;
			bindTokens(light, shapeOf(scenario.id, 'dark', state), input.tokens, report.binding);
			checkBem(light, input.bems, report.unregisteredLayers);
			const properties: [string, string][] = variantSet
				? [
						...(scenario.axes ?? []),
						...(switches
							? ([
									['Hover', String(state.includes('hover'))],
									['Focus', String(state.includes('focus'))],
								] as [string, string][])
							: []),
					]
				: [];
			if (variantSet) {
				sets[scenario.tag] = {
					properties: properties.map(([name]) => name),
					...(input.axes[scenario.tag]?.variantSource ? { variantSource: input.axes[scenario.tag].variantSource } : {}),
				};
			}
			components.push({
				id: variantSet && switches ? `${scenario.id}.${state}` : scenario.id,
				tag: scenario.tag,
				...(variantSet ? { set: scenario.tag } : {}),
				properties,
				shapes: light,
			});
		}
	}
	report.unregisteredLayers = [...new Set(report.unregisteredLayers)].sort();
	return { payload: { schema: '2.0', themeName: input.themeName, version: input.version, sets, components }, report };
}

/** Two shape trees look alike when they match in everything but their BEM classes. */
function sameLook(first: ShapeNode | undefined, second: ShapeNode | undefined): boolean {
	if (!first || !second) return false;
	const strip = (node: ShapeNode): unknown => ({ ...node, classes: undefined, children: node.children.map(strip) });
	return JSON.stringify(strip(first)) === JSON.stringify(strip(second));
}

/** Layer names the walker and the plugin synthesize, in pseudo-element notation: `…::text`, `…::outline`. */
const SYNTHESIZED = /::(text|outline)$/;

function isRegistered(name: string, bems: ComponentBem[]): boolean {
	const [block, element] = name.split('__');
	const bem = bems.find((candidate) => candidate.block === block);
	return bem !== undefined && (element === undefined || bem.elements.includes(element));
}

function checkBem(node: ShapeNode, bems: ComponentBem[], unregistered: string[]): void {
	const registered = isRegistered(node.name, bems) || (SYNTHESIZED.test(node.name) && isRegistered(node.name.replace(SYNTHESIZED, ''), bems));
	if (!registered && node.name.startsWith('kol-')) unregistered.push(node.name);
	for (const child of node.children) checkBem(child, bems, unregistered);
}

/** JSON with object keys in sorted order, so the bytes depend only on the content. */
export function stableStringify(value: unknown): string {
	const sort = (item: unknown): unknown => {
		if (Array.isArray(item)) return item.map(sort);
		if (item && typeof item === 'object') {
			return Object.fromEntries(
				Object.keys(item as Record<string, unknown>)
					.sort()
					.filter((key) => (item as Record<string, unknown>)[key] !== undefined)
					.map((key) => [key, sort((item as Record<string, unknown>)[key])]),
			);
		}
		return item;
	};
	return `${JSON.stringify(sort(value), null, '\t')}\n`;
}
