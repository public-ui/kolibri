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

ROUTES.set('handout/basic', {
	snapshot: {
		viewportSize: {
			width: 1920,
			height: 1280,
		},
		waitForTimeout: 500,
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('abbr/basic', {
	axe: {
		skipFailures: false,
	},
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
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('alert/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('alert/card-msg', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('alert/html', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('avatar/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('badge/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('badge/button', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('breadcrumb/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('button-group/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('button-link/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('button-link/icons', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('button-link/image', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('button/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('button/icons', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('button/width', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('card/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('details/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('heading/badge', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('heading/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('heading/paragraph', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('icon/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('image/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('indented-text/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-checkbox/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-checkbox/button', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-checkbox/switch', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-color/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-date/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-email/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-file/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-number/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-password/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-password/show-password', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-radio/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-radio/horizontal', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-range/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-text/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('input-text/focus', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('kolibri/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('link-button/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('link-group/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('link-group/horizontal', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('link/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('link/icons', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('link/image', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('link/target', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('logo/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('modal/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('nav/aria-current', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('nav/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('nav/horizontal', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('pagination/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('progress/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('quote/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('quote/block', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('select/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('skip-nav/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('spin/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('spin/custom', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('spin/cycle', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('split-button/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('table/render-cell', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('table/column-alignment', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('table/sort-data', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('tabs/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('tabs/icons-only', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('textarea/adjust-height', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('textarea/basic', {
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('textarea/resize', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('textarea/rows', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('textarea/with-counter', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('toast/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('version/basic', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
ROUTES.set('version/context', {
	axe: {
		skipFailures: false,
	},
	snapshot: {
		zoom: {
			skip: true,
		},
	},
});
