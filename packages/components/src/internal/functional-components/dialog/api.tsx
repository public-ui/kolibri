import { dialogCallbacksProp, labelProp, levelProp, variantDialogProp, widthProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration for the dialog component.
 *
 * Notes on prop choices:
 * - `labelProp`, not `labelWithExpertSlotProp`: the label is either the `aria-label` of the blank
 *   variant or the card's heading text — neither has an expert slot.
 * - `levelProp` only reaches the card variant's heading; the blank variant renders no heading.
 */
export const dialogPropsConfig = {
	required: [labelProp],
	optional: [dialogCallbacksProp, levelProp, variantDialogProp, widthProp],
} as const satisfies PropsConfigShape;

export type DialogApi = ApiFromConfig<
	typeof dialogPropsConfig,
	{
		/** Both callbacks handle the native events of the `<dialog>` element. */
		Callbacks: {
			cancel: (event: Event) => void;
			close: (event: Event) => void;
		};
		Methods: {
			close: () => void;
			closeModal: () => void;
			openModal: () => void;
			show: (modal?: boolean) => void;
			showModal: () => void;
		};
		Refs: {
			dialog: HTMLDialogElement;
		};
		States: {
			/**
			 * DOM id of the close button's visually-hidden description span, required by the card
			 * variant's `ButtonFC`. Unused while that button carries no aria description.
			 */
			ariaDescriptionId: string;
			/**
			 * DOM id of the card variant's heading, referenced by the `<dialog>`'s
			 * `aria-labelledby`. Generated per instance.
			 */
			headingId: string;
			/**
			 * Whether the dialog is currently shown modally. Drives `aria-modal` and is set by
			 * `show()`/`showModal()`.
			 */
			modal: boolean;
		};
	}
>;
