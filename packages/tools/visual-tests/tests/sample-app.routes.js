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

ROUTES.set('abbr/basic');
ROUTES.set('accordion/basic');
ROUTES.set('accordion/headlines');
ROUTES.set('alert/basic');
ROUTES.set('alert/card-msg');
ROUTES.set('alert/html');
ROUTES.set('avatar/basic');
ROUTES.set('badge/basic');
ROUTES.set('badge/button');
ROUTES.set('breadcrumb/basic');
ROUTES.set('button-group/basic');
ROUTES.set('button-link/basic');
ROUTES.set('button-link/icons');
ROUTES.set('button-link/image');
ROUTES.set('button/basic');
ROUTES.set('button/icons');
ROUTES.set('button/width');
ROUTES.set('button/access-key');
ROUTES.set('button/baselined');
ROUTES.set('button/short-key');
ROUTES.set('card/basic');
ROUTES.set('combobox/basic');
ROUTES.set('details/basic');
ROUTES.set('drawer/basic?align=left', {
	snapshot: {
		viewportSize: {
			width: 1920,
			height: 600,
		},
	},
});
ROUTES.set('drawer/basic?align=top', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 600,
		},
	},
});
ROUTES.set('drawer/basic?align=right', {
	snapshot: {
		viewportSize: {
			width: 1920,
			height: 600,
		},
	},
});
ROUTES.set('drawer/basic?align=bottom', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 600,
		},
	},
});
ROUTES.set('form/basic');
ROUTES.set('form/error-list');
ROUTES.set('heading/badge');
ROUTES.set('heading/basic');
ROUTES.set('heading/paragraph');
ROUTES.set('icon/basic');
ROUTES.set('image/basic');
ROUTES.set('indented-text/basic');
ROUTES.set('input-checkbox/basic');
ROUTES.set('input-checkbox/button');
ROUTES.set('input-checkbox/switch');
ROUTES.set('input-color/basic');
ROUTES.set('input-date/basic');
ROUTES.set('input-email/basic');
ROUTES.set('input-file/basic');
ROUTES.set('input-number/basic');
ROUTES.set('input-password/basic');
ROUTES.set('input-password/show-password');
ROUTES.set('input-radio/basic');
ROUTES.set('input-radio/horizontal');
ROUTES.set('input-radio/object');
ROUTES.set('input-range/basic');
ROUTES.set('input-text/basic');
ROUTES.set('input-text/focus');
ROUTES.set('kolibri/basic');
ROUTES.set('link-button/basic');
ROUTES.set('link-group/basic');
ROUTES.set('link-group/horizontal');
ROUTES.set('link/basic');
ROUTES.set('link/icons');
ROUTES.set('link/image');
ROUTES.set('link/target');
ROUTES.set('modal/basic');
ROUTES.set('modal/basic?show-modal=true', {
	snapshot: {
		viewportSize: {
			width: 1920,
			height: 600,
		},
	},
});

ROUTES.set('nav/aria-current');
ROUTES.set('nav/basic');
ROUTES.set('nav/horizontal');
ROUTES.set('pagination/basic');
ROUTES.set('progress/basic');
ROUTES.set('quote/basic');
ROUTES.set('quote/block');
ROUTES.set('select/basic');
ROUTES.set('skip-nav/basic');
ROUTES.set('spin/basic');
ROUTES.set('single-select/basic');
ROUTES.set('spin/custom');
ROUTES.set('spin/cycle');
ROUTES.set('split-button/basic');
ROUTES.set('table/column-alignment');
ROUTES.set('table/sort-data');
ROUTES.set('table/with-footer');
ROUTES.set('table/with-pagination');
ROUTES.set('table/pagination-position');
ROUTES.set('table/complex-headers');
ROUTES.set('table/stateful-with-selection');
ROUTES.set('table/stateful-with-single-selection');
ROUTES.set('table/stateless-with-single-selection');
ROUTES.set('table/stateless-with-selection');
ROUTES.set('table/stateless');
ROUTES.set('tabs/basic');
ROUTES.set('tabs/icons-only');
ROUTES.set('textarea/adjust-height');
ROUTES.set('textarea/basic');
ROUTES.set('textarea/resize');
ROUTES.set('textarea/rows');
ROUTES.set('textarea/with-counter');
ROUTES.set('toast/basic');
ROUTES.set('toast/basic?type=info', {
	snapshot: {
		viewportSize: {
			width: 1920,
			height: 600,
		},
	},
});
ROUTES.set('toast/basic?type=success', {
	snapshot: {
		viewportSize: {
			width: 1920,
			height: 600,
		},
	},
});
ROUTES.set('toast/basic?type=warning', {
	snapshot: {
		viewportSize: {
			width: 1920,
			height: 600,
		},
	},
});
ROUTES.set('toast/basic?type=error', {
	snapshot: {
		viewportSize: {
			width: 1920,
			height: 600,
		},
	},
});
ROUTES.set('toast/basic?variant=msg', {
	snapshot: {
		viewportSize: {
			width: 1920,
			height: 600,
		},
	},
});
ROUTES.set('toast/basic?variant=card', {
	snapshot: {
		viewportSize: {
			width: 1920,
			height: 600,
		},
	},
});

ROUTES.set('toast/basic?type=default&variant=msg', {
	snapshot: {
		viewportSize: {
			width: 1920,
			height: 600,
		},
	},
});
ROUTES.set('toast/basic?type=info&variant=msg', {
	snapshot: {
		viewportSize: {
			width: 1920,
			height: 600,
		},
	},
});
ROUTES.set('toast/basic?type=success&variant=msg', {
	snapshot: {
		viewportSize: {
			width: 1920,
			height: 600,
		},
	},
});
ROUTES.set('toast/basic?type=warning&variant=msg', {
	snapshot: {
		viewportSize: {
			width: 1920,
			height: 600,
		},
	},
});
ROUTES.set('toast/basic?type=error&variant=msg', {
	snapshot: {
		viewportSize: {
			width: 1920,
			height: 600,
		},
	},
});

ROUTES.set('toolbar/basic');
ROUTES.set('toolbar/disabled');
ROUTES.set('tree/basic/home');
ROUTES.set('version/basic');
ROUTES.set('version/context');
ROUTES.set('scenarios/appointment-form');
ROUTES.set('scenarios/static-form');
ROUTES.set('scenarios/disabled-interactive-scenario');
ROUTES.set('scenarios/same-height-of-all-interactive-elements', {
	snapshot: {
		viewportSize: {
			width: 4000,
			height: 0,
		},
	},
});

/* Focus tests */
ROUTES.set('scenarios/focus-elements?component=accordion');
ROUTES.set('scenarios/focus-elements?component=button');
ROUTES.set('scenarios/focus-elements?component=buttonLink');
ROUTES.set('scenarios/focus-elements?component=combobox');
ROUTES.set('scenarios/focus-elements?component=details');
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
ROUTES.set('scenarios/focus-elements?component=link');
ROUTES.set('scenarios/focus-elements?component=linkButton');
ROUTES.set('scenarios/focus-elements?component=select');
ROUTES.set('scenarios/focus-elements?component=selectMultiple');
ROUTES.set('scenarios/focus-elements?component=singleSelect');
ROUTES.set('scenarios/focus-elements?component=textarea');
