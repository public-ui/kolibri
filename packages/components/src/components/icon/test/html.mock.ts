import { mixMembers } from 'stencil-awesome-test';

import { KoliBriIconProps } from '../types';

export const getIconHtml = (props: KoliBriIconProps, additionalAttrs = ''): string => {
	props = mixMembers(
		{
			_icon: 'codicon codicon-home',
		},
		props
	);
	return `<kol-icon exportparts="icon"${additionalAttrs}>
  <mock:shadow-root>
    <i ${typeof props._label === 'string' && props._label.length > 0 ? `aria-label="${props._label}"` : 'aria-hidden="true"'} class="${
		props._icon
	}" part="icon" role="img"></i>
  </mock:shadow-root> 
</kol-icon>`;
};
