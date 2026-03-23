import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../../../internal/functional-components/generic-types';
import type { PopoverApi } from '../../../../internal/functional-components/popover/api';
import { PopoverFC } from '../../../../internal/functional-components/popover/component';
import { PopoverController } from '../../../../internal/functional-components/popover/controller';
import type { AlignPropType, PopoverCallbacksPropType } from '../../../../schema';

/**
 * @internal
 * @slot - The popover content.
 */
@Component({
	tag: 'kol-popover',
	styleUrls: {
		default: '../../style.scss',
	},
	shadow: true,
})
export class KolPopover extends BaseWebComponent<PopoverApi> implements WebComponentInterface<PopoverApi> {
	@Element() private el!: HTMLElement;

	private readonly ctrl = new PopoverController(this.setState, this.getState);

	/**
	 * Defines the alignment of the tooltip, popover or tabs in relation to the element.
	 */
	@Prop()
	public _align?: AlignPropType;

	@Watch('_align')
	public watchAlign(value?: AlignPropType): void {
		this.ctrl.watchAlign(value);
	}

	/**
	 * Defines the callback functions for popover events.
	 */
	@Prop()
	public _on?: PopoverCallbacksPropType;

	@Watch('_on')
	public watchOn(value?: PopoverCallbacksPropType): void {
		this.ctrl.watchOn(value);
	}

	/**
	 * Makes the element show up.
	 */
	@Prop({ mutable: true, reflect: true })
	public _show?: boolean = false;

	@Watch('_show')
	public watchShow(value?: boolean): void {
		this.ctrl.watchShow(value);
		this.ctrl.syncShowProp(value);
	}

	@State()
	public show: boolean = false;

	@State()
	public visible: boolean = false;

	public componentWillLoad(): void {
		this.ctrl.setHostElement(this.el);
		this.ctrl.componentWillLoad({
			align: this._align,
			show: this._show,
			on: this._on,
		});
	}

	public disconnectedCallback(): void {
		this.ctrl.destroy();
	}

	public render(): JSX.Element {
		return (
			<Host>
				<PopoverFC
					align={this.ctrl.getRenderProp('align')}
					on={this.ctrl.getRenderProp('on')}
					show={this.show}
					visible={this.visible}
					refPopoverElement={this.ctrl.setPopoverElementRef}
					refArrowElement={this.ctrl.setArrowElementRef}
				/>
			</Host>
		);
	}
}
