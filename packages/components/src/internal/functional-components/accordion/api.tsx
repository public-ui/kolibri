import type { KolFocusOptions } from '../../../schema';
import { accordionCallbacksProp, disabledProp, labelProp, levelProp, openProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration for the accordion component.
 *
 * `label` is the only required prop. All others are optional.
 *
 * Notes on prop choices:
 * - `labelProp` (not `labelWithExpertSlotProp`): the accordion label labels the toggle button and
 *   has no expert slot. It keeps the shared 2–80 character validation and accessibility hints.
 * - `openProp`: the toggle state. The public `_open` prop stays mutable and reflected on the web
 *   component; the render prop mirrors it for the functional component.
 */
export const accordionPropsConfig = {
	optional: [accordionCallbacksProp, disabledProp, levelProp, openProp],
	required: [labelProp],
} as const satisfies PropsConfigShape;

export type AccordionApi = ApiFromConfig<
	typeof accordionPropsConfig,
	{
		Callbacks: {
			/**
			 * Click handler bound to the heading toggle button. Implemented by the web component,
			 * which flips the mutable `_open` prop and — delayed so the reflected attribute is
			 * already updated — invokes the consumer's `onClick`/`onToggle` callbacks and dispatches
			 * the custom `KolEvent.click`/`KolEvent.toggle` events on the host element.
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
