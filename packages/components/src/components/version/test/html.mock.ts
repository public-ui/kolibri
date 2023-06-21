import { getBadgeHtml } from '../../badge/test/html.mock';
import { mixMembers } from 'stencil-awesome-test';
import { KoliBriVersionProps } from '../types';

export const getVersionHtml = (props: KoliBriVersionProps, additionalAttrs = ''): string => {
	props = mixMembers(
		{
			_label: '0.0.0-alpha.0',
		},
		props
	);
	return `
<kol-version${additionalAttrs}>
  <mock:shadow-root>
    ${
			props._label === ''
				? ''
				: getBadgeHtml({
						_color: '#BEC5C9',
						_icon: 'codicon codicon-versions',
						_label: `v${props._label || ''}`,
				  })
		}
  </mock:shadow-root>
</kol-version>`;
};
