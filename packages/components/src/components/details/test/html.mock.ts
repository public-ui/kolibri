import { mixMembers } from 'stencil-awesome-test';

import { getIconHtml } from '../../icon/test/html.mock';
import { getIndentedTextHtml } from '../../indented-text/test/html.mock';

import type { DetailsProps } from '@public-ui/schema';
import clsx from 'clsx';

export const getDetailsHtml = (
	props: DetailsProps,
	slots: {
		default?: string;
	} = {},
): string => {
	props = mixMembers(
		{
			_label: '', // ⚠ required
		},
		props,
	);

	const classNames = clsx({
		disabled: props._disabled,
		open: props._open,
	});

	return `<kol-details${props._open ? ' _open' : ''}  class="kol-details">
	<mock:shadow-root>
		<details class="${classNames}">
			<summary
				${props._disabled ? `aria-disabled="true"` : ''}
				${props._disabled ? `tabindex="-1"` : ''}
			>
				${getIconHtml(
					{
						_label: '',
						_icons: 'codicon codicon-chevron-right',
					},
					`class="kol-icon icon${props._open ? ' is-open' : ''}"`,
				)}
				<span>
					${props._label}
				</span>
			</summary>
			<div${props._open ? `` : ` aria-hidden="true"`} class="content">
				${getIndentedTextHtml(props, slots)}
			</div>
		</details>
	</mock:shadow-root>
</kol-details>`;
};
