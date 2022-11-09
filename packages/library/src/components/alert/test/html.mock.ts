import { getHeadingWcHtml } from '../../heading/test/html.mock';
import { getIconHtml } from '../../icon/test/html.mock';
import { mixMembers } from 'stencil-awesome-test';
import { Props } from '../component';

export const getAlertHtml = (props: Props, innerHTML = '', additionalHTML = ''): string => {
	props = mixMembers({}, props);
	const type: string = props._type !== undefined ? props._type : 'default';
	props._type = props._type || 'default';
	props._variant = props._variant || 'msg';
	return `<kol-alert${additionalHTML}>
  <mock:shadow-root>
    <div class="${type} ${props._variant}"${props._alert === true ? ' role="alert"' : ''}>
      ${
				props._variant === 'msg'
					? getIconHtml(
							{
								_ariaLabel:
									props._heading !== undefined
										? ''
										: props._type === 'success'
										? 'Erfolg'
										: props._type === 'error'
										? 'Fehler'
										: props._type === 'warning'
										? 'Warnung'
										: props._type === 'info'
										? 'Hinweis'
										: 'Nachricht',
								_icon:
									props._type === 'success'
										? 'fa-solid fa-circle-check'
										: props._type === 'error'
										? 'fa-solid fa-circle-xmark'
										: props._type === 'warning'
										? 'fa-solid fa-triangle-exclamation'
										: props._type === 'info'
										? 'fa-solid fa-circle-info'
										: 'fa-regular fa-comment',
							},
							` class="icon"`
					  )
					: ''
			}
      <div>
        ${
					(typeof props._heading === 'string' && props._heading.length > 0) || props._variant === 'card'
						? getHeadingWcHtml(
								{
									_level: props._level,
								},
								{
									default: `${
										props._variant === 'card'
											? getIconHtml(
													{
														_ariaLabel:
															props._heading !== undefined
																? ''
																: props._type === 'success'
																? 'Erfolg'
																: props._type === 'error'
																? 'Fehler'
																: props._type === 'warning'
																? 'Warnung'
																: props._type === 'info'
																? 'Hinweis'
																: 'Nachricht',
														_icon:
															props._type === 'success'
																? 'fa-solid fa-circle-check'
																: props._type === 'error'
																? 'fa-solid fa-circle-xmark'
																: props._type === 'warning'
																? 'fa-solid fa-triangle-exclamation'
																: props._type === 'info'
																? 'fa-solid fa-circle-info'
																: 'fa-regular fa-comment',
													},
													` class="icon"`
											  )
											: ''
									}${typeof props._heading === 'string' ? props._heading : ''}`,
								},
								' class="heading"'
						  )
						: ''
				}<div class="content">
          <slot />
        </div>
      </div>
    </div>
  </mock:shadow-root>
 ${innerHTML}
</kol-alert>`;
};
