import { autoUpdate } from '@floating-ui/dom';
import type { PopoverCallbacksPropType, PopoverCloseEvent } from '../../../schema';
import { getDocument } from '../../../schema';
import { alignFloatingElements } from '../../../utils/align-floating-elements';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';
import { alignProp, showProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, GetStateFn, ResolvedInputProps, SetStateFn } from '../generic-types';
import type { PopoverApi } from './api';
import { popoverPropsConfig } from './api';

export class PopoverController extends BaseController<PopoverApi> implements ControllerInterface<PopoverApi> {
	private popoverElement?: HTMLDivElement;
	private arrowElement?: HTMLDivElement;
	private triggerElement?: HTMLElement | null;
	private hostElement?: HTMLElement | null;
	private cleanupAutoUpdate?: () => void;
	private lastCloseEvent?: Event;
	private onCallbacks?: PopoverCallbacksPropType;

	public constructor(setState: SetStateFn<PopoverApi>, getState: GetStateFn<PopoverApi>) {
		super(popoverPropsConfig, setState, getState);
	}

	public componentWillLoad(props: ResolvedInputProps<PopoverApi> & { on?: PopoverCallbacksPropType }): void {
		const { align, show, on } = props;
		this.watchAlign(align);
		this.watchShow(show);
		if (on !== undefined) {
			this.onCallbacks = on;
		}
	}

	public watchAlign(value?: string): void {
		alignProp.apply(value, (v) => {
			this.setRenderProp('align', v);
		});
		void this.alignPopover();
	}

	public watchShow(value?: boolean): void {
		showProp.apply(value, (v) => {
			this.setRenderProp('show', v);
			this.syncPopoverVisibility(v);
		});
	}

	public watchOn(value?: PopoverCallbacksPropType): void {
		if (typeof value === 'object' && value !== null) {
			this.onCallbacks = value;
		}
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
			this.syncPopoverVisibility(this.getRenderProp('show') ?? false);
		}
	};

	public setArrowElementRef = (element?: HTMLDivElement): void => {
		this.arrowElement = element;
	};

	public setHostElement(element: HTMLElement | null): void {
		this.hostElement = element;
		this.triggerElement = element?.previousElementSibling as HTMLElement | null;
	}

	private alignPopover = async (): Promise<void> => {
		if (!this.popoverElement) {
			return;
		}
		if (this.triggerElement) {
			await alignFloatingElements({
				align: this.getRenderProp('align'),
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

		this.setState('show', isOpen);
		this.setState('visible', isOpen);

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

		const currentShow = this.getRenderProp('show') ?? false;
		if (currentShow !== isOpen) {
			this.setRenderProp('show', isOpen);
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
					this.popoverElement.showPopover();
				}
			} else {
				if (isOpen) {
					this.popoverElement.hidePopover();
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
