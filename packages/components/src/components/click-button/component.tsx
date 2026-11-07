import type { JSX } from '@stencil/core';
import { Component, h, Host, Method, Prop, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { ClickButtonApi } from '../../internal/functional-components/click-button/api';
import { clickButtonPropsConfig } from '../../internal/functional-components/click-button/api';
import { ClickButtonFC } from '../../internal/functional-components/click-button/component';
import type { PropsConfigShape, WebComponentInterface } from '../../internal/functional-components/generic-types';
import { labelProp } from '../../internal/props';
import type { ClickButtonProps, KolFocusOptions, LabelPropType } from '../../schema';
import { createCtaRef, delegateFocus } from '../../utils/element-interaction';

/**
 * @internal
 */
@Component({
	tag: 'kol-click-button',
	shadow: true,
})
export class KolClickButton extends BaseWebComponent<ClickButtonApi> implements ClickButtonProps, WebComponentInterface<ClickButtonApi> {
	private readonly buttonRef = createCtaRef<HTMLButtonElement>();

	protected readonly propsConfig: PropsConfigShape = clickButtonPropsConfig;

	/**
	 * Sets the label of the click button component.
	 */
	@Prop()
	public _label!: LabelPropType;

	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		labelProp.apply(value, (v) => this.setRenderProp('label', v), this.isRequired('label'));
	}

	/**
	 * Focuses the interactive element of the component.
	 */
	@Method()
	@delegateFocus('buttonRef')
	public focus(options?: KolFocusOptions): Promise<void> {
		// The focus decorator owns the implementation and forwards `options` to `setFocus`; this body only declares the public signature.
		void options;
		return Promise.resolve();
	}

	public componentWillLoad(): void {
		labelProp.apply(this._label, (v) => this.setRenderProp('label', v), this.isRequired('label'));
	}

	public handleClick = (): void => {
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
