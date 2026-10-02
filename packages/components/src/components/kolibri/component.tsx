import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { KolibriApi } from '../../internal/functional-components/kolibri/api';
import { kolibriPropsConfig } from '../../internal/functional-components/kolibri/api';
import { KolibriFC } from '../../internal/functional-components/kolibri/component';
import { kolibriColorProp, labeledProp } from '../../internal/props';
import type { KolibriProps, PropColor, Stringified } from '../../schema';

@Component({
	tag: 'kol-kolibri',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolKolibri extends BaseWebComponent<KolibriApi> implements KolibriProps, WebComponentInterface<KolibriApi> {
	private readonly translateKolibriLogo = translate('kol-kolibri-logo');

	public componentWillLoad(): void {
		this.initRenderProps(kolibriPropsConfig);
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
	@Prop() public _labeled?: boolean = true;

	@Watch('_labeled')
	public watchLabeled(value?: boolean): void {
		labeledProp.apply(value, (v) => this.setRenderProp('labeled', v));
	}
}
