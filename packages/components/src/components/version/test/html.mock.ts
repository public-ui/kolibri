import { mixMembers } from 'stencil-awesome-test';

import { getBadgeHtml } from '../../badge/test/html.mock';
import { SpanOptions } from '../../span/test/html.mock';
import { Props } from '../types';

export const getVersionHtml = (props: Props, options?: SpanOptions): string => {
	props = mixMembers(
		{
			_label: '0.0.0-alpha.0',
		},
		props
	);
	return `
<kol-version${options?.additionalAttrs ?? ''}>
  <mock:shadow-root>
	<div class="kol-version">
    ${getBadgeHtml(
			{
				_color: '#BEC5C9',
				_icons: { left: { icon: 'codicon codicon-versions', label: 'kol-version' } },
				_label: props._label || '0.0.0-alpha.0',
			},
			options
		)}
		</div>
  </mock:shadow-root>
</kol-version>`;
};
