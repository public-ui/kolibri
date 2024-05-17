import { Log, getDocument } from '../../schema';

type ModalContext = {
	activeElement?: HTMLElement;
};

type LockedElementContext = {
	tabIndex?: string;
};

/**
 * The modal service is only working client-side!
 */
export class ModalService {
	private lockedElements: Map<HTMLElement, LockedElementContext> = new Map();
	private modalStack: Map<HTMLElement, ModalContext> = new Map();

	private lockElement(htmlElement: HTMLElement) {
		const tabIndex: string | null = htmlElement.getAttribute('tabindex');
		if (
			htmlElement instanceof HTMLAnchorElement ||
			htmlElement instanceof HTMLButtonElement ||
			htmlElement instanceof HTMLInputElement ||
			htmlElement instanceof HTMLSelectElement ||
			htmlElement instanceof HTMLTextAreaElement ||
			typeof tabIndex === 'string' ||
			htmlElement.dataset.kolModal !== undefined
		) {
			if (typeof tabIndex === 'string') {
				this.lockedElements.set(htmlElement, {
					tabIndex,
				});
			} else {
				this.lockedElements.set(htmlElement, {});
			}
			htmlElement.setAttribute('tabindex', '-1');
			htmlElement.setAttribute('aria-hidden', 'true');
			htmlElement.style.userSelect = 'none';
		}
	}

	private unlockElement(value: LockedElementContext, htmlElement: HTMLElement) {
		if (typeof value.tabIndex === 'string') {
			htmlElement.setAttribute('tabindex', value.tabIndex);
		} else {
			htmlElement.removeAttribute('tabindex');
		}
		htmlElement.removeAttribute('aria-hidden');
		htmlElement.style.userSelect = 'unset';
		this.lockedElements.delete(htmlElement);
	}

	private unlockLockedElements(lockedElements: Map<HTMLElement, LockedElementContext>) {
		lockedElements.forEach(this.unlockElement.bind(this));
	}

	private lockFocus(hostElement: HTMLElement | ShadowRoot | null, excludeElement?: HTMLElement) {
		try {
			if (hostElement !== excludeElement && (hostElement instanceof HTMLElement || hostElement instanceof ShadowRoot)) {
				if (hostElement instanceof HTMLElement) {
					this.lockElement(hostElement);
					this.lockFocus(hostElement.shadowRoot, excludeElement);
				}
				for (let i = 0; i < hostElement.children.length; i++) {
					this.lockFocus(hostElement.children[i] as HTMLElement, excludeElement);
				}
			}
		} catch (error) {
			/**
			 * Try is needed for SSR.
			 * - no HTMLElement is available
			 * - no ShadowRoot is available
			 */
		}
	}

	private renderModalIfExists(activeElement?: HTMLElement) {
		if (activeElement instanceof HTMLElement) {
			if (this.lockedElements.has(activeElement)) {
				this.unlockElement(this.lockedElements.get(activeElement) as LockedElementContext, activeElement);
			}
			const timeout = setTimeout(() => {
				clearTimeout(timeout);
				activeElement.focus();
			}, 500);
		}
		this.unlockLockedElements(this.lockedElements);
		if (this.modalStack.size > 0) {
			const modalKeys = Array.from(this.modalStack.keys());
			const modalRef = modalKeys[modalKeys.length - 1] as HTMLElement & {
				_activeElement: HTMLElement | null; // typo sugger
			};
			this.modalStack.forEach((_value: ModalContext, htmlElement: HTMLElement) => {
				if (modalRef === htmlElement) {
					htmlElement.style.display = 'inline';
				} else {
					htmlElement.style.display = `none`;
				}
			});
			getDocument().body.style.maxHeight = '100vh';
			getDocument().body.style.overflow = 'hidden';
			this.lockFocus(getDocument().body, modalRef);
		} else {
			getDocument().body.style.maxHeight = 'unset';
			getDocument().body.style.overflow = 'unset';
		}
	}

	public openModal(modalRef: HTMLElement, activeElement?: HTMLElement): void {
		if (modalRef instanceof HTMLElement === false) {
			Log.warn(`[KolModalService] Die DOM-Referenz des Modals ist nicht valide.`);
		} else {
			this.modalStack.set(modalRef, {
				activeElement,
			});
			this.renderModalIfExists();
		}
	}

	public closeModal(modalRef: HTMLElement): void {
		if (modalRef instanceof HTMLElement === false) {
			Log.warn(`[KolModalService] Die DOM-Referenz des Modals ist nicht valide.`);
		} else {
			const activeElement = this.modalStack.get(modalRef)?.activeElement;
			this.modalStack.delete(modalRef);
			this.renderModalIfExists(activeElement);
		}
	}
}
