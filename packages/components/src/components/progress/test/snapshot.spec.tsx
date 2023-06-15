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
				 	 <div class="bar">
					   <div style="display: flex; gap: 0.3em;">
               <svg viewBox="0 0 102 8" width="100" xmlns="http://www.w3.org/2000/svg">
							 	 <rect x="1" y="1" height="8" rx="4" fill="#efefef" stroke="#000000" width="100"></rect>
								 <rect x="1" y="2" height="6" rx="4" fill="#0075ff" stroke="#0075ff" width="0" class="progress"></rect>
               </svg> <text aria-hidden="true" dominant-baseline="central" fill="currentColor" text-anchor="middle">
							         0%
							          </text>
						 </div>
					 </div>
           <progress aria-busy="true" max="100" value="0"></progress>
           <span ${DEFAULT_HTML_SPAN_PROPS} hidden=>
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
				 	 <div class="bar">
					   <div style="display: flex; gap: 0.3em;">
							 <svg viewBox="0 0 102 8" width="100" xmlns="http://www.w3.org/2000/svg">
							 	 <rect x="1" y="1" height="8" rx="4" fill="#efefef" stroke="#000000" width="100"></rect>
								 <rect x="1" y="2" height="6" rx="4" fill="#0075ff" stroke="#0075ff" width="40.476190476190474" class="progress"></rect>
							 </svg>
							          <text aria-hidden="true" dominant-baseline="central" fill="currentColor" text-anchor="middle">
							            17%
							          </text>
						 </div>
					 </div>
           <progress ${DEFAULT_HTML_PROGRESS_PROPS}></progress>
           <span ${DEFAULT_HTML_SPAN_PROPS} hidden>
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
				 	 <div class="bar">
					   <div style="display: flex; gap: 0.3em;">
							 <svg viewBox="0 0 102 8" width="100" xmlns="http://www.w3.org/2000/svg">
								<rect x="1" y="1" height="8" rx="4" fill="#efefef" stroke="#000000" width="100"></rect>
								 <rect x="1" y="2" height="6" rx="4" fill="#0075ff" stroke="#0075ff" width="100" class="progress"></rect>
							 </svg> <text aria-hidden="true" dominant-baseline="central" fill="currentColor" text-anchor="middle">
							            42%
							          </text>
						 </div>
					 </div>
           <progress aria-busy="false" max="${DEFAULT_PROPS._max}" value="${DEFAULT_PROPS._max}"></progress>
           <span ${DEFAULT_HTML_SPAN_PROPS} hidden>
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
           <svg class="cycle" viewBox="0 0 120 120" width="100" xmlns="http://www.w3.org/2000/svg">
					 	 <circle fill="none" stroke="#000" cx="60px" cy="60px" r="50px" stroke-width="10"></circle>
						 <circle fill="none" stroke="#ddd" cx="60px" cy="60px" r="50px" stroke-width="8"></circle>
						 <text aria-hidden="true" fill="currentColor" text-anchor="middle" x="50%" y="50%">
						         <tspan dy="0em" text-anchor="middle" x="50%">
						            17%
						          </tspan>
						        </text>
           <circle class="progress" cx="60px" cy="60px" fill="none" r="50px" stroke="#0075ff" stroke-dasharray="130px 320px" stroke-linecap="round" stroke-width="8"></circle>
           </svg>
           <progress ${DEFAULT_HTML_PROGRESS_PROPS}></progress>
           <span ${DEFAULT_HTML_SPAN_PROPS} hidden>
           0 von 42 %
           </span>
         </mock:shadow-root>
       </kol-progress>`
		);
	});
});
