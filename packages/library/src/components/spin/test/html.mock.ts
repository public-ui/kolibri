import { mixMembers } from 'stencil-awesome-test';
import { Props } from '../component';

export const getSpinHtml = (props: Props): string => {
	props = mixMembers(
		{
			_show: false,
		},
		props
	);
	return `<kol-spin${props._show ? ' _show' : ''}>
	 <mock:shadow-root>
		 ${
				props._show === true
					? `<span aria-busy="true" aria-label="Aktion wird ausgeführt ..." aria-live="polite" class="spin" role="alert">
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
