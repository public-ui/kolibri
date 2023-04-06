import { devHint } from '../../utils/a11y.tipps';
import { getExperimalMode } from '../../utils/dev.utils';
import { KoliBriDevHelper, setEventTarget } from '../../utils/prop.validators';

const searchFormElement = (el?: HTMLElement | ParentNode | null): HTMLElement | ParentNode | null | undefined => {
	if (getExperimalMode()) {
		devHint(`↓ Search form element start.`);
		console.log(el);
	}
	while (el instanceof HTMLElement && el.tagName !== 'FORM' && el.tagName !== 'KOL-FORM') {
		if (el.parentElement instanceof HTMLElement) {
			el = el.parentElement;
		} else if (el.parentNode instanceof ShadowRoot) {
			el = el.parentNode.host;
		} else {
			el = null;
		}
		if (getExperimalMode()) {
			console.log(el);
		}
	}
	if (getExperimalMode()) {
		devHint(`↑ Search form element finished.`);
	}
	return el;
};

export const propagateResetEventToForm = (
	options: {
		form?: HTMLElement | ParentNode | null;
		ref?: HTMLElement;
	} = {}
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
			const kolForm = form as HTMLKolFormElement;
			if (typeof kolForm._on === 'object' && typeof kolForm._on !== null && typeof kolForm._on.onReset === 'function') {
				kolForm._on.onReset(event);
			}
		}
	}
};

export const propagateSubmitEventToForm = (
	options: {
		form?: HTMLElement | ParentNode | null;
		ref?: HTMLElement;
	} = {}
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
		} else if (form.tagName === 'KOL-FORM') {
			setEventTarget(event, KoliBriDevHelper.querySelector('form', form) as HTMLFormElement);
			const kolForm = form as HTMLKolFormElement;
			if (typeof kolForm._on === 'object' && typeof kolForm._on !== null && typeof kolForm._on.onSubmit === 'function') {
				kolForm._on.onSubmit(event);
			}
		}
	}
};
