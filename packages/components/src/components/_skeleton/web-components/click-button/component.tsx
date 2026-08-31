import type { JSX } from '@stencil/core';
import { Component, h, Host, Method, Prop, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../../../internal/functional-components/base-web-component';
import type { ClickButtonApi } from '../../../../internal/functional-components/click-button/api';
import { clickButtonPropsConfig } from '../../../../internal/functional-components/click-button/api';
import { ClickButtonFC } from '../../../../internal/functional-components/click-button/component';
import type { WebComponentInterface } from '../../../../internal/functional-components/generic-types';
import { labelProp } from '../../../../internal/props';
import type { KolFocusOptions } from '../../../../schema';
import { createCtaRef, delegateFocus } from '../../../../utils/element-interaction';

/**
 * @internal
 */
@Component({
	tag: 'kol-click-button',
	shadow: true,
})
export class KolClickButton extends BaseWebComponent<ClickButtonApi> implements WebComponentInterface<ClickButtonApi> {
	private readonly buttonRef = createCtaRef<HTMLButtonElement>();

	/**
	 * Sets the label of the click button component.
	 */
	@Prop()
	public _label!: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	/**
	 * Focuses the interactive element of the component.
	 */
	@Method()
	@delegateFocus('buttonRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	public componentWillLoad(): void {
		this.initRenderProps(clickButtonPropsConfig);

		labelProp.apply(this._label, (v) => this.setRenderProp('label', v));
	}

	public handleClick = (): void => {
		// eslint-disable-next-line no-console
		console.log(this, 'button clicked');
	};

	public render(): JSX.Element {
		return (
			<Host>
				<ClickButtonFC label={this.getRenderProp('label')} refButton={this.buttonRef} handleClick={this.handleClick} />
			</Host>
		);
	}
}
