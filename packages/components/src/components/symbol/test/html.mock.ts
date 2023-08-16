import { mixMembers } from 'stencil-awesome-test';

import { Props } from '../types';

export const getSymbolHtml = (props: Props): string => {
	props = mixMembers(
		{
			_label: 'kol-warning',
			_symbol: '…', // ⚠ required
		},
		props
	);
	return `<kol-symbol>
	${/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */ ''}
		<span aria-label="${props._label!}" role="term">${props._symbol}</span>
	</kol-symbol>`;
};
