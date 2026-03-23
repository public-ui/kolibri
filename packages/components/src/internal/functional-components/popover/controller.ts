import { autoUpdate } from '@floating-ui/dom';
import type { PopoverCloseEvent } from '../../../schema';
import { getDocument } from '../../../schema';
import { alignFloatingElements } from '../../../utils/align-floating-elements';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';
import { alignProp, popoverCallbacksProp, showProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, GetStateFn, ResolvedInputProps, SetStateFn } from '../generic-types';
import type { PopoverApi } from './api';
import { popoverPropsConfig } from './api';

export class PopoverController extends BaseController<PopoverApi> implements ControllerInterface<PopoverApi> {
	private hostElement?: HTMLElement;
	private triggerElement?: HTMLElement | null;
	private popoverEl?: HTMLDivElement;
	private arrowEl?: HTMLDivElement;
	private cleanupAutoUpdate?: () => void;
	private lastCloseEvent?: Event;

	public constructor(setState: SetStateFn<PopoverApi>, getState: GetStateFn<PopoverApi>) {
		super(popoverPropsConfig, setState, getState);
	}

	public componentWillLoad(props: ResolvedInputProps<PopoverApi>): void {
		const { align, show, on } = props;
		this.watchAlign(align);
		this.watchShow(show);
		this.watchOn(on);
	}

	public watchAlign(value?: string): void {
		alignProp.apply(value, (v) => {
			this.setRenderProp('align', v);
		});
	}

	public watchShow(value?: boolean): void {
		showProp.apply(value, (v) => {
			this.setRenderProp('show', v);
			this.setState('show', v);
		});
	}

	public watchOn(value?: object): void {
		popoverCallbacksProp.apply(value, (v) => {
			this.setRenderProp('on', v);
		});
	}

	public setHostElement(el: HTMLElement): void {
		this.hostElement = el;
		this.triggerElement = el.previousElementSibling as HTMLElement | null;
	}

	public setPopoverElementRef = (element?: HTMLDivElement): void => {
		if (this.popoverEl) {
			this.popoverEl.removeEventListener('beforetoggle', this.handleBeforeToggle);
			this.popoverEl.removeEventListener('toggle', this.handleToggle);
		}
		this.popoverEl = element;

		if (this.popoverEl) {
			this.popoverEl.addEventListener('beforetoggle', this.handleBeforeToggle);
			this.popoverEl.addEventListener('toggle', this.handleToggle);
			this.syncPopoverVisibility();
		}
	};

	public setArrowElementRef = (element?: HTMLDivElement): void => {
		this.arrowEl = element;
	};

	private alignPopover = async (): Promise<void> => {
		if (!this.popoverEl) {
			return;
		}

		if (this.triggerElement) {
			await alignFloatingElements({
				align: this.getRenderProp('align'),
				referenceElement: this.triggerElement,
				arrowElement: this.arrowEl,
				floatingElement: this.popoverEl,
			});
		}

		this.popoverEl.style.removeProperty('visibility');
	};

	private handleBeforeToggle = (event: Event): void => {
		if ((event as ToggleEvent).newState === 'open' && this.popoverEl) {
			this.popoverEl.style.visibility = 'hidden';
		}
	};

	private handleToggle = (event: Event): void => {
		const toggleEvent = event as ToggleEvent;
		const isOpen = toggleEvent.newState === 'open';

		this.setState('show', isOpen);
		this.setState('visible', isOpen);

		if (isOpen) {
			this.cleanupAutoUpdate?.();

			if (this.triggerElement && this.popoverEl) {
				this.cleanupAutoUpdate = autoUpdate(this.triggerElement, this.popoverEl, () => {
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
			this.getRenderProp('on').onClose?.(closeEvent);

			if (this.hostElement) {
				dispatchDomEvent(this.hostElement, KolEvent.close);
			}
		}
	};

	private requestHide = (event: Event): void => {
		this.lastCloseEvent = event;
		this.popoverEl?.hidePopover();
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

	private syncPopoverVisibility(): void {
		if (!this.popoverEl) {
			return;
		}

		const toggleVisibility = (): void => {
			if (!this.popoverEl) {
				return;
			}

			const isOpen = this.popoverEl.matches(':popover-open');
			const show = this.getState?.('show') ?? false;

			if (show) {
				if (!isOpen) {
					this.popoverEl.showPopover();
				}
			} else {
				if (isOpen) {
					this.popoverEl.hidePopover();
				}
			}
		};

		if (this.popoverEl.isConnected) {
			toggleVisibility();
		} else {
			requestAnimationFrame(() => {
				toggleVisibility();
			});
		}
	}

	public syncShowProp(value?: boolean): void {
		if (!this.popoverEl) {
			return;
		}
		const isOpen = this.popoverEl.matches(':popover-open');
		if (value) {
			if (!isOpen) {
				try {
					this.popoverEl.showPopover();
				} catch {
					// Ignore DOMException if already open
				}
			}
		} else {
			if (isOpen) {
				try {
					this.popoverEl.hidePopover();
				} catch {
					// Ignore DOMException if already closed
				}
			}
		}
	}

	public destroy(): void {
		this.popoverEl?.removeEventListener('beforetoggle', this.handleBeforeToggle);
		this.popoverEl?.removeEventListener('toggle', this.handleToggle);
		this.cleanupAutoUpdate?.();
		this.cleanupAutoUpdate = undefined;
		this.removeListenersFromBody();
	}
}
