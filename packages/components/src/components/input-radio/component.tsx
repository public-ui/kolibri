import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Stringified } from '../../types/common';
import { InputTypeOnDefault } from '../../types/input/types';
import { Orientation } from '../../types/orientation';
import { HideErrorPropType } from '../../types/props/hide-error';
import { IdPropType } from '../../types/props/id';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { NamePropType } from '../../types/props/name';
import { OptionsPropType } from '../../types/props/options';
import { SyncValueBySelectorPropType } from '../../types/props/sync-value-by-selector';
import { TooltipAlignPropType } from '../../types/props/tooltip-align';
import { StencilUnknown } from '../../types/unknown';
import { W3CInputValue } from '../../types/w3c';
import { nonce } from '../../utils/dev.utils';
import { stopPropagation, tryToDispatchKoliBriEvent } from '../../utils/events';
import { propagateFocus, showExpertSlot } from '../../utils/reuse';
import { getRenderStates } from '../input/controller';
import { InputRadioController } from './controller';
import { API, States } from './types';
import { InternalUnderlinedAccessKey } from '../span/InternalUnderlinedAccessKey';

/**
 * @slot - Die Legende/Überschrift der Radiobuttons.
 */
@Component({
	tag: 'kol-input-radio',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolInputRadio implements API {
	@Element() private readonly host?: HTMLKolInputRadioElement;

	private readonly catchRef = (ref?: HTMLInputElement) => {
		propagateFocus(this.host, ref);
	};

	public render(): JSX.Element {
		const { ariaDescribedBy, hasError } = getRenderStates(this.state);
		const hasExpertSlot = showExpertSlot(this.state._label);

		return (
			<Host>
				<fieldset
					class={{
						disabled: this.state._disabled === true,
						error: hasError === true,
						required: this.state._required === true,
						'hidden-error': this._hideError === true,
						[this.state._orientation]: true,
					}}
				>
					<legend class="block w-full mb-1 leading-normal">
						{/* INFO: span is needed for css styling :after content like a star (*) or optional text ! */}
						<span>
							{/* INFO: label comes with any html tag or as plain text! */}
							<span slot="label">
								{hasExpertSlot ? (
									<slot name="expert"></slot>
								) : typeof this._accessKey === 'string' ? (
									<InternalUnderlinedAccessKey accessKey={this._accessKey} label={this._label} />
								) : (
									this._label
								)}
							</span>
						</span>
					</legend>
					{this.state._options.map((option, index) => {
						/**
						 * Damit der Value einer Option ein beliebigen Typ haben kann
						 * muss man auf HTML-Ebene den Value auf einen String-Wert
						 * mappen. Das tun wir mittels der Map.
						 */
						const customId = `${this.state._id}-${index}`;
						const slotName = `radio-${index}`;
						return (
							<kol-input
								class="radio"
								key={customId}
								_accessKey={this.state._accessKey} // by radio?!
								_disabled={this.state._disabled || option.disabled}
								_hideLabel={this.state._hideLabel}
								_hint={this.state._hint}
								_id={customId}
								_label={option.label as string}
								_renderNoLabel={true}
								_required={this.state._required}
								_slotName={slotName}
								_tooltipAlign={this._tooltipAlign}
								_touched={this.state._touched}
							>
								<div slot={slotName} class="radio-input-wrapper">
									<input
										ref={this.state._value === option.value ? this.catchRef : undefined}
										title=""
										accessKey={this.state._accessKey} // by radio?!
										aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
										aria-label={this.state._hideLabel && typeof option.label === 'string' ? option.label : undefined}
										type="radio"
										id={customId}
										checked={this.state._value === option.value}
										name={this.state._name || this.state._id}
										disabled={this.state._disabled || option.disabled}
										required={this.state._required}
										tabIndex={this.state._tabIndex}
										value={`-${index}`}
										{...this.controller.onFacade}
										onChange={this.onChange}
										onClick={undefined} // onClick is not needed since onChange already triggers the correct event
									/>
									<label
										class="radio-label"
										htmlFor={`${customId}`}
										style={{
											height: this.state._hideLabel ? '0' : undefined,
											margin: this.state._hideLabel ? '0' : undefined,
											padding: this.state._hideLabel ? '0' : undefined,
											visibility: this.state._hideLabel ? 'hidden' : undefined,
										}}
									>
										<span>
											<span>{option.label}</span>
										</span>
									</label>
								</div>
							</kol-input>
						);
					})}
					{hasError && (
						<kol-alert id="error" _alert={true} _type="error" _variant="msg" aria-hidden={this._hideError} class={`error${this._hideError ? ' hidden' : ''}`}>
							{this.state._error}
						</kol-alert>
					)}
				</fieldset>
			</Host>
		);
	}

	private readonly controller: InputRadioController;

	/**
	 * Defines which key combination can be used to trigger or focus the interactive element of the component.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines whether the screen-readers should read out the notification.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = true;

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Defines the error message text.
	 */
	@Prop() public _error?: string;

	/**
	 * Hides the error message but leaves it in the DOM for the input's aria-describedby.
	 * @TODO: Change type back to `HideErrorPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _hideError?: boolean = false;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the hint text.
	 */
	@Prop() public _hint?: string = '';

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
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Options the user can choose from.
	 */
	@Prop() public _options?: OptionsPropType;

	/**
	 * Defines whether the orientation of the component is horizontal or vertical.
	 */
	@Prop() public _orientation?: Orientation = 'vertical';

	/**
	 * Makes the input element required.
	 * @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _required?: boolean = false;

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
	 * Defines the value of the input.
	 * @see Known bug: https://github.com/ionic-team/stencil/issues/3902
	 */
	@Prop() public _value?: Stringified<W3CInputValue>;

	@State() public state: States = {
		_hideError: false,
		_id: `id-${nonce()}`, // ⚠ required
		_label: '', // ⚠ required
		_options: [],
		_orientation: 'vertical',
	};

	public constructor() {
		this.controller = new InputRadioController(this, 'input-radio', this.host);
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_alert')
	public validateAlert(value?: boolean): void {
		this.controller.validateAlert(value);
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

	@Watch('_hideError')
	public validateHideError(value?: HideErrorPropType): void {
		this.controller.validateHideError(value);
	}

	@Watch('_hint')
	public validateHint(value?: string): void {
		this.controller.validateHint(value);
	}

	@Watch('_id')
	public validateId(value?: string): void {
		this.controller.validateId(value);
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

	@Watch('_options')
	public validateOptions(value?: OptionsPropType): void {
		this.controller.validateOptions(value);
	}

	@Watch('_orientation')
	public validateOrientation(value?: Orientation): void {
		this.controller.validateOrientation(value);
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

	@Watch('_value')
	public validateValue(value?: Stringified<StencilUnknown>): void {
		this.controller.validateValue(value);
	}

	public componentWillLoad(): void {
		this._alert = this._alert === true;
		this._touched = this._touched === true;
		this.controller.componentWillLoad(this.onChange);
	}

	private onChange = (event: Event): void => {
		if (event.target instanceof HTMLInputElement) {
			const option = this.controller.getOptionByKey(event.target.value);
			if (option !== undefined) {
				// Event handling
				stopPropagation(event);
				tryToDispatchKoliBriEvent('change', this.host, option.value);

				// Static form handling
				this.controller.setFormAssociatedValue(option.value);

				// Callback
				if (typeof this.state._on?.onChange === 'function') {
					this.state._on.onChange(event, option.value);
				}

				// TODO: Prüfen, was setValue noch genau macht, wir syncValue ja jetzt.
				this.controller.setValue(event, option.value as string); // TODO: fix type
			}
		}
	};
}
