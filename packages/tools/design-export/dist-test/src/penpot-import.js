import { bindTokens } from './bind-tokens.js';
import { UNSET_VARIANT } from './derive-axes.js';
/**
 * Builds the payload of the Penpot plugin from rendered shape trees: pure and deterministic, the
 * same input gives the same output. Colors are bound to theme tokens through the light and the
 * dark rendering, every layer name is checked against the BEM registry, and the unset `_variant`
 * is dropped where it renders like one of its values.
 */
export function buildPenpotImport(input) {
	const report = { binding: { ambiguous: [], unbound: [] }, droppedUnset: [], unregisteredLayers: [] };
	const shapeOf = (id, scheme, state) => input.shapes[`${id}#${scheme}#${state}`];
	const statesOf = (scenario) => input.states[scenario.id] ?? scenario.states ?? ['default'];
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
	const components = [];
	const sets = {};
	for (const scenario of scenarios) {
		const states = statesOf(scenario);
		const switches = states.length > 1;
		const variantSet = (scenario.axes?.length ?? 0) > 0 || switches;
		for (const state of states) {
			const light = shapeOf(scenario.id, 'light', state);
			if (!light) continue;
			bindTokens(light, shapeOf(scenario.id, 'dark', state), input.tokens, report.binding);
			checkBem(light, input.bems, report.unregisteredLayers);
			const properties = variantSet
				? [
						...(scenario.axes ?? []),
						...(switches
							? [
									['Hover', String(state.includes('hover'))],
									['Focus', String(state.includes('focus'))],
								]
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
function sameLook(first, second) {
	if (!first || !second) return false;
	const strip = (node) => ({ ...node, classes: undefined, children: node.children.map(strip) });
	return JSON.stringify(strip(first)) === JSON.stringify(strip(second));
}
/** Layer names the walker and the plugin synthesize, in pseudo-element notation: `…::text`, `…::outline`. */
const SYNTHESIZED = /::(text|outline)$/;
function isRegistered(name, bems) {
	const [block, element] = name.split('__');
	const bem = bems.find((candidate) => candidate.block === block);
	return bem !== undefined && (element === undefined || bem.elements.includes(element));
}
function checkBem(node, bems, unregistered) {
	const registered = isRegistered(node.name, bems) || (SYNTHESIZED.test(node.name) && isRegistered(node.name.replace(SYNTHESIZED, ''), bems));
	if (!registered && node.name.startsWith('kol-')) unregistered.push(node.name);
	for (const child of node.children) checkBem(child, bems, unregistered);
}
/** JSON with object keys in sorted order, so the bytes depend only on the content. */
export function stableStringify(value) {
	const sort = (item) => {
		if (Array.isArray(item)) return item.map(sort);
		if (item && typeof item === 'object') {
			return Object.fromEntries(
				Object.keys(item)
					.sort()
					.filter((key) => item[key] !== undefined)
					.map((key) => [key, sort(item[key])]),
			);
		}
		return item;
	};
	return `${JSON.stringify(sort(value), null, '\t')}\n`;
}
