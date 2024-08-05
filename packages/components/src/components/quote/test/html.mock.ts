import { mixMembers } from 'stencil-awesome-test';

import { showExpertSlot } from '../../../schema';

import { KolLinkTag } from '../../../core/component-names';

import type { QuoteProps, QuoteStates } from '../../../schema';
type Slot = {
	expert?: string;
};

export const getQuoteHtml = (props: QuoteProps, slots: Slot = {}): string => {
	const state = mixMembers<QuoteProps, QuoteStates>(
		{
			_href: '', // ⚠ required
			_quote: '', // ⚠ required
			_variant: 'inline',
		},
		props,
	);
	const hasExpertSlot = showExpertSlot(state._quote); // _quote instead of _caption as _label
	return `<kol-quote class="kol-quote">
  <mock:shadow-root>
		<figure class="${state._variant}">
			<${state._variant === 'block' ? 'blockquote' : 'q'} cite="${state._href}">
			${state._quote}
				<span${hasExpertSlot ? `` : ` aria-hidden="true" hidden=""`}>
					<slot name="expert">
						${hasExpertSlot ? (slots.expert ?? '') : ``}
					</slot>
				</span>
			</${state._variant === 'block' ? 'blockquote' : 'q'}>
			${
				typeof state._label === 'string' && state._label.length > 0
					? `<figcaption>
							<cite>
							<${KolLinkTag} _href="${state._href}" _label="${state._label}" _target="_blank" > </${KolLinkTag}>
							</cite>
						</figcaption>`
					: ``
			}
		</figure>
  </mock:shadow-root>
</kol-quote>`;
};
