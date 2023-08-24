import { LabelPropType } from '../../types/props/label';
import { AlertType } from '../alert/types';

export type Toast = {
	description: string;
	label: LabelPropType;
	type: AlertType;
};

export class ToasterService {
	private static readonly instances: Map<Document, ToasterService> = new Map<Document, ToasterService>();

	private toastContainerElement?: HTMLKolToastContainerElement;

	private constructor(private readonly document: Document) {
		this.toastContainerElement = this.document.createElement('kol-toast-container');
		this.document.body.prepend(this.toastContainerElement);
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
		const element = this.toastContainerElement;
		if (element) {
			this.toastContainerElement = undefined;
			element.remove();
		} else {
			console.warn('Toaster service is already disposed.');
		}
	}

	public async enqueue(toast: Toast) {
		await this.toastContainerElement?.enqueue(toast);
	}
}
