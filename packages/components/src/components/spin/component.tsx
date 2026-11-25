import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { PropsConfigShape, WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { SpinApi } from '../../internal/functional-components/spin/api';
import { spinPropsConfig } from '../../internal/functional-components/spin/api';
import { SpinFC } from '../../internal/functional-components/spin/component';
import { labelProp, showProp, variantSpinProp, type SpinVariantType } from '../../internal/props';
import type { LabelPropType, ShowPropType } from '../../schema';

@Component({
	tag: 'kol-spin',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSpin extends BaseWebComponent<SpinApi> implements WebComponentInterface<SpinApi> {
	protected readonly propsConfig: PropsConfigShape = spinPropsConfig;

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
	 * Makes the element show up.
	 */
	@Prop()
	public _show?: ShowPropType = undefined;

	@Watch('_show')
	public watchShow(value?: ShowPropType): void {
		showProp.apply(value, (v) => this.setRenderProp('show', v));
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
		this.watchLabel(this._label);
		this.watchShow(this._show);
		this.watchVariant(this._variant);
	}

	public render(): JSX.Element {
		return (
			<Host>
				<SpinFC show={this.getRenderProp('show')} label={this.getRenderProp('label')} variant={this.getRenderProp('variant')} />
			</Host>
		);
	}
}
