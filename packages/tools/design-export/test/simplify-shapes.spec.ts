import { describe, it } from 'mocha';
import assert from 'node:assert/strict';
import type { ShapeNode } from '../src/render/dom-to-shapes.js';
import { simplifyShapes } from '../src/render/simplify-shapes.js';

function box(name: string, extra: Partial<ShapeNode> = {}, children: ShapeNode[] = []): ShapeNode {
	return { name, classes: [name], kind: 'box', x: 0, y: 0, width: 120, height: 44, children, ...extra };
}

describe('simplifyShapes', () => {
	it('folds the unpainted wrappers of a button into the box that paints', () => {
		const text: ShapeNode = {
			name: 'kol-span__label__text',
			classes: [],
			kind: 'text',
			x: 15,
			y: 12,
			width: 90,
			height: 19,
			characters: 'Anmelden',
			children: [],
		};
		const tree = box('kol-button', { inline: true }, [
			box('kol-button__interactive-element', {}, [
				box('kol-button__text', { fill: '#003a5c', stroke: '#003a5c', strokeWidths: [1, 1, 1, 1], radius: [5, 5, 5, 5], padding: [8, 14, 8, 14] }, [
					box('kol-span__container', { x: 15, y: 12, width: 90, height: 19 }, [box('kol-span__label', { x: 15, y: 12, width: 90, height: 19 }, [text])]),
				]),
			]),
		]);

		const result = simplifyShapes(tree);

		assert.equal(result?.name, 'kol-button__text');
		assert.deepEqual(result?.radius, [5, 5, 5, 5]);
		assert.equal(result?.inline, true);
		assert.deepEqual(result?.classes, ['kol-button', 'kol-button__interactive-element', 'kol-button__text']);
		assert.equal(result?.children.length, 1);
		assert.equal(result?.children[0].kind, 'text');
		assert.equal(result?.children[0].name, 'kol-span__label');
		assert.deepEqual(result?.children[0].classes, ['kol-span__container', 'kol-span__label']);
	});

	it('keeps a wrapper that arranges several children', () => {
		const tree = box('kol-toolbar', { layout: { alignItems: 'center', direction: 'row', gap: 8, justifyContent: 'start', wrap: false } }, [
			box('kol-toolbar__item', { x: 0, width: 50, fill: '#fff' }),
			box('kol-toolbar__item', { x: 58, width: 50, fill: '#fff' }),
		]);

		assert.equal(simplifyShapes(tree)?.children.length, 2);
	});

	it('gives every state the same structure: focus ring, opacity and minimum size move onto the wrapped box', () => {
		const inner = box('kol-button__text', { fill: '#003a5c', radius: [5, 5, 5, 5] });
		const wrapper = (extra: Partial<ShapeNode>) => box('kol-button__interactive-element', { minHeight: 44, radius: [5, 5, 5, 5], ...extra }, [inner]);

		const focused = simplifyShapes(wrapper({ outline: { color: '#005a8f', offset: 2, width: 3 } }), 'kol-button');
		const disabled = simplifyShapes(wrapper({ opacity: 0.5 }), 'kol-button');

		assert.equal(focused?.name, 'kol-button__text');
		assert.deepEqual(focused?.outline, { color: '#005a8f', offset: 2, radius: [5, 5, 5, 5], width: 3 });
		assert.equal(focused?.minHeight, 44);
		assert.equal(disabled?.name, 'kol-button__text');
		assert.equal(disabled?.opacity, 0.5);
	});

	it('keeps a wrapper that would hand a focus ring or opacity to a text', () => {
		const text: ShapeNode = { name: 'kol-link__text', classes: [], kind: 'text', x: 0, y: 0, width: 120, height: 44, characters: 'Link', children: [] };
		assert.equal(simplifyShapes(box('kol-link', { opacity: 0.5 }, [text]))?.kind, 'box');
	});

	it('drops wrappers without design and without content', () => {
		assert.equal(simplifyShapes(box('kol-empty', {}, [box('kol-empty__inner')])), undefined);
	});
});
