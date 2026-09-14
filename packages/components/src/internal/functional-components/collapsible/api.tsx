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
			 * Click handler bound to the heading toggle button. Implemented by the web component,
			 * which flips the mutable `_open` prop and — delayed so the reflected attribute is
			 * already updated — dispatches the custom `KolEvent.click`/`KolEvent.toggle` events on
			 * the host element and invokes the consumer's `onClick`/`onToggle` callbacks.
			 */
			toggle: (event: MouseEvent) => void;
		};
		Methods: {
			click: () => void;
			focus: (options?: KolFocusOptions) => void;
		};
		Refs: {
			headingButton: HTMLKolButtonWcElement;
		};
		States: {
			/**
			 * DOM id of the collapsible content region, referenced by the toggle button's
			 * aria-controls attribute. Derived once per web component instance.
			 */
			controlId: string;
			/**
			 * DOM id of the heading toggle button, referenced by the content region's
			 * aria-labelledby attribute. Derived once per web component instance.
			 */
			headingId: string;
		};
	}
>;

/**
 * The BEM blocks that render through `CollapsibleFC`.
 *
 * Both are registered in `schema/bem-registry.ts` with the identical element set
 * (`content`, `heading`, `heading-button`, `wrapper`, `wrapper-animation`, no modifiers), which is
 * what lets one functional component serve both: `keyof` over the union of their element maps is
 * still exactly those five names.
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
	 * Icon of the heading toggle button.
	 *
	 * `kol-accordion` swaps the chevron with the open state
	 * (`kolicon-chevron-down`/`kolicon-chevron-right`), while `kol-details` keeps
	 * `kolicon-chevron-right` and rotates it via CSS. Both are load-bearing for pixel parity with
	 * the themes, so the choice stays with the component.
	 */
	icons: IconsPropType;
	/** Additional class on the content region — `kol-details` adds `indented-text`. */
	contentClass?: string;
};
