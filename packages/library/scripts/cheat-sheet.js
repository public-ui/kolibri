const fs = require('fs');
const ELEMENTS = require('../custom-elements.json');
const TODAY = new Date();
let SHEET_CHEAT = `<!DOCTYPE html>
<html lang="de" dir="ltr">
	<head>
		<title>Cheat-Sheet | KoliBri</title>
		<meta charset="UTF-8" />
		<meta name="description" content="..." />
		<base href="/" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link href="https://fonts.cdnfonts.com/css/roboto" rel="stylesheet" />
		<link href="https://use.fontawesome.com/releases/v6.2.1/css/all.css" rel="stylesheet" />
		<script type="module">
			import { register } from 'https://esm.sh/@public-ui/core@1.1.13-rc.4';
			import { defineCustomElements } from 'https://esm.sh/@public-ui/components@1.1.13-rc.4/dist/loader';
			import { MAPZ } from 'https://esm.sh/@public-ui/themes@1.1.13-rc.4';
				register([MAPZ], defineCustomElements)
						.then(() => {})
						.catch(console.warn);
		</script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css">
	</head>
	<body>
		<kol-heading>KoliBri - Cheat Sheet</kol-heading>
		<kol-heading _level="2">Integration</kol-heading>
		<p></p>
		<pre>
			<code>${`<script type="module">
	import { register } from 'https://esm.sh/@public-ui/core@1.1.13-rc.4';
	import { defineCustomElements } from 'https://esm.sh/@public-ui/components@1.1.13-rc.4/dist/loader';
	import { MAPZ } from 'https://esm.sh/@public-ui/themes@1.1.13-rc.4';
	register([MAPZ], defineCustomElements)
		.then(() => {})
		.catch(console.warn);
</script>`
				.replace(/</g, '&#60;')
				.replace(/>/g, '&#62;')}</code>
		</pre>
		<kol-heading _level="2">Usage</kol-heading>
		<p></p>
		<pre>
			<code>${`<kol-input-text _id="surname" _required _value="Mustermann">Surname</kol-input-text>
<kol-spin _show></kol-spin>`
				.replace(/</g, '&#60;')
				.replace(/>/g, '&#62;')}</code>
	</pre>`;
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

// console.log(COMPONENTS);

SHEET_CHEAT += `
		<kol-heading _level="2">Components</kol-heading>
		<kol-table id="components" _caption="Available components"></kol-table>
		<script>
			const componentTable = document.querySelector('kol-table#components');
			console.log(componentTable);
			componentTable._headers = {
				horizontal: [[
					{
						label: 'Component',
						key: 'name',
						width: '10%'
					},
					{
						label: 'Description',
						key: 'desc',
						width: '60%'
					},
					{
						label: 'Related properties',
						key: 'props',
						width: '30%'
					}
				]]
			};
			componentTable._data = [`;
COMPONENTS.forEach((component, name) => {
	const PROPS = Array.from(component.props.values()).sort();
	SHEET_CHEAT += `{
	name: \`${name}\`,
	desc: \`${component.desc.replace(/`/g, "'")}\`,
	props: \`${PROPS.join(', ')}\`
},`;
});
SHEET_CHEAT += `
			];
		</script>
		<kol-heading _level="2">Properties</kol-heading>
		<kol-table id="properties" _caption="Available properties"></kol-table>
		<script>
			const propertyTable = document.querySelector('kol-table#properties');
			propertyTable._headers = {
				horizontal: [[
					{
						label: 'Property',
						key: 'name',
						width: '10%'
					},
					{
						label: 'Description',
						key: 'desc',
						width: '30%'
					},
					{
						label: 'Type(s)',
						key: 'types',
						width: '30%'
					},
					{
						label: 'Related component(s)',
						key: 'comps',
						width: '30%'
					}
				]]
			};
			propertyTable._data = [`;
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
		SHEET_CHEAT += `{
	name: \`${name}\`,
	desc: \`${PROP_DESCS[0]}\`,
	types: \`${PROP_TYPES.join(', ').replace(/`/g, '&#96;').replace(/\$/g, '&#36;')}\`,
	comps: \`${PROP_COMPS.join(', ')}\`
},`;
	});
});
SHEET_CHEAT += `
			];
		</script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
		<script>
			document.querySelectorAll('pre > code').forEach(el => {
				hljs.highlightElement(el);
			});
		</script>
	</body>
</html>`;

fs.writeFileSync('cheat-sheet.html', SHEET_CHEAT);
