import type { Toast, ToasterOptions } from '@public-ui/schema';
import { KolToastContainerTag } from '../../core/component-names';
import { isInitialized } from '../../core/bootstrap';

export class ToasterService {
	private static readonly instances: Map<Document, ToasterService> = new Map<Document, ToasterService>();

	private toastContainerElement?: HTMLKolToastContainerElement;

	private constructor(
		private readonly document: Document,
		private readonly options?: ToasterOptions,
	) {
		this.toastContainerElement = this.document.createElement(KolToastContainerTag);
		this.document.body.prepend(this.toastContainerElement);
	}

	/**
	 * Get a toaster for the specified document environment. Each environment has exactly one instance of the service.
	 */
	public static getInstance(document: Document, options?: ToasterOptions): ToasterService {
		if (!isInitialized()) {
			throw new Error('Toaster: Call KoliBri bootstrap/register method first.');
		}

		let instance = this.instances.get(document);
		if (!instance) {
			instance = new ToasterService(document, options);
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

	public enqueue(toast: Toast): Promise<() => void> | undefined {
		/**
		 * We need this condition for SSR. The toast container is not rendered on the server,
		 * so we can't enqueue toasts.
		 */
		if (this.toastContainerElement && typeof this.toastContainerElement.enqueue === 'function') {
			if (!toast.alertVariant && this.options?.defaultAlertVariant) {
				toast.alertVariant = this.options?.defaultAlertVariant;
			}

			return this.toastContainerElement.enqueue(toast);
		}
	}

	public closeAll(): void {
		if (this.toastContainerElement && typeof this.toastContainerElement.closeAll === 'function') {
			void this.toastContainerElement.closeAll();
		}
	}
}
