import { Theme } from '@a11y-ui/core';

enum TagEnum {
	'abbr',
	'accordion',
	'accordion-group', // TODO: github pr link
	'alert',
	'avatar', // TODO: github pr link
	'badge',
	'breadcrumb',
	'button',
	'button-group',
	'button-link',
	'card',
	'details',
	'dialog', // TODO: github pr link
	'dropdown', // TODO: github pr link
	'form',
	'heading',
	'icon',
	'image', // TODO: github pr link
	'indented-text',
	'input-checkbox',
	'input-color',
	'input-date',
	'input-file',
	'input-email',
	'input-number',
	'input-password',
	'input-radio',
	'input-range',
	'input-text',
	'link',
	'link-button',
	'link-group',
	'modal',
	'nav',
	'pagination',
	'popover', // TODO: github pr link
	'progress',
	'select',
	'separator', // TODO: github pr link
	'skip-nav',
	'spin',
	'symbol',
	'table',
	'tabs',
	'textarea',
	'toast',
	'toolbar', // TODO: github pr link
	'tooltip',
}

enum KeyEnum {
	'error',
	'warning',
	'info',
	'success',
	'message',
	'close',
	'form-description',
	'of',
	'characters',
	'new',
	'no-entries',
	'change-order',
	'action-running',
	'action-done',
	'page-first',
	'page-back',
	'page-next',
	'page-last',
	'entries-per-site',
	'page-current',
	'page-selected',
	'page-per-site',
	'nav-maximize',
	'nav-minimize',
	'logo-description',
	'open-link-in-tab',
	'kolibri-logo',
}

export const KoliBri = new Theme<'kol', keyof typeof KeyEnum, keyof typeof TagEnum>('kol', KeyEnum, TagEnum);

export { THEMING_ICON_FONT_CSS_FONT_AWESOME } from './fonts';
