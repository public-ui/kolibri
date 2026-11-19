import { cssModifiers } from '../derive-axes.js';
import { readDialect } from './bem-dialect.js';
/**
 * Generates the design specification of a block from what the repository already holds — nothing
 * is maintained by hand:
 *
 * - design properties from the BEM modifiers through the dialect (`readDialect`),
 * - the element tree from the functional component (`extractFcTree`),
 * - open variant values (`_variant` as a class name, e.g. `kol-button--primary`) from the block
 *   modifiers the theme CSS styles; each is reported, because the registry should list it,
 * - sample content from the attribute names: `_label` shows the component name, a slot shows `Inhalt`.
 */
export function toSpec(bem, api, fc, themeCss) {
	const dialect = readDialect(bem, api);
	const axes = [];
	const modifiers = {};
	for (const property of dialect.properties) {
		if (property.kind === 'enum') {
			const [value, modifier] = Object.entries(property.modifiers)[0];
			axes.push({
				kind: 'prop',
				name: property.name,
				prop: `_${property.attribute}`,
				values: property.values,
				modifier: `${modifier.slice(0, modifier.length - value.length)}{value}`,
			});
		} else if (property.kind === 'boolean') {
			modifiers[property.modifier] = { prop: `_${property.attribute}` };
			axes.push({ kind: 'prop', name: property.name, prop: `_${property.attribute}`, values: [false, true] });
		}
	}
	const openVariants =
		api?.attributes.includes('_variant') && !axes.some((axis) => axis.kind === 'prop' && axis.prop === '_variant')
			? cssModifiers(bem.block, themeCss).filter((modifier) => !bem.modifiers.includes(modifier))
			: [];
	if (openVariants.length > 0) {
		axes.unshift({ kind: 'prop', name: 'Variant', prop: '_variant', values: openVariants, modifier: '{value}' });
		for (const value of openVariants) {
			dialect.findings.push({ block: bem.block, modifier: value, rule: 'unregistered-variant', suggestion: `variant-${value}` });
		}
	}
	for (const property of dialect.properties) if (property.kind === 'state') axes.push({ kind: 'state', name: property.name, state: property.state });
	const name = bem.block.replace(/^kol-/, '');
	const sample = {
		_label: name.charAt(0).toUpperCase() + name.slice(1),
		_slot: 'Inhalt',
	};
	return { spec: { block: bem.block, axes, modifiers, sample, tree: fc.tree }, dialect };
}
