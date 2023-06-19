import { mixMembers } from 'stencil-awesome-test';
import { KoliBriIconProps } from '../types';

export const getIconHtml = (props: KoliBriIconProps, additionalAttrs = ''): string => {
	props = mixMembers(
		{
			_label: '…', // ⚠ required
			_icon: 'codicon codicon-home',
		},
		props
	);
	return `<kol-icon exportparts="icon"${additionalAttrs}>
  <mock:shadow-root>
    <i ${props._label === '' ? 'aria-hidden="true"' : `aria-label="${props._label}"`} class="${props._icon}" part="icon" role="img"></i>
  </mock:shadow-root>
</kol-icon>`;
};
