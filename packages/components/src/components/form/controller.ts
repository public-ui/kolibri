import type { FormProps } from '@public-ui/schema';
import { devHint, getExperimentalMode, KoliBriDevHelper, setEventTarget } from '@public-ui/schema';

const searchFormElement = (el?: HTMLElement | ParentNode | null): HTMLElement | ParentNode | null | undefined => {
	if (getExperimentalMode()) {
		devHint(`↓ Search form element start.`);
		console.log(el);
	}
	while (el instanceof HTMLElement && el.tagName !== 'FORM' && el.tagName !== 'KOL-FORM') {
		try {
			if (el.parentElement instanceof HTMLElement) {
				el = el.parentElement;
			} else if (el.parentNode instanceof ShadowRoot) {
				el = el.parentNode.host;
			} else {
				el = null;
			}
		} catch (error) {
			/**
			 * Try is needed for SSR.
			 * - no HTMLElement is available
			 * - no ShadowRoot is available
			 */
		}
		if (getExperimentalMode()) {
			console.log(el);
			devHint(`↑ Search form element finished.`);
		}
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
		} else if (form.tagName === 'KOL-FORM') {
			setEventTarget(event, KoliBriDevHelper.querySelector('form', form) as HTMLFormElement);
			const kolForm = form as FormProps;
			if (typeof kolForm._on?.onReset === 'function') {
				typeof kolForm._on?.onReset(event);
			}
		}
	}
};

export const propagateSubmitEventToForm = (
	options: {
		form?: HTMLElement | ParentNode | null;
		ref?: HTMLElement;
	} = {},
): void => {
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
			setEventTarget(event, form);
			form.dispatchEvent(event);
			if (getExperimentalMode() && (form as HTMLFormElement).noValidate === false) {
				devHint(`If you have not focusable or hidden form fields in your form, you should enable noValidate for your form.`, {
					force: true,
				});
				// (form as HTMLFormElement).noValidate = true; do not make this implicit
			}
			if (typeof (form as HTMLFormElement).requestSubmit === 'function') {
				// See https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/requestSubmit
				(form as HTMLFormElement).requestSubmit();
			}
		} else if (form.tagName === 'KOL-FORM') {
			setEventTarget(event, KoliBriDevHelper.querySelector('form', form) as HTMLFormElement);
			const kolForm = form as FormProps;
			if (typeof kolForm._on?.onSubmit === 'function') {
				kolForm._on?.onSubmit(event);
			}
		}
	}
};
