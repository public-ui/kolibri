import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { SpinApi } from '../../internal/functional-components/spin/api';
import { spinPropsConfig } from '../../internal/functional-components/spin/api';
import { SpinFC } from '../../internal/functional-components/spin/component';
import { labelProp, showProp, variantSpinProp, type SpinVariantType } from '../../internal/props';

@Component({
	tag: 'kol-spin',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSpin extends BaseWebComponent<SpinApi> implements WebComponentInterface<SpinApi> {
	/**
	 * Makes the element show up.
	 */
	@Prop()
	public _show?: boolean;

	@Watch('_show')
	public watchShow(value?: boolean): void {
		this.applyShow(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label?: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop()
	public _variant?: SpinVariantType;

	@Watch('_variant')
	public watchVariant(value?: SpinVariantType): void {
		variantSpinProp.apply(value, (v) => this.setRenderProp('variant', v));
	}

	public componentWillLoad(): void {
		this.initRenderProps(spinPropsConfig);

		this.applyShow(this._show);
		labelProp.apply(this._label, (v) => this.setRenderProp('label', v));
		variantSpinProp.apply(this._variant, (v) => this.setRenderProp('variant', v));
	}

	private applyShow(value?: boolean): void {
		showProp.apply(value, (v) => this.setRenderProp('show', v));
	}

	public render(): JSX.Element {
		return (
			<Host>
				<SpinFC show={this.getRenderProp('show')} label={this.getRenderProp('label')} variant={this.getRenderProp('variant')} />
			</Host>
		);
	}
}
