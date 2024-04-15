import { mixMembers } from 'stencil-awesome-test';

import { translate } from '../../../i18n';

import type { AlertProps } from '@public-ui/schema';
import { KolIconTag, KolHeadingWcTag, KolButtonWcTag } from '../../../core/component-names';
export const getAlertHtml = (props: AlertProps, innerHTML = '', additionalHTML = ''): string => {
	props = mixMembers(
		{
			_level: 1,
		},
		props,
	);
	const type: string = props._type !== undefined ? props._type : 'default';
	props._type = props._type || 'default';
	props._variant = props._variant || 'msg';
	return `<kol-alert${additionalHTML} class="kol-alert">
  <mock:shadow-root>
    <kol-alert-wc class="kol-alert-wc alert ${type} ${props._variant}${props._hasCloser ? ' hasCloser' : ''}"${props._alert === true ? ' role="alert"' : ''}>
			<div class="heading">
			<${KolIconTag}
								class="heading-icon"
			_label="${
				props._label !== undefined
					? ''
					: props._type === 'success'
						? 'kol-success'
						: props._type === 'error'
							? 'kol-error'
							: props._type === 'warning'
								? 'kol-warning'
								: props._type === 'info'
									? 'kol-info'
									: 'kol-message'
			}"
								_icons="${
									props._type === 'success'
										? 'codicon codicon-pass'
										: props._type === 'error'
											? 'codicon codicon-error'
											: props._type === 'warning'
												? 'codicon codicon-warning'
												: props._type === 'info'
													? 'codicon codicon-info'
													: 'codicon codicon-comment'
								}"
													>
								</${KolIconTag}>


				<div class="heading-content">
					${typeof props._label === 'string' && props._label.length > 0 ? `<${KolHeadingWcTag} _label="${props._label}" _level="${props._level}"></kol-heading-wc> </${KolHeadingWcTag}>` : ''}

					${
						props._variant === 'msg'
							? `<div class="content">
									<slot />
								</div>`
							: ''
					}
				</div>
				${
					props._hasCloser
						? `<${KolButtonWcTag}
						class="close"
						_hideLabel
						_icons={{
							left: {
								icon: 'codicon codicon-close',
							},
						}}
						_label="${translate('kol-close')}"
						_tooltipAlign="left"
					></${KolButtonWcTag}>`
						: ''
				}
			</div>${
				props._variant === 'card'
					? `<div class="content">
						<slot />
					</div>`
					: ''
			}
    </kol-alert-wc>
  </mock:shadow-root>
 ${innerHTML}
</kol-alert>`;
};
