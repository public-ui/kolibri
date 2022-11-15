const fs = require('fs');
const ELEMENTS = require('../custom-elements.json');
const TODAY = new Date();
let SHEET_CHEAT = `<h1>KoliBri - Cheat Sheet</h1>`;
const BLACKLIST = [
	'kol-button-group',
	'kol-color',
	'kol-counter',
	'kol-heading-wc',
	'kol-icon-font-awesome',
	'kol-icon-icofont',
	'kol-input-adapter-leanup',
	'kol-input-radio-group',
	'kol-kolibri',
	'kol-logo',
	'kol-link-group',
	'kol-span',
	'kol-span-wc',
	'kol-version',
];
const COMPONENTS = new Map();
const PROPS = new Map();
ELEMENTS.tags.forEach((tag) => {
	if (BLACKLIST.indexOf(tag.name) === -1) {
		const componentName = tag.name.replace('kol-', '');
		if (COMPONENTS.has(componentName) === false) {
			COMPONENTS.set(componentName, {
				desc: tag.description,
				props: new Set(),
			});
		}
		tag.attributes.forEach((attribute) => {
			if (PROPS.has(attribute.name) === false) {
				const MAP = new Map();
				MAP.set('components', new Set());
				MAP.set('descriptions', new Set());
				MAP.set('types', new Set());
				PROPS.set(attribute.name, MAP);
			}
			PROPS.get(attribute.name).get('components').add(componentName);
			PROPS.get(attribute.name).get('descriptions').add(attribute.description);
			PROPS.get(attribute.name).get('types').add(attribute.type.replace(' | undefined', ''));
		});
		console.log(tag.name);
	}
});

const PROP_NAMES = Array.from(PROPS.keys()).sort();
console.log(`# of: ${PROP_NAMES.length}`);

ORDERED_PROPS = [];
PROP_NAMES.forEach((name) => {
	const COMPS = PROPS.get(name).get('components');
	const PROP_COMPS = Array.from(COMPS.values());
	const INDEX = PROP_COMPS.length;
	if (Array.isArray(ORDERED_PROPS[INDEX]) === false) {
		ORDERED_PROPS[INDEX] = [];
	}
	ORDERED_PROPS[INDEX].push(name);
});

GROUPED_PROPS = new Map();
ORDERED_PROPS.flat()
	.reverse()
	.forEach((name) => {
		const COMPS = PROPS.get(name).get('components');
		const PROP_COMPS = Array.from(COMPS.values()).sort();
		const PROP_COMPS_STR = PROP_COMPS.join(', ');
		if (GROUPED_PROPS.has(PROP_COMPS_STR) === false) {
			GROUPED_PROPS.set(PROP_COMPS_STR, []);
		}
		GROUPED_PROPS.get(PROP_COMPS_STR).push(name);
	});

PROP_NAMES.forEach((name) => {
	const COMPS = PROPS.get(name).get('components');
	COMPS.forEach((component) => {
		if (COMPONENTS.has(component)) {
			COMPONENTS.get(component).props.add(name);
		}
	});
});

console.log(COMPONENTS);

SHEET_CHEAT += `<h2>Components</h2>
<table border="1">
  <caption>Available components</caption>
	<thead>
		<th width="10%">Component</th>
		<th width="70%">Description</th>
		<th width="20%">Related properties</th>
	</thead>
	<tbody>`;
COMPONENTS.forEach((component, name) => {
	const PROPS = Array.from(component.props.values()).sort();
	SHEET_CHEAT += `<tr>
		<td>${name}</td>
	<td>${component.desc}</td>
	<td>${PROPS.join(', ')}</td>
</tr>`;
});
SHEET_CHEAT += `
		</tbody>
	</table>`;

SHEET_CHEAT += `
<h2>Properties</h2>
<table border="1">
  <caption>Available properties</caption>
	<thead>
		<th width="10%">Property</th>
		<th width="40%">Description</th>
		<th width="20%">Type(s)</th>
		<th width="30%">Related component(s)</th>
	</thead>
	<tbody>`;
// PROP_NAMES.forEach((name) => {
GROUPED_PROPS.forEach((group) => {
	const SPAN = group.length;
	group.forEach((name, index) => {
		const COMPS = PROPS.get(name).get('components');
		const DESCS = PROPS.get(name).get('descriptions');
		const TYPES = PROPS.get(name).get('types');
		const PROP_COMPS = Array.from(COMPS.values()).sort();
		const PROP_DESCS = Array.from(DESCS.values()).sort();
		const PROP_TYPES = Array.from(TYPES.values()).sort();
		if (PROP_DESCS.length !== 1) {
			console.log(name, ':', PROP_DESCS);
			// throw new Error('Property-Beschreibung ist nicht gesetzt oder einheitlich.');
		}
		SHEET_CHEAT += `<tr>
		<td>${name}</td>
	<td>${PROP_DESCS[0]}</td>
	<td>${PROP_TYPES.join(', ')}</td>
	${index === 0 ? `<td rowspan="${SPAN}">${PROP_COMPS.join(', ')}</td>` : ''}
</tr>`;
	});
});
SHEET_CHEAT += `
	</tbody>
</table>`;

console.log();

fs.writeFileSync('cheat-sheet.html', SHEET_CHEAT);
