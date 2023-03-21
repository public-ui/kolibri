import { mixMembers } from 'stencil-awesome-test';
import { getLinkHtml } from '../../link/test/html.mock';
import { Props, States } from '../types';

type Slot = {
	expert?: string;
};

export const getQuoteHtml = (props: Props, slots: Slot = {}): string => {
	const state = mixMembers<Props, States>(
		{
			_href: '…', // ⚠ required
			_quote: '…', // ⚠ required
			_variant: 'inline',
		},
		props
	);
	const showExpertSlot = state._quote === '';
	return `<kol-quote>
  <mock:shadow-root>
		<figure class="${state._variant}">
			<${state._variant === 'block' ? 'blockquote' : 'q'} cite="${state._href}">
			${state._quote}
				<span${showExpertSlot && typeof slots.expert === 'string' ? `` : ` aria-hidden="true" hidden=""`}>
					<slot name="expert">
						${showExpertSlot && typeof slots.expert === 'string' ? slots.expert : ``}
					</slot>
				</span>
			</${state._variant === 'block' ? 'blockquote' : 'q'}>
			${
				typeof state._caption === 'string' && state._caption.length > 0
					? `<figcaption>
							<cite>
								${getLinkHtml({
									_href: state._href,
									_label: state._caption,
									_target: '_blank',
								})}
							</cite>
						</figcaption>`
					: ``
			}
		</figure>
  </mock:shadow-root>
</kol-quote>`;
};
