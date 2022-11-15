const fs = require('fs');
const ELEMENTS = require('../custom-elements.json');
const TODAY = new Date();
const OPEN_UI = {
	$schema: '../schemas/design-system.schema.json5',
	lastUpdated: TODAY.getFullYear() + '-' + (TODAY.getMonth() + 1) + '-' + TODAY.getDate(),
	name: 'KoliBri',
	description:
		'KoliBri builds directly on the web standards of the W3C (framework-agnostic), is a generic reference implementation of the WCAG standard and the BITV for accessibility and implemented as a multi-theming capable presentation layer. There is no technical reference and no data transmission functionalities. This means that KoliBri can be reused for the realization of static websites as well as dynamic web applications with different corporate designs and style guides and is therefore very interesting for open source.',
	url: 'https://public-ui.github.io/',
	version: ELEMENTS.version,
	by: 'Informationstechnik Zentrum Bund',
	components: [],
};
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
ELEMENTS.tags.forEach((tag) => {
	if (BLACKLIST.indexOf(tag.name) === -1) {
		const COMPONENT = {
			name: tag.name.replace('kol-', ''),
			definition: tag.description,
			anatomy: [],
			concepts: [],
		};
		tag.attributes.forEach((attribute) => {
			COMPONENT.concepts.push({
				name: attribute.name,
				description: attribute.description,
			});
		});
		OPEN_UI.components.push(COMPONENT);
		console.log(tag.name);
	}
});

console.log(`# of: ${OPEN_UI.components.length}`);

let data = JSON.stringify(OPEN_UI);
fs.writeFileSync('open-ui.json', data);
