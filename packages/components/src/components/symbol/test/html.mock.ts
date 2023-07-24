import { mixMembers } from 'stencil-awesome-test';

import { KoliBriSymbolProps } from '../types';

export const getSymbolHtml = (props: KoliBriSymbolProps): string => {
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
