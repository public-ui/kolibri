import type { SpinProps, SpinStates } from '@public-ui/schema';
import { mixMembers } from 'stencil-awesome-test';

export const getSpinHtml = (props: SpinProps): string => {
	const state = mixMembers<SpinProps, SpinStates>(
		{
			_variant: 'dot',
		},
		props,
	);
	return `<kol-spin${state._show === true ? ' _show' : ''}  class="kol-spin">
	 <mock:shadow-root>
		 ${
				state._show === true
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
