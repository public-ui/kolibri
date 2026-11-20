import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../../internals/src/controller/base-web-component';
import type { PropsConfigShape, WebComponentInterface } from '../../../internals/src/controller/generic-types';
import type { KolibriApi } from '../../../internals/src/controller/kolibri/api';
import { kolibriPropsConfig } from '../../../internals/src/controller/kolibri/api';
import { translate } from '../../../internals/src/i18n';
import { kolibriColorProp, labeledProp } from '../../../internals/src/props/index';
import type { KolibriProps, LabeledPropType, PropColor, Stringified } from '../../../internals/src/schema/index';
import { KolibriFC } from '../../internal/functional-components/kolibri/component';

@Component({
	tag: 'kol-kolibri',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolKolibri extends BaseWebComponent<KolibriApi> implements KolibriProps, WebComponentInterface<KolibriApi> {
	private readonly translateKolibriLogo = translate('kol-kolibri-logo');

	protected readonly propsConfig: PropsConfigShape = kolibriPropsConfig;

	/**
	 * Defines the color of the logo and label.
	 */
	@Prop() public _color?: Stringified<PropColor> = '#003c78';

	@Watch('_color')
	public watchColor(value?: Stringified<PropColor>): void {
		kolibriColorProp.apply(value, (v) => this.setRenderProp('color', v));
	}

	/**
	 * Defines whether the component has a label.
	 */
	@Prop() public _labeled?: LabeledPropType = true;

	@Watch('_labeled')
	public watchLabeled(value?: LabeledPropType): void {
		labeledProp.apply(value, (v) => this.setRenderProp('labeled', v));
	}

	public componentWillLoad(): void {
		this.watchColor(this._color);
		this.watchLabeled(this._labeled);
	}

	public render(): JSX.Element {
		return (
			<Host>
				<KolibriFC ariaLabel={this.translateKolibriLogo} color={this.getRenderProp('color')} labeled={this.getRenderProp('labeled')} />
			</Host>
		);
	}
}
