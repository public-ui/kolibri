import { isInitialized } from '../../core/bootstrap';
import { KolToastContainerTag } from '../../core/component-names';
import type { Toast, ToasterOptions } from '../../schema';
import { Log } from '../../schema';

/**
 * @deprecated Will be removed in the next major version.
 * For more information please refer to: https://public-ui.github.io/docs/components/toaster
 */
export class ToasterService {
	private static readonly instances: Map<Document, ToasterService> = new Map<Document, ToasterService>();

	private toastContainerElement?: HTMLKolToastContainerElement;

	private constructor(
		private readonly document: Document,
		private readonly options?: ToasterOptions,
	) {
		this.toastContainerElement = this.document.createElement(KolToastContainerTag);
		this.document.body.prepend(this.toastContainerElement);
		if (this.options?.defaultVariant) {
			Log.info(`ToasterService: Default variant is deprecated. Use 'card' variant for all toasts instead.`);
		}
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
			Log.warn('Toaster service is already disposed.');
		}
	}

	public enqueue(toast: Toast): Promise<() => void> | undefined {
		/**
		 * We need this condition for SSR. The toast container is not rendered on the server,
		 * so we can't enqueue toasts.
		 */
		if (this.toastContainerElement && typeof this.toastContainerElement.enqueue === 'function') {
			return this.toastContainerElement.enqueue(toast);
		}
	}

	public closeAll(immediate: boolean = false): void {
		/**
		 * We need this condition for SSR. The toast container is not rendered on the server,
		 * so we can't enqueue toasts.
		 */
		if (this.toastContainerElement && typeof this.toastContainerElement.closeAll === 'function') {
			void this.toastContainerElement.closeAll(immediate);
		}
	}
}
