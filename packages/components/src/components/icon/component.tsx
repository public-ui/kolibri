import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { IconApi } from '../../internal/functional-components/icon/api';
import { iconPropsConfig } from '../../internal/functional-components/icon/api';
import { IconFC } from '../../internal/functional-components/icon/component';
import { iconsProp, labelProp } from '../../internal/props';

/**
 * The **Icon** component allows icons from included icon fonts to be displayed at any position.
 */
@Component({
	tag: 'kol-icon',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolIcon extends BaseWebComponent<IconApi> implements WebComponentInterface<IconApi> {
	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop()
	public _icons!: string;

	@Watch('_icons')
	public watchIcons(value?: string): void {
		iconsProp.apply(value, (v) => this.setRenderProp('icons', v));
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label!: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	public componentWillLoad(): void {
		this.initRenderProps(iconPropsConfig);

		iconsProp.apply(this._icons, (v) => this.setRenderProp('icons', v));
		labelProp.apply(this._label, (v) => this.setRenderProp('label', v));
	}

	public render(): JSX.Element {
		return (
			<Host>
				<IconFC icons={this.getRenderProp('icons')} label={this.getRenderProp('label')} />
			</Host>
		);
	}
}
