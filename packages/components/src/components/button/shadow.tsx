import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';

import { Stringified } from '../../types/common';
import { AlignPropType } from '../../types/props/align';
import { AlternativeButtonLinkRolePropType } from '../../types/props/alternative-button-link-role';
import { AriaCurrentPropType } from '../../types/props/aria-current';
import { ButtonCallbacksPropType } from '../../types/props/button-callbacks';
import { ButtonTypePropType } from '../../types/props/button-type';
import { ButtonVariantPropType } from '../../types/props/button-variant';
import { CustomClassPropType } from '../../types/props/custom-class';
import { IconsPropType } from '../../types/props/icons';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { SyncValueBySelectorPropType } from '../../types/props/sync-value-by-selector';
import { TooltipAlignPropType } from '../../types/props/tooltip-align';
import { StencilUnknown } from '../../types/unknown';
import { propagateFocus } from '../../utils/reuse';
import { Props } from './types';

@Component({
	tag: 'kol-button',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolButton implements Props {
	@Element() private readonly host?: HTMLKolButtonElement;

	private readonly catchRef = (ref?: HTMLKolButtonWcElement) => {
		propagateFocus(this.host, ref);
	};

	public render(): JSX.Element {
		return (
			<Host>
				<kol-button-wc
					ref={this.catchRef}
					class={{
						button: true,
						'kol-button': true,
						[this._variant as string]: this._variant !== 'custom',
						[this._customClass as string]: this._variant === 'custom' && typeof this._customClass === 'string' && this._customClass.length > 0,
					}}
					_accessKey={this._accessKey}
					_ariaControls={this._ariaControls}
					_ariaCurrent={this._ariaCurrent}
					_ariaExpanded={this._ariaExpanded}
					_ariaLabel={this._ariaLabel}
					_ariaSelected={this._ariaSelected}
					_customClass={this._customClass}
					_disabled={this._disabled}
					_hideLabel={this._hideLabel || this._iconOnly}
					_icons={this._icons || this._icon}
					_iconAlign={this._iconAlign}
					_id={this._id}
					_label={this._label}
					_name={this._name}
					_on={this._on}
					_role={this._role}
					_syncValueBySelector={this._syncValueBySelector}
					_tabIndex={this._tabIndex}
					_tooltipAlign={this._tooltipAlign}
					_type={this._type}
					_value={this._value}
					_variant={this._variant}
				>
					<slot name="expert" slot="expert"></slot>
				</kol-button-wc>
			</Host>
		);
	}

	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
	 *
	 * @deprecated
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Deprecated: Marks the element as the selected in a group of related elements. Can be one of the following: `date` | `location` | `page` | `step` | `time` | `true`. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current)
	 *
	 * @deprecated aria-current is not necessary for buttons. will be removed in version 2.
	 */
	@Prop() public _ariaCurrent?: AriaCurrentPropType;

	/**
	 * Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 */
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Deprecated: Setzt die semantische Beschriftung der Komponente.
	 *
	 * @deprecated use _label instead
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 */
	@Prop() public _ariaSelected?: boolean;

	/**
	 * Defines the custom class attribute if _variant="custom" is set.
	 */
	@Prop() public _customClass?: CustomClassPropType;

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * @deprecated Use _icons.
	 */
	@Prop() public _icon?: IconsPropType;

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: IconsPropType;

	/**
	 * Deprecated: Defines where to show the Tooltip preferably: top, right, bottom or left.
	 *
	 * @deprecated
	 */
	@Prop() public _iconAlign?: AlignPropType;

	/**
	 * Deprecated: Hides the label and shows the description in a Tooltip instead.
	 * @deprecated use _hide-label
	 */
	@Prop() public _iconOnly?: boolean;

	/**
	 * Defines the internal ID of the primary component element.
	 */
	@Prop() public _id?: string;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: string;

	/**
	 * Defines the callback functions for button events.
	 */
	@Prop() public _on?: ButtonCallbacksPropType<StencilUnknown>;

	/**
	 * Defines the role of the components primary element.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: SyncValueBySelectorPropType;

	/**
	 * Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'top';

	/**
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type?: ButtonTypePropType = 'button';

	/**
	 * Defines the value that the button emits on click.
	 */
	@Prop() public _value?: Stringified<StencilUnknown>;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: ButtonVariantPropType = 'normal';
}
