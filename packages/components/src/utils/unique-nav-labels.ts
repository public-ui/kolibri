import { Log } from './dev.utils';

/**
 * There can be several navigations on one page (e.g. main navigation, subnavigation, breadcrumbs, pagination).
 * The navigations must be clearly named for accessibility reasons. To ensure this, all Aria labels are
 * stored in a set and checked for uniqueness.
 */
const UNIQUE_LABELS: Set<string> = new Set();

export function addNavLabel(ariaLabel: string): void {
	if (UNIQUE_LABELS.has(ariaLabel)) {
		Log.error(`There already is a nav element with the label "${ariaLabel}"`, { forceLog: true });
	} else {
		UNIQUE_LABELS.add(ariaLabel);
	}
}
export function removeNavLabel(ariaLabel: string): void {
	UNIQUE_LABELS.delete(ariaLabel);
}
