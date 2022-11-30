import { KoliBriDevHelper, setEventTargetAndStopPropagation } from '../../utils/prop.validators';

export const propergateResetEventToForm = (
	options: {
		form?: HTMLElement | ParentNode | null;
		ref?: HTMLElement;
	} = {}
): void => {
	while (options.form instanceof HTMLElement && options.form.tagName !== 'FORM' && options.form.tagName !== 'KOL-FORM') {
		if (options.form.parentElement instanceof HTMLElement) {
			options.form = options.form.parentElement;
		} else if (options.form.parentNode instanceof ShadowRoot) {
			options.form = options.form.parentNode.host;
		} else {
			options.form = null;
		}
	}
	if (options.form instanceof HTMLElement) {
		const event = new Event('reset', {
			bubbles: true,
			cancelable: true,
		});
		if (options.form.tagName === 'FORM') {
			setEventTargetAndStopPropagation(event, options.form);
			options.form.dispatchEvent(event);
		} else if (options.form.tagName === 'KOL-FORM') {
			setEventTargetAndStopPropagation(event, KoliBriDevHelper.querySelector('form', options.form) as HTMLFormElement);
			const kolForm = options.form as HTMLKolFormElement;
			if (typeof kolForm._on === 'object' && typeof kolForm._on !== null && typeof kolForm._on.onReset === 'function') {
				kolForm._on.onReset(event);
			}
		}
	}
};

export const propergateSubmitEventToForm = (
	options: {
		form?: HTMLElement | ParentNode | null;
		ref?: HTMLElement;
	} = {}
): void => {
	while (options.form instanceof HTMLElement && options.form.tagName !== 'FORM' && options.form.tagName !== 'KOL-FORM') {
		if (options.form.parentElement instanceof HTMLElement) {
			options.form = options.form.parentElement;
		} else if (options.form.parentNode instanceof ShadowRoot) {
			options.form = options.form.parentNode.host;
		} else {
			options.form = null;
		}
	}
	if (options.form instanceof HTMLElement) {
		const event = new SubmitEvent('submit', {
			bubbles: true,
			cancelable: true,
			submitter: options.form,
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
		if (options.form.tagName === 'FORM') {
			setEventTargetAndStopPropagation(event, options.form);
			options.form.dispatchEvent(event);
		} else if (options.form.tagName === 'KOL-FORM') {
			setEventTargetAndStopPropagation(event, KoliBriDevHelper.querySelector('form', options.form) as HTMLFormElement);
			const kolForm = options.form as HTMLKolFormElement;
			if (typeof kolForm._on === 'object' && typeof kolForm._on !== null && typeof kolForm._on.onSubmit === 'function') {
				kolForm._on.onSubmit(event);
			}
		}
	}
};
