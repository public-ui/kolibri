import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import { stableStringify } from '../src/penpot-import.js';
import { computeStyle, parseRules } from '../src/spec/cascade.js';
import { checkSpecs } from '../src/spec/check-spec.js';
import { combinations, transform } from '../src/spec/transform.js';
import { resolveValue, toPx } from '../src/spec/values.js';
const TOKENS = [
	{ name: '--color-light', value: 'light-dark(#ffffff, #000000)', light: '#ffffff', dark: '#000000' },
	{ name: '--color-primary', value: 'light-dark(#003a5c, #86c5ea)', light: '#003a5c', dark: '#86c5ea' },
	{ name: '--color-primary-variant', value: 'light-dark(#005a8f, #a8d8f5)', light: '#005a8f', dark: '#a8d8f5' },
];
const CSS = `
@layer kol-component {
	.kol-button { display: flex; min-height: max(2.75rem, 44px); }
	.kol-button__text { padding: 0.5rem 0.875rem; }
}
@layer kol-theme-global {
	:host {
		--color-light: var(--kolibri-color-light, light-dark(#ffffff, #000000));
		--color-primary: var(--kolibri-color-primary, light-dark(#003a5c, #86c5ea));
		--color-primary-variant: var(--kolibri-color-primary-variant, light-dark(#005a8f, #a8d8f5));
	}
}
@layer kol-theme-component {
	.kol-button--primary { --text-background-color: var(--color-primary); --text-color: var(--color-light); }
	.kol-button--primary .kol-button__interactive-element:not([disabled]):hover { --text-background-color: var(--color-primary-variant); }
	.kol-button__interactive-element:focus { outline: var(--color-primary-variant) solid calc(3 * 1rem / 16); outline-offset: 2px; }
	.kol-button__text { background-color: var(--text-background-color); color: var(--text-color); border: 1px solid var(--text-background-color); }
	.kol-button__text + .kol-button__tooltip { color: red; }
}
`;
const BUTTON = {
	block: 'kol-button',
	axes: [
		{ kind: 'prop', name: 'Variant', prop: '_variant', values: ['primary'], modifier: '{value}' },
		{ kind: 'prop', name: 'Disabled', prop: '_disabled', values: [false, true] },
		{ kind: 'state', name: 'Hover', state: 'hover' },
		{ kind: 'state', name: 'Focus', state: 'focus' },
	],
	modifiers: { disabled: { prop: '_disabled' } },
	sample: { _label: 'Speichern' },
	tree: {
		tag: 'div',
		kind: 'frame',
		children: [
			{
				element: 'interactive-element',
				tag: 'button',
				kind: 'frame',
				interactive: true,
				children: [{ element: 'text', tag: 'span', kind: 'text', text: { prop: '_label' } }],
			},
		],
	},
};
function run() {
	const unsupported = [];
	return transform({
		library: ['kol-button'],
		rules: new Map([['kol-button', parseRules(CSS, unsupported)]]),
		specs: [BUTTON],
		themeName: 'default',
		tokens: TOKENS,
		version: { components: '4.0.0', theme: '4.0.0' },
	});
}
describe('spec transformation', () => {
	it('expands axes into variants and leaves interaction states out of disabled variants', () => {
		assert.deepEqual(
			combinations(BUTTON).map((variant) => variant.id),
			[
				'kol-button.primary.false.false.false',
				'kol-button.primary.false.true.false',
				'kol-button.primary.false.false.true',
				'kol-button.primary.true.false.false',
			],
		);
	});
	it('binds the colors of the cascade to theme tokens, per state', () => {
		const { penpot } = run();
		const text = (id) => penpot.components.find((component) => component.id === id)?.shapes.children[0].children[0];
		assert.equal(text('kol-button.primary.false.false.false')?.fillToken, 'color.primary');
		assert.equal(text('kol-button.primary.false.false.false')?.fill, '#003a5c');
		assert.equal(text('kol-button.primary.false.true.false')?.fillToken, 'color.primary-variant');
		assert.equal(
			text('kol-button.primary.true.false.false')?.fillToken,
			'color.primary',
			'a disabled button keeps its colors, :not([disabled]) excludes the hover rule',
		);
		assert.deepEqual(text('kol-button.primary.false.false.false')?.padding, [8, 14, 8, 14]);
		const focus = penpot.components.find((component) => component.id === 'kol-button.primary.false.false.true')?.shapes.children[0];
		assert.deepEqual(focus?.outline, { color: '#005a8f', offset: 2, radius: undefined, token: 'color.primary-variant', width: 3 });
		assert.equal(penpot.components[0].shapes.minHeight, 44);
	});
	it('maps tokens onto Figma variables with Light and Dark modes and binds nodes by name', () => {
		const { figma } = run();
		assert.deepEqual(
			figma.variables.variables.find((variable) => variable.name === 'color/primary'),
			{ name: 'color/primary', type: 'COLOR', values: { Dark: '#86c5ea', Light: '#003a5c' } },
		);
		const text = figma.componentSets[0].components[0].tree.children[0].children[0];
		assert.equal(text.fill?.variable, 'color/primary');
		assert.equal(figma.componentSets[0].components[0].name, 'Variant=primary, Disabled=false, Hover=false, Focus=false');
	});
	it('gives byte-identical output for identical input', () => {
		assert.equal(stableStringify(run().penpot), stableStringify(run().penpot));
		assert.equal(stableStringify(run().figma), stableStringify(run().figma));
	});
	it('reports rules the static cascade cannot evaluate instead of guessing', () => {
		const unsupported = [];
		parseRules(CSS, unsupported);
		assert.deepEqual(unsupported, [{ selector: '.kol-button__text + .kol-button__tooltip', reason: 'combinator +' }]);
	});
});
describe('static cascade', () => {
	it('lets a later layer win over higher specificity in an earlier layer', () => {
		const rules = parseRules('@layer kol-component { .a.b { color: red; } } @layer kol-theme-component { .a { color: blue; } }', []);
		const node = { tag: 'div', classes: ['a', 'b'], attributes: {}, states: new Set() };
		assert.equal(computeStyle(node, rules, undefined).color, 'blue');
	});
	it('inherits custom properties and resolves them against the token list', () => {
		const tokens = new Map(TOKENS.map((token) => [token.name, token]));
		const style = { '--color-primary': 'var(--kolibri-color-primary, light-dark(#003a5c, #86c5ea))', '--bg': 'var(--color-primary)' };
		assert.deepEqual(resolveValue('var(--bg)', style, tokens), { value: '#003a5c', dark: '#86c5ea', token: '--color-primary' });
		assert.deepEqual(resolveValue('light-dark(#fff, #000)', {}, tokens), { value: '#fff', dark: '#000' });
	});
	it('converts lengths without layout', () => {
		assert.equal(toPx('max(2.75rem, 44px)', 16), 44);
		assert.equal(toPx('calc(3 * 1rem / 16)', 16), 3);
		assert.equal(toPx('0.5em', 20), 10);
		assert.equal(toPx('100%', 16), undefined);
	});
});
describe('checkSpecs', () => {
	const bems = [{ block: 'kol-button', elements: ['interactive-element', 'text'], modifiers: ['disabled'] }];
	it('accepts a facet whose names are registered', () => {
		assert.doesNotThrow(() => checkSpecs([BUTTON], bems));
	});
	it('refuses elements and modifiers outside the registry', () => {
		const broken = {
			...BUTTON,
			modifiers: { loud: { prop: '_loud' } },
			tree: { ...BUTTON.tree, children: [{ element: 'icon', tag: 'i', kind: 'icon' }] },
		};
		assert.throws(() => checkSpecs([broken], bems), /modifier loud is not registered[\s\S]*element icon is not registered/);
	});
});
