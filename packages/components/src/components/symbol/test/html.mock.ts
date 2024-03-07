import { mixMembers } from 'stencil-awesome-test';

import { translate } from '../../../i18n';

import type { SymbolProps } from '@public-ui/schema';
export const getSymbolHtml = (props: SymbolProps): string => {
	props = mixMembers(
		{
			_label: translate('kol-warning'),
			_symbol: '', // ⚠ required
		},
		props
	);
	return `<kol-symbol  class="kol-symbol">
		<span aria-label="${props._label}" role="term">${props._symbol}</span>
	</kol-symbol>`;
};
