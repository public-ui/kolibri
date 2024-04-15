import { newSpecPage } from '@stencil/core/testing';

import { KolKolibri } from '../component';

const DEFAULT_HTML_SVG_PROPS = `role="img" aria-label="kol-kolibri-logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"`;
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
      <text fill="rgb(0,60,120)" x="250" y="525">
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
});
