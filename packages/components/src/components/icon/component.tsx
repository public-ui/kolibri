import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { IconApi } from '../../internal/functional-components/icon/api';
import { IconFC } from '../../internal/functional-components/icon/component';
import { IconController } from '../../internal/functional-components/icon/controller';

@Component({
	tag: 'kol-icon',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolIcon extends BaseWebComponent<IconApi> implements WebComponentInterface<IconApi> {
	private readonly ctrl = new IconController(this.setState, this.getState);

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop()
	public _icons!: string;

	@Watch('_icons')
	public watchIcons(value?: string): void {
		this.ctrl.watchIcons(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label!: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		this.ctrl.watchLabel(value);
	}

	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
			icons: this._icons,
			label: this._label,
		});
	}

	public render(): JSX.Element {
		return (
			<Host>
				<IconFC icons={this.ctrl.getRenderProp('icons')} label={this.ctrl.getRenderProp('label')} />
			</Host>
		);
	}
}
