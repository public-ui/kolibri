import { Component, Element, h, Host, JSX, Prop } from '@stencil/core';

import { translate } from '../../i18n';
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
					_download={this._download}
					_hideLabel={this._hideLabel}
					_href={this._href}
					_icons={this._icons}
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
	 * Defines the custom class attribute if _variant="custom" is set.
	 */
	@Prop() public _customClass?: CustomClassPropType;

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
	@Prop() public _icons?: IconsPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Listen on an aria-current event with this value. If the value matches the current value and the href is the same as the current url, the aria-current attribute will be set to current value.
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
	 * Defines the description to use when the link is going to be opened in another application.
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
