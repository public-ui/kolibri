import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Stringified } from '../../types/common';
import { InputTypeOnDefault } from '../../types/input/types';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { StencilUnknown } from '../../types/unknown';
import { nonce } from '../../utils/dev.utils';
import { stopPropagation, tryToDispatchKoliBriEvent } from '../../utils/events';
import { propagateFocus } from '../../utils/reuse';
import { getRenderStates } from '../input/controller';
import { InputCheckboxController } from './controller';
import { API, InputCheckboxIcon, InputCheckboxVariant, States } from './types';
import { CheckedPropType } from '../../types/props/checked';
import { IndeterminatePropType } from '../../types/props/indeterminate';
import { SyncValueBySelectorPropType } from '../../types/props/sync-value-by-selector';
import { IdPropType } from '../../types/props/id';
import { NamePropType } from '../../types/props/name';
import { TooltipAlignPropType } from '../../types/props/tooltip-align';

/**
 * @slot - Die Beschriftung der Checkbox.
 */
@Component({
	tag: 'kol-input-checkbox',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolInputCheckbox implements API {
	@Element() private readonly host?: HTMLKolInputCheckboxElement;
	private ref?: HTMLInputElement;

	private readonly catchRef = (ref?: HTMLInputElement) => {
		this.ref = ref;
		propagateFocus(this.host, this.ref);
	};

	public render(): JSX.Element {
		const { ariaDescribedBy } = getRenderStates(this.state);
		const hasExpertSlot = this.state._label === false; // _label="" or _label

		return (
			<Host>
				<kol-input
					class={{
						checkbox: true,
						[this.state._variant]: true,
						'hide-label': !!this.state._hideLabel,
					}}
					data-role={this.state._variant === 'button' ? 'button' : undefined}
					onKeyPress={this.state._variant === 'button' ? this.onChange : undefined}
					tabIndex={this.state._variant === 'button' ? 0 : undefined}
					_alert={this.state._alert}
					_disabled={this.state._disabled}
					_error={this.state._error}
					_hideLabel={this.state._hideLabel}
					_hint={this.state._hint}
					_id={this.state._id}
					_required={this.state._required}
					_touched={this.state._touched}
				>
					{/*  TODO: der folgende Slot ohne Name muss später entfernt werden */}
					<span slot="label">{hasExpertSlot ? <slot></slot> : this.state._label}</span>
					<div slot="input">
						<kol-icon
							onClick={this.onChange}
							_ariaLabel=""
							_icon={this.state._indeterminate ? this.state._icon.indeterminate : this.state._checked ? this.state._icon.checked : this.state._icon.unchecked}
						/>
						<input
							ref={this.catchRef}
							title=""
							accessKey={this.state._accessKey} // by checkbox?!
							aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
							aria-label={this.state._hideLabel && typeof this.state._label === 'string' ? this.state._label : undefined}
							checked={this.state._checked}
							disabled={this.state._disabled}
							id={this.state._id}
							indeterminate={this.state._indeterminate}
							name={this.state._name}
							required={this.state._required}
							tabIndex={this.state._tabIndex}
							type="checkbox"
							{...this.controller.onFacade}
							onChange={this.onChange}
							onClick={undefined} // onClick is not needed since onChange already triggers the correct event
						/>
						<kol-tooltip
							/**
							 * Dieses Aria-Hidden verhindert das doppelte Vorlesen des Labels,
							 * verhindert aber nicht das Aria-Labelledby vorgelesen wird.
							 */
							aria-hidden="true"
							hidden={hasExpertSlot || !this.state._hideLabel}
							_align={this._tooltipAlign}
							_label={typeof this.state._label === 'string' ? this.state._label : ''}
						></kol-tooltip>
					</div>
				</kol-input>
			</Host>
		);
	}

	private readonly controller: InputCheckboxController;

	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines whether the screen-readers should read out the notification.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = true;

	/**
	 * Defines whether the checkbox is checked or not. Can be read and written.
	 * @TODO: Change type back to `CheckedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _checked?: boolean = false;

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _disabled?: boolean;

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 */
	@Prop() public _error?: string;

	/**
	 * Hides the label and shows the description in a Tooltip instead.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean;

	/**
	 * Gibt den Hinweistext an.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Defines the icon classnames (e.g. `_icon="fa-solid fa-user"`).
	 */
	@Prop() public _icon?: Stringified<InputCheckboxIcon>;

	/**
	 * Defines the internal ID of the primary component element.
	 */
	@Prop() public _id?: IdPropType;

	/**
	 * Puts the checkbox in the indeterminate state, does not change the value of _checked.
	 * @TODO: Change type back to `IndeterminatePropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _indeterminate?: boolean;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: NamePropType;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Makes the input element required.
	 * @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _required?: boolean;

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
	 * Shows if the input was touched by a user.
	 * @TODO: Change type back to `TouchedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _touched?: boolean = false;

	/**
	 * Defines which variant should be used for presentation.
	 *
	 * @deprecated Verwende stattdessen das Attribute _variant.
	 */
	@Prop() public _type?: InputCheckboxVariant;

	/**
	 * Gibt den Schlüssel/Namen der Checkbox an. ({ [value]: [checked] })
	 */
	@Prop() public _value!: Stringified<StencilUnknown>;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: InputCheckboxVariant; // TODO: = 'default'; in v2 setzen

	@State() public state: States = {
		_checked: false,
		_icon: {
			checked: 'codicon codicon-check',
			indeterminate: 'codicon codicon-remove',
			unchecked: 'codicon codicon-add',
		},
		_id: `id-${nonce()}`, // ⚠ required
		_indeterminate: false,
		_label: false, // ⚠ required
		_value: null, // ⚠ required
		_variant: 'default',
	};

	public constructor() {
		this.controller = new InputCheckboxController(this, 'input-checkbox', this.host);
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_alert')
	public validateAlert(value?: boolean): void {
		this.controller.validateAlert(value);
	}

	@Watch('_checked')
	public validateChecked(value?: CheckedPropType): void {
		this.controller.validateChecked(value);
	}

	@Watch('_disabled')
	public validateDisabled(value?: boolean): void {
		this.controller.validateDisabled(value);
	}

	@Watch('_error')
	public validateError(value?: string): void {
		this.controller.validateError(value);
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: boolean): void {
		this.controller.validateHideLabel(value);
	}

	@Watch('_hint')
	public validateHint(value?: string): void {
		this.controller.validateHint(value);
	}

	@Watch('_icon')
	public validateIcon(value?: Stringified<InputCheckboxIcon>): void {
		this.controller.validateIcon(value);
	}

	@Watch('_id')
	public validateId(value?: string): void {
		this.controller.validateId(value);
	}

	@Watch('_indeterminate')
	public validateIndeterminate(value?: IndeterminatePropType): void {
		this.controller.validateIndeterminate(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		this.controller.validateLabel(value);
	}

	@Watch('_name')
	public validateName(value?: string): void {
		this.controller.validateName(value);
	}

	@Watch('_on')
	public validateOn(value?: InputTypeOnDefault): void {
		this.controller.validateOn(value);
	}

	@Watch('_required')
	public validateRequired(value?: boolean): void {
		this.controller.validateRequired(value);
	}

	@Watch('_syncValueBySelector')
	public validateSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.controller.validateSyncValueBySelector(value);
	}

	@Watch('_tabIndex')
	public validateTabIndex(value?: number): void {
		this.controller.validateTabIndex(value);
	}

	@Watch('_touched')
	public validateTouched(value?: boolean): void {
		this.controller.validateTouched(value);
	}

	@Watch('_type')
	public validateType(value?: InputCheckboxVariant): void {
		this.controller.validateType(value);
	}

	@Watch('_value')
	public validateValue(value?: Stringified<StencilUnknown>): void {
		this.controller.validateValue(value);
	}

	@Watch('_variant')
	public validateVariant(value?: InputCheckboxVariant): void {
		this.controller.validateVariant(value);
	}

	public componentWillLoad(): void {
		this._alert = this._alert === true;
		this._touched = this._touched === true;
		this.controller.componentWillLoad();
	}

	private onChange = (event: Event): void => {
		this._checked = !this._checked;
		this._indeterminate = false;

		const value = this._checked ? this.state._value : null;

		// Event handling
		stopPropagation(event);
		tryToDispatchKoliBriEvent('change', this.host, value);

		// Static form handling
		this.controller.setFormAssociatedValue(value);
		this.controller.setFormAssociatedCheckboxValue;

		// Callback
		if (typeof this.state._on?.onChange === 'function') {
			this.state._on.onChange(event, value);
		}
	};
}
