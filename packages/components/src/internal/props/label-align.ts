import type { LabelAlignPropType } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { normalizeString } from './helpers/normalizers';

const labelAlignOptions: readonly LabelAlignPropType[] = ['left', 'right'];

/**
 * Label alignment prop of `kol-input-checkbox`
 *
 * Description:
 * Places the label after the checkbox (`right`, the default) or before it (`left`).
 */
export type LabelAlignProp = SimpleProp<'labelAlign', LabelAlignPropType>;
export const labelAlignProp = createPropDefinition<LabelAlignProp>('labelAlign', 'right', (value: unknown) => {
	const str = normalizeString(value);
	if (labelAlignOptions.includes(str as LabelAlignPropType)) {
		return str as LabelAlignPropType;
	}
	throw new Error(`Invalid label alignment: ${str}`);
});
