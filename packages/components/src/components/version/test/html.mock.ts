import { mixMembers } from 'stencil-awesome-test';

import { getBadgeHtml } from '../../badge/test/html.mock';

import type { SpanOptions } from '../../span/test/html.mock';
import type { VersionProps } from '@public-ui/schema';

export const getVersionHtml = (props: VersionProps, options?: SpanOptions): string => {
	props = mixMembers(
		{
			_label: '0.0.0-alpha.0',
		},
		props
	);
	return `
<kol-version${options?.additionalAttrs ?? ''}>
  <mock:shadow-root>
    ${getBadgeHtml(
			{
				_color: '#BEC5C9',
				_icons: { left: { icon: 'codicon codicon-versions', label: 'kol-version' } },
				_label: props._label || '0.0.0-alpha.0',
			},
			options
		)}
  </mock:shadow-root>
</kol-version>`;
};
