import type { KolFocusOptions } from '../../../schema';
import { cardCallbacksProp, hasCloserProp, labelProp, levelProp, linkTargetProp, optionalHrefProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration for the card component.
 *
 * Notes on prop choices:
 * - `optionalHrefProp`, not `hrefProp`: a card without a link target is the normal case, so the
 *   required variant's dev warning would fire on almost every card.
 * - `labelProp`, not `labelWithExpertSlotProp`: the card renders its label as a heading and has
 *   no expert slot for it.
 */
export const cardPropsConfig = {
	required: [labelProp],
	optional: [cardCallbacksProp, hasCloserProp, levelProp, linkTargetProp, optionalHrefProp],
} as const satisfies PropsConfigShape;

export type CardApi = ApiFromConfig<
	typeof cardPropsConfig,
	{
		/**
		 * `blur` and `focus` belong to the heading link — the only element the card's own `_on`
		 * callbacks describe. `close` is the close button's click.
		 */
		Callbacks: {
			blur: (event: FocusEvent) => void;
			close: (event: MouseEvent) => void;
			focus: (event: FocusEvent) => void;
		};
		Methods: {
			click: () => void;
			focus: (options?: KolFocusOptions) => void;
		};
		Refs: {
			closeButton: HTMLButtonElement;
			cta: HTMLAnchorElement;
			tooltip: HTMLDivElement;
		};
		States: {
			/**
			 * DOM id of the close button's visually-hidden description span, required by `ButtonFC`.
			 * Unused while the close button carries no aria description.
			 */
			ariaDescriptionId: string;
			/**
			 * DOM id of the heading, referenced by the `<article>`'s `aria-labelledby`. Generated
			 * per instance, or supplied by a component that composes `CardFC` and points its own
			 * `aria-labelledby` at the same heading — as dialog and drawer do.
			 */
			headingId: string;
		};
	}
>;
