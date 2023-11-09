import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { AlignPropType, validateAlign } from '../../types/props/align';
import { ShowPropType, validateShow } from '../../types/props/show';
import { getDocument } from '../../utils/dev.utils';
import { API, States } from './types';
import { alignFloatingElements } from '../../utils/align-floating-elements';

/**
 * @slot - Der Inhalt des Popover.
 */
@Component({
	tag: 'kol-popover-wc',
	styleUrl: './style.css',
	shadow: false,
})
export class KolPopover implements API {
	private arrowElement?: HTMLDivElement;
	private popoverElement?: HTMLDivElement;
	private triggerElement?: HTMLElement | null;
	private host?: HTMLElement;

	private async showPopover(): Promise<void> {
		this.addListenersToBody();

		if (this.triggerElement && this.popoverElement) {
			await alignFloatingElements({
				align: this._align,
				referenceElement: this.triggerElement,
				arrowElement: this.arrowElement,
				floatingElement: this.popoverElement,
			});
			this.state = { ...this.state, _visible: true };
		}
	}
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
		document.scrollingElement?.addEventListener(
			'scroll',
			() => {
				void this.showPopover();
			},
			{ passive: true }
		);
	}
	private removeListenersToBody(): void {
		const body = getDocument().body;
		body.removeEventListener('keyup', this.hidePopoverByEscape);
		body.removeEventListener('click', this.hidePopoverByClickOutside);
		document.scrollingElement?.removeEventListener('scroll', () => {
			void this.showPopover();
		});
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
					<div class={`arrow ${this.state._align}`} ref={this.catchArrowElement} />
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
	 * Makes the element show up.
	 * @TODO: Change type back to `ShowPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _show?: boolean = false;

	@State() public state: States = {
		_align: 'top',
		_show: false,
		_visible: false,
	};

	@Watch('_align')
	public validateAlign(value?: AlignPropType): void {
		validateAlign(this, value);
	}

	@Watch('_show')
	public validateShow(value?: ShowPropType): void {
		validateShow(this, value);
		if (value) void this.showPopover();
	}

	public componentWillLoad(): void {
		this.validateAlign(this._align);
		this.validateShow(this._show);
	}
}
