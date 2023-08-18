import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Stringified } from '../../types/common';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { InputTypeOnDefault, InputTypeOnOff, Option } from '../../types/input/types';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { SuggestionsPropType } from '../../types/props/suggestions';
import { W3CInputValue } from '../../types/w3c';
import { nonce } from '../../utils/dev.utils';
import { propagateFocus } from '../../utils/reuse';
import { propagateSubmitEventToForm } from '../form/controller';
import { getRenderStates } from '../input/controller';
import { InputRangeController } from './controller';
import { API, States } from './types';
import { SyncValueBySelectorPropType } from '../../types/props/sync-value-by-selector';
import { TooltipAlignPropType } from '../../types/props/tooltip-align';
import { IdPropType } from '../../types/props/id';
import { NamePropType } from '../../types/props/name';

/**
 * @slot - Die Beschriftung des Eingabeelements.
 */
@Component({
	tag: 'kol-input-range',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolInputRange implements API {
	@Element() private readonly host?: HTMLKolInputRangeElement;
	private ref?: HTMLInputElement;

	private readonly catchInputNumberRef = (element?: HTMLInputElement) => {
		if (element) {
			this.ref = element;
			propagateFocus(this.host, element);
			if (!this._value && this.ref?.value) {
				this.validateValue(parseFloat(this.ref.value));
			}
		}
	};

	private readonly onChange = (event: Event) => {
		let value = parseFloat((event.target as HTMLInputElement).value);
		if (this.state._max && value > this.state._max) value = this.state._max;
		if (this.state._min && value < this.state._min) value = this.state._min;
		this.validateValue(value);
		if (typeof this.state._on?.onChange === 'function') {
			this.state._on?.onChange(event, value);
		}
	};

	private readonly onKeyUp = (event: KeyboardEvent) => {
		if (event.code === 'Enter') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.ref,
			});
		} else {
			this.onChange(event);
		}
	};

	public render(): JSX.Element {
		const { ariaDescribedBy } = getRenderStates(this.state);
		const hasSuggestions = Array.isArray(this.state._suggestions) && this.state._suggestions.length > 0;
		const hasExpertSlot = this.state._label === false; // _label="" or _label

		return (
			<Host>
				<kol-input
					class={{
						range: true,
						'hide-label': !!this.state._hideLabel,
					}}
					_disabled={this.state._disabled}
					_error={this.state._error}
					_hideLabel={this.state._hideLabel}
					_hint={this.state._hint}
					_icon={this.state._icon}
					_id={this.state._id}
					_touched={this.state._touched}
				>
					{/*  TODO: der folgende Slot ohne Name muss später entfernt werden */}
					<span slot="label">{hasExpertSlot ? <slot></slot> : this.state._label}</span>
					<div slot="input">
						<div
							class="inputs-wrapper"
							style={{
								'--kolibri-input-range--input-number--width': `${this.state._max}`.length + 0.5 + 'em',
							}}
						>
							<input
								title=""
								accessKey={this.state._accessKey}
								aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
								aria-label={this.state._hideLabel && typeof this.state._label === 'string' ? this.state._label : undefined}
								autoCapitalize="off"
								autoComplete={this.state._autoComplete}
								autoCorrect="off"
								disabled={this.state._disabled}
								list={hasSuggestions ? `${this.state._id}-list` : undefined}
								max={this.state._max}
								min={this.state._min}
								name={this.state._name ? `${this.state._name}-range` : undefined}
								spellcheck="false"
								step={this.state._step}
								tabIndex={-1}
								type="range"
								value={this.state._value as number}
								{...this.controller.onFacade}
								onChange={this.onChange}
							/>
							<input
								ref={this.catchInputNumberRef}
								title=""
								accessKey={this.state._accessKey}
								aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
								aria-label={this.state._hideLabel && typeof this.state._label === 'string' ? this.state._label : undefined}
								autoCapitalize="off"
								autoComplete={this.state._autoComplete}
								autoCorrect="off"
								disabled={this.state._disabled}
								id={this.state._id}
								list={hasSuggestions ? `${this.state._id}-list` : undefined}
								max={this.state._max}
								min={this.state._min}
								name={this.state._name ? `${this.state._name}-number` : undefined}
								step={this.state._step}
								type="number"
								value={this.state._value}
								{...this.controller.onFacade}
								onKeyUp={this.onKeyUp}
								onChange={this.onChange}
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
						{hasSuggestions && [
							<datalist id={`${this.state._id}-list`}>
								{this.state._suggestions.map((option: W3CInputValue) => (
									<option value={option} />
								))}
							</datalist>,
							// <ul class="grid gap-1 text-sm grid-flow-col">
							//   {this.state._suggestions.map((option: InputOption<number>) => (
							//     <li class="border-1">{option.label}</li>
							//   ))}
							// </ul>,
						]}
					</div>
				</kol-input>
			</Host>
		);
	}

	private readonly controller: InputRangeController;

	/**
	 * Gibt an, mit welcher Tastenkombination man das interaktive Element der Komponente auslösen oder fokussieren kann.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Defines whether the screen-readers should read out the notification.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = true;

	/**
	 * Gibt an, ob das Eingabefeld autovervollständigt werden kann.
	 */
	@Prop() public _autoComplete?: InputTypeOnOff;

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
	 * Hides the label.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean;

	/**
	 * Gibt den Hinweistext an.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Setzt die Iconklasse (z.B.: `_icon="codicon codicon-home`).
	 */
	@Prop() public _icon?: Stringified<KoliBriHorizontalIcon>;

	/**
	 * Defines the internal ID of the primary component element.
	 */
	@Prop() public _id?: IdPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Gibt die Liste der Vorschlagswörter an.
	 * @deprecated Use _suggestions.
	 */
	@Prop() public _list?: Stringified<Option<W3CInputValue>[]>;

	/**
	 * Gibt den größtmöglichen Eingabewert an.
	 */
	@Prop() public _max?: number;

	/**
	 * Gibt den kleinstmöglichen Eingabewert an.
	 */
	@Prop() public _min?: number;

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: NamePropType;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Gibt die Schrittweite der Wertveränderung an.
	 */
	@Prop() public _step?: number;

	/**
	 * Suggestions to provide for the input.
	 */
	@Prop() public _suggestions?: SuggestionsPropType;

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: SyncValueBySelectorPropType;

	/**
	 * Gibt an, welchen Tab-Index das primäre Element in der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
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
	 * Gibt den Wert des Eingabefeldes an.
	 */
	@Prop() public _value?: number;

	@State() public state: States = {
		_autoComplete: 'off',
		_id: `id-${nonce()}`, // ⚠ required
		_label: false, // ⚠ required
		_suggestions: [],
	};

	public constructor() {
		this.controller = new InputRangeController(this, 'input-range', this.host);
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_alert')
	public validateAlert(value?: boolean): void {
		this.controller.validateAlert(value);
	}

	@Watch('_autoComplete')
	public validateAutoComplete(value?: InputTypeOnOff): void {
		this.controller.validateAutoComplete(value);
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
	public validateIcon(value?: Stringified<KoliBriHorizontalIcon>): void {
		this.controller.validateIcon(value);
	}

	@Watch('_id')
	public validateId(value?: string): void {
		this.controller.validateId(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		this.controller.validateLabel(value);
	}

	@Watch('_list')
	public validateList(value?: Stringified<Option<W3CInputValue>[]>): void {
		this.controller.validateList(value);
	}

	@Watch('_max')
	public validateMax(value?: number): void {
		this.controller.validateMax(value);
	}

	@Watch('_min')
	public validateMin(value?: number): void {
		this.controller.validateMin(value);
	}

	@Watch('_name')
	public validateName(value?: string): void {
		this.controller.validateName(value);
	}

	@Watch('_on')
	public validateOn(value?: InputTypeOnDefault): void {
		this.controller.validateOn(value);
	}

	@Watch('_step')
	public validateStep(value?: number): void {
		this.controller.validateStep(value);
	}

	@Watch('_suggestions')
	public validateSuggestions(value?: SuggestionsPropType): void {
		this.controller.validateSuggestions(value);
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
	public validateValue(value?: number): void {
		this.controller.validateValue(value);
	}

	public componentWillLoad(): void {
		this._alert = this._alert === true;
		this._touched = this._touched === true;
		this.controller.componentWillLoad();
	}
}
