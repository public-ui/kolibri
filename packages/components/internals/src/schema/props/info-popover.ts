import type { PopoverButtonProps } from '../components';
import type { IconsPropType } from './icons';

/* types */
/**
 * Props of the popover button that a form field renders next to its label.
 */
export type FormFieldLabelInfoPopoverProps = Omit<PopoverButtonProps, '_icons' | '_hideLabel' | '_inline'> & {
	_content: string;
	_icons: IconsPropType;
};
