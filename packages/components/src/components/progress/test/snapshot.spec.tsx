import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { KolProcess } from '../component';

const DEFAULT_PROPS = {
	_max: 42,
	_value: 17,
};
const DEFAULT_HTML_PROGRESS_PROPS = `aria-busy="true" max="${DEFAULT_PROPS._max}" value="${DEFAULT_PROPS._value}"`;
const DEFAULT_HTML_SPAN_PROPS = `aria-live="polite" aria-relevant="removals text"`;

describe('test Progress', () => {
	beforeAll(() => {
		jest.useFakeTimers();
	});

	beforeEach(() => {
		jest.clearAllTimers();
	});

	it('render empty Progress', async () => {
		const page = await newSpecPage({
			components: [KolProcess],
			html: `<kol-progress class="kol-progress"></kol-progress>`,
		});
		expect(page.root).toEqualHtml(
			`<kol-progress class="kol-progress">
         <mock:shadow-root>
            <div class="bar">
             <div style="display: flex; gap: 0.3em;">
               <svg width="100" viewBox="0 0 102 8" xmlns="http://www.w3.org/2000/svg">
                <rect class="background" x="1" y="1" height="10" rx="5" fill="currentColor" stroke="currentColor" stroke-width="3" width="100"></rect>
                  <rect class="progress" fill="currentColor" height="7" rx="3.5" stroke="currentColor" stroke-width="3" width="0" x="2.5" y="2.5"></rect>
             <rect class="border" x="1" y="1" height="10" rx="5" fill="currentColor" stroke="currentColor" stroke-width="1" width="100"></rect>
           </svg>
             <text aria-hidden="true" dominant-baseline="central" fill="currentColor" text-anchor="middle">
                         0%
                        </text>
             </div>
           </div>
           <progress aria-busy="true" max="100" value="0"></progress>
           <span ${DEFAULT_HTML_SPAN_PROPS} class="visually-hidden">
             0 von 100 %
           </span>
         </mock:shadow-root>
       </kol-progress>`,
		);
	});

	// Test equivalent to explicitly assigning 'bar' to Type Property
	it('render Progress with required Max and Value Properties', async () => {
		const page = await newSpecPage({
			components: [KolProcess],
			template: () => <kol-progress {...DEFAULT_PROPS}></kol-progress>,
		});
		expect(page.root).toEqualHtml(
			`<kol-progress class="kol-progress">
         <mock:shadow-root>
            <div class="bar">
             <div style="display: flex; gap: 0.3em;">
               <svg width="100" viewBox="0 0 102 8" xmlns="http://www.w3.org/2000/svg">
                <rect class="background" x="1" y="1" height="10" rx="5" fill="currentColor" stroke="currentColor" stroke-width="3" width="100"></rect>
                  <rect class="progress" fill="currentColor" height="7" rx="3.5" stroke="currentColor" stroke-width="3" width="38.452380952380956" x="2.5" y="2.5"></rect>
             <rect class="border" x="1" y="1" height="10" rx="5" fill="currentColor" stroke="currentColor" stroke-width="1" width="100"></rect>
           </svg>
             <text aria-hidden="true" dominant-baseline="central" fill="currentColor" text-anchor="middle">
                          ${DEFAULT_PROPS._value}%
                        </text>
             </div>
           </div>
           <progress aria-busy="true" max="${DEFAULT_PROPS._max}" value="${DEFAULT_PROPS._value}"></progress>
           <span ${DEFAULT_HTML_SPAN_PROPS} class="visually-hidden">
             0 von ${DEFAULT_PROPS._max} %
           </span>
         </mock:shadow-root>
       </kol-progress>`,
		);
	});

	it('render Progress with Max and Value Properties of equal value', async () => {
		const page = await newSpecPage({
			components: [KolProcess],
			template: () => <kol-progress _max={DEFAULT_PROPS._max} _value={DEFAULT_PROPS._max}></kol-progress>,
		});
		expect(page.root).toEqualHtml(
			` <kol-progress class="kol-progress">
         <mock:shadow-root>
            <div class="bar">
             <div style="display: flex; gap: 0.3em;">
               <svg width="100" viewBox="0 0 102 8" xmlns="http://www.w3.org/2000/svg">
                <rect class="background" x="1" y="1" height="10" rx="5" fill="currentColor" stroke="currentColor" stroke-width="3" width="100"></rect>
                 <rect
								   class="progress"
                  x="2.5"
               y="2.5"
               height="7"
               rx="3.5"
               fill="currentColor"
               stroke="currentColor"
               stroke-width="3"
               width="95"
             ></rect>
             <rect class="border" x="1" y="1" height="10" rx="5" fill="currentColor" stroke="currentColor" stroke-width="1" width="100"></rect>
           </svg>
             <text aria-hidden="true" dominant-baseline="central" fill="currentColor" text-anchor="middle">
                          42%
                        </text>
             </div>
           </div>
           <progress aria-busy="false" max="${DEFAULT_PROPS._max}" value="${DEFAULT_PROPS._max}"></progress>
           <span ${DEFAULT_HTML_SPAN_PROPS} class="visually-hidden">
             0 von ${DEFAULT_PROPS._max} %
           </span>
         </mock:shadow-root>
       </kol-progress>`,
		);
	});

	it('render Progress of Type Cycle', async () => {
		const page = await newSpecPage({
			components: [KolProcess],
			template: () => <kol-progress {...DEFAULT_PROPS} _variant={'cycle'}></kol-progress>,
		});
		expect(page.root).toEqualHtml(
			`<kol-progress class="kol-progress">
         <mock:shadow-root>
           <svg class="cycle" viewBox="0 0 120 120" width="100" xmlns="http://www.w3.org/2000/svg">
             <circle class="background" cx="60" cy="60" r="54.5" fill="currentColor" stroke="currentColor" stroke-width="8"></circle>
             <circle class="whitespace" cx="60" cy="60" r="59" fill="currentColor" stroke="currentColor" stroke-width="3"></circle>
             <circle class="border" cx="60" cy="60" r="59" fill="currentColor" stroke="currentColor" stroke-width="1"></circle>
             <circle class="whitespace" cx="60" cy="60" r="51" fill="currentColor" stroke="currentColor" stroke-width="1"></circle>
             <circle class="border" cx="60" cy="60" fill="currentColor" r="50" stroke="currentColor" stroke-width="1"></circle>
             <circle class="progress" cx="60" cy="60" fill="currentColor" r="54.5" stroke="currentColor" stroke-dasharray="138px 342px" stroke-linecap="round" stroke-width="6"></circle>
             <text aria-hidden="true" fill="currentColor" text-anchor="middle" x="50%" y="50%">
               17%
             </text>
           </svg>
           <progress ${DEFAULT_HTML_PROGRESS_PROPS}></progress>
           <span ${DEFAULT_HTML_SPAN_PROPS} class="visually-hidden">0 von ${DEFAULT_PROPS._max} %</span>
         </mock:shadow-root>
       </kol-progress>`,
		);
	});
});
