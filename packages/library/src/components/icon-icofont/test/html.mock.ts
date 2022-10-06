import { getIconHtml } from '../../icon/test/html.mock';
import { mixMembers } from 'stencil-awesome-test';
import { Props } from '../component';

export const getIconIcofontHtml = (props: Props, additionalAttrs = ''): string => {
	props = mixMembers(
		{
			_ariaLabel: '',
			_icon: 'home',
		},
		props
	);
	return `<kol-icon-icofont${additionalAttrs}>
  ${getIconHtml(
		{
			...props,
			_icon: `icofont-${props._icon}`,
		},
		` exportparts="icon${typeof props._part === 'string' ? `,${props._part}` : ''}"`
	)}
</kol-icon-icofont>`;
};
