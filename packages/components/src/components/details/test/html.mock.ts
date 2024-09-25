import { mixMembers } from 'stencil-awesome-test';

import type { DetailsProps } from '../../../schema';
import clsx from 'clsx';
import { KolIconTag } from '../../../core/component-names';

export const getDetailsHtml = (props: DetailsProps): string => {
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
				<${KolIconTag} _label="" _icons="codicon codicon-chevron-right" class="icon${props._open ? ' is-open' : ''}" > </${KolIconTag}>
				<span>
					${props._label}
				</span>
			</summary>
			<div${props._open ? `` : ` aria-hidden="true"`} class="indented-text">
					<slot />
			</div>
		</details>
	</mock:shadow-root>
</kol-details>`;
};
