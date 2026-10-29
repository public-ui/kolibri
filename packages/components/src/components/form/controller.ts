import { KolFormTag } from '../../core/component-names';
import { devHint, getExperimentalMode, KoliBriDevHelper, Log, setEventTarget } from '../../schema';

const searchFormElement = (el?: HTMLElement | ParentNode | null): HTMLElement | ParentNode | null | undefined => {
	if (getExperimentalMode()) {
		devHint(`↓ Search form element start.`);
		Log.debug(el);
	}
	while (el instanceof HTMLElement && el.tagName !== 'FORM' && el.tagName !== KolFormTag.toUpperCase()) {
		try {
			if (el.parentElement instanceof HTMLElement) {
				el = el.parentElement;
			} else if (el.parentNode instanceof ShadowRoot) {
				el = el.parentNode.host;
			} else {
				el = null;
			}
		} catch {
			/**
			 * Try is needed for SSR.
			 * - no HTMLElement is available
			 * - no ShadowRoot is available
			 */
		}
		if (getExperimentalMode()) {
			Log.debug(el);
		}
	}
	if (getExperimentalMode()) {
		devHint(`↑ Search form element finished.`);
	}
	return el;
};

export const propagateResetEventToForm = (
	options: {
		form?: HTMLElement | ParentNode | null;
		ref?: HTMLElement;
	} = {},
): void => {
	const form = searchFormElement(options.form);
	if (form instanceof HTMLElement) {
		const event = new Event('reset', {
			bubbles: true,
			cancelable: true,
		});
		if (form.tagName === 'FORM') {
			setEventTarget(event, form);
			form.dispatchEvent(event);
		} else if (form.tagName === KolFormTag.toUpperCase()) {
			// Dispatch on the inner form element, so the kol-form submit/reset handling runs exactly like for a
			// native submit: it calls the `_on` callbacks and emits the DOM event (`reset`) on the host.
			const innerForm = KoliBriDevHelper.querySelector<HTMLFormElement>('form', form);
			if (innerForm) {
				setEventTarget(event, innerForm);
				innerForm.dispatchEvent(event);
			}
		}
	}
};

export const propagateSubmitEventToForm = (
	options: {
		form?: HTMLElement | ParentNode | null;
		ref?: HTMLElement;
		/** Decides after the triggering event has been dispatched completely whether the form is submitted. */
		shouldSubmit?: () => boolean;
	} = {},
): void => {
	const shouldSubmit = options.shouldSubmit ?? (() => true);
	const form = searchFormElement(options.form);
	if (form instanceof HTMLElement) {
		const event = new SubmitEvent('submit', {
			bubbles: true,
			cancelable: true,
			submitter: form,
		});
		/**
		 * TODO: Wenn Formular-Action (nicht Ajax oder JS) verwendet wird,
		 *       dann müssen wir das Event an das HTMLFormElement innerhalb
		 *       der HTMLKolFormElements propagieren, wenn kein onSubmit
		 *       gesetzt wurde.
		 *
		 * TODO: Form-associated custom elements:
		 *       - https://web.dev/more-capable-form-controls/
		 *       - https://github.com/public-ui/kolibri/issues/946
		 */
		if (form.tagName === 'FORM') {
			if (getExperimentalMode() && (form as HTMLFormElement).noValidate === false) {
				devHint(`If you have not focusable or hidden form fields in your form, you should enable noValidate for your form.`, {
					force: true,
				});
				// (form as HTMLFormElement).noValidate = true; do not make this implicit
			}
			// Use setTimeout to ensure onChange has been called first
			setTimeout(() => {
				if (!shouldSubmit()) {
					return;
				}
				// See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit
				if (typeof (form as HTMLFormElement).requestSubmit === 'function') {
					(form as HTMLFormElement).requestSubmit();
				} else {
					setEventTarget(event, form);
					form.dispatchEvent(event);
				}
			});
		} else if (form.tagName === KolFormTag.toUpperCase()) {
			// Dispatch on the inner form element, so the kol-form submit handling runs exactly like for a
			// native submit: it calls the `_on` callbacks and emits the DOM event (`submit`) on the host.
			const innerForm = KoliBriDevHelper.querySelector<HTMLFormElement>('form', form);
			if (innerForm) {
				setEventTarget(event, innerForm);
				// Use setTimeout to ensure onChange has been called first
				setTimeout(() => {
					if (shouldSubmit()) {
						innerForm.dispatchEvent(event);
					}
				});
			}
		}
	}
};

/** Whether a native picker of the input is open; `false` in a browser without the `:open` pseudo class. */
const isPickerOpen = (ref?: HTMLElement): boolean => {
	try {
		return ref?.matches(':open') ?? false;
	} catch {
		return false;
	}
};

/**
 * Enter submits the surrounding form like the implicit submission of a native form: not while an IME
 * composition is active, not when the default of the key event is prevented, and not when Enter opened a
 * native picker of the input (e.g. the calendar of a date input).
 */
export const submitFormOnEnter = (
	event: KeyboardEvent,
	options: {
		form?: HTMLElement | ParentNode | null;
		ref?: HTMLElement;
	},
): void => {
	if ((event.code === 'Enter' || event.code === 'NumpadEnter') && !event.isComposing) {
		propagateSubmitEventToForm({
			...options,
			shouldSubmit: () => !event.defaultPrevented && !isPickerOpen(options.ref),
		});
	}
};
