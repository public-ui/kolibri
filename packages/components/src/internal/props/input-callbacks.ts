import type { InputTypeOnDefault } from '../../schema';
import { createCallbacksPropDefinition } from './helpers/factory';

/**
 * Callbacks prop (`_on`) shared by all form fields. Every field declares the same
 * `InputTypeOnDefault`; the value passed to `onChange` and `onInput` differs per field at runtime.
 */
export const inputCallbacksProp = createCallbacksPropDefinition<InputTypeOnDefault>();
