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
ROUTES.set('abbr/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('accordion/basic', null);
ROUTES.set('accordion/headlines', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('accordion/list', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('alert/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('alert/card-msg', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('alert/html', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('avatar/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('badge/basic', null);
ROUTES.set('badge/button', null);
ROUTES.set('breadcrumb/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('button-group/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('button-link/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('button-link/icons', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('button-link/image', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('button/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('button/hide-label', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('button/icons', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('button/width', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('button/access-key', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('button/baselined', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('card/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('card/confirm', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('card/flex', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('card/selection', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('details/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('heading/badge', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('heading/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('heading/paragraph', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('icon/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('image/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('indented-text/basic', {
	axe: {
		skipFailures: false,
	},
});
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
ROUTES.set('kolibri/animated', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('kolibri/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('kolibri/no-label', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('link-button/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('link-group/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('link-group/horizontal', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('link/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('link/icons', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('link/image', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('link/target', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('logo/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('modal/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('nav/active', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('nav/aria-current', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('nav/basic', null);
ROUTES.set('nav/horizontal', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('pagination/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('progress/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('quote/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('quote/block', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('select/basic', null);
ROUTES.set('skip-nav/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('spin/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('spin/custom', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('spin/cycle', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('split-button/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('table/badge-size', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('table/render-cell', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('table/sort-data', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('table/with-pagination', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('tabs/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('tabs/icons-only', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('textarea/adjust-height', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('textarea/basic', null);
ROUTES.set('textarea/disabled', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('textarea/placeholder', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('textarea/readonly', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('textarea/resize', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('textarea/rows', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('textarea/with-counter', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('toast/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('version/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('version/context', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('scenarios/complex-form', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('scenarios/appointment-form', {
	axe: {
		skipFailures: false,
	},
});
