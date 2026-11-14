// Parity verification for the KolButton Lit spike.
//
// Loads the built parity page in Chromium, serializes the shadow DOM of each Stencil/Lit pair,
// diffs the trees (ignoring whitespace-only text nodes and style elements), takes screenshots
// and exercises prop reactivity as well as the focus/click methods.
import { mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '../../..');
// Playwright comes from the monorepo toolchain; the spike itself only needs a browser driver.
const require = createRequire(path.join(repoRoot, 'packages/tools/visual-tests/package.json'));
const { chromium } = require('playwright');

const BASE_URL = 'http://localhost:4610';

function deepDiff(a, b, pathPrefix = '') {
	const diffs = [];
	const isText = (node) => typeof node?.text === 'string';
	if (isText(a) || isText(b)) {
		if (!isText(a) || !isText(b) || a.text !== b.text) {
			diffs.push(`${pathPrefix}: node ${JSON.stringify(a)} !== ${JSON.stringify(b)}`);
		}
		return diffs;
	}
	if (a.tag !== b.tag) {
		diffs.push(`${pathPrefix}: tag <${a.tag}> !== <${b.tag}>`);
		return diffs;
	}
	const keys = new Set([...Object.keys(a.attributes), ...Object.keys(b.attributes)]);
	for (const key of keys) {
		if (a.attributes[key] !== b.attributes[key]) {
			diffs.push(`${pathPrefix}<${a.tag}> @${key}: ${JSON.stringify(a.attributes[key])} !== ${JSON.stringify(b.attributes[key])}`);
		}
	}
	if (a.children.length !== b.children.length) {
		diffs.push(`${pathPrefix}<${a.tag}>: child count ${a.children.length} !== ${b.children.length}`);
		return diffs;
	}
	for (let index = 0; index < a.children.length; index += 1) {
		diffs.push(...deepDiff(a.children[index], b.children[index], `${pathPrefix}<${a.tag}>[${index}]`));
	}
	return diffs;
}

async function waitForHydration(page) {
	await page.waitForFunction(() => window.__parityReady === true);
	await page.waitForFunction(() => {
		const stencil = document.querySelector('kol-button');
		const lit = document.querySelector('kol-button-lit');
		return Boolean(stencil?.classList.contains('hydrated')) && Boolean(lit?.shadowRoot?.firstElementChild);
	});
	await page.waitForTimeout(300); // theme style attachment happens asynchronously
}

const pairs = ['default', 'primary', 'disabled', 'hidden'];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
page.on('console', (message) => {
	if (message.type() === 'error') {
		console.log(`[console.error] ${message.text()}`);
	}
});
page.on('pageerror', (error) => console.log(`[pageerror] ${error.message}`));

// The serializer runs inside the page context (init script) — Playwright only serializes the
// direct evaluate callback, not referenced closures.
await page.addInitScript(() => {
	window.__serializeShadowRoot = (element) => {
		const serializeNode = (node) => {
			if (node.nodeType === Node.TEXT_NODE) {
				const text = node.textContent;
				if (text.trim().length === 0) {
					return null; // whitespace-only text nodes: rendering artifact of the template layout
				}
				return { text: text.trim() };
			}
			if (node.nodeType !== Node.ELEMENT_NODE) {
				return null;
			}
			const tag = node.tagName.toLowerCase();
			if (tag === 'style') {
				return null; // style placement differs by runtime (lit static styles vs. Stencil bundle)
			}
			const attributes = {};
			for (const attribute of node.attributes) {
				// Nonce-based DOM ids differ per element instance; mask their values.
				attributes[attribute.name] = /^[0-9a-f]{6,}$/.test(attribute.value) ? '<nonce>' : attribute.value;
			}
			const children = Array.from(node.childNodes).map(serializeNode).filter(Boolean);
			return { tag, attributes, children };
		};
		return Array.from(element.shadowRoot?.childNodes ?? [])
			.map(serializeNode)
			.filter(Boolean);
	};
});

await page.goto(BASE_URL);
await waitForHydration(page);

const results = { domDiff: {}, screenshots: {}, reactivity: {}, methods: {}, events: {} };

