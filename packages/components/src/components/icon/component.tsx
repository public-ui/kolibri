import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { watchString } from '../../utils/prop.validators';
import { devHint } from '../../utils/a11y.tipps';
import { KoliBriIconAPI, KoliBriIconStates } from './types';

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
export class KolIcon implements KoliBriIconAPI {
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
					class={this.state._icon}
					part="icon"
					role="img"
				></i>
			</Host>
		);
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 * @deprecated use _label instead
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * Setzt die Iconklasse (z.B.: `_icon="codicon codicon-home`).
	 */
	@Prop() public _icon!: string;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	// TODO v2: make required
	@Prop() public _label?: string;

	/**
	 * Gibt den Identifier für den CSS-Part an, um das Icon von Außen ändern zu können. (https://meowni.ca/posts/part-theme-explainer/)
	 *
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	@Prop() public _part?: string;

	@State() public state: KoliBriIconStates = {
		_icon: 'codicon codicon-home',
	};

	/**
	 * @deprecated use _label instead
	 */
	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		this.validateLabel(value);
	}

	@Watch('_icon')
	public validateIcon(value?: string): void {
		watchString(this, '_icon', value, { required: true });
	}

	@Watch('_label')
	public validateLabel(value?: string): void {
		watchString(this, '_label', value, { required: true });
	}

	/**
	 * @deprecated
	 */
	@Watch('_part')
	public validatePart(): void {
		devHint(`ICON: The usage of the part attribute is deprecated and has no effect.`);
	}

	public componentWillLoad(): void {
		this.validateIcon(this._icon);
		this.validateLabel(this._label || this._ariaLabel);
		this.validatePart();
	}
}
