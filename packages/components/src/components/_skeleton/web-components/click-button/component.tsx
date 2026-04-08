import type { JSX } from '@stencil/core';
import { Component, h, Host, Method, Prop, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../../../internal/functional-components/base-web-component';
import type { ClickButtonApi } from '../../../../internal/functional-components/click-button/api';
import { ClickButtonFC } from '../../../../internal/functional-components/click-button/component';
import { ClickButtonController } from '../../../../internal/functional-components/click-button/controller';
import type { WebComponentInterface } from '../../../../internal/functional-components/generic-types';

/**
 * @internal
 */
@Component({
	tag: 'kol-click-button',
	shadow: true,
})
export class KolClickButton extends BaseWebComponent<ClickButtonApi> implements WebComponentInterface<ClickButtonApi> {
	private readonly ctrl = new ClickButtonController(this.stateAccess);

	/**
	 * Sets the label of the click button component.
	 */
	@Prop()
	public _label!: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		this.ctrl.watchLabel(value);
	}

	/**
	 * Focuses the interactive element of the component.
	 */
	@Method()
	public async focus(): Promise<void> {
		return Promise.resolve(this.ctrl.focus());
	}

	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
			label: this._label,
		});
	}

	public render(): JSX.Element {
		return (
			<Host>
				<ClickButtonFC label={this.ctrl.getRenderProp('label')} refButton={this.ctrl.setButtonRef} handleClick={this.ctrl.handleClick} />
			</Host>
		);
	}
}
