import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';

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
			components: COMPONENTS,
			html: `<kol-progress></kol-progress>`,
		});
		expect(page.root).toEqualHtml(
			` <kol-progress>
         <mock:shadow-root>
				 	 <div>
					   <div style="display: flex; gap: 0.3em;">
               <svg viewBox="0 0 24 2" width="100" xmlns="http://www.w3.org/2000/svg">
                 <line fill="#efefef" stroke="#efefef" stroke-linecap="round" stroke-width="2" x1="1" x2="23" y1="1" y2="1"></line>
                 <line class="bar" fill="#0075ff" stroke="#0075ff" stroke-linecap="round" stroke-width="2" x1="1" x2="1" y1="1" y2="1"></line>
               </svg>
						 </div>
					 </div>
           <progress aria-busy="true" max="100" value="0"></progress>
           <span ${DEFAULT_HTML_SPAN_PROPS}>
             0 von 100 %
           </span>
         </mock:shadow-root>
       </kol-progress>`
		);
	});

	// Test equivalent to explicitly assigning 'bar' to Type Property
	it('render Progress with required Max and Value Properties', async () => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-progress {...DEFAULT_PROPS}></kol-progress>,
		});
		expect(page.root).toEqualHtml(
			` <kol-progress>
         <mock:shadow-root>
				 	 <div>
					   <div style="display: flex; gap: 0.3em;">
							 <svg viewBox="0 0 24 2" width="100" xmlns="http://www.w3.org/2000/svg">
							 	 <line fill="#efefef" stroke="#efefef" stroke-linecap="round" stroke-width="2" x1="1" x2="23" y1="1" y2="1"></line>
								 <line class="bar" fill="#0075ff" stroke="#0075ff" stroke-linecap="round" stroke-width="2" x1="1" x2="10" y1="1" y2="1"></line>
							 </svg>
						 </div>
					 </div>
           <progress ${DEFAULT_HTML_PROGRESS_PROPS}></progress>
           <span ${DEFAULT_HTML_SPAN_PROPS}>
             0 von 42 %
           </span>
         </mock:shadow-root>
       </kol-progress>`
		);
	});

	it('render Progress with Max and Value Properties of equal value', async () => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-progress _max={DEFAULT_PROPS._max} _value={DEFAULT_PROPS._max}></kol-progress>,
		});
		expect(page.root).toEqualHtml(
			` <kol-progress>
         <mock:shadow-root>
				 	 <div>
					   <div style="display: flex; gap: 0.3em;">
							 <svg viewBox="0 0 24 2" width="100" xmlns="http://www.w3.org/2000/svg">
								 <line fill="#efefef" stroke="#efefef" stroke-linecap="round" stroke-width="2" x1="1" x2="23" y1="1" y2="1"></line>
								 <line class="bar" fill="#0075ff" stroke="#0075ff" stroke-linecap="round" stroke-width="2" x1="1" x2="23" y1="1" y2="1"></line>
							 </svg>
						 </div>
					 </div>
           <progress aria-busy="false" max="${DEFAULT_PROPS._max}" value="${DEFAULT_PROPS._max}"></progress>
           <span ${DEFAULT_HTML_SPAN_PROPS}>
             0 von 42 %
           </span>
         </mock:shadow-root>
       </kol-progress>`
		);
	});

	it('render Progress of Type Cycle', async () => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-progress {...DEFAULT_PROPS} _type={'cycle'}></kol-progress>,
		});
		expect(page.root).toEqualHtml(
			` <kol-progress>
         <mock:shadow-root>
           <svg viewBox="0 0 12 12" width="100" xmlns="http://www.w3.org/2000/svg">
             <circle cx="6px" cy="6px" fill="none" r="5px" stroke="#efefef"></circle>
             <circle class="cycle" cx="6px" cy="6px" fill="none" r="5px" stroke="#0075ff" stroke-dasharray="13px 32px" stroke-linecap="round"></circle>
           </svg>
           <progress ${DEFAULT_HTML_PROGRESS_PROPS}></progress>
           <span ${DEFAULT_HTML_SPAN_PROPS}>
           0 von 42 %
           </span>
         </mock:shadow-root>
       </kol-progress>`
		);
	});
});
