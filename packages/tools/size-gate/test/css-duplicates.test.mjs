import assert from 'node:assert/strict';
import { test } from 'node:test';
import { cssUnits, findDuplicateGroups, parseCss, selectorFamily, stripComments } from '../src/css-duplicates.mjs';

const ICONS = '.fa-a:before{content:"a"}.fa-b:before{content:"b"}@keyframes fa-spin{0%{opacity:0}100%{opacity:1}}';

test('collapses icon selectors into one family', () => {
	assert.equal(selectorFamily('.fa-address-book:before'), '.fa-*');
	assert.equal(selectorFamily('.kol-form-field__label .fa-a:before, .x'), '.kol-* … .fa-*');
	assert.equal(selectorFamily(':host'), ':host');
});

test('splits a sheet into units with their context', () => {
	const units = cssUnits(parseCss('@layer theme { .a { color: red; .b { color: blue } } @font-face { font-family: x } }'));
	assert.deepEqual(
		units.map((unit) => unit.key),
		['@layer theme { .a { color:red } }', '@layer theme > .a { .b { color:blue } }', '@layer theme { @font-face  { font-family:x } }'],
	);
});

test('groups the CSS that the same sheets share and counts every copy after the first', () => {
	const sheets = new Map([
		['A', parseCss(`${ICONS}.a{color:red}`)],
		['B', parseCss(`${ICONS}.b{color:red}`)],
		['C', parseCss(`/* c */${ICONS}`)],
		['D', parseCss('.d{color:red}')],
	]);
	const groups = findDuplicateGroups(sheets, { minSheets: 3 });

	assert.equal(groups.length, 1);
	assert.deepEqual(groups[0].sheets, ['A', 'B', 'C']);
	assert.equal(groups[0].rules, 4);
	assert.equal(groups[0].redundantBytes, groups[0].bytesPerSheet * 2);
	assert.deepEqual(
		groups[0].families.map((family) => family.family),
		['.fa-*', '@keyframes fa-spin'],
	);
	assert.equal(groups[0].example, '.fa-a:before');
});

test('removes comments without touching the rules', () => {
	assert.equal(stripComments(parseCss('/* x */.a{color:red}')), '.a{color:red}');
});
