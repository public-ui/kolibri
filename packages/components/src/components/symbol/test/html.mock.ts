import { mixMembers } from 'stencil-awesome-test';
import { Props } from '../component';

export const getSymbolHtml = (props: Props): string => {
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
