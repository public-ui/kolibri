import { mixMembers } from 'stencil-awesome-test';

import type { SpanOptions } from '../../span/test/html.mock';
import type { VersionProps } from '../../../schema';
import { KolBadgeTag } from '../../../core/component-names';

export const getVersionHtml = (props: VersionProps, options?: SpanOptions): string => {
	props = mixMembers(
		{
			_label: '0.0.0-alpha.0',
		},
		props,
	);
	return `
<kol-version${options?.additionalAttrs ?? ''} class="kol-version">
  <mock:shadow-root>
	<${KolBadgeTag}
					_color="#bec5c9"
					_label="${props._label || '0.0.0-alpha.0'}"
				> </${KolBadgeTag}>
  </mock:shadow-root>
</kol-version>`;
};
