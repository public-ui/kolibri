export const ROUTES = new Map();

/**
 * Actually we support the following options:
 *
 * Axe options:
 * - axe:
 *   - skip: boolean (Default: false)
 *   - skipFailures: boolean (Default: false)
 *
 * Snapshot options:
 * - snapshot:
 *   - options:
 *     - maxDiffPixelRatio: number (Default: 0)
 *   - skip: boolean (Default: false)
 *   - viewportSize:
 *     - width (Default: 800)
 *     - height (Default: 600)
 *   - waitForTimeout: number (Default: 15000)
 *   - zoom:
 *     - options:
 *       - maxDiffPixelRatio: number (Default: 0)
 *     - skip: boolean (Default: false)
 */

ROUTES.set('abbr/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('accordion/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('accordion/headlines', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('alert/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('alert/card-msg', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('alert/html', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('avatar/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('badge/basic', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('badge/button', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('breadcrumb/basic', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('button-group/basic', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('button-link/basic', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('button-link/icons', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('button-link/image', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('button/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('button/icons', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('button/width', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('button/access-key', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('button/baselined', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('button/short-key', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('card/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('combobox/basic', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('details/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('drawer/basic?align=left', {
	snapshot: {
		viewportSize: {
			width: 600,
			height: 400,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('drawer/basic?align=top', {
	snapshot: {
		viewportSize: {
			width: 600,
			height: 400,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('drawer/basic?align=right', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('drawer/basic?align=bottom', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('form/basic', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('form/error-list', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 600,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('heading/badge', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('heading/basic', {
	snapshot: {
		viewportSize: {
			width: 250,
			height: 300,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('heading/paragraph', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('icon/basic', {
	snapshot: {
		viewportSize: {
			width: 60,
			height: 80,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('image/basic', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('indented-text/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-checkbox/basic', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-checkbox/button', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-checkbox/switch', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-color/basic', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-date/basic', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-email/basic', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-file/basic', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-number/basic', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-password/basic', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-password/show-password', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-radio/basic', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-radio/horizontal', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-radio/object', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-range/basic', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-text/basic', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-text/focus', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('kolibri/basic', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('link-button/basic', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('link-group/basic', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('link-group/horizontal', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('link/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('link/icons', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('link/image', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('link/target', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('modal/basic', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('modal/basic?show-modal=true', {
	snapshot: {
		viewportSize: {
			width: 1920,
			height: 600,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('nav/aria-current', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('nav/basic', {
	snapshot: {
		viewportSize: {
			width: 400,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('nav/horizontal', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('pagination/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('progress/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('quote/basic', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('quote/block', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('select/basic', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('skip-nav/basic', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('spin/basic', {
	snapshot: {
		viewportSize: {
			width: 100,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('single-select/basic', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('spin/custom', {
	snapshot: {
		viewportSize: {
			width: 100,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('spin/cycle', {
	snapshot: {
		viewportSize: {
			width: 100,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('split-button/basic', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('table/column-alignment', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('table/sort-data', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('table/with-footer', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('table/with-pagination', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('table/pagination-position', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('table/complex-headers', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('table/stateful-with-selection', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('table/stateful-with-single-selection', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('table/stateless-with-single-selection', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('table/stateless-with-selection', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('table/stateless', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('tabs/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('tabs/icons-only', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('textarea/adjust-height', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('textarea/basic', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('textarea/resize', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('textarea/rows', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('textarea/with-counter', {
	snapshot: {
		viewportSize: {
			width: 200,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('toast/basic', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('toast/basic?type=info', {
	snapshot: {
		viewportSize: {
			width: 600,
			height: 300,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('toast/basic?type=success', {
	snapshot: {
		viewportSize: {
			width: 600,
			height: 300,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('toast/basic?type=warning', {
	snapshot: {
		viewportSize: {
			width: 600,
			height: 300,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('toast/basic?type=error', {
	snapshot: {
		viewportSize: {
			width: 600,
			height: 300,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('toast/basic?variant=msg', {
	snapshot: {
		viewportSize: {
			width: 600,
			height: 300,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('toast/basic?variant=card', {
	snapshot: {
		viewportSize: {
			width: 600,
			height: 300,
		},
		zoom: {
			skip: true,
		},
	},
});

ROUTES.set('toast/basic?type=default&variant=msg', {
	snapshot: {
		viewportSize: {
			width: 600,
			height: 300,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('toast/basic?type=info&variant=msg', {
	snapshot: {
		viewportSize: {
			width: 600,
			height: 300,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('toast/basic?type=success&variant=msg', {
	snapshot: {
		viewportSize: {
			width: 600,
			height: 300,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('toast/basic?type=warning&variant=msg', {
	snapshot: {
		viewportSize: {
			width: 600,
			height: 300,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('toast/basic?type=error&variant=msg', {
	snapshot: {
		viewportSize: {
			width: 600,
			height: 300,
		},
		zoom: {
			skip: true,
		},
	},
});

ROUTES.set('toolbar/basic', {
	snapshot: {
		viewportSize: {
			width: 600,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('toolbar/disabled', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('tree/basic/home', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('version/basic', {
	snapshot: {
		viewportSize: {
			width: 150,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('version/context', {
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/appointment-form', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/static-form', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/disabled-interactive-scenario', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/same-height-of-all-interactive-elements', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		skip: true,
		zoom: {
			skip: true,
		},
	},
});

/* Focus tests */
ROUTES.set('scenarios/focus-elements?component=accordion', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=button', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=buttonLink', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=combobox', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=details', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputCheckbox', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputColor', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputDate', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputEmail', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputFile', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputFileMultiple', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputNumber', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputPassword', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputRadio', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputRange', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputText', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=link', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=linkButton', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=select', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=selectMultiple', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=singleSelect', {
	axe: {
		skipFailures: true,
	},
	viewportSize: {
		width: 300,
		height: 100,
	},
	zoom: {
		skip: true,
	},
});
ROUTES.set('scenarios/focus-elements?component=textarea', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 100,
		},
		zoom: {
			skip: true,
		},
	},
});