// --- 1. DOM parity ---
for (const pair of pairs) {
	const serialization = await page.evaluate(
		([stencilId, litId]) => ({
			stencil: window.__serializeShadowRoot(document.getElementById(stencilId)),
			lit: window.__serializeShadowRoot(document.getElementById(litId)),
		}),
		[`stencil-${pair}`, `lit-${pair}`],
	);
	// The serializations are arrays of top-level shadow nodes; compare them pairwise.
	const stencilNodes = serialization.stencil;
	const litNodes = serialization.lit;
	const diffs = [];
	if (stencilNodes.length !== litNodes.length) {
		diffs.push(`root: top-level node count ${stencilNodes.length} !== ${litNodes.length}`);
	}
	for (let index = 0; index < Math.min(stencilNodes.length, litNodes.length); index += 1) {
		diffs.push(...deepDiff(stencilNodes[index], litNodes[index], `[${index}]`));
	}
	results.domDiff[pair] = { diffs, stencil: serialization.stencil, lit: serialization.lit };
	console.log(`DOM ${pair}: ${diffs.length === 0 ? 'IDENTICAL' : `${diffs.length} deltas`}`);
	for (const diff of diffs.slice(0, 20)) {
		console.log(`  ${diff}`);
	}
}

// --- 2. Screenshots ---
mkdirSync(path.join(here, '../shots'), { recursive: true });
const stencilSection = await page.locator('section').first();
const litSection = await page.locator('section').nth(1);
results.screenshots.stencil = path.join(here, '../shots/stencil.png');
results.screenshots.lit = path.join(here, '../shots/lit.png');
await stencilSection.screenshot({ path: results.screenshots.stencil });
await litSection.screenshot({ path: results.screenshots.lit });
await page.screenshot({ path: path.join(here, '../shots/page.png'), fullPage: true });
console.log('Screenshots saved to shots/');

// --- 3. Prop reactivity ---
results.reactivity.label = await page.evaluate(async () => {
	const stencil = document.getElementById('stencil-reactive');
	const lit = document.getElementById('lit-reactive');
	stencil._label = 'Stencil aktualisiert';
	lit._label = 'Lit aktualisiert';
	await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
	const textOf = (element) => element.shadowRoot.querySelector('button .kol-span__label')?.textContent;
	const disabledOf = (element) => element.shadowRoot.querySelector('button')?.hasAttribute('disabled');
	stencil._disabled = true;
	lit._disabled = true;
	await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
	return {
		stencilLabel: textOf(stencil),
		litLabel: textOf(lit),
		stencilDisabled: disabledOf(stencil),
		litDisabled: disabledOf(lit),
	};
});
console.log(`Reactivity label: stencil=${JSON.stringify(results.reactivity.label.stencilLabel)} lit=${JSON.stringify(results.reactivity.label.litLabel)}`);
console.log(`Reactivity disabled: stencil=${results.reactivity.label.stencilDisabled} lit=${results.reactivity.label.litDisabled}`);

// --- 4. Methods ---
results.methods.focus = await page.evaluate(async () => {
	const stencil = document.getElementById('stencil-default');
	const lit = document.getElementById('lit-default');
	// Measure after each call: the second `focus()` moves focus away from the first element.
	await stencil.focus();
	await new Promise((resolve) => setTimeout(resolve, 100));
	// `document.activeElement` only reflects the shadow host; compare inside each shadow root.
	const stencilFocused = stencil.shadowRoot.activeElement === stencil.shadowRoot.querySelector('button');
	await lit.focus();
	await new Promise((resolve) => setTimeout(resolve, 100));
	const litFocused = lit.shadowRoot.activeElement === lit.shadowRoot.querySelector('button');
	return { stencilFocused, litFocused };
});
console.log(`focus(): stencil=${results.methods.focus.stencilFocused} lit=${results.methods.focus.litFocused}`);

// --- 5. Custom events ---
results.events.click = await page.evaluate(async () => {
	const stencil = document.getElementById('stencil-default');
	const lit = document.getElementById('lit-default');
	// `dispatchDomEvent` sends a composed CustomEvent named `click` (with a detail payload);
	// native click bubbling is a plain MouseEvent without detail, so filter on that.
	const isCustomClick = (event) => event instanceof CustomEvent;
	const stencilClicks = [];
	const litClicks = [];
	stencil.addEventListener('click', (event) => {
		if (isCustomClick(event)) stencilClicks.push(event.detail);
	});
	lit.addEventListener('click', (event) => {
		if (isCustomClick(event)) litClicks.push(event.detail);
	});
	await stencil.click();
	await lit.click();
	return { stencilClicks: stencilClicks.length, litClicks: litClicks.length };
});
console.log(`kol-click events: stencil=${results.events.click.stencilClicks} lit=${results.events.click.litClicks}`);

const domIdentical = Object.values(results.domDiff).every((entry) => entry.diffs.length === 0);
console.log('\n--- SUMMARY ---');
console.log(`DOM parity: ${domIdentical ? 'PASS' : 'FAIL'}`);
writeFileSync(path.join(here, '../shots/parity-result.json'), JSON.stringify(results, null, 2));
await browser.close();
process.exit(domIdentical ? 0 : 1);
