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
 *   - forceFullPage: boolean (Default: false) – capture the route as one full-page screenshot instead
 *     of one element screenshot per `data-visual-block` container. Required for routes without blocks:
 *     overlays that extend beyond any block (dialog, drawer, toast, open popover), focus-dependent
 *     content (skip-nav) and deliberate composition tests (scenarios/*, form/basic).
 *   - viewportSize:
 *     - width (Default: 800)
 *     - height (Default: 100)
 *   - waitForTimeout: number (Default: 15000)
 *
 * There is no per-route option for the reflow pass: blocks that should additionally be captured at
 * 320 px viewport width opt in where they are defined, via SampleBlock's `narrow` prop.
 */

ROUTES.set('abbr/basic');
ROUTES.set('accordion/basic');
ROUTES.set('alert/basic');
ROUTES.set('alert/card-msg');
ROUTES.set('alert/html', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('avatar/size');
ROUTES.set('badge/basic');
ROUTES.set('breadcrumb/basic', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		viewportSize: {
			width: 600,
			height: 400,
		},
	},
});
ROUTES.set('button-link/basic');
ROUTES.set('button-link/icons');
ROUTES.set('button/variants');
ROUTES.set('button/icons');
ROUTES.set('button/short-key');
ROUTES.set('card/basic');
ROUTES.set('card/linked');
ROUTES.set('card/headlines');
ROUTES.set('combobox/basic?noColumns');
ROUTES.set('details/basic');
ROUTES.set('dialog/basic?show-dialog=true', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 1920,
			height: 600,
		},
	},
});
ROUTES.set('drawer/basic?align=left', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 600,
			height: 400,
		},
	},
});
ROUTES.set('drawer/basic?align=top', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 600,
			height: 400,
		},
	},
});
ROUTES.set('drawer/basic?align=right', {
	snapshot: {
		forceFullPage: true,
		skip: true,
	},
});
ROUTES.set('drawer/basic?align=bottom', {
	snapshot: {
		forceFullPage: true,
		skip: true,
	},
});
ROUTES.set('drawer/basic?align=left&closer=true', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 600,
			height: 400,
		},
	},
});
ROUTES.set('form/basic', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 600,
		},
	},
});
ROUTES.set('form/error-list', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 600,
		},
	},
});
ROUTES.set('heading/basic', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		viewportSize: {
			width: 250,
			height: 300,
		},
	},
});
ROUTES.set('heading/secondary');
ROUTES.set('icon/font', {
	snapshot: {
		// Breaks when a theme has no custom icon font
		skip: true,
		viewportSize: {
			width: 250,
			height: 345,
		},
	},
});
ROUTES.set('image/basic', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('input-checkbox/basic?noColumns', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-checkbox/button?noColumns', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-checkbox/switch?noColumns', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-color/basic?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-date/basic?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-email/basic?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-file/basic?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-number/basic?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-number/number-formatter', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-password/basic?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-password/show-password?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-radio/basic?noColumns', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-radio/horizontal?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-radio/object?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-range/basic?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-text/basic?noColumns');
ROUTES.set('input-text/message-types?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-text/placeholder?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-text/disabled?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-text/readonly?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-text/counter?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-text/access-short-key?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-text/hide-label?noColumns', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 0,
		},
	},
});
ROUTES.set('input-text/hide-msg?noColumns', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 0,
		},
	},
});
ROUTES.set('input-text/text-formatter?noColumns', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('input-text/smart-button?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('input-text/expert-slot?noColumns', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('input-text/select-range?noColumns', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('input-text/background?noColumns', {
	snapshot: {
		viewportSize: {
			width: 250,
			height: 0,
		},
	},
});
ROUTES.set('input-text/variant?noColumns', {
	snapshot: {
		viewportSize: {
			width: 1000,
			height: 0,
		},
	},
});
ROUTES.set('kolibri/basic', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('link-button/basic');
ROUTES.set('link-button/target');
ROUTES.set('link/basic');
ROUTES.set('link/icons');
ROUTES.set('link/image', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('link/target');
ROUTES.set('link/link-variant');
ROUTES.set('modal/basic?show-dialog=true', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 1920,
			height: 600,
		},
	},
});
ROUTES.set('nav/aria-current', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('nav/basic');
ROUTES.set('pagination/basic');
ROUTES.set('pagination/button-visibility');
ROUTES.set('pagination/sibling-boundary');
ROUTES.set('popover-button/basic', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 200,
			height: 220,
		},
	},
});
ROUTES.set('popover-button/inline', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 420,
		},
	},
});
ROUTES.set('meter/basic');
ROUTES.set('meter/optimum');
ROUTES.set('meter/orientation');
ROUTES.set('progress/basic');
ROUTES.set('quote/basic');
ROUTES.set('quote/block');
ROUTES.set('select/basic?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('skip-nav/basic', {
	snapshot: {
		forceFullPage: true,
	},
});
ROUTES.set('spin/basic');
ROUTES.set('single-select/basic?noColumns', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('split-button/basic', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('table/horizontal-scrollbar', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 800,
		},
	},
});
ROUTES.set('table/column-alignment', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 400,
		},
	},
});
ROUTES.set('table/sort-data', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 400,
		},
		skip: true,
	},
});
ROUTES.set('table/action-columns', {
	snapshot: {
		viewportSize: {
			width: 1000,
			height: 300,
		},
	},
});
ROUTES.set('table/with-footer', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 360,
		},
	},
});
ROUTES.set('table/with-pagination', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 740,
		},
	},
});
ROUTES.set('table/pagination-position', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 400,
		},
		skip: true,
	},
});
ROUTES.set('table/complex-headers', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 400,
		},
	},
});
ROUTES.set('table/non-hidable-columns', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 235,
		},
	},
});
ROUTES.set('table/stateful-with-selection', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 509,
		},
	},
});
ROUTES.set('table/stateful-with-single-selection', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 370,
		},
	},
});
ROUTES.set('table/stateless-with-selection', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 495,
		},
	},
});
ROUTES.set('table/stateless-with-single-selection', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 370,
		},
	},
});
ROUTES.set('table/stateless', {
	snapshot: {
		viewportSize: {
			width: 800,
			height: 400,
		},
		skip: true,
	},
});
ROUTES.set('table/sticky-header', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		viewportSize: {
			width: 1300,
			height: 1000,
		},
	},
});
ROUTES.set('table/sticky-cols', {
	snapshot: {
		viewportSize: {
			width: 1000,
			height: 1000,
		},
	},
});
ROUTES.set('table/variant', {
	snapshot: {
		viewportSize: {
			width: 1000,
			height: 0,
		},
	},
});
ROUTES.set('table/empty', {
	snapshot: {
		// the empty table renders no visible box – element screenshots would fail with zero size
		forceFullPage: true,
		viewportSize: {
			width: 1000,
			height: 0,
		},
	},
});
ROUTES.set('table/stateful-async', {
	snapshot: {
		// loading state only (50s async delay) – the block container collapses to zero height
		forceFullPage: true,
		viewportSize: {
			width: 1000,
			height: 0,
		},
	},
});
ROUTES.set('table/stateless-async', {
	snapshot: {
		// The sample resolves its data after 5s, so the block would only ever show the pagination bar –
		// and would flip to the fully rendered table whenever the runner needs longer than that.
		skip: true,
	},
});
ROUTES.set('tabs/basic');
ROUTES.set('tabs/create-button', {
	axe: {
		skipFailures: true,
	},
});
ROUTES.set('tabs/icons-only', {
	snapshot: {
		viewportSize: {
			width: 200,
			height: 0,
		},
	},
});
ROUTES.set('textarea/adjust-height');
ROUTES.set('textarea/basic?noColumns', {
	snapshot: {
		viewportSize: {
			width: 500,
			height: 0,
		},
	},
});
ROUTES.set('textarea/resize', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('textarea/rows', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('textarea/with-counter', {
	snapshot: {
		viewportSize: {
			width: 200,
			height: 0,
		},
	},
});
ROUTES.set('toast/configurator', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 600,
			height: 750,
		},
	},
});
ROUTES.set('toolbar/basic', {
	snapshot: {
		viewportSize: {
			width: 600,
			height: 0,
		},
	},
});
ROUTES.set('toolbar/disabled', {
	snapshot: {
		viewportSize: {
			width: 300,
			height: 0,
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
			height: 0,
		},
	},
});
ROUTES.set('version/basic', {
	snapshot: {
		viewportSize: {
			width: 150,
			height: 0,
		},
	},
});
ROUTES.set('version/context', {
	snapshot: {
		skip: true,
	},
});
ROUTES.set('scenarios/accordion-components', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 200,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/static-form', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		forceFullPage: true,
		skip: true,
	},
});
ROUTES.set('scenarios/sample-form-with-validation', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		forceFullPage: true,
		skip: true,
	},
});
ROUTES.set('scenarios/disabled-interactive-scenario', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		forceFullPage: true,
		skip: true,
	},
});
ROUTES.set('scenarios/same-height-of-all-interactive-elements', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		forceFullPage: true,
	},
});

ROUTES.set('scenarios/same-height-of-all-form-elements-with-label', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		forceFullPage: true,
	},
});

/* Focus tests */
ROUTES.set('scenarios/focus-elements?component=accordion', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=badge', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=button', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=buttonLink', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=card', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=combobox', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=details', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputCheckbox', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputColor', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputDate', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputEmail', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputFile', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputFileMultiple', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputNumber', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputPassword', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputRadio', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputRange', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=inputText', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=link', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=linkButton', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=select', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=selectMultiple', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=singleSelect', {
	axe: {
		skipFailures: true,
	},
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=popoverButton', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=skipNav', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=splitButton', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=tabs', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=textarea', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=toolbar', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
ROUTES.set('scenarios/focus-elements?component=tree', {
	snapshot: {
		forceFullPage: true,
		viewportSize: {
			width: 300,
			height: 0,
		},
	},
});
