import { MiddlewareData, Placement, arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { getDocument } from '../../utils/dev.utils';
import { processEnv } from '../../utils/reuse';
import { Alignment, PropAlignment, validateAlignment } from '../../types/props';

type RequiredProps = unknown;
type OptionalProps = PropAlignment;

type RequiredStates = PropAlignment;
type OptionalStates = unknown;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-popover',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolPopover implements API {
	private triggerElement?: HTMLElement | null;
	private popoverElement?: HTMLDivElement;
	private arrowElement?: HTMLDivElement;

	private helpFunction(x: number, y: number, middlewareData: MiddlewareData, placement: Placement, callBack?: () => unknown) {
		if (this.popoverElement) {
			const oldPos = {
				left: this.popoverElement.style.left,
				top: this.popoverElement.style.top,
			};
			Object.assign(this.popoverElement.style, {
				left: `${x}px`,
				top: `${y}px`,
			});

			if (this.arrowElement && middlewareData.arrow) {
				console.log(middlewareData.arrow);
				switch (placement) {
					case 'top':
						Object.assign(this.arrowElement.style, {
							left: `${middlewareData.arrow.x || 0}px`,
							top: '100%',
						});
						break;
					case 'right':
						Object.assign(this.arrowElement.style, {
							right: '100%',
							top: `${middlewareData.arrow.y || 0}px`,
						});
						break;
					case 'bottom':
						Object.assign(this.arrowElement.style, {
							bottom: '100%',
							left: `${middlewareData.arrow.x || 0}px`,
						});
						break;
					case 'left':
						Object.assign(this.arrowElement.style, {
							left: '100%',
							top: `${middlewareData.arrow.y || 0}px`,
						});
						break;
				}
			}
			if (oldPos.left !== this.popoverElement.style.left || oldPos.top !== this.popoverElement.style.top) {
				this.alignPopover(callBack);
			} else if (typeof callBack === 'function') {
				callBack();
			}
		}
	}

	/* Popover functions */
	private alignPopover = (callBack?: () => unknown): void => {
		if (processEnv !== 'test') {
			if (this.triggerElement && this.popoverElement) {
				const trigger = this.triggerElement;
				const popoverEl = this.popoverElement;
				const arrowEl = this.arrowElement;

				const middleware = [offset(arrowEl?.offsetHeight ?? 10), flip(), shift()];
				if (arrowEl) {
					middleware.push(arrow({ element: arrowEl }));
				}

				void computePosition(trigger, popoverEl, {
					placement: this.state._alignment,
					middleware: middleware,
				}).then(({ x, y, middlewareData, placement }) => {
					this.helpFunction(x, y, middlewareData, placement, callBack);
				});
			}
		}
	};
	private showPopover = (): void => {
		if (this.popoverElement && this.triggerElement) {
			this.popoverElement.classList.remove('hidden');
			this.addListenersToBody();
			this.addListenersToTrigger();

			this.alignPopover(() => {
				if (this.popoverElement) {
					this.popoverElement.classList.add('show');
				}
			});
		}
	};
	private hidePopover(): void {
		if (this.popoverElement) {
			this.popoverElement.classList.remove('show');
			setTimeout(() => this.popoverElement?.classList.add('hidden'), 1);
			this.removeListenersToBody();
		}
	}
	private hidePopoverByEscape = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			this.hidePopover();
		}
	};
	private hidePopoverByClickOutside = (event: MouseEvent): void => {
		if (this.popoverElement && !this.popoverElement.contains(event.target as HTMLElement)) {
			this.hidePopover();
		}
	};

	/* EventListener functions */
	private addListenersToTrigger(): void {
		if (this.triggerElement) {
			this.triggerElement.addEventListener('focus', this.setFocus);
			this.triggerElement.addEventListener('blur', this.removeFocus);
			this.triggerElement.addEventListener('mouseover', this.setHover);
			this.triggerElement.addEventListener('mouseout', this.removeHover);
		}
	}
	private removeListenersFromTrigger(): void {
		if (this.triggerElement) {
			this.triggerElement.removeEventListener('focus', this.setFocus);
			this.triggerElement.removeEventListener('blur', this.removeFocus);
			this.triggerElement.removeEventListener('mouseover', this.setHover);
			this.triggerElement.removeEventListener('mouseout', this.removeHover);
		}
	}
	private resyncTriggerListeners(): void {
		this.removeListenersFromTrigger();
		this.addListenersToTrigger();
	}
	private addListenersToBody(): void {
		const body = getDocument().body;
		body.addEventListener('keyup', this.hidePopoverByEscape);
		body.addEventListener('click', this.hidePopoverByClickOutside);
		document.scrollingElement?.addEventListener('scroll', this.showPopover, { passive: true });
	}
	private removeListenersToBody(): void {
		const body = getDocument().body;
		body.removeEventListener('keyup', this.hidePopoverByEscape);
		body.removeEventListener('click', this.hidePopoverByClickOutside);
		document.scrollingElement?.removeEventListener('scroll', this.showPopover);
	}

	/* catchElement functions */
	private catchHostElement = (element: HTMLElement | null): void => {
		if (element) {
			this.triggerElement = element.previousElementSibling as HTMLElement | null;
			this.resyncTriggerListeners();
		}
	};
	private catchPopoverElement = (element?: HTMLDivElement): void => {
		this.popoverElement = element;
		if (this.popoverElement) {
			this.resyncTriggerListeners();
		}
	};
	private catchArrowElement = (element?: HTMLDivElement): void => {
		this.arrowElement = element;
	};

	public render(): JSX.Element {
		return (
			<Host ref={this.catchHostElement}>
				<div class="popover hidden" ref={this.catchPopoverElement}>
					<div class={`arrow ${this.state._alignment}`} ref={this.catchArrowElement} />
					<slot />
				</div>
			</Host>
		);
	}

	/**
	 * Setzt die Ausrichtung des Popovers in Relation zum Triggerelement.
	 */
	@Prop() public _alignment?: Alignment = 'top';

	@State() public state: States = {
		_alignment: 'top',
	};

	@Watch('_alignment')
	public validateAlignment(value?: Alignment): void {
		validateAlignment(this, value);
	}

	/* show/hide on focus/hover in/out */
	private isFocus = false;
	private isHover = false;
	private setFocus = (): void => {
		this.isFocus = true;
		this.showPopover();
	};
	private removeFocus = (): void => {
		this.isFocus = false;
		if (!this.isHover) this.hidePopover();
	};
	private setHover = (): void => {
		this.isHover = true;
		this.showPopover();
	};
	private removeHover = (): void => {
		this.isHover = false;
		if (!this.isFocus) this.hidePopover();
	};

	public componentWillLoad(): void {
		this.validateAlignment(this._alignment);
	}

	public disconnectedCallback(): void {
		this.removeListenersFromTrigger();
	}
}
