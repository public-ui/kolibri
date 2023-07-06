import { mixMembers } from 'stencil-awesome-test';

import { KoliBriSpinProps } from '../types';

export const getSpinHtml = (props: KoliBriSpinProps): string => {
	props = mixMembers(
		{
			_show: false,
		},
		props
	);
	return `<kol-spin>
	 <mock:shadow-root>
		 ${
				props._show === true
					? `<span aria-busy="true" aria-label="kol-action-running" aria-live="polite" class="spin dot" role="alert">
						<span class="bg-spin-1"></span>
						<span class="bg-spin-2"></span>
						<span class="bg-spin-3"></span>
						<span class="bg-neutral"></span>
					</span>`
					: ''
			}
	 </mock:shadow-root>
 </kol-spin>`;
};
