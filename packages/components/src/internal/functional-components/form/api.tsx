import type { KolFocusOptions } from '../../../schema';
import { errorListProp, formCallbacksProp, requiredTextProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';
import type { FormErrorLinkItem } from './error-link-item';

/**
 * Props configuration for the form component.
 *
 * All three props are optional. Notes on prop choices:
 * - `requiredTextProp` normalizes to `boolean | string`: `true` renders the translated
 *   mandatory-fields hint, a non-empty string replaces it, everything else renders no hint.
 * - `errorListProp` validates the entries against `ErrorListPropType`; the predecessor's
 *   validator could never pass and its result never reached the renderer (see the prop file).
 * - `formCallbacksProp` carries `onReset`/`onSubmit`. They are not rendered — the web component
 *   invokes them from its own handlers, which also dispatch the `KolEvent` DOM events.
 */
export const formPropsConfig = {
	optional: [errorListProp, formCallbacksProp, requiredTextProp],
} as const satisfies PropsConfigShape;

export type FormApi = ApiFromConfig<
	typeof formPropsConfig,
	{
		Callbacks: {
			/**
			 * Reset handler bound to the form element. Implemented by the web component, which
			 * prevents the default, invokes `_on.onReset` and dispatches `KolEvent.reset` on the host.
			 */
			reset: (event: Event) => void;
			/**
			 * Submit handler bound to the form element. Implemented by the web component, which
			 * prevents the default, invokes `_on.onSubmit` and dispatches `KolEvent.submit` on the
			 * host.
			 */
			submit: (event: Event) => void;
		};
		Methods: {
			focusErrorList: (options?: KolFocusOptions) => void;
		};
		States: {
			/**
			 * Orchestration records for the error-list links (everything `LinkFC` needs, built by
			 * `createFormErrorLinkItem`), rebuilt whenever `_errorList` changes.
			 */
			errorLinkItems: FormErrorLinkItem[];
		};
	}
>;
