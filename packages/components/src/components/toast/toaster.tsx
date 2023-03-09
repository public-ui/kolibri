import { AlertType } from '../../types/alert';

type Toast = {
	heading: string;
	description: string;
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
		this.toastElement.setAttribute('_heading', data.heading);
		this.toastElement.setAttribute('_show', 'true');
		this.toastElement.setAttribute('_type', data.type);
		this.toastElement.innerText = data.description;
		this.isOpen = true;
	}
}
