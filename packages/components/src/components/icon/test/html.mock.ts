import { KoliBriIconProps } from '../types';

export const getIconHtml = (props: KoliBriIconProps, additionalAttrs = ''): string => {
	if (!props._icon) props._icon = 'codicon codicon-home';
	return `<kol-icon exportparts="icon"${additionalAttrs}>
  <mock:shadow-root>
    <i ${props._label ? `aria-label="${props._label}"` : 'aria-hidden="true"'} class="${props._icon}" part="icon" role="img"></i>
  </mock:shadow-root>
</kol-icon>`;
};
