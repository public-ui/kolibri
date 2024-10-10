import type { IconAPI, IconStates, LabelPropType } from '../../schema';
import { validateLabel, watchString } from '../../schema';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

import type { JSX } from '@stencil/core';
/**
 * @part icon - Ermöglicht das Styling des inneren Icons.
 */
@Component({
	tag: 'kol-icon',
	styleUrls: {
		default: './style.scss',
	},
	shadow: {
		delegatesFocus: true,
	},
})
export class KolIcon implements IconAPI {
	public render(): JSX.Element {
		const ariaShow = this.state._label.length > 0;
		return (
			<Host exportparts="icon" class="kol-icon">
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

	@State() public state: IconStates = {
		_icons: 'codicon codicon-home',
		_label: '', // ⚠ required
	};

	@Watch('_icons')
	public validateIcons(value?: string): void {
		watchString(this, '_icons', value, {
			required: true,
		});
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	public componentWillLoad(): void {
		this.validateIcons(this._icons);
		this.validateLabel(this._label);
	}
}
