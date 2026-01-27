import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';
import type { WebComponentInterface } from '../_skeleton/internal/functional-components/generic-types';
import type { IconApi } from '../_skeleton/internal/functional-components/icon/api';
import { IconFC } from '../_skeleton/internal/functional-components/icon/component';
import { IconController } from '../_skeleton/internal/functional-components/icon/controller';
import type { IconsPropType } from '../_skeleton/internal/schema/props/icons';
import type { LabelPropType } from '../_skeleton/internal/schema/props/label';

/**
 * @part icon - Allows styling of the inner icon element.
 */
@Component({
	tag: 'kol-icon',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolIcon implements WebComponentInterface<IconApi> {
	private readonly ctrl = new IconController();

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop()
	public _icons!: IconsPropType;

	@Watch('_icons')
	public watchIcons(value?: IconsPropType): void {
		this.ctrl.watchIcons(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label!: LabelPropType;

	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		this.ctrl.watchLabel(value);
	}

	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
			icons: this._icons,
			label: this._label,
		});
	}

	public render(): JSX.Element {
		const { icons, label } = this.ctrl.getProps();
		return (
			<Host exportparts="icon">
				<IconFC icons={icons} label={label} />
			</Host>
		);
	}
}
