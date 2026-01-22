import { autoUpdate } from '@floating-ui/dom';
import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import type { AlignPropType, PopoverAPI, PopoverCallbacksPropType, PopoverCloseEvent, PopoverStates, ShowPropType } from '../../schema';
import { getDocument, validateAlign, validatePopoverCallbacks, validateShow } from '../../schema';

import { alignFloatingElements } from '../../utils/align-floating-elements';
import clsx from '../../utils/clsx';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

/**
 * @internal
 * @slot - The popover content.
 */
@Component({
	tag: 'kol-popover-wc',
	shadow: false,
})
export class KolPopover implements PopoverAPI {
	private arrowElement?: HTMLDivElement;
	private popoverElement?: HTMLDivElement;
	private triggerElement?: HTMLElement | null;
	private host?: HTMLElement;
	private cleanupAutoUpdate?: () => void;
	private lastCloseEvent?: Event;

	private alignPopover = async (): Promise<void> => {
		if (!this.popoverElement) {
			return;
		}

		if (this.triggerElement) {
			await alignFloatingElements({
				align: this._align,
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

		this.state = {
			...this.state,
			_show: isOpen,
			_visible: isOpen,
		};

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
			this.state._on?.onClose?.(closeEvent);

			if (this.host) {
				dispatchDomEvent(this.host, KolEvent.close);
			}
		}

		if (this._show !== isOpen) {
			this._show = isOpen;
		}
	};

	/* catchElement functions */
	private catchHostAndTriggerElement = (element: HTMLElement | null): void => {
		if (element) {
			this.host = element;
			this.triggerElement = element.previousElementSibling as HTMLElement | null;
		}
	};
	private catchPopoverElement = (element?: HTMLDivElement): void => {
		if (this.popoverElement) {
			this.popoverElement.removeEventListener('beforetoggle', this.handleBeforeToggle);
			this.popoverElement.removeEventListener('toggle', this.handleToggle);
		}
		this.popoverElement = element;

		if (this.popoverElement) {
			this.popoverElement.addEventListener('beforetoggle', this.handleBeforeToggle);
			this.popoverElement.addEventListener('toggle', this.handleToggle);
			this.syncPopoverVisibility();
		}
	};
	private catchArrowElement = (element?: HTMLDivElement): void => {
		this.arrowElement = element;
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
		if (this.host && !this.host.contains(event.target as Node)) {
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
		if (!this.popoverElement) {
			return;
		}

		const toggleVisibility = (): void => {
			if (!this.popoverElement) {
				return;
			}

			const isOpen = this.popoverElement.matches(':popover-open');

			if (this._show) {
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

	public render(): JSX.Element {
		return (
			<Host ref={this.catchHostAndTriggerElement} class="kol-popover">
				<div class={clsx('kol-popover__content', { 'kol-popover__content--visible': this.state._visible })} ref={this.catchPopoverElement} popover="auto">
					<div class={clsx('kol-popover__arrow', `kol-popover__arrow--${this.state._align}`)} ref={this.catchArrowElement} />
					<slot />
				</div>
			</Host>
		);
	}

	/**
	 * Defines the alignment of the tooltip, popover or tabs in relation to the element.
	 */
	@Prop() public _align?: AlignPropType = 'top';

	/**
	 * Defines the callback functions for popover events.
	 */
	@Prop() public _on?: PopoverCallbacksPropType;

	/**
	 * Makes the element show up.
	 * @TODO: Change type back to `ShowPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _show?: boolean = false;

	@State() public state: PopoverStates = {
		_align: 'top',
		_on: {},
		_show: false,
		_visible: false,
	};

	@Watch('_align')
	public validateAlign(value?: AlignPropType): void {
		validateAlign(this, value);
		void this.alignPopover();
	}

	@Watch('_on')
	public validateOn(value?: PopoverCallbacksPropType): void {
		validatePopoverCallbacks(this, value);
	}

	@Watch('_show')
	public validateShow(value?: ShowPropType): void {
		validateShow(this, value);
		if (this.popoverElement) {
			const isOpen = this.popoverElement.matches(':popover-open');
			if (value) {
				if (!isOpen) {
					try {
						this.popoverElement.showPopover();
					} catch (e) {
						// Ignore DOMException if already open
					}
				}
			} else {
				if (isOpen) {
					try {
						this.popoverElement.hidePopover();
					} catch (e) {
						// Ignore DOMException if already closed
					}
				}
			}
		}
	}

	public componentWillLoad(): void {
		this.validateAlign(this._align);
		this.validateShow(this._show);
	}

	public disconnectedCallback(): void {
		this.popoverElement?.removeEventListener('beforetoggle', this.handleBeforeToggle);
		this.popoverElement?.removeEventListener('toggle', this.handleToggle);
		this.cleanupAutoUpdate?.();
		this.cleanupAutoUpdate = undefined;
		this.removeListenersFromBody();
	}
}
