import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolKolibri } from '../shadow';

const DEFAULT_HTML_SVG_PROPS = `class="kol-kolibri" role="img" aria-label="kol-kolibri-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"`;
const DEFAULT_PATH_TAGS = `<path d="M353 322L213 304V434L353 322Z"></path>
<path d="M209 564V304L149 434L209 564Z"></path>
<path d="M357 316L417 250L361 210L275 244L357 316Z"></path>
<path d="M329 218L237 92L250 222L272 241L329 218Z"></path>
<path d="M353 318L35 36L213 300L353 318Z"></path>
<path d="M391 286L565 272L421 252L391 286Z"></path>`;

describe('Test KolKolibri', () => {
	it('render default', async () => {
		const page = await newSpecPage({
			components: [KolKolibri],
			html: `<kol-kolibri  class="kol-kolibri"></kol-kolibri>`,
		});
		expect(page.root).toEqualHtml(`<kol-kolibri class="kol-kolibri">
  <mock:shadow-root>
    <svg ${DEFAULT_HTML_SVG_PROPS} fill="rgb(0,60,120)">
      ${DEFAULT_PATH_TAGS}
      <text class="kol-kolibri__text" fill="rgb(0,60,120)" x="250" y="525">
        KoliBri
      </text>
    </svg>
  </mock:shadow-root>
</kol-kolibri>`);
	});

	it('render not labeled', async () => {
		const page = await newSpecPage({
			components: [KolKolibri],
			html: `<kol-kolibri _labeled="false" class="kol-kolibri"></kol-kolibri>`,
		});
		expect(page.root).toEqualHtml(`<kol-kolibri _labeled="false" class="kol-kolibri">
  <mock:shadow-root>
    <svg ${DEFAULT_HTML_SVG_PROPS} fill="rgb(0,60,120)">
      ${DEFAULT_PATH_TAGS}
    </svg>
  </mock:shadow-root>
</kol-kolibri>`);
	});

	/** Renders the logo with the given props and returns the fill of the logo and of the label (null without label). */
	const renderLogo = async (props: Record<string, unknown>) => {
		const page = await newSpecPage({
			components: [KolKolibri],
			template: () => h('kol-kolibri', props),
		});
		return { page, ...readLogo(page.root) };
	};

	const readLogo = (root?: Element) => {
		const svg = root?.shadowRoot?.querySelector('svg');
		return {
			fill: svg?.getAttribute('fill'),
			labelFill: svg?.querySelector('text.kol-kolibri__text')?.getAttribute('fill') ?? null,
		};
	};

	it.each([
		['a 3-digit hex color', '#fff', 'rgb(255,255,255)'],
		['an 8-digit hex color', '#11223344', 'rgb(17,34,51)'],
		['a color pair, which does not color the logo', { backgroundColor: '#ff0000', foregroundColor: '#ffffff' }, 'rgb(undefined,undefined,undefined)'],
		['a color pair as JSON, which does not color the logo', '{"backgroundColor":"#ff0000","foregroundColor":"#ffffff"}', 'rgb(undefined,undefined,undefined)'],
		['an invalid color, which keeps the default', 'red', 'rgb(0,60,120)'],
	])('renders %s', async (_, color, fill) => {
		expect(await renderLogo({ _color: color })).toMatchObject({ fill, labelFill: fill });
	});

	it('keeps the label for an invalid _labeled', async () => {
		expect((await renderLogo({ _labeled: 'no' })).labelFill).toBe('rgb(0,60,120)');
	});

	it('applies _color and _labeled set after load', async () => {
		const { page } = await renderLogo({});
		const element = page.root as HTMLKolKolibriElement;
		element._color = '#ff0000';
		element._labeled = false;
		await page.waitForChanges();
		expect(readLogo(page.root)).toEqual({ fill: 'rgb(255,0,0)', labelFill: null });

		element._color = 'red';
		element._labeled = true;
		await page.waitForChanges();
		expect(readLogo(page.root)).toEqual({ fill: 'rgb(255,0,0)', labelFill: 'rgb(255,0,0)' });
	});
});
