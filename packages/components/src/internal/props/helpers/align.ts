import type { AlignPropType } from '../../../schema/props/align-options';
import { alignPropTypeOptions } from '../../../schema/props/align-options';
import type { ExtractPropKey, InternalPropValue, PropDefinition, SimpleProp } from './factory';
import { createPropDefinition } from './factory';
import { isEnumOption, normalizeString } from './normalizers';

/**
 * An alignment prop (`_align`, `_tooltipAlign`, `_popoverAlign`) with the values
 * 'top' | 'right' | 'bottom' | 'left' and the default of its component. Any other value is ignored
 * with a warning that names `propName`.
 */
export function createAlignPropDefinition<P extends SimpleProp<string, AlignPropType>>(
	propName: ExtractPropKey<P>,
	defaultValue: InternalPropValue<P>,
): PropDefinition<InternalPropValue<P>, P> {
	return createPropDefinition<P>(propName, defaultValue, (value) => {
		const str = normalizeString(value);
		if (isEnumOption(str, alignPropTypeOptions)) {
			return str as InternalPropValue<P>;
		}
		throw new Error(`Invalid ${propName} value: ${str}`);
	});
}
