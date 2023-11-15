import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';

import { Stringified } from '../../types/common';
import { AlternativeButtonLinkRolePropType } from '../../types/props/alternative-button-link-role';
import { ButtonCallbacksPropType } from '../../types/props/button-callbacks';
import { ButtonTypePropType } from '../../types/props/button-type';
import { IconsPropType } from '../../types/props/icons';
import { IdPropType } from '../../types/props/id';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { NamePropType } from '../../types/props/name';
import { SyncValueBySelectorPropType } from '../../types/props/sync-value-by-selector';
import { TooltipAlignPropType } from '../../types/props/tooltip-align';
import { StencilUnknown } from '../../types/unknown';
import { propagateFocus } from '../../utils/reuse';
import { Props } from './types';
import { AccessKeyPropType } from '../../types/props/access-key';

@Component({
	tag: 'kol-button-link',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolButtonLink implements Props {
	@Element() private readonly host?: HTMLKolButtonLinkElement;

	private readonly catchRef = (ref?: HTMLKolButtonWcElement) => {
		propagateFocus(this.host, ref);
	};

	public render(): JSX.Element {
		return (
			<Host>
				<kol-button-wc
					ref={this.catchRef}
					_accessKey={this._accessKey}
					_ariaControls={this._ariaControls}
					_ariaExpanded={this._ariaExpanded}
					_ariaSelected={this._ariaSelected}
					_disabled={this._disabled}
					_icons={this._icons}
					_hideLabel={this._hideLabel}
					_id={this._id}
					_label={this._label}
					_name={this._name}
					_on={this._on}
					_role="link"
					_syncValueBySelector={this._syncValueBySelector}
					_tabIndex={this._tabIndex}
					_tooltipAlign={this._tooltipAlign}
					_type={this._type}
					_value={this._value}
				>
					<slot name="expert" slot="expert"></slot>
				</kol-button-wc>
			</Host>
		);
	}

	/**
	 * Defines the elements access key.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;

	/**
	 * Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;

	/**
	 * Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 * @TODO: Change type back to `AriaExpandedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _ariaExpanded?: boolean;

	/**
	 * Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 * @TODO: Change type back to `AriaSelectedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _ariaSelected?: boolean;

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: IconsPropType;

	/**
	 * Defines the internal ID of the primary component element.
	 */
	@Prop() public _id?: IdPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: NamePropType;

	/**
	 * Gibt die EventCallback-Funktionen für die Button-Events an.
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
}
