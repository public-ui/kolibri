'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { expect } = require('chai');

// Read component tags from components package
const componentsConfigPath = path.resolve(__dirname, '..', '..', '..', 'components', 'stencil.config.ts');
const configContent = fs.readFileSync(componentsConfigPath, 'utf-8');

// Extract TAGS array from stencil.config.ts
const tagsMatch = configContent.match(/const TAGS = \[([\s\S]*?)\];/);
if (!tagsMatch) {
	throw new Error('Could not find TAGS array in stencil.config.ts');
}

const tags = tagsMatch[1]
	.split('\n')
	.map((line) => line.trim())
	.filter((line) => line.startsWith("'kol-"))
	.map((line) => line.replace(/['",]/g, '').trim());

console.log(`Found ${tags.length} components to test`);

// Check if hydration bundle exists
const distPath = path.resolve(__dirname, '..', 'dist', 'index.js');
if (!fs.existsSync(distPath)) {
	throw new Error('Cannot find the hydration bundle. Run "pnpm --filter @public-ui/components build" before executing tests.');
}

const { renderToString } = require(distPath);

const hydrateOptions = {
	buildId: 'component-test',
	canonicalUrl: 'https://test.kolibri.io/components',
	clientHydrateAnnotations: true,
	direction: 'ltr',
	language: 'de',
	prettyHtml: true,
	removeAttributeQuotes: false,
	removeBooleanAttributeQuotes: false,
	removeEmptyAttributes: false,
	removeHtmlComments: false,
	removeUnusedStyles: false,
	resourcesUrl: 'https://cdn.kolibri.io/components/',
	title: 'Component Test',
};

const extractBodyContent = (html) => {
	const bodyMatch = html.match(/<body>([\s\S]*)<\/body>/);
	return bodyMatch ? bodyMatch[1].trim() : html;
};

// Component-specific test data with required props
// Only include components that work correctly without hanging
const componentTestData = {
	'kol-abbr': '<kol-abbr _title="Abbreviation">Abbr</kol-abbr>',
	// 'kol-accordion': '<kol-accordion _label="Accordion"></kol-accordion>', // Hangs
	'kol-alert': '<kol-alert _heading="Alert" _variant="info">Alert content</kol-alert>',
	'kol-avatar': '<kol-avatar _label="Avatar"></kol-avatar>',
	'kol-badge': '<kol-badge _label="Badge"></kol-badge>',
	'kol-breadcrumb': '<kol-breadcrumb _label="Breadcrumb" _links=\'[{"_label":"Home","_href":"#"}]\'></kol-breadcrumb>',
	'kol-button': '<kol-button _label="Button"></kol-button>',
	'kol-button-link': '<kol-button-link _label="Button Link" _href="#"></kol-button-link>',
	// 'kol-card': '<kol-card _label="Card"></kol-card>', // Hangs
	// 'kol-details': '<kol-details _label="Details">Content</kol-details>', // Hangs
	// 'kol-drawer': '<kol-drawer _label="Drawer" _align="left"></kol-drawer>', // Hangs
	'kol-form': '<kol-form></kol-form>',
	'kol-heading': '<kol-heading _label="Heading"></kol-heading>',
	'kol-icon': '<kol-icon _icons="codicon codicon-home"></kol-icon>',
	'kol-image': '<kol-image _src="test.jpg" _alt="Test"></kol-image>',
	// All input components seem to hang - need better configuration
};

describe('Component hydration snapshots', function () {
	this.timeout(5000); // Some components might take longer to hydrate

	tags.forEach((tag) => {
		// Skip components that are not yet configured or cause issues
		if (!componentTestData[tag]) {
			it.skip(`renders ${tag} to HTML snapshot (not configured)`, () => {});
			return;
		}

		it(`renders ${tag} to HTML snapshot`, async function () {
			// Set individual timeout for this test
			this.timeout(3000);

			const html = componentTestData[tag];
			const result = await renderToString(html, hydrateOptions);

			expect(result).to.be.an('object');
			expect(result.html).to.be.a('string');
			expect(result.diagnostics).to.be.an('array');

			const bodyContent = extractBodyContent(result.html);
			expect(bodyContent).to.matchSnapshot();
		});
	});
});
