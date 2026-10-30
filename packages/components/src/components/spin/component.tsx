import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { SpinApi } from '../../internal/functional-components/spin/api';
import { spinPropsConfig } from '../../internal/functional-components/spin/api';
import { SpinFC } from '../../internal/functional-components/spin/component';
import { labelProp } from '../../internal/props/label';
import { showProp } from '../../internal/props/show';
import type { SpinVariantType } from '../../internal/props/variant-spin';
import { variantSpinProp } from '../../internal/props/variant-spin';
import type { LabelPropType, ShowPropType } from '../../schema';

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
	public _show?: ShowPropType = undefined;

	@Watch('_show')
	public watchShow(value?: ShowPropType): void {
		showProp.apply(value, (v) => this.setRenderProp('show', v));
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label?: LabelPropType = undefined;

	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		labelProp.apply(value, (v) => this.setRenderProp('label', v), this.isRequired('label'));
	}

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop()
	public _variant?: SpinVariantType = undefined;

	@Watch('_variant')
	public watchVariant(value?: SpinVariantType): void {
		variantSpinProp.apply(value, (v) => this.setRenderProp('variant', v));
	}

	public componentWillLoad(): void {
		this.initRenderProps(spinPropsConfig);

		showProp.apply(this._show, (v) => this.setRenderProp('show', v));
		labelProp.apply(this._label, (v) => this.setRenderProp('label', v), this.isRequired('label'));
		variantSpinProp.apply(this._variant, (v) => this.setRenderProp('variant', v));
	}

	public render(): JSX.Element {
		return (
			<Host>
				<SpinFC show={this.getRenderProp('show')} label={this.getRenderProp('label')} variant={this.getRenderProp('variant')} />
			</Host>
		);
	}
}
