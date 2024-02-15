import { mixMembers } from 'stencil-awesome-test';

import { translate } from '../../../i18n';
import { getButtonWcHtml } from '../../button/test/html.mock';
import { getHeadingWcHtml } from '../../heading/test/html.mock';
import { getIconHtml } from '../../icon/test/html.mock';
import { Props } from '../types';

export const getAlertHtml = (props: Props, innerHTML = '', additionalHTML = ''): string => {
	props = mixMembers(
		{
			_level: 1,
		},
		props
	);
	const type: string = props._type !== undefined ? props._type : 'default';
	props._type = props._type || 'default';
	props._variant = props._variant || 'msg';
	return `<kol-alert${additionalHTML}>
  <mock:shadow-root>
    <kol-alert-wc class="kol-alert"${props._alert === true ? ' role="alert"' : ''}>
		<div class="kol-alert-wc ${type} ${props._variant}${props._hasCloser ? ' hasCloser' : ''}">
			<div class="heading">
				${getIconHtml(
					{
						_label:
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
								: 'kol-message',
						_icons:
							props._type === 'success'
								? 'kol-icon-wc codicon codicon-pass'
								: props._type === 'error'
								? 'kol-icon-wc codicon codicon-error'
								: props._type === 'warning'
								? 'kol-icon-wc codicon codicon-warning'
								: props._type === 'info'
								? 'kol-icon-wc codicon codicon-info'
								: 'kol-icon-wc codicon codicon-comment',
					},
					` class="heading-icon kol-icon"`
				)}
				<div>
					${
						typeof props._label === 'string' && props._label.length > 0
							? getHeadingWcHtml(
									{
										_label: '',
										_level: props._level,
									},
									{
										default: props._label,
									},
									` class="kol-heading-wc"`
							  )
							: ''
					}
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
						? getButtonWcHtml(
								{
									_hideLabel: true,
									_icons: {
										left: {
											icon: 'kol-icon-wc codicon codicon-close',
										},
									},
									_label: translate('kol-close'),
									_tooltipAlign: 'left',
								},
								{},
								` class="kol-button-wc close"`
						  )
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
 </div>
</kol-alert>`;
};
