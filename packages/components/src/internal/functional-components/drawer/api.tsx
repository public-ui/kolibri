import { alignProp, drawerCallbacksProp, hasCloserProp, labelProp, levelProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration for the drawer component.
 *
 * Notes on prop choices:
 * - `alignProp`: the edge the drawer slides in from. Its `'top'` default is the drawer's too.
 * - `labelProp`, not `labelWithExpertSlotProp`: the label is the heading of the card the drawer
 *   wraps its content in, and that heading has no expert slot.
 * - `openProp` is deliberately absent: `show()`, `showModal()` and `close()` move the drawer
 *   without touching the `_open` prop, so the open state has to re-render the component on its
 *   own. It lives in {@link DrawerApi} states as `expanded` instead.
 */
export const drawerPropsConfig = {
	required: [labelProp],
	optional: [alignProp, drawerCallbacksProp, hasCloserProp, levelProp],
} as const satisfies PropsConfigShape;

export type DrawerApi = ApiFromConfig<
	typeof drawerPropsConfig,
	{
		Callbacks: {
			/**
			 * Animation handler on the sliding wrapper. The drawer closes its `<dialog>` only once
			 * the slide-out animation has finished, so the panel stays visible while it plays.
			 */
			animationEnd: (event: AnimationEvent) => void;
			/** Both handle the native events of the `<dialog>` element. */
			cancel: (event: Event) => void;
			close: (event: Event) => void;
		};
		Methods: {
			close: () => void;
			open: () => void;
			show: (modal?: boolean) => void;
			showModal: () => void;
		};
		Refs: {
			dialog: HTMLDialogElement;
			/**
			 * The sliding wrapper — the element the themes animate. The web component reads its
			 * computed `animation-name` to tell a themed drawer, which closes after its animation,
			 * from an unstyled one, which closes right away.
			 */
			wrapper: HTMLDivElement;
		};
		States: {
			/**
			 * DOM id of the close button's visually-hidden description span, required by the card's
			 * `ButtonFC`. Unused while that button carries no aria description.
			 */
			ariaDescriptionId: string;
			/**
			 * DOM id of the card's heading, referenced by the `<dialog>`'s `aria-labelledby`.
			 * Generated per instance.
			 */
			headingId: string;
			/**
			 * Whether the drawer is currently shown modally. Drives `aria-modal` and is set by
			 * `show()`/`showModal()`.
			 */
			modal: boolean;
			/**
			 * Whether the drawer is open. Seeded from the `_open` prop and moved by the public
			 * methods; drives the wrapper's `--open`/`--is-closing` modifiers and therefore the
			 * slide animation.
			 *
			 * Named `expanded` rather than `open` because the deprecated `open()` method already
			 * occupies that member name on the web component.
			 */
			expanded: boolean;
		};
	}
>;
