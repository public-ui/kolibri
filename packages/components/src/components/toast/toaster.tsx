import { LabelPropType } from '../../types/props/label';
import { AlertType } from '../alert/types';

type Toast = {
	description: string;
	/**
	 * @deprecated Use label.
	 */
	heading?: string;
	label?: LabelPropType;
	type: AlertType;
};

export class ToasterService {
	private readonly toastElement: HTMLKolToastElement;

	private readonly queue: Set<Toast> = new Set();

	private isOpen = false;

	constructor(private readonly document: Document) {
		this.toastElement = this.document.createElement('kol-toast');
		this.toastElement.setAttribute('_level', '3');
		this.toastElement.setAttribute('_show', 'false');
		this.toastElement.setAttribute('_show-duration', '-1');
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

		this.toastElement.setAttribute('_label', label);
		this.toastElement.setAttribute('_show', 'true');
		this.toastElement.setAttribute('_type', data.type);
		this.toastElement.innerText = data.description;
		this.isOpen = true;
	}
}

export const Toaster = new ToasterService(document);
