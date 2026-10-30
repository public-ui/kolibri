import type { LabelPropType } from '../schema';
import { Log, trimLabel } from '../schema';

/**
 * There can be several navigations on one page (e.g. main navigation, subnavigation, breadcrumbs, pagination).
 * The navigations must be clearly named for accessibility reasons. To ensure this, all Aria labels are
 * stored in a set and checked for uniqueness.
 */
const UNIQUE_LABELS: Set<string> = new Set();

export function addNavLabel(ariaLabel: LabelPropType): void {
	const trimmedLabel = trimLabel(ariaLabel);
	if (UNIQUE_LABELS.has(trimmedLabel)) {
		Log.warn(`There already is a nav element with the label "${trimmedLabel}"`);
	} else {
		UNIQUE_LABELS.add(trimmedLabel);
	}
}
export function removeNavLabel(ariaLabel: LabelPropType): void {
	const trimmedLabel = trimLabel(ariaLabel);
	UNIQUE_LABELS.delete(trimmedLabel);
}
