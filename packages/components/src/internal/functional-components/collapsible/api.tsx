import type { IconsPropType, KolFocusOptions } from '../../../schema';
import { collapsibleCallbacksProp, disabledProp, labelProp, levelProp, openProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration shared by the collapsible components (`kol-accordion`, `kol-details`).
 *
 * `label` is the only required prop. All others are optional.
 *
 * Notes on prop choices:
 * - `labelProp` (not `labelWithExpertSlotProp`): the label labels the toggle button and has no
 *   expert slot. It keeps the shared 2–80 character validation and accessibility hints.
 * - `openProp`: the toggle state. The public `_open` prop stays mutable and reflected on the web
 *   component; the render prop mirrors it for the functional component.
 */
export const collapsiblePropsConfig = {
	optional: [collapsibleCallbacksProp, disabledProp, levelProp, openProp],
	required: [labelProp],
} as const satisfies PropsConfigShape;

export type CollapsibleApi = ApiFromConfig<
	typeof collapsiblePropsConfig,
	{
		Callbacks: {
			/**
			 * Click handler bound to the `<summary>` element. Implemented by the web component,
			 * which suppresses the user agent's own toggle (so the collapse can be animated), flips
			 * the mutable `_open` prop and — delayed so the reflected attribute is already updated —
			 * dispatches the custom `KolEvent.click`/`KolEvent.toggle` events on the host element
			 * and invokes the consumer's `onClick`/`onToggle` callbacks.
			 */
			toggle: (event: MouseEvent) => void;
		};
		Methods: {
			click: () => void;
			focus: (options?: KolFocusOptions) => void;
		};
		Refs: {
			/** The `<summary>` element — the disclosure control `focus()` and `click()` delegate to. */
			headingButton: HTMLElement;
		};
		States: {
			/**
			 * DOM id of the collapsible content region, referenced by the summary's aria-controls
			 * attribute. Derived once per web component instance.
			 */
			controlId: string;
			/**
			 * Whether the `open` attribute is set on `<details>`. Tracks {@link expanded}, except
			 * while collapsing: the attribute has to outlive the class so the user agent keeps the
			 * content rendered until the grid transition has finished.
			 */
			detailsOpen: boolean;
			/**
			 * Whether the collapsible is visually expanded — drives the `--open` block modifier
			 * and therefore the transition. Set one frame after {@link detailsOpen} when opening,
			 * so the transition has a from-state to start from.
			 */
			expanded: boolean;
			/**
			 * DOM id of the heading toggle button, referenced by the content region's
			 * aria-labelledby attribute. Derived once per web component instance.
			 */
			headingId: string;
			/**
			 * Duration of the open/close transition in milliseconds, from the theme's
			 * `collapsibleTransitionMs` feature flag. Rendered as the CSS custom property
			 * `--collapsible-transition-duration` on `<details>` so the stylesheet and the timer
			 * that keeps the `open` attribute alive share one value.
			 */
			transitionMs: number;
		};
	}
>;

/**
 * The BEM blocks that render through `CollapsibleFC`.
 *
 * Both are registered in `schema/bem-registry.ts` with the identical element set
 * (`content`, `heading`, `wrapper`, `wrapper-animation`) and modifier set (`disabled`, `open`),
 * which is what lets one functional component serve both: `keyof` over the union of their maps is
 * still exactly those names.
 */
export type CollapsibleBlock = 'kol-accordion' | 'kol-details';

/**
 * The per-component differences of the otherwise identical collapsible markup.
 *
 * These are neither public props nor component state, so they stay out of {@link CollapsibleApi}
 * and are passed as plain arguments by the rendering web component — the same way
 * `BemRootNodeFC` and `AriaDescriptionSpanFC` take their own local prop types.
 */
export type CollapsibleVariant = {
	/** BEM block of the rendering component. */
	block: CollapsibleBlock;
	/**
	 * Icon of the toggle control (`<summary>`). `kol-accordion` swaps it with the open state,
	 * `kol-details` keeps one icon and rotates it via CSS.
	 */
	icons: IconsPropType;
	/** Additional class on the content region — `kol-details` adds `indented-text`. */
	contentClass?: string;
};
