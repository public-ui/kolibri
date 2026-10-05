import type { FormFieldLabelInfoPopoverProps } from '../../schema';
import type { SimpleProp } from './helpers/factory';
import { createPropDefinition } from './helpers/factory';

/**
 * Info popover prop for form fields
 *
 * Description:
 * The props of a popover button that the field renders next to its label, for additional
 * information on the field. The object is passed on to the popover button as it is.
 */
export type InfoPopoverProp = SimpleProp<'infoPopover', FormFieldLabelInfoPopoverProps>;

function normalizeInfoPopover(value: unknown): FormFieldLabelInfoPopoverProps | never {
	if (typeof value === 'object' && value !== null) {
		return value as FormFieldLabelInfoPopoverProps;
	}
	throw new Error(`Invalid info popover: ${typeof value}`);
}

// The default is `undefined`: without an info popover the label renders no popover button.
export const infoPopoverProp = createPropDefinition<InfoPopoverProp>(
	'infoPopover',
	undefined as unknown as FormFieldLabelInfoPopoverProps,
	normalizeInfoPopover,
);
