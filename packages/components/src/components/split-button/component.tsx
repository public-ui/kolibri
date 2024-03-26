import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Stringified } from '../../types/common';
import { AlternativeButtonLinkRolePropType } from '../../types/props/alternative-button-link-role';
import { ButtonCallbacksPropType } from '../../types/props/button-callbacks';
import { ButtonTypePropType } from '../../types/props/button-type';
import { ButtonVariantPropType } from '../../types/props/button-variant';
import { CustomClassPropType } from '../../types/props/custom-class';
import { IconsPropType } from '../../types/props/icons';
import { LabelPropType } from '../../types/props/label';
import { validateShow } from '../../types/props/show';
import { SyncValueBySelectorPropType } from '../../types/props/sync-value-by-selector';
import { TooltipAlignPropType } from '../../types/props/tooltip-align';
import { StencilUnknown } from '../../types/unknown';
import { API, States } from './types';
import { KolButtonWcTag } from '../../core/component-names';

/**
 * @slot - Ermöglicht das Einfügen beliebigen HTMLs in das dropdown.
 */
@Component({
	tag: 'kol-split-button',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSplitButton implements API {
	private dropdown: HTMLDivElement | undefined;
	private dropdownContent: HTMLDivElement | undefined;

	private readonly clickButtonHandler = {
		onClick: (e: MouseEvent) => {
			if (typeof this._on?.onClick === 'function') {
				// TODO: this._on is not validated
				this._on?.onClick(e, this._value);
			} else {
				this.toggleDropdown();
			}
		},
	};
	private readonly clickToggleHandler = { onClick: () => this.toggleDropdown() };

	private readonly openDropdown = () => {
		if (this.dropdown && this.dropdownContent) {
			this.dropdown.style.height = `${this.dropdownContent.clientHeight}px`;
			this.state = { ...this.state, _show: true };
		}
	};
	private readonly closeDropdown = () => {
		if (this.dropdown && this.dropdownContent) {
			this.dropdown.style.height = ``;
			this.state = { ...this.state, _show: false };
		}
	};
	private readonly toggleDropdown = (value?: boolean) => {
		const openIt = typeof value === 'boolean' ? value : !this.state._show;
		if (openIt) this.openDropdown();
		else this.closeDropdown();
	};
	private forceCounter = 100; // because the dropdown could be empty
	private readonly forceOpenDropdown = () => {
		if (this.forceCounter > 0) {
			if (this.dropdownContent?.clientHeight) this.openDropdown();
			else setTimeout(this.forceOpenDropdown, 10);
			this.forceCounter--;
		}
	};

	private readonly catchDropdownElements = (e?: HTMLDivElement | null) => {
		if (e) {
			this.dropdown = e;
			setTimeout(() => {
				this.dropdownContent = e.firstChild as HTMLDivElement;
				if (this._show) this.forceOpenDropdown();
			});
		}
	};

	public render(): JSX.Element {
		return (
			<Host class="kol-split-button split-button">
				<KolButtonWcTag
					class={{
						'main-button': true,
						button: true,
						[this._variant as string]: this._variant !== 'custom',
						[this._customClass as string]: this._variant === 'custom' && typeof this._customClass === 'string' && this._customClass.length > 0,
					}}
					_accessKey={this._accessKey}
					_ariaControls={this._ariaControls}
					_ariaExpanded={this._ariaExpanded}
					_ariaSelected={this._ariaSelected}
					_customClass={this._customClass}
					_disabled={this._disabled}
					_icons={this._icons || this._icon}
					_hideLabel={this._hideLabel}
					_label={this._label}
					_name={this._name}
					_on={this.clickButtonHandler}
					_role={this._role}
					_syncValueBySelector={this._syncValueBySelector}
					_tabIndex={this._tabIndex}
					_tooltipAlign={this._tooltipAlign}
					_type={this._type}
					_value={this._value}
					_variant={this._variant}
				></KolButtonWcTag>
				<div class="horizontal-line"></div>
				<KolButtonWcTag
					class="secondary-button"
					_disabled={this._disabled}
					_hideLabel
					_icons="codicon codicon-triangle-down"
					_label={`dropdown ${this.state._show ? 'schließen' : 'öffnen'}`} // @todo: translate
					_on={this.clickToggleHandler}
				></KolButtonWcTag>
				<div class="popover" ref={this.catchDropdownElements}>
					<div class="popover-content">
						<slot />
					</div>
				</div>
			</Host>
		);
	}

	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;

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
	 * Defines the internal ID of the primary component element.
	 */
	@Prop() public _id?: string;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

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
	 * Makes the element show up.
	 * @TODO: Change type back to `ShowPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _show?: boolean = false;

	/**
	 * Deprecated: Defines whether to show the dropdown menu.
	 * @deprecated use _show instead
	 */
	@Prop({ mutable: true, reflect: true }) public _showDropdown?: boolean = false;

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

	@State() public state: States = {
		_show: false,
	};

	/**
	 * @deprecated will be removed in the next major version
	 */
	@Watch('_show')
	public validateShowDropdown(value?: boolean): void {
		this.validateShow(value);
	}

	@Watch('_show')
	public validateShow(value?: boolean): void {
		validateShow(this, value, {
			hooks: {
				afterPatch: (value) => {
					this.toggleDropdown(!!value);
				},
			},
		});
	}

	public componentWillLoad(): void {
		this.validateShow(this._show || this._show);
	}
}
