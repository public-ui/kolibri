const fs = require('fs');
const path = require('path');
const ELEMENTS = require(path.relative(__dirname, 'custom-elements.json'));
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
			import { register } from 'https://esm.sh/@public-ui/core@1.4.1';
			import { defineCustomElements } from 'https://esm.sh/@public-ui/components@1.4.1/dist/loader';
			import { DEFAULT } from 'https://esm.sh/@public-ui/themes@1.4.1';
				register(DEFAULT, defineCustomElements)
						.then(() => {})
						.catch(console.warn);
		</script>
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/a11y-light.min.css">
		<style>
			:root {
				font-size: 10px;
			}
			* {
				font-family: var(--font-family)
			}
			body {
				display: grid;
				margin: 0;
				padding: 1rem;
			}
			p, pre {
				margin: 0;
				padding: 0;
			}
			code {
				border-radius: .5rem;
				margin: 0;
				padding: 0.5rem 0.75rem !important;
			}
			p, pre {
				margin: .5rem 0;
				text-align: justify;
			}
			pre {
				display: contents;
			}
			kol-heading[_level="2"],
			kol-heading[_level="3"] {
				margin: 1.5rem 0 0 0;
			}
			kol-kolibri {
				width: 70px;
				display: block;
			}
		</style>
	</head>
	<body>
		<main class="itzbund" data-theme="itzbund">
			<kol-link _href="https://public-ui.github.io" _target="github">
				<kol-kolibri _labeled="false"></kol-kolibri>
			</kol-link>
			<kol-heading>Cheat Sheet</kol-heading>
			<p><strong><kol-abbr _title="Komponenten-Bibliothek für die Barrierefreiheit" _tooltip-align="right">KoliBri</kol-abbr></strong> ist eine <strong>barrierefreie Komponenten-Bibliothek</strong> die sich durch separate Themes an unterschiedliche <strong>Styleguides</strong> und <strong>Design Systeme</strong> anpassen lässt.</p>
			<p><kol-icon _aria-label="" _icon="fa-solid fa-arrow-right"></kol-icon> Link zur ausführliche <kol-link _href="https://public-ui.github.io" _target="github">Dokumentation</kol-link></p>
			<kol-heading _level="2">Integration</kol-heading>
			<p>Für eine hohe Flexibilität werden alle Teile (HTML, CSS, Fonts usw.) per Komposition-Prinzip beliebig mit einander kombiniert. Damit alles korrekt funktioniert, müssen alle Teile einer spezifischen Komposition eingebunden bzw. konfiguriert werden. In den folgenden Unterabschnitten wird die Integration am Beispiel des DEFAULT-Themes gezeigt.</p>
			<kol-heading _level="3">Assets</kol-heading>
			<p><strong>Fonts</strong> und <strong>Icon-Fonts</strong> müssen im <code class="language-html" style="background-color: #f3f3f3; padding: .25rem !important;">${`<head>`
				.replace(/</g, '&#60;')
				.replace(/>/g, '&#62;')}</code> der HTML-Seite eingebunden werden.</p>
			<pre>
				<code class="language-html">${`<head>
	<link href="https://fonts.cdnfonts.com/css/roboto" rel="stylesheet" />
	<link href="https://use.fontawesome.com/releases/v6.2.1/css/all.css" rel="stylesheet">
</head>`
					.replace(/</g, '&#60;')
					.replace(/>/g, '&#62;')}</code>
			</pre>
			<kol-heading _level="3">Loader</kol-heading>
			<p>Mit <strong>KoliBri</strong> ist es möglich unterschiedliche Themes mit den Komponenten zu kombinieren. Die Verknüpfung erfolgt über die <strong>Register</strong>-Methode. Ihr können eine oder mehrere Loader für die Custom-Elements und Themes übergeben werden.</p>
			<pre>
				<code class="language-html">${`<head>
	<script type="module">
		import { register } from 'https://esm.sh/@public-ui/core@1.4.1';
		import { defineCustomElements } from 'https://esm.sh/@public-ui/components@1.4.1/dist/loader';
		import { DEFAULT } from 'https://esm.sh/@public-ui/themes@1.4.1';
		register([DEFAULT], [defineCustomElements])
			.then(() => {})
			.catch(console.warn);
	</script>
</head>`
					.replace(/</g, '&#60;')
					.replace(/>/g, '&#62;')}</code>
			</pre>
			<kol-heading _level="3">Config</kol-heading>
			<p>Wenn ein Theme registriert wird, werden alle darin enthaltenen <strong>CSS-Properties</strong> unter dem Theme-Namen als CSS-Klasse im <code class="language-html" style="background-color: #f3f3f3; padding: .25rem !important;">${`<head>`
				.replace(/</g, '&#60;')
				.replace(
					/>/g,
					'&#62;'
				)}</code> der HTML-Seite hinzugefügt. So wird es ermöglicht, dass diese CSS-Properties in eigenem CSS für das "umrahmende" HTML wiederverwendet werden können. Damit das funktioniert, muss die CSS-Klasse mit dem Theme-Namen z.B. am <code class="language-html" style="background-color: #f3f3f3; padding: .25rem !important;">${`<body>`
	.replace(/</g, '&#60;')
	.replace(/>/g, '&#62;')}</code> gesetzt werden.</p>
			<pre>
				<code class="language-html">${`<body class="itzbund" data-theme="itzbund">
	...
</body>`
					.replace(/</g, '&#60;')
					.replace(/>/g, '&#62;')}</code>
		</pre>
		<kol-heading _level="3">VSCode</kol-heading>
		<p>Im VSCode können die Meta-Informationen der Komponenten und deren Eigenschaften für die Autovervollständigung von HTML aktiviert werden.</p>
		<pre>
			<code class="language-json">${`{
	"html.customData": ["./node_modules/@public-ui/components/vscode-custom-data.json"]
}`
				.replace(/</g, '&#60;')
				.replace(/>/g, '&#62;')}</code>
		</pre>
		<kol-heading _level="3">Dev-Tools</kol-heading>
		<p>KoliBri hat zahlreiche Hinweise für die Barrierefreiheit und Verwendung der Komponenten für die Entwicklung eingebaut. Damit die Hinweise in der Konsole des Browsers angezeigt werden, muss folgende Definition im <code class="language-html" style="background-color: #f3f3f3; padding: .25rem !important;">${`<head>`
			.replace(/</g, '&#60;')
			.replace(/>/g, '&#62;')}</code> der HTML-Seite hinzugefügt werden.</p>
		<pre>
			<code class="language-html">${`<head>
	<meta name="kolibri" content="dev-mode=true" />
	<!-- <meta name="kolibri" content="dev-mode=true,experimental-mode=true" /> -->
</head>`
				.replace(/</g, '&#60;')
				.replace(/>/g, '&#62;')}</code>
		</pre>
		<kol-details _summary="Experimental mode">
			<pre>
				<code class="language-html">${`<head>
	<meta name="kolibri" content="experimental-mode=true" />
</head>`
					.replace(/</g, '&#60;')
					.replace(/>/g, '&#62;')}</code>
			</pre>
		</kol-details>
		<br>
		<kol-details _summary="Color contrast analysis">
			<pre>
				<code class="language-html">${`<head>
	<meta name="kolibri" content="color-contrast-analysis=true" />
</head>`
					.replace(/</g, '&#60;')
					.replace(/>/g, '&#62;')}</code>
			</pre>
		</kol-details>
		<br>
		<kol-heading _level="2">Usage</kol-heading>
		<p>KoliBri-Komponenten sind wie eigenen HTML-Tags und werden einfach als solche im "umrahmenden" HTML (Responsiveness, Grid usw.) wiederverwendet und deren Ausprägung mittels der Komponenten-Eigenschaften bestimmt.</p>
		<pre>
			<code class="language-html">${`<kol-input-text _id="surname" _required _value="Mustermann">Surname</kol-input-text>
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

SHEET_CHEAT += `
			<kol-heading _level="2">Components</kol-heading>
			<p>In der folgenden Tabelle werden alle Komponenten erläutert und deren jeweiligen Eigenschaften aufgelistet.</p>
			<kol-table id="components" _caption="Available components"></kol-table>
			<script>
				const componentTable = document.querySelector('kol-table#components');
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
			<p>In der folgenden Tabelle werden alle Eigenschaften der Häufigkeit nach erläutert und jeweils die Komponenten aufgelistet, wo sie verwendet werden..</p>
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
			<p style="text-align: center; margin:1rem 2rem 0 2rem;><strong><kol-abbr _title="Komponenten-Bibliothek für die Barrierefreiheit" _tooltip-align="right">KoliBri</kol-abbr></strong> ist unter der Lizenz <kol-link _href="https://github.com/public-ui/kolibri/blob/main/LICENSE" _target="eu"><strong>EUPL v1.2</strong></kol-link> lizenziert.</p>
		</main>
	</body>
</html>`;

fs.writeFileSync('cheat-sheet.html', SHEET_CHEAT);
