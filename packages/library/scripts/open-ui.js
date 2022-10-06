const fs = require('fs');
const ELEMENTS = require('./custom-elements.json');
const TODAY = new Date();
const OPEN_UI = {
	$schema: '../schemas/design-system.schema.json5',
	lastUpdated: TODAY.getFullYear() + '-' + (TODAY.getMonth() + 1) + '-' + TODAY.getDate(),
	name: 'A11y-UI',
	description: '',
	url: 'https://',
	version: ELEMENTS.version,
	by: 'Martin Oppitz',
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
