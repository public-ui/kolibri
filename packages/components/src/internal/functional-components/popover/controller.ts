import { autoUpdate } from '@floating-ui/dom';
import type { AlignPropType, PopoverCallbacksPropType, PopoverCloseEvent } from '../../../schema';
import { getDocument } from '../../../schema';
import { alignFloatingElements } from '../../../utils/align-floating-elements';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';

export class PopoverController {
	private align: AlignPropType = 'top';
	private popoverElement?: HTMLDivElement;
	private arrowElement?: HTMLDivElement;
	private triggerElement?: HTMLElement | null;
	private hostElement?: HTMLElement | null;
	private cleanupAutoUpdate?: () => void;
	private lastCloseEvent?: Event;
	private onCallbacks?: PopoverCallbacksPropType;

	public setAlign(value: AlignPropType): void {
		this.align = value;
		void this.alignPopover();
	}

	public setShow(value: boolean): void {
		this.syncPopoverVisibility(value);
	}

	public setOnCallbacks(callbacks?: PopoverCallbacksPropType): void {
		if (typeof callbacks === 'object' && callbacks !== null) {
			this.onCallbacks = callbacks;
		}
	}

	public setHostElement(element: HTMLElement | null): void {
		this.hostElement = element;
		this.triggerElement = element?.previousElementSibling as HTMLElement | null;
	}

	public setPopoverElementRef = (element?: HTMLDivElement): void => {
		if (this.popoverElement) {
			this.popoverElement.removeEventListener('beforetoggle', this.handleBeforeToggle);
			this.popoverElement.removeEventListener('toggle', this.handleToggle);
		}
		this.popoverElement = element;
		if (this.popoverElement) {
			this.popoverElement.addEventListener('beforetoggle', this.handleBeforeToggle);
			this.popoverElement.addEventListener('toggle', this.handleToggle);
		}
	};

	public setArrowElementRef = (element?: HTMLDivElement): void => {
		this.arrowElement = element;
	};

	private alignPopover = async (): Promise<void> => {
		if (!this.popoverElement) {
			return;
		}
		if (this.triggerElement) {
			await alignFloatingElements({
				align: this.align,
				referenceElement: this.triggerElement,
				arrowElement: this.arrowElement,
				floatingElement: this.popoverElement,
			});
		}
		this.popoverElement.style.removeProperty('visibility');
	};

	private handleBeforeToggle = (event: Event): void => {
		if ((event as ToggleEvent).newState === 'open' && this.popoverElement) {
			this.popoverElement.style.visibility = 'hidden';
		}
	};

	private handleToggle = (event: Event): void => {
		const toggleEvent = event as ToggleEvent;
		const isOpen = toggleEvent.newState === 'open';

		this.popoverElement?.classList.toggle('kol-popover__content--visible', isOpen);

		if (isOpen) {
			this.cleanupAutoUpdate?.();

			if (this.triggerElement && this.popoverElement) {
				this.cleanupAutoUpdate = autoUpdate(this.triggerElement, this.popoverElement, () => {
					void this.alignPopover();
				});
			}

			this.addListenersToBody();
			void this.alignPopover();
		} else {
			this.cleanupAutoUpdate?.();
			this.cleanupAutoUpdate = undefined;

			this.removeListenersFromBody();

			const closeEvent = (this.lastCloseEvent ?? toggleEvent) as PopoverCloseEvent;
			this.lastCloseEvent = undefined;

			this.triggerElement?.focus();
			this.onCallbacks?.onClose?.(closeEvent);

			if (this.hostElement) {
				dispatchDomEvent(this.hostElement, KolEvent.close);
			}
		}
	};

	private requestHide = (event: Event): void => {
		this.lastCloseEvent = event;
		this.popoverElement?.hidePopover();
	};

	private handleEscape = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			this.requestHide(event);
		}
	};

	private hidePopoverByClickOutside = (event: MouseEvent): void => {
		if (this.hostElement && !this.hostElement.contains(event.target as Node)) {
			this.requestHide(event);
		}
	};

	private handleScroll = (): void => {
		void this.alignPopover();
	};

	private addListenersToBody(): void {
		const documentElement = getDocument();
		const body = documentElement.body;
		body.addEventListener('keyup', this.handleEscape, { capture: true });
		body.addEventListener('click', this.hidePopoverByClickOutside, { capture: true });
		documentElement.scrollingElement?.addEventListener('scroll', this.handleScroll, { passive: true });
	}

	private removeListenersFromBody(): void {
		const documentElement = getDocument();
		const body = documentElement.body;
		body.removeEventListener('keyup', this.handleEscape, { capture: true });
		body.removeEventListener('click', this.hidePopoverByClickOutside, { capture: true });
		documentElement.scrollingElement?.removeEventListener('scroll', this.handleScroll);
	}

	private syncPopoverVisibility(show: boolean): void {
		if (!this.popoverElement) {
			return;
		}

		const toggleVisibility = (): void => {
			if (!this.popoverElement) {
				return;
			}
			const isOpen = this.popoverElement.matches(':popover-open');
			if (show) {
				if (!isOpen) {
					try {
						this.popoverElement.showPopover();
					} catch {
						// Ignore DOMException if already open
					}
				}
			} else {
				if (isOpen) {
					try {
						this.popoverElement.hidePopover();
					} catch {
						// Ignore DOMException if already closed
					}
				}
			}
		};

		if (this.popoverElement.isConnected) {
			toggleVisibility();
		} else {
			requestAnimationFrame(() => {
				toggleVisibility();
			});
		}
	}

	public destroy(): void {
		this.popoverElement?.removeEventListener('beforetoggle', this.handleBeforeToggle);
		this.popoverElement?.removeEventListener('toggle', this.handleToggle);
		this.cleanupAutoUpdate?.();
		this.cleanupAutoUpdate = undefined;
		this.removeListenersFromBody();
	}
}
