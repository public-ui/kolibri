import type { AlignPropType } from '../../../schema/props/align-options';
import { alignPropTypeOptions } from '../../../schema/props/align-options';
import { isEnumOption, normalizeString } from './normalizers';

/**
 * Normalizer of the alignment props `_align`, `_tooltipAlign` and `_popoverAlign`: they share the
 * values 'top' | 'right' | 'bottom' | 'left'. Any other value throws, so it is ignored with a warning.
 */
export const createAlignNormalizer =
	(propName: string) =>
	(value: unknown): AlignPropType => {
		const str = normalizeString(value);
		if (isEnumOption(str, alignPropTypeOptions)) {
			return str;
		}
		throw new Error(`Invalid ${propName} value: ${str}`);
	};
