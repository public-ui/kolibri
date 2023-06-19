import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { AriaLabel } from '../../types/aria-label';
import { watchString } from '../../utils/prop.validators';
import { devHint } from '../../utils/a11y.tipps';
import { validateLabel } from '../../types/props';

type RequiredProps = {
	icon: string;
};
type OptionalProps = {
	label: string;
	part: string;
} & AriaLabel;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

/**
 * TODO: Wy we provide not a icon-wc component instead?!
 */

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
export class KolIcon implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		const label = this.state._label;
		return (
			<Host exportparts="icon">
				<i
					aria-hidden={label ? undefined : 'true'}
					/**
					 * Die Auszeichnung `aria-hidden` ist eigentlich nicht erforderlich, da die aktuellen
					 * Screenreader, wie NVDA und JAWS, es auch ohne `aria-hidden` nicht vorlesen.
					 *
					 * Referenz: https://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
					 */
					aria-label={label}
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
	@Prop() public _label?: string;

	/**
	 * Gibt den Identifier für den CSS-Part an, um das Icon von Außen ändern zu können. (https://meowni.ca/posts/part-theme-explainer/)
	 *
	 * @deprecated Das Styling sollte stets über CSS erfolgen.
	 */
	@Prop() public _part?: string;

	@State() public state: States = {
		_label: '…', // ⚠ required
		_icon: 'codicon codicon-home',
	};

	/**
	 * @deprecated use _label instead
	 */
	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		if (!this._label) {
			this.validateLabel(value);
		}
	}

	@Watch('_icon')
	public validateIcon(value?: string): void {
		watchString(this, '_icon', value, { required: true });
	}

	@Watch('_label')
	public validateLabel(value?: string): void {
		validateLabel(this, value);
	}

	/**
	 * @deprecated
	 */
	@Watch('_part')
	public validatePart(): void {
		devHint(`ICON: The usage of the part attribute is deprecated and has no effect.`);
	}

	public componentWillLoad(): void {
		this.validateAriaLabel(this._ariaLabel);
		this.validateIcon(this._icon);
		this.validateLabel(this._label);
		this.validatePart();
	}
}
