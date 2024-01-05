import { mixMembers } from 'stencil-awesome-test';

import { translate } from '../../../i18n';
import { Props } from '../types';

export const getSymbolHtml = (props: Props): string => {
	props = mixMembers(
		{
			_label: translate('kol-warning'),
			_symbol: '', // ⚠ required
		},
		props
	);
	return `<kol-symbol>
		<span aria-label="${props._label}" role="term">${props._symbol}</span>
	</kol-symbol>`;
};
