import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';

import { translate } from '../../i18n';
import { LinkOnCallbacks } from '../../types/button-link';
import { AriaCurrentPropType } from '../../types/props/aria-current';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { propagateFocus } from '../../utils/reuse';
import { DownloadPropType } from '../../types/props/download';
import { AlternativeButtonLinkRolePropType } from '../../types/props/alternative-button-link-role';
import { ButtonVariantPropType } from '../../types/props/button-variant';
import { LinkTargetPropType } from '../../types/props/link-target';
import { Props } from './types';
import { CustomClassPropType } from '../../types/props/custom-class';
import { HrefPropType } from '../../types/props/href';
import { IconPropType } from '../../types/props/icon';
import { TooltipAlignPropType } from '../../types/props/tooltip-align';

@Component({
	tag: 'kol-link-button',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolLinkButton implements Props {
	@Element() private readonly host?: HTMLKolLinkButtonElement;
	private ref?: HTMLKolLinkWcElement;

	private readonly catchRef = (ref?: HTMLKolLinkWcElement) => {
		this.ref = ref;
		propagateFocus(this.host, this.ref);
	};

	public render(): JSX.Element {
		return (
			<Host>
				<kol-link-wc
					ref={this.catchRef}
					class={{
						button: true,
						[this._variant as string]: this._variant !== 'custom',
						[this._customClass as string]: this._variant === 'custom' && typeof this._customClass === 'string' && this._customClass.length > 0,
					}}
					_ariaControls={this._ariaControls}
					_ariaCurrent={this._ariaCurrent}
					_ariaExpanded={this._ariaExpanded}
					_ariaLabel={this._ariaLabel}
					_ariaSelected={this._ariaSelected}
					_disabled={this._disabled}
					_download={this._download}
					_hideLabel={this._hideLabel}
					_href={this._href}
					_icon={this._icon}
					_label={this._label}
					_listenAriaCurrent={this._listenAriaCurrent}
					_on={this._on}
					_role="button"
					_tabIndex={this._tabIndex}
					_target={this._target}
					_targetDescription={this._targetDescription}
					_tooltipAlign={this._tooltipAlign}
				>
					<slot name="expert" slot="expert"></slot>
				</kol-link-wc>
			</Host>
		);
	}

	/**
	 * Deprecated: Gibt an, welche Elemente kontrolliert werden. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 *
	 * @deprecated will be removed in v2
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Deprecated: Gibt an, welchen aktuellen Auswahlstatus das interaktive Element der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 *
	 * @deprecated use _listen-aria-current instead
	 */
	@Prop() public _ariaCurrent?: AriaCurrentPropType;

	/**
	 * Deprecated: Gibt an, ob durch das interaktive Element in der Komponente etwas aufgeklappt wurde. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 *
	 * @deprecated will be removed in v2
	 */
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Deprecated: Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 * @deprecated use _label instead
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * Deprecated: Gibt an, ob interaktive Element in der Komponente ausgewählt ist (z.B. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 *
	 * @deprecated will be removed in v2
	 */
	@Prop() public _ariaSelected?: boolean;

	/**
	 * Defines the custom class attribute.
	 */
	@Prop() public _customClass?: CustomClassPropType;

	/**
	 * Deprecated: Deaktiviert das interaktive Element in der Komponente und erlaubt keine Interaktion mehr damit.
	 *
	 * @deprecated Ein Link kann nicht deaktiviert werden, nutzen Sie den Button-Link stattdessen.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Tells the browser that the link contains a file. Optionally sets the filename.
	 */
	@Prop() public _download?: DownloadPropType = false;

	/**
	 * Tells the label and shows it in a Tooltip instead.
	 * TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * This property is used for a link from a reference to the target URL.
	 */
	@Prop() public _href!: HrefPropType;

	/**
	 * Defines the icon classnames.
	 */
	@Prop() public _icon?: IconPropType;

	/**
	 * Deprecated: Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 * @deprecated use _hide-label
	 */
	@Prop() public _iconOnly?: boolean;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Listen on a aria-current event with this value. If the value matches the current value and the href is the same as the current url, the aria-current attribute will be set to current value.
	 */
	@Prop() public _listenAriaCurrent?: AriaCurrentPropType;

	/**
	 * Gibt die EventCallback-Funktionen für den Link an.
	 * @deprecated
	 */
	@Prop() public _on?: LinkOnCallbacks;

	/**
	 * Defines the role of the components primary element.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;

	/**
	 * Gibt an, welchen Tab-Index das primäre Element in der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Defines where to open the link.
	 */
	@Prop() public _target?: LinkTargetPropType;

	/**
	 * Gibt die Beschreibung an, wenn der Link in einem anderen Programm geöffnet wird.
	 */
	@Prop() public _targetDescription?: string = translate('kol-open-link-in-tab');

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'right';

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: ButtonVariantPropType = 'normal';
}
