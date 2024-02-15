import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { LabelPropType, validateLabel } from '../../types/props/label';
import { devHint } from '../../utils/a11y.tipps';
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
		const ariaShow = typeof this.state._label === 'string' && this.state._label.length > 0;
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
					class={`kol-icon-wc ${this.state._icons}`}
					part="icon"
					role="img"
				></i>
			</Host>
		);
	}

	/**
	 * Deprecated: Setzt die semantische Beschriftung der Komponente.
	 * @deprecated use _label instead
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * @deprecated Use _icons.
	 */
	@Prop() public _icon?: string;

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: string;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType; // TODO: required in v2

	/**
	 * Deprecated: Gibt den Identifier für den CSS-Part an, um das Icon von Außen ändern zu können. (https://meowni.ca/posts/part-theme-explainer/)
	 *
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	@Prop() public _part?: string;

	@State() public state: States = {
		_icons: 'codicon codicon-home', // ⚠ required
		// _label: '…', // ⚠ required TODO: required in v2
	};

	/**
	 * @deprecated
	 */
	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		this.validateLabel(value);
	}

	/**
	 * @deprecated
	 */
	@Watch('_icon')
	public validateIcon(value?: string): void {
		this.validateIcons(value);
	}

	@Watch('_icons')
	public validateIcons(value?: string): void {
		watchString(this, '_icons', value, {
			defaultValue: 'codicon codicon-home',
		});
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	/**
	 * @deprecated
	 */
	@Watch('_part')
	public validatePart(value?: string): void {
		if (value) {
			devHint(`ICON: The usage of the part attribute is deprecated and has no effect.`);
		}
	}

	public componentWillLoad(): void {
		this.validateIcons(this._icons || this._icon);
		this.validateLabel(this._label || this._ariaLabel);
		this.validatePart(this._part);
	}
}
