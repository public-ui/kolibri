import { MiddlewareData, Placement, arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { getDocument } from '../../utils/dev.utils';
import { processEnv } from '../../utils/reuse';
import { Alignment, PropAlignment, PropShow, validateAlignment, validateShow } from '../../types/props';

type RequiredProps = unknown;
type OptionalProps = PropAlignment & PropShow;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = PropAlignment & PropShow & { visible: boolean };
type OptionalStates = unknown;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-popover',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolPopover implements API {
	private arrowElement?: HTMLDivElement;
	private popoverElement?: HTMLDivElement;
	private triggerElement?: HTMLElement | null;
	private host?: HTMLElement;

	/* Popover functions */
	private alignPopover = (callBack?: () => unknown): void => {
		if (processEnv !== 'test' && this.triggerElement && this.popoverElement) {
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
				this.setPosition(x, y, middlewareData, placement, callBack);
			});
		}
	};
	private setPosition(x: number, y: number, middlewareData: MiddlewareData, placement: Placement, callBack?: () => unknown) {
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
				switch (placement) {
					case 'top':
						this.arrowElement.style.inset = `100% auto auto ${middlewareData.arrow.x || 0}px`;
						this.arrowElement.style.translate = '0 -50%';
						break;
					case 'right':
						this.arrowElement.style.inset = `${middlewareData.arrow.y || 0}px 100% auto auto`;
						this.arrowElement.style.translate = '50% 0';
						break;
					case 'bottom':
						this.arrowElement.style.inset = `auto auto 100% ${middlewareData.arrow.x || 0}px`;
						this.arrowElement.style.translate = '0 50%';
						break;
					case 'left':
						this.arrowElement.style.inset = `${middlewareData.arrow.y || 0}px auto auto 100%`;
						this.arrowElement.style.translate = '-50% 0';
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
	private showPopover = (): void => {
		this.addListenersToBody();

		this.alignPopover(() => {
			this.state = { ...this.state, _visible: true };
		});
	};
	private hidePopover(): void {
		this.state = {
			...this.state,
			_visible: false,
		};
		this._show = false;
		this.triggerElement?.focus();
		this.removeListenersToBody();
	}
	private hidePopoverByEscape = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') this.hidePopover();
	};
	private hidePopoverByClickOutside = (event: MouseEvent): void => {
		if (this.host && !this.host.contains(event.target as HTMLElement)) {
			this.hidePopover();
		}
	};

	/* EventListener functions */
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
	private catchHostAndTriggerElement = (element: HTMLElement | null): void => {
		if (element) {
			this.host = element;
			this.triggerElement = element.previousElementSibling as HTMLElement | null;
		}
	};
	private catchPopoverElement = (element?: HTMLDivElement): void => {
		this.popoverElement = element;
	};
	private catchArrowElement = (element?: HTMLDivElement): void => {
		this.arrowElement = element;
	};

	public render(): JSX.Element {
		return (
			<Host ref={this.catchHostAndTriggerElement}>
				<div class={{ popover: true, hidden: !this.state._show, show: this.state._visible }} ref={this.catchPopoverElement}>
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

	/**
	 * Öffnet/schließt das Popover.
	 */
	@Prop({ mutable: true, reflect: true }) public _show?: boolean = false;

	@State() public state: States = {
		_alignment: 'top',
		_show: false,
		_visible: false,
	};

	@Watch('_alignment')
	public validateAlignment(value?: Alignment): void {
		validateAlignment(this, value);
	}

	@Watch('_show')
	public validateShow(value?: boolean): void {
		validateShow(this, value);
		if (value) this.showPopover();
	}

	public componentWillLoad(): void {
		this.validateAlignment(this._alignment);
		this.validateShow(this._show);
	}
}
