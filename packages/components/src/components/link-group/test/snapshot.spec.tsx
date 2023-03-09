import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { COMPONENTS } from '../../component-list';

const DEFAULT_PROPS = {
	_ariaLabel: 'link-group-test',
	_links: [
		{ _label: 'Test Link 1', _href: '', _selector: '#test-link-1' },
		{ _label: 'Test Link 2', _href: '', _selector: '#test-link-2' },
		{ _label: 'Test Link 3', _href: '', _selector: '#test-link-3' },
	],
};
const DEFAULT_HTML_NAV_PROPS = `aria-label=${DEFAULT_PROPS._ariaLabel} class="rounded"`;

describe.skip('test link group', () => {
	it('render empty link group', async () => {
		const page = await newSpecPage({
			components: COMPONENTS,
			html: `<kol-link-group></kol-link-group>`,
		});
		expect(page.root).toEqualHtml(
			` <kol-link-group>
         <mock:shadow-root>
           <nav aria-label="…" class="rounded">
             <ul class="list-disc pl-8"></ul>
           </nav>
         </mock:shadow-root>
       </kol-link-group>`
		);
	});

	it('render link group with required ariaLabel and Links', async () => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-link-group {...DEFAULT_PROPS}></kol-link-group>,
		});
		expect(page.root).toEqualHtml(
			` <kol-link-group>
         <mock:shadow-root>
           <nav ${DEFAULT_HTML_NAV_PROPS}>
             <ul class="list-disc pl-8">
               <li>
                 <kol-link _aria-label="Test Link 1" _label="Test Link 1">
                   <mock:shadow-root>
                     <a class="cursor-pointer hover:text-primary kol-visited text-normal underline" href="javascript:void(0)" role="link" tabindex="0">
                       <span>
                         <slot />
                       </span>
                     </a>
                   <kol-tooltip></kol-tooltip>
                  </mock:shadow-root>
                   Test Link 1
                 </kol-link>
               </li>
               <li>
                 <kol-link _aria-label="Test Link 2" _label="Test Link 2">
                   <mock:shadow-root>
                     <a class="cursor-pointer hover:text-primary kol-visited text-normal underline" href="javascript:void(0)" role="link" tabindex="0">
                       <span>
                         <slot />
                       </span>
                     </a>
                   <kol-tooltip></kol-tooltip>
                  </mock:shadow-root>
                   Test Link 2
                 </kol-link>
               </li>
               <li>
                 <kol-link _aria-label="Test Link 3" _label="Test Link 3">
                   <mock:shadow-root>
                     <a class="cursor-pointer hover:text-primary kol-visited text-normal underline" href="javascript:void(0)" role="link" tabindex="0">
                       <span>
                         <slot />
                       </span>
                     </a>
                   <kol-tooltip></kol-tooltip>
                  </mock:shadow-root>
                   Test Link 3
                 </kol-link>
               </li>
             </ul>
           </nav>
         </mock:shadow-root>
       </kol-link-group>`
		);
	});

	it('render link group with ariaLabel, Links, and Heading Prop', async () => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-link-group {...DEFAULT_PROPS} _heading={'Test Link Group'}></kol-link-group>,
		});
		expect(page.root).toEqualHtml(
			` <kol-link-group>
         <mock:shadow-root>
           <nav ${DEFAULT_HTML_NAV_PROPS}>
             <kol-heading-wc>
                 <h1 class="text-2xl">
                   <slot />
                 </h1>
               Test Link Group
             </kol-heading-wc>
             <ul class="list-disc pl-8">
               <li>
                 <kol-link _aria-label="Test Link 1" _label="Test Link 1">
                   <mock:shadow-root>
                     <a class="cursor-pointer hover:text-primary kol-visited text-normal underline" href="javascript:void(0)" role="link" tabindex="0">
                       <span>
                         <slot />
                       </span>
                     </a>
                   <kol-tooltip></kol-tooltip>
                  </mock:shadow-root>
                   Test Link 1
                 </kol-link>
               </li>
               <li>
                 <kol-link _aria-label="Test Link 2" _label="Test Link 2">
                   <mock:shadow-root>
                     <a class="cursor-pointer hover:text-primary kol-visited text-normal underline" href="javascript:void(0)" role="link" tabindex="0">
                       <span>
                         <slot />
                       </span>
                     </a>
                   <kol-tooltip></kol-tooltip>
                  </mock:shadow-root>
                   Test Link 2
                 </kol-link>
               </li>
               <li>
                 <kol-link _aria-label="Test Link 3" _label="Test Link 3">
                   <mock:shadow-root>
                     <a class="cursor-pointer hover:text-primary kol-visited text-normal underline" href="javascript:void(0)" role="link" tabindex="0">
                       <span>
                         <slot />
                       </span>
                     </a>
                   <kol-tooltip></kol-tooltip>
                  </mock:shadow-root>
                   Test Link 3
                 </kol-link>
               </li>
             </ul>
           </nav>
         </mock:shadow-root>
       </kol-link-group>`
		);
	});

	it('render link group with ariaLabel, Links, and Heading and Level Props', async () => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-link-group {...DEFAULT_PROPS} _heading={'Test Link Group'} _level={3}></kol-link-group>,
		});
		expect(page.root).toEqualHtml(
			` <kol-link-group>
         <mock:shadow-root>
           <nav ${DEFAULT_HTML_NAV_PROPS}>
             <kol-heading-wc>
                <h3 class="text-lg">
                   <slot />
                 </h3>
               Test Link Group
             </kol-heading-wc>
             <ul class="list-disc pl-8">
               <li>
                 <kol-link _aria-label="Test Link 1" _label="Test Link 1">
                   <mock:shadow-root>
                     <a class="cursor-pointer hover:text-primary kol-visited text-normal underline" href="javascript:void(0)" role="link" tabindex="0">
                       <span>
                         <slot />
                       </span>
                     </a>
                   <kol-tooltip></kol-tooltip>
                  </mock:shadow-root>
                   Test Link 1
                 </kol-link>
               </li>
               <li>
                 <kol-link _aria-label="Test Link 2" _label="Test Link 2">
                   <mock:shadow-root>
                     <a class="cursor-pointer hover:text-primary kol-visited text-normal underline" href="javascript:void(0)" role="link" tabindex="0">
                       <span>
                         <slot />
                       </span>
                     </a>
                   <kol-tooltip></kol-tooltip>
                  </mock:shadow-root>
                   Test Link 2
                 </kol-link>
               </li>
               <li>
                 <kol-link _aria-label="Test Link 3" _label="Test Link 3">
                   <mock:shadow-root>
                     <a class="cursor-pointer hover:text-primary kol-visited text-normal underline" href="javascript:void(0)" role="link" tabindex="0">
                       <span>
                         <slot />
                       </span>
                     </a>
                   <kol-tooltip></kol-tooltip>
                  </mock:shadow-root>
                   Test Link 3
                 </kol-link>
               </li>
             </ul>
           </nav>
         </mock:shadow-root>
       </kol-link-group>`
		);
	});

	it('render link group with ariaLabel, Links, and Ordered Prop set True', async () => {
		const page = await newSpecPage({
			components: COMPONENTS,
			template: () => <kol-link-group {...DEFAULT_PROPS} _ordered={true}></kol-link-group>,
		});
		expect(page.root).toEqualHtml(
			` <kol-link-group>
         <mock:shadow-root>
           <nav ${DEFAULT_HTML_NAV_PROPS}>
             <ol class="list-decimal pl-8">
               <li>
                 <kol-link _aria-label="Test Link 1" _label="Test Link 1">
                   <mock:shadow-root>
                     <a class="cursor-pointer hover:text-primary kol-visited text-normal underline" href="javascript:void(0)" role="link" tabindex="0">
                       <span>
                         <slot />
                       </span>
                     </a>
                   <kol-tooltip></kol-tooltip>
                  </mock:shadow-root>
                   Test Link 1
                 </kol-link>
               </li>
               <li>
                 <kol-link _aria-label="Test Link 2" _label="Test Link 2">
                   <mock:shadow-root>
                     <a class="cursor-pointer hover:text-primary kol-visited text-normal underline" href="javascript:void(0)" role="link" tabindex="0">
                       <span>
                         <slot />
                       </span>
                     </a>
                   <kol-tooltip></kol-tooltip>
                  </mock:shadow-root>
                   Test Link 2
                 </kol-link>
               </li>
               <li>
                 <kol-link _aria-label="Test Link 3" _label="Test Link 3">
                   <mock:shadow-root>
                     <a class="cursor-pointer hover:text-primary kol-visited text-normal underline" href="javascript:void(0)" role="link" tabindex="0">
                       <span>
                         <slot />
                       </span>
                     </a>
                   <kol-tooltip></kol-tooltip>
                  </mock:shadow-root>
                   Test Link 3
                 </kol-link>
               </li>
             </ol>
           </nav>
         </mock:shadow-root>
       </kol-link-group>`
		);
	});
});
