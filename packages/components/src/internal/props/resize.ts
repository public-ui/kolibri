import type { TextareaResizePropType } from '../../schema';
import { textareaResizeOptions } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';
import { isEnumOption, normalizeString } from './helpers/normalizers';

/**
 * Resize prop of the textarea
 *
 * Description:
 * Whether the user can resize the textarea vertically (`'vertical'`) or not at all (`'none'`).
 */
export type ResizeProp = SimpleProp<'resize', TextareaResizePropType>;

function normalizeResize(value: unknown): TextareaResizePropType {
	const str = normalizeString(value);
	if (isEnumOption(str, textareaResizeOptions)) {
		return str;
	}
	throw new Error(`Invalid resize option: ${str}`);
}

export const resizeProp = createPropDefinition<ResizeProp>('resize', 'vertical', normalizeResize);
