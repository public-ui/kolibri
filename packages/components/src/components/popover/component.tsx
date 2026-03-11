import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { PopoverApi } from '../../internal/functional-components/popover/api';
import { PopoverFC } from '../../internal/functional-components/popover/component';
import { PopoverController } from '../../internal/functional-components/popover/controller';
import type { AlignPropType, PopoverCallbacksPropType } from '../../schema';

/**
 * @internal
 * @slot - The popover content.
 */
@Component({
	tag: 'kol-popover-wc',
	shadow: false,
})
export class KolPopover extends BaseWebComponent<PopoverApi> implements WebComponentInterface<PopoverApi> {
	private readonly ctrl = new PopoverController(this.setState, this.getState);

	private handleHostRef = (el?: HTMLElement | null): void => {
		if (el) {
			this.ctrl.setHostElement(el);
		}
	};

	/**
	 * Defines the alignment of the popover in relation to the element.
	 */
	@Prop()
	public _align?: AlignPropType = 'top';

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
	 * @TODO: Change type back to `ShowPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true })
	public _show?: boolean = false;

	@Watch('_show')
	public watchShow(value?: boolean): void {
		this.ctrl.watchShow(value);
	}

	@State()
	public show: boolean = false;

	@State()
	public visible: boolean = false;

	public componentWillLoad(): void {
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
			<Host ref={this.handleHostRef}>
				<PopoverFC
					align={this.ctrl.getRenderProp('align')}
					show={this.show}
					visible={this.visible}
					refPopoverElement={(el) => this.ctrl.setPopoverElementRef(el)}
					refArrowElement={(el) => this.ctrl.setArrowElementRef(el)}
				/>
			</Host>
		);
	}
}
