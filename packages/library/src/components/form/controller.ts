import { setEventTargetAndStopPropagation } from '../../utils/prop.validators';

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
		setEventTargetAndStopPropagation(event, options.ref);
		if (options.form.tagName === 'FORM') {
			options.form.dispatchEvent(event);
		} else if (options.form.tagName === 'KOL-FORM') {
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
			submitter: options.ref,
		});
		setEventTargetAndStopPropagation(event, options.ref);
		// switch
		if (options.form.tagName === 'FORM') {
			options.form.dispatchEvent(event);
		} else if (options.form.tagName === 'KOL-FORM') {
			const kolForm = options.form as HTMLKolFormElement;
			if (typeof kolForm._on === 'object' && typeof kolForm._on !== null && typeof kolForm._on.onSubmit === 'function') {
				kolForm._on.onSubmit(event);
			}
		}
	}
};
