import { alertProp, alertTypeProp, alertVariantProp, hasCloserProp, labelProp, levelProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';

/**
 * Props configuration for the alert component.
 *
 * All props are optional — an alert without a label renders icon and content only.
 *
 * Notes on prop choices:
 * - `labelProp` (not `labelWithExpertSlotProp`): the alert has no expert slot. It keeps the shared
 *   2–80 character validation and accessibility hints; the empty string renders no heading.
 * - `alertProp`: renders `role="alert"` so screen readers announce the notification assertively.
 * - `alertTypeProp`/`alertVariantProp`: enum props selecting icon/color scheme and presentation.
 * - `_on` is deliberately absent: it is never rendered. The web component reads the raw prop in
 *   its closer handler (invoking `onClose` and dispatching `KolEvent.close`), so it stays a raw
 *   `@Prop` there — the same pass-through pattern `button/api.tsx` uses for `_value`.
 */
export const alertPropsConfig = {
	optional: [alertProp, alertTypeProp, alertVariantProp, hasCloserProp, labelProp, levelProp],
} as const satisfies PropsConfigShape;

export type AlertApi = ApiFromConfig<
	typeof alertPropsConfig,
	{
		Callbacks: {
			/**
			 * Click handler bound to the closer button. Implemented by the web component, which
			 * invokes the consumer's `onClose` callback and dispatches the custom `KolEvent.close`
			 * event on the host element.
			 */
			closerClick: () => void;
		};
		States: {
			/**
			 * DOM id of the heading, referenced by the content's aria-describedby attribute.
			 * Generated once per web component instance — unique even when several alerts render
			 * into the same shadow root (toast container, form).
			 */
			headingId: string;
		};
	}
>;
