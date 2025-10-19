'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { expect } = require('chai');

const distPath = path.resolve(__dirname, '..', 'dist', 'index.js');

if (!fs.existsSync(distPath)) {
	throw new Error('Cannot find the hydration bundle. Run "pnpm --filter @public-ui/components build" before executing the hydration adapter tests.');
}

const { createWindowFromHtml, renderToString, hydrateDocument, streamToString, serializeDocumentToString, serializeProperty, deserializeProperty } = require(
	distPath,
);

const snapshotHtml =
	'<kol-button _label="Snapshot Button" _variant="primary"></kol-button><kol-alert _heading="Snapshot alert" _variant="info">Snapshot content</kol-alert>';
const snapshotDocument =
	'<!DOCTYPE html><html lang="de" dir="ltr"><head><meta charset="utf-8"><title>Hydration Snapshot</title></head><body>' + snapshotHtml + '</body></html>';

const hydrateOptions = {
	buildId: 'snapshot-build',
	canonicalUrl: 'https://snapshot.test/components',
	clientHydrateAnnotations: true,
	direction: 'ltr',
	language: 'de',
	prettyHtml: true,
	removeAttributeQuotes: false,
	removeBooleanAttributeQuotes: false,
	removeEmptyAttributes: false,
	removeHtmlComments: false,
	removeUnusedStyles: false,
	resourcesUrl: 'https://cdn.snapshot.test/components/',
	title: 'Hydration Snapshot',
};

const factoryOptions = {
	...hydrateOptions,
	serializeToHtml: true,
	destroyDocument: true,
	destroyWindow: true,
};

const collectStream = (readable) =>
	new Promise((resolve, reject) => {
		let buffer = '';
		readable.setEncoding('utf8');
		readable.on('data', (chunk) => {
			buffer += chunk;
		});
		readable.on('end', () => resolve(buffer));
		readable.on('error', reject);
	});

const extractBodyContent = (html) => {
	const bodyMatch = html.match(/<body>([\s\S]*)<\/body>/);
	return bodyMatch ? bodyMatch[1].trim() : html;
};

describe('Hydration adapter snapshots', function () {
	this.timeout(20000);

	it('renders markup to a deterministic HTML snapshot', async () => {
		const result = await renderToString(snapshotHtml, hydrateOptions);
		const bodyContent = extractBodyContent(result.html);
		expect(bodyContent).to.matchSnapshot();
	});

	it('renders a full document string', async () => {
		const result = await renderToString(snapshotDocument, hydrateOptions);
		const bodyContent = extractBodyContent(result.html);
		expect(bodyContent).to.matchSnapshot();
	});

	it('serializes hydration output as a stream', async () => {
		const readable = streamToString(snapshotHtml, hydrateOptions);
		const html = await collectStream(readable);
		const bodyContent = extractBodyContent(html);
		expect(bodyContent).to.matchSnapshot();
	});

	it('creates a window and serializes the document', () => {
		const window = createWindowFromHtml(snapshotDocument, 'snapshot-window');
		const serialized = serializeDocumentToString(window.document, factoryOptions);

		expect(serialized).to.matchSnapshot();
	});

	it('round trips serialized properties', () => {
		const inputs = ['Plain text', 42, true, { nested: ['value', { flag: false }] }];
		const serializedValues = inputs.map((value) => serializeProperty(value));
		const deserializedValues = serializedValues.map((value) => deserializeProperty(String(value)));

		expect({ serializedValues, deserializedValues }).to.matchSnapshot();
	});
});
