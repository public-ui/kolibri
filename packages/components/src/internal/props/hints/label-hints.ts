import { containsOnlyNumbers, hasEnoughReadableChars } from '../../../schema/props/label';
import { a11yHint, uiUxHint } from '../../../schema/utils/a11y.tipps';

/**
 * Hint callback for label properties to warn about accessibility and UX issues.
 *
 * Checks for:
 * - Labels with fewer than 3 readable characters (a11y issue)
 * - Labels exceeding 80 characters (UX issue)
 *
 * Numbers-only labels are excluded from the readable character check since they
 * may be valid in certain contexts (e.g., "123" as a version number).
 *
 * @param _propName - The name of the property (included for API consistency, not currently used)
 * @param value - The normalized label value to check
 */
export function labelHints(_propName: string, value: string): void {
	if (typeof value === 'string' && value !== '') {
		if (hasEnoughReadableChars(value, 3) === false && containsOnlyNumbers(value) === false) {
			a11yHint(`The heading or label ("${value}") is inaccessible. A label should consist of at least three readable characters.`);
		}
		if (value.length > 80) {
			uiUxHint(`A heading or label should not be longer than 80 characters.`);
		}
	}
}
