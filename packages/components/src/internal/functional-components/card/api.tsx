import type { KolFocusOptions } from '../../../schema';
import { cardCallbacksProp, hasCloserProp, hrefProp, labelLangSegmentsProp, levelProp, linkTargetProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration for the card component.
 *
 * Notes on prop choices:
 * - `hrefProp` in the optional array: a card without a link target is the normal case, so the
 *   config slot keeps the required warning off (requiredness follows the slot).
 * - `labelLangSegmentsProp`, not `labelWithExpertSlotProp`: the card renders its label as a heading and has
 *   no expert slot for it.
 */
export const cardPropsConfig = {
	required: [labelLangSegmentsProp],
	optional: [cardCallbacksProp, hasCloserProp, hrefProp, levelProp, linkTargetProp],
} as const satisfies PropsConfigShape;

export type CardApi = ApiFromConfig<
	typeof cardPropsConfig,
	{
		Callbacks: {
			/**
			 * `blur` and `focus` belong to the heading link — the only element the card's own
			 * `_on` callbacks describe. They stay unset when the card renders no link: a
			 * consumer that passes no `href` has no anchor to observe. `close` is the close
			 * button's click.
			 */
			blur?: (event: FocusEvent) => void;
			close: (event: MouseEvent) => void;
			focus?: (event: FocusEvent) => void;
		};
		Methods: {
			click: () => void;
			focus: (options?: KolFocusOptions) => void;
		};
		Refs: {
			closeButton: HTMLButtonElement;
			/** The heading link's anchor; it only exists when the card renders a link. */
			cta?: HTMLAnchorElement;
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
