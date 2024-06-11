import { LabelPropType } from '../../types/props/label';
import { AlertType } from '../alert/types';
import { KolToastTag } from '../../core/component-names';
import { Log } from '../../utils/dev.utils';

type Toast = {
	description: string;
	/**
	 * @deprecated Use label.
	 */
	heading?: string;
	label?: LabelPropType;
	type: AlertType;
};

/**
 * @deprecated Use toast/toaster.tsx
 */
export class ToasterService {
	private static readonly instances: Map<Document, ToasterService> = new Map<Document, ToasterService>();

	private toastElement?: HTMLKolToastElement;

	private readonly queue: Set<Toast> = new Set();

	private isOpen = false;

	private constructor(private readonly document: Document) {
		this.toastElement = this.document.createElement(KolToastTag);
		this.toastElement.setAttribute('_level', '0');
		this.toastElement.setAttribute('_show', 'false');
		this.toastElement.setAttribute('_show-duration', '-1'); // @deprecated in v2
		this.toastElement.setAttribute('_has-closer', 'true');
		this.toastElement._on = {
			onClose: () => {
				const next = this.queue.values().next();
				if (next.value) {
					this.queue.delete(next.value as Toast);
					setTimeout(() => {
						this.showToast(next.value as Toast);
					}, 200);
				} else {
					this.isOpen = false;
				}
			},
		};
		this.document.body.insertBefore(this.toastElement, this.document.body.firstChild);
	}

	/**
	 * Get a toaster for the specified document environment. Each environment has exactly one instance of the service.
	 */
	public static getInstance(document: Document) {
		let instance = this.instances.get(document);
		if (!instance) {
			instance = new ToasterService(document);
			this.instances.set(document, instance);
		}
		return instance;
	}

	public dispose() {
		const element = this.toastElement;
		if (element) {
			this.toastElement = undefined;
			this.queue.clear();
			element.remove();

			const on = element._on;
			if (on && on.onClose) {
				on.onClose(new Event('dispose'));
			}
		} else {
			Log.warn('Toaster service is already disposed.', { forceLog: true });
		}
	}

	/**
	 * Reiht einen neuen Toast in die Warteschlange ein, um ihn anzuzeigen.
	 */
	public enqueue(data: Toast): void {
		if (this.isOpen) {
			this.queue.add(data);
		} else {
			this.showToast(data);
		}
	}

	private showToast(data: Toast): void {
		const label = data.label || data.heading;

		if (typeof label === 'undefined') {
			// TODO v2: Make label required, remove this check.
			throw new Error('Toast requires a label.');
		}

		if (!this.toastElement) {
			Log.warn('Tried to show a new toast at a disposed toaster service!', { forceLog: true });
			return;
		}
		this.toastElement.setAttribute('_label', label);
		this.toastElement.setAttribute('_show', 'true');
		this.toastElement.setAttribute('_type', data.type);
		this.toastElement.innerText = data.description;
		this.isOpen = true;
	}
}
