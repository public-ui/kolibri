import { getBadgeHtml } from '../../badge/test/html.mock';
import { mixMembers } from 'stencil-awesome-test';
import { Props } from '../component';

export const getVersionHtml = (props: Props, additionalAttrs = ''): string => {
	props = mixMembers(
		{
			_version: '0.0.0-alpha.0',
		},
		props
	);
	return `
<kol-version${additionalAttrs}>
  <mock:shadow-root>
    ${
			props._version === ''
				? ''
				: getBadgeHtml({
						_color: '#BEC5C9',
						_icon: 'codicon codicon-versions',
						_label: `v${props._version}`,
				  })
		}
  </mock:shadow-root>
</kol-version>`;
};
