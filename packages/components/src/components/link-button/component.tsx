import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';
import { AlternativeButtonLinkRolePropType } from '../../types/props/alternative-button-link-role';
import { AriaCurrentPropType } from '../../types/props/aria-current';
import { ButtonVariantPropType } from '../../types/props/button-variant';
import { CustomClassPropType } from '../../types/props/custom-class';
import { DownloadPropType } from '../../types/props/download';
import { HrefPropType } from '../../types/props/href';
import { IconsPropType } from '../../types/props/icons';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { LinkOnCallbacksPropType } from '../../types/props/link-on-callbacks';
import { LinkTargetPropType } from '../../types/props/link-target';
import { TooltipAlignPropType } from '../../types/props/tooltip-align';
import { propagateFocus } from '../../utils/reuse';
import { Props } from './types';

@Component({
	tag: 'kol-link-button',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolLinkButton implements Props {
	@Element() private readonly host?: HTMLKolLinkButtonElement;

	private readonly catchRef = (ref?: HTMLKolLinkWcElement) => {
		propagateFocus(this.host, ref);
	};

	public render(): JSX.Element {
		return (
			<Host class="kol-link-button">
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
					_tooltipAlign={this._tooltipAlign}
				>
					<slot name="expert" slot="expert"></slot>
				</kol-link-wc>
			</Host>
		);
	}

	/**
	 * Deprecated: Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 *
	 * @deprecated will be removed in v2
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Deprecated: Marks the element as the selected in a group of related elements. Can be one of the following: `date` | `location` | `page` | `step` | `time` | `true`. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 *
	 * @deprecated use _listen-aria-current instead
	 */
	@Prop() public _ariaCurrent?: AriaCurrentPropType;

	/**
	 * Deprecated: Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 *
	 * @deprecated will be removed in v2
	 */
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Deprecated: Setzt die semantische Beschriftung der Komponente.
	 *
	 * @deprecated use _label instead
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * Deprecated: Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 *
	 * @deprecated will be removed in v2
	 */
	@Prop() public _ariaSelected?: boolean;

	/**
	 * Defines the custom class attribute if _variant="custom" is set.
	 */
	@Prop() public _customClass?: CustomClassPropType;

	/**
	 * Deprecated: Makes the element not focusable and ignore all events.
	 *
	 * @deprecated Ein Link kann nicht deaktiviert werden, nutzen Sie den Button-Link stattdessen.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Tells the browser that the link contains a file. Optionally sets the filename.
	 */
	@Prop() public _download?: DownloadPropType;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the target URI of the link.
	 */
	@Prop() public _href!: HrefPropType;

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icon?: IconsPropType;

	/**
	 * Deprecated: Hides the label and shows the description in a Tooltip instead.
	 * @deprecated use _hide-label
	 */
	@Prop() public _iconOnly?: boolean;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Listen on a aria-current event with this value. If the value matches the current value and the href is the same as the current url, the aria-current attribute will be set to current value.
	 */
	@Prop() public _listenAriaCurrent?: AriaCurrentPropType;

	/**
	 * Defines the callback functions for links.
	 */
	@Prop() public _on?: LinkOnCallbacksPropType;

	/**
	 * Defines the role of the components primary element.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;

	/**
	 * Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Defines where to open the link.
	 */
	@Prop() public _target?: LinkTargetPropType;

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'right';

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: ButtonVariantPropType = 'normal';
}
