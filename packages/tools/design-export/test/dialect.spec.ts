import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { literalValues, propertyName, readDialect } from '../src/dialect/bem-dialect.js';
import { extractFcTree, indexFunctionalComponents } from '../src/dialect/extract-fc-tree.js';
import type { DesignNode } from '../src/spec/types.js';
import type { ComponentApi } from '../src/types.js';

const ALERT_API: ComponentApi = {
	tag: 'kol-alert',
	attributes: ['_has-closer', '_label', '_level', '_type', '_variant'],
	attributeTypes: {
		'_has-closer': 'boolean | undefined',
		_label: 'string | undefined',
		_level: '0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined',
		_type: '"default" | "error" | "info" | "success" | "warning" | undefined',
		_variant: '"card" | "msg" | undefined',
	},
	events: [],
	slots: [],
};

describe('BEM dialect', () => {
	it('reads enums from <attribute>-<value> and booleans from the attribute name', () => {
		const dialect = readDialect(
			{ block: 'kol-alert', elements: ['closer'], modifiers: ['has-closer', 'type-error', 'type-info', 'variant-card', 'variant-msg'] },
			ALERT_API,
		);
		assert.deepEqual(dialect.properties, [
			{ kind: 'enum', name: 'Type', attribute: 'type', modifiers: { error: 'type-error', info: 'type-info' }, values: ['error', 'info'] },
			{ kind: 'enum', name: 'Variant', attribute: 'variant', modifiers: { card: 'variant-card', msg: 'variant-msg' }, values: ['card', 'msg'] },
			{ kind: 'boolean', name: 'Closer', attribute: 'has-closer', modifier: 'has-closer' },
		]);
		assert.deepEqual(dialect.findings, []);
	});

	it('reports modifiers outside the dialect with a suggestion and still reads camelCase', () => {
		const dialect = readDialect({ block: 'kol-alert', elements: [], modifiers: ['h1', 'hasCloser', 'variant-tile'] }, ALERT_API);
		assert.deepEqual(
			dialect.findings.map((finding) => [finding.modifier, finding.rule, finding.suggestion]),
			[
				['h1', 'no-attribute', 'level-1'],
				['hasCloser', 'kebab-case', 'has-closer'],
				['variant-tile', 'unknown-value', '_variant accepts card, msg'],
			],
		);
		assert.ok(dialect.properties.some((property) => property.kind === 'boolean' && property.modifier === 'hasCloser'));
	});

	it('binds has-<x> to _<x>, skips is-<x> and adds Hover and Focus for an interactive element', () => {
		const api: ComponentApi = { tag: 'kol-badge', attributes: ['_smart-button'], attributeTypes: { '_smart-button': 'boolean' }, events: [], slots: [] };
		const dialect = readDialect({ block: 'kol-badge', elements: ['interactive-element'], modifiers: ['has-smart-button', 'is-busy'] }, api);
		assert.deepEqual(
			dialect.properties.map((property) => property.name),
			['Smart Button', 'Hover', 'Focus'],
		);
	});

	it('names properties and literal values', () => {
		assert.equal(propertyName('label-align'), 'Label Align');
		assert.equal(propertyName('has-closer'), 'Closer');
		assert.deepEqual(literalValues('"a" | "b" | 0 | undefined'), ['a', 'b', '0']);
	});
});

describe('extractFcTree', () => {
	const root = join(process.cwd(), 'node_modules', '@public-ui', 'components', 'src', 'internal', 'functional-components');
	const index = indexFunctionalComponents(root);

	it('reads the alert tree, its conditions and the embedded closer button from the functional component', () => {
		const { tree } = extractFcTree(index.get('kol-alert') as string, 'kol-alert', index);
		const byElement = (name: string) => tree.children?.find((child: DesignNode) => child.element === name);
		assert.deepEqual(
			tree.children?.map((child) => child.element),
			['icon', 'heading', 'closer', 'content'],
		);
		assert.deepEqual(byElement('heading')?.when, { prop: '_label' });
		assert.equal(byElement('closer')?.embeds, 'kol-button');
		assert.deepEqual(byElement('closer')?.when, { prop: '_has-closer' });
		assert.deepEqual(byElement('closer')?.embedProps?._variant, { literal: 'normal' });
		assert.deepEqual(byElement('closer')?.embedProps?._label, { literal: 'kol-close-alert' });
		assert.equal(byElement('content')?.kind, 'slot');
	});

	it('maps an early return of a render helper onto a condition of the embedding prop', () => {
		const { tree } = extractFcTree(index.get('kol-span') as string, 'kol-span', index);
		const container = tree.children?.find((child) => child.element === 'container');
		const label = container?.children?.find((child) => child.element === 'label');
		assert.deepEqual(label?.when, { prop: '_hide-label', value: false });
		const icon = container?.children?.find((child) => child.element === 'icon');
		assert.deepEqual(icon?.modifiers, { left: { prop: '_icons' } });
	});
});
