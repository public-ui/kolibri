import type { JSX } from '@stencil/core';
import { Component, h, Host, Method, Prop, Watch } from '@stencil/core';
import type { ClickButtonApi } from '../../internal/functional-components/click-button/api';
import { ClickButtonFC } from '../../internal/functional-components/click-button/component';
import { ClickButtonController } from '../../internal/functional-components/click-button/controller';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { LabelPropType } from '../../internal/schema/props/label';

@Component({
	tag: 'kol-click-button',
	shadow: true,
})
export class KolClickButton implements WebComponentInterface<ClickButtonApi> {
	private readonly ctrl = new ClickButtonController();

	/**
	 * Sets the label of the click button component.
	 */
	@Prop()
	public _label!: LabelPropType;

	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		this.ctrl.watchLabel(value);
	}

	/**
	 * Focuses the interactive element of the component.
	 */
	@Method()
	public async focus(): Promise<void> {
		this.ctrl.focus();
		return Promise.resolve();
	}

	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
			label: this._label,
		});
	}

	public render(): JSX.Element {
		const { label } = this.ctrl.getProps();
		return (
			<Host>
				<ClickButtonFC label={label} refButton={this.ctrl.setButtonRef} handleClick={this.ctrl.handleClick} />
			</Host>
		);
	}
}
