import { mixMembers } from 'stencil-awesome-test';
import { KoliBriSymbolProps } from '../types';

export const getSymbolHtml = (props: KoliBriSymbolProps): string => {
	props = mixMembers(
		{
			_ariaLabel: 'kol-warning',
			_symbol: '…', // ⚠ required
		},
		props
	);
	return `<kol-symbol>
		<span aria-label="${props._ariaLabel}" role="term">${props._symbol}</span>
	</kol-symbol>`;
};
