import { mixMembers } from 'stencil-awesome-test';
import { Props } from '../component';

export const getIconHtml = (props: Props, additionalAttrs = ''): string => {
	props = mixMembers(
		{
			_ariaLabel: '…', // ⚠ required
			_icon: 'fa-solid fa-house',
		},
		props
	);
	return `<kol-icon${additionalAttrs}>
  <mock:shadow-root>
    <i ${props._ariaLabel === '' ? 'aria-hidden="true"' : `aria-label="${props._ariaLabel}"`} class="${props._icon}" part="icon${
		typeof props._part === 'string' ? ` ${props._part}` : ''
	}" role="img"></i>
  </mock:shadow-root>
</kol-icon>`;
};
