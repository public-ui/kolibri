import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';
import { KoliBriIconProp } from '../../types/icon';
import { Generic } from '@a11y-ui/core';
import { Stringified } from '../../types/common';
import { Align, PropHideLabel, validateDisabled, validateHideLabel } from '../../types/props';
import { a11yHintDisabled } from '../../utils/a11y.tipps';
import { watchTooltipAlignment } from '../../types/button-link';
import { validateIcon } from '../../types/props/icon';
import { validateLabelWithAriaLabel } from '../../types/props/label';

// https://www.w3.org/TR/wai-aria-practices-1.1/examples/tabs/tabs-2/tabs.html

type RequiredProps = {
	label: string;
};
type OptionalProps = {
	disabled: boolean;
	icon: Stringified<KoliBriIconProp>;
	tooltipAlign: Align;
} & PropHideLabel;
export type TabButtonProps = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	label: string;
};
type OptionalStates = {};
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-tab',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolTabElement implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		return (
			<Host>
				<slot></slot>
			</Host>
		);
	}

	/**
	 * Deaktiviert das interaktive Element in der Komponente und erlaubt keine Interaktion mehr damit.
	 */
	@Prop() public _disabled?: boolean;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 */
	@Prop() public _hideLabel?: boolean;

	/**
	 * Setzt die Iconklasse (z.B.: `_icon="codicon codicon-home`).
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label!: string;

	/**
	 * Gibt an, ob der Tooltip bevorzugt entweder oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop() public _tooltipAlign?: Align;

	@State() public state: States = {
		_label: '…',
	};

	@Watch('_disabled')
	public validateDisabled(value?: boolean): void {
		validateDisabled(this, value);
		if (value === true) {
			a11yHintDisabled();
		}
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: boolean): void {
		validateHideLabel(this, value);
	}

	@Watch('_icon')
	public validateIcon(value?: KoliBriIconProp): void {
		validateIcon(this, value);
	}

	@Watch('_label')
	public validateLabel(value?: string): void {
		validateLabelWithAriaLabel(this, value);
	}

	@Watch('_tooltipAlign')
	public validateTooltipAlign(value?: Align): void {
		watchTooltipAlignment(this, '_tooltipAlign', value);
	}

	public componentWillLoad(): void {
		this.validateDisabled(this._disabled);
		this.validateHideLabel(this._hideLabel);
		this.validateIcon(this._icon);
		this.validateLabel(this._label);
		this.validateTooltipAlign(this._tooltipAlign);
	}
}
