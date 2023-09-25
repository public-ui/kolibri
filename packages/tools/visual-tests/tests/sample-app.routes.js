export const ROUTES = new Map();

/**
 * Actually we support the following options:
 *
 * Details: https://playwright.dev/docs/api/class-pageassertions#page-assertions-to-have-screenshot-1
 * - fullPage: boolean (Default: true)
 * - maxDiffPixelRatio: number (Default: undefined)
 * - maxDiffPixels: number (Default: undefined)
 * - threshold: number (Default: undefined)
 * - timeout: number (Default: 0)
 *
 * To set the viewport size, use the following options:
 * - viewportSize: { width, height } (Default: 800x600)
 *
 */

ROUTES.set('handout/basic', {
	viewportSize: {
		width: 1920,
		height: 1280,
	},
	waitForTimeout: 500,
});
ROUTES.set('abbr/basic', null);
ROUTES.set('accordion/basic', null);
ROUTES.set('accordion/header', null);
ROUTES.set('accordion/headlines', null);
ROUTES.set('accordion/list', null);
ROUTES.set('alert/basic', null);
ROUTES.set('alert/card-msg', null);
ROUTES.set('alert/html', null);
ROUTES.set('avatar/basic', null);
ROUTES.set('badge/basic', null);
ROUTES.set('badge/button', null);
ROUTES.set('breadcrumb/basic', null);
ROUTES.set('button-group/basic', null);
ROUTES.set('button-link/basic', null);
ROUTES.set('button-link/icons', null);
ROUTES.set('button-link/image', null);
ROUTES.set('button-link/target', null);
ROUTES.set('button/basic', null);
ROUTES.set('button/hide-label', null);
ROUTES.set('button/icons', null);
ROUTES.set('button/width', null);
ROUTES.set('card/basic', null);
ROUTES.set('card/confirm', null);
ROUTES.set('card/flex', null);
ROUTES.set('card/selection', null);
ROUTES.set('details/basic', null);
ROUTES.set('heading/badge', null);
ROUTES.set('heading/basic', null);
ROUTES.set('heading/paragraph', null);
ROUTES.set('icon/basic', null);
ROUTES.set('image/basic', null);
ROUTES.set('indented-text/basic', null);
ROUTES.set('input-checkbox/basic', null);
ROUTES.set('input-checkbox/button', null);
ROUTES.set('input-checkbox/switch', null);
ROUTES.set('input-color/basic', null);
ROUTES.set('input-date/basic', null);
ROUTES.set('input-email/basic', null);
ROUTES.set('input-file/basic', null);
ROUTES.set('input-number/basic', null);
ROUTES.set('input-password/basic', null);
ROUTES.set('input-password/show-password', null);
ROUTES.set('input-radio/basic', null);
ROUTES.set('input-radio/horizontal', null);
ROUTES.set('input-radio/select', null);
ROUTES.set('input-range/basic', null);
ROUTES.set('input-text/basic', null);
ROUTES.set('input-text/blur', null);
ROUTES.set('input-text/focus', null);
ROUTES.set('kolibri/animated', null);
ROUTES.set('kolibri/basic', null);
ROUTES.set('kolibri/no-label', null);
ROUTES.set('link-button/basic', null);
ROUTES.set('link-group/basic', null);
ROUTES.set('link-group/horizontal', null);
ROUTES.set('link/basic', null);
ROUTES.set('link/icons', null);
ROUTES.set('link/image', null);
ROUTES.set('link/target', null);
ROUTES.set('logo/basic', null);
ROUTES.set('modal/basic', null);
ROUTES.set('nav/active', null);
ROUTES.set('nav/aria-current', null);
ROUTES.set('nav/basic', null);
ROUTES.set('nav/horizontal', null);
ROUTES.set('pagination/basic', null);
ROUTES.set('popover/basic', null);
ROUTES.set('progress/basic', null);
ROUTES.set('quote/basic', null);
ROUTES.set('quote/block', null);
ROUTES.set('select/basic', null);
ROUTES.set('skip-nav/basic', null);
ROUTES.set('spin/basic', null);
ROUTES.set('spin/custom', null);
ROUTES.set('spin/cycle', null);
ROUTES.set('split-button/basic', null);
ROUTES.set('table/badge-size', null);
ROUTES.set('table/render-cell', null);
ROUTES.set('table/sort-data', null);
ROUTES.set('tabs/basic', null);
ROUTES.set('tabs/icons-only', null);
ROUTES.set('textarea/adjust-height', null);
ROUTES.set('textarea/basic', null);
ROUTES.set('textarea/disabled', null);
ROUTES.set('textarea/placeholder', null);
ROUTES.set('textarea/readonly', null);
ROUTES.set('textarea/resize', null);
ROUTES.set('textarea/rows', null);
ROUTES.set('textarea/with-counter', null);
ROUTES.set('toast/basic', null);
ROUTES.set('version/basic', null);
ROUTES.set('version/context', null);
