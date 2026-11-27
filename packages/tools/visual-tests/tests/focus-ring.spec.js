import { expect, test } from '@playwright/test';
import process from 'process';

/**
 * With the Firefox setting "Override the colors specified by the page: Always" the browser replaces the
 * author outline of a focused native button by its own pale ring. An author outline on a plain element
 * survives and is repainted in the user's foreground color. Each place below draws its focus ring with
 * that in mind and has to keep a ring Firefox paints in the user's foreground color.
 */
const PAGE_COLOR_OVERRIDE = {
	'browser.display.background_color': '#ffffff',
	'browser.display.document_color_use': 2,
	'browser.display.foreground_color': '#000000',
	'browser.display.use_system_colors': false,
};

/** The places of a theme: a sample route, the component on it and the element that receives the focus. */
const PLACES = {
	BWSt: [
		{ focus: 'input', name: 'switch', route: 'input-checkbox/switch?noColumns', tag: 'kol-input-checkbox' },
		{ focus: 'button', name: 'smart button', route: 'input-password/show-password?noColumns', tag: 'kol-input-password' },
	],
	DEFAULT: [
		{ focus: 'input', name: 'switch', route: 'input-checkbox/switch?noColumns', tag: 'kol-input-checkbox' },
		{ focus: 'button', name: 'smart button', route: 'input-password/show-password?noColumns', tag: 'kol-input-password' },
	],
	ECL_EC: [{ focus: 'button', name: 'tab', route: 'scenarios/focus-elements?component=tabs', tag: 'kol-tabs' }],
};

const RING_MARGIN = 12;

const places = PLACES[process.env.THEME_EXPORT ?? ''] ?? [];
const tagSuffix = process.env.ENABLE_TAG_NAME_TRANSFORMER === 'true' ? '-sample' : '';

// https://playwright.dev/docs/api/class-testoptions#option-launch-options
test.use({
	launchOptions: { firefoxUserPrefs: PAGE_COLOR_OVERRIDE },
	locale: 'de-DE',
	timezoneId: 'Europe/Berlin',
	viewport: {
		width: 800,
		height: 400,
	},
});

/**
 * Reads the focus rings of a component: the outline of every element in its shadow DOM, the pseudo
 * elements included, that is painted at all. The colors are the computed ones, so an outline Firefox
 * replaced shows the color of its own ring.
 */
async function readState(page, tag, focus) {
	return page.evaluate(
		({ tag, focus }) => {
			const probe = document.createElement('span');
			probe.style.cssText = 'background-color: rgb(1, 2, 3); color: rgb(4, 5, 6); left: -9999px; position: fixed';
			document.body.append(probe);
			const probeStyle = getComputedStyle(probe);
			const state = { colorsOverridden: probeStyle.backgroundColor !== 'rgb(1, 2, 3)', foreground: probeStyle.color };
			probe.remove();

			const elements = [];
			const collect = (root) => {
				for (const element of root.querySelectorAll('*')) {
					elements.push(element);
					if (element.shadowRoot) {
						collect(element.shadowRoot);
					}
				}
			};
			collect(document.querySelector(tag).shadowRoot);

			const painted = (style) =>
				style.outlineStyle !== 'none' &&
				style.outlineStyle !== 'hidden' &&
				parseFloat(style.outlineWidth) > 0 &&
				style.outlineColor !== 'rgba(0, 0, 0, 0)' &&
				style.outlineColor !== 'transparent';
			const describe = (element) => `${element.tagName.toLowerCase()}.${typeof element.className === 'string' ? element.className : ''}`;
			state.rings = elements.flatMap((element) =>
				[getComputedStyle(element), getComputedStyle(element, '::before'), getComputedStyle(element, '::after')]
					.filter(painted)
					.map((style) => `${describe(element)}: ${style.outlineWidth} ${style.outlineStyle} ${style.outlineColor}`),
			);
			return state;
		},
		{ tag, focus },
	);
}

for (const place of places) {
	const tag = place.tag + tagSuffix;

	test(`focus ring in the user's foreground color: ${place.name}`, async ({ page, browserName }) => {
		test.skip(browserName !== 'firefox', 'Overriding the page colors is a Firefox setting.');

		const separator = place.route.includes('?') ? '&' : '?';
		await page.goto(`/#${place.route}${separator}hideMenus`);
		await page.waitForLoadState('networkidle');
		await page.waitForSelector('.loading', { state: 'hidden' });
		await page.addStyleTag({ content: '* { transition: none !important; animation: none !important; }' });

		const target = page.locator(tag).first().locator(place.focus).first();
		await target.focus();

		const state = await readState(page, tag, place.focus);
		expect(state.colorsOverridden, 'Firefox has to override the page colors, otherwise this test checks nothing.').toBe(true);
		expect(
			state.rings.some((ring) => ring.endsWith(state.foreground)),
			`${place.name}: no focus ring is painted in the user's foreground color ${state.foreground}. Painted outlines: ${
				state.rings.length > 0 ? state.rings.join(' | ') : 'none'
			}`,
		).toBe(true);

		/* The computed outline proves the rule; the pixels prove that the focus state is rendered at all. */
		const box = await target.boundingBox();
		const clip = { x: box.x - RING_MARGIN, y: box.y - RING_MARGIN, width: box.width + 2 * RING_MARGIN, height: box.height + 2 * RING_MARGIN };
		const focused = await page.screenshot({ clip });
		await target.evaluate((element) => element.blur());
		const blurred = await page.screenshot({ clip });
		expect(focused.equals(blurred), `${place.name}: the focus state paints nothing around the focused element.`).toBe(false);
	});
}
