import type { KolFocusOptions } from '../../../schema';
import { detailsCallbacksProp, disabledProp, labelProp, levelProp, openProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration for the details component.
 *
 * `label` is the only required prop. All others are optional.
 *
 * Notes on prop choices:
 * - `labelProp` (not `labelWithExpertSlotProp`): the details label labels the toggle button and
 *   has no expert slot. It keeps the shared 2–80 character validation and accessibility hints.
 * - `openProp`: the toggle state. The public `_open` prop stays mutable and reflected on the web
 *   component; the render prop mirrors it for the functional component.
 */
export const detailsPropsConfig = {
	optional: [detailsCallbacksProp, disabledProp, levelProp, openProp],
	required: [labelProp],
} as const satisfies PropsConfigShape;

export type DetailsApi = ApiFromConfig<
	typeof detailsPropsConfig,
	{
		Callbacks: {
			/**
			 * Click handler bound to the heading toggle button. Implemented by the web component,
			 * which flips the mutable `_open` prop and — delayed so the reflected attribute is
			 * already updated — dispatches the custom `KolEvent.toggle` event on the host element
			 * and invokes the consumer's `onToggle` callback.
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
