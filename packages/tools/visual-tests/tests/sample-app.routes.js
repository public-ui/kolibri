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
ROUTES.set('form/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('form/error-list', {
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
ROUTES.set('input-radio/object', null);
ROUTES.set('input-range/basic', null);
ROUTES.set('input-text/basic', null);
ROUTES.set('input-text/blur', null);
ROUTES.set('input-text/focus', null);
ROUTES.set('kolibri/basic', {
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
ROUTES.set('modal/basic', {
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
ROUTES.set('table/column-alignment', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('table/sort-data', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('table/with-footer', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('table/with-pagination', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('table/pagination-position', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('table/complex-headers', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('table/stateless', {
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
ROUTES.set('toolbar/basic', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('toolbar/disabled', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('tree/basic/home', {
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
ROUTES.set('scenarios/appointment-form', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('scenarios/static-form', {
	axe: {
		skipFailures: false,
	},
});
ROUTES.set('scenarios/disabled-interactive-scenario', {
	axe: {
		skipFailures: false,
	},
});

/* Focus tests */
ROUTES.set('scenarios/focus-elements?component=inputCheckbox');
ROUTES.set('scenarios/focus-elements?component=inputColor');
ROUTES.set('scenarios/focus-elements?component=inputDate');
ROUTES.set('scenarios/focus-elements?component=inputEmail');
ROUTES.set('scenarios/focus-elements?component=inputFile');
ROUTES.set('scenarios/focus-elements?component=inputFileMultiple');
ROUTES.set('scenarios/focus-elements?component=inputNumber');
ROUTES.set('scenarios/focus-elements?component=inputPassword');
ROUTES.set('scenarios/focus-elements?component=inputRadio');
ROUTES.set('scenarios/focus-elements?component=inputRange');
ROUTES.set('scenarios/focus-elements?component=inputText');
ROUTES.set('scenarios/focus-elements?component=select');
ROUTES.set('scenarios/focus-elements?component=selectMultiple');
ROUTES.set('scenarios/focus-elements?component=textarea');
ROUTES.set('scenarios/focus-elements?component=accordion');
ROUTES.set('scenarios/focus-elements?component=button');
ROUTES.set('scenarios/focus-elements?component=buttonLink');
ROUTES.set('scenarios/focus-elements?component=details');
ROUTES.set('scenarios/focus-elements?component=link');
ROUTES.set('scenarios/focus-elements?component=linkButton');
