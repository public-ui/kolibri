import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { LabelPropType, validateLabel } from '../../types/props/label';
import { watchString } from '../../utils/prop.validators';
import { API, States } from './types';

/**
 * @part icon - Ermöglicht das Styling des inneren Icons.
 */
@Component({
	tag: 'kol-icon',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolIcon implements API {
	public render(): JSX.Element {
		const ariaShow = this.state._label.length > 0;
		return (
			<Host exportparts="icon">
				<i
					aria-hidden={ariaShow ? undefined : 'true'}
					/**
					 * Die Auszeichnung `aria-hidden` ist eigentlich nicht erforderlich, da die aktuellen
					 * Screenreader, wie NVDA und JAWS, es auch ohne `aria-hidden` nicht vorlesen.
					 *
					 * Referenz: https://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
					 */
					aria-label={ariaShow ? this.state._label : undefined}
					class={this.state._icons}
					part="icon"
					role="img"
				></i>
			</Host>
		);
	}

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons!: string;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	@State() public state: States = {
		_icons: 'codicon codicon-home',
		_label: '', // ⚠ required
	};

	@Watch('_icons')
	public validateIcons(value?: string): void {
		watchString(this, '_icons', value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	public componentWillLoad(): void {
		this.validateIcons(this._icons);
		this.validateLabel(this._label);
	}
}
