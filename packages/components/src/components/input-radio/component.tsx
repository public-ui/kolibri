import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Stringified } from '../../types/common';
import { InputTypeOnDefault, Option } from '../../types/input/types';
import { Orientation } from '../../types/orientation';
import { Align } from '../../types/props/align';
import { LabelWithExpertSlotPropType } from '../../types/props/label';
import { W3CInputValue } from '../../types/w3c';
import { nonce } from '../../utils/dev.utils';
import { propagateFocus } from '../../utils/reuse';
import { getRenderStates } from '../input/controller';
import { InputRadioController } from './controller';
import { ComponentApi, States } from './types';

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
export class KolInputRadio implements ComponentApi {
	@Element() private readonly host?: HTMLKolInputRadioElement;
	private ref?: HTMLInputElement;

	private readonly catchRef = (ref?: HTMLInputElement) => {
		this.ref = ref;
		propagateFocus(this.host, this.ref);
	};

	public render(): JSX.Element {
		const { ariaDescribedBy, hasError } = getRenderStates(this.state);
		const hasExpertSlot = this.state._label === false; // _label="" or _label

		return (
			<Host>
				<fieldset
					class={{
						disabled: this.state._disabled === true,
						error: hasError === true,
						required: this.state._required === true,
						[this.state._orientation]: true,
					}}
				>
					<legend class="block w-full mb-1 leading-normal">
						{/* INFO: span is needed for css styling :after content like a star (*) or optional text ! */}
						<span>
							{/* INFO: label comes with any html tag or as plain text! */}
							{/*  TODO: der folgende Slot ohne Name muss später entfernt werden */}
							<span slot="label">{hasExpertSlot ? <slot></slot> : this.state._label}</span>
						</span>
					</legend>
					{this.state._list.map((option, index) => {
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
								_disabled={this.state._disabled || option.disabled}
								_hideLabel={this.state._hideLabel}
								_hint={this.state._hint}
								_id={customId}
								_renderNoLabel={true}
								_required={this.state._required}
								_slotName={slotName}
								_touched={this.state._touched}
							>
								<div slot={slotName}>
									<input
										ref={this.state._value === option.value ? this.catchRef : undefined}
										accessKey={this.state._accessKey} // by radio?!
										aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
										aria-labelledby={`${customId}-label`}
										title=""
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
									/>
									<kol-tooltip
										/**
										 * Dieses Aria-Hidden verhindert das doppelte Vorlesen des Labels,
										 * verhindert aber nicht das Aria-Labelledby vorgelesen wird.
										 */
										aria-hidden="true"
										hidden={hasExpertSlot || !this.state._hideLabel}
										_id={`${this.state._id}-tooltip`}
										_label={typeof this.state._label === 'string' ? this.state._label : ''}
									></kol-tooltip>
									<label
										htmlFor={`${customId}`}
										id={`${customId}-label`}
										style={{
											height: this.state._hideLabel && this.state._required !== true ? '0' : undefined,
											margin: this.state._hideLabel && this.state._required !== true ? '0' : undefined,
											padding: this.state._hideLabel && this.state._required !== true ? '0' : undefined,
											visibility: this.state._hideLabel && this.state._required !== true ? 'hidden' : undefined,
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
						<kol-alert id="error" _alert={true} _type="error" _variant="msg">
							{this.state._error}
						</kol-alert>
					)}
				</fieldset>
			</Host>
		);
	}

	private readonly controller: InputRadioController;

	/**
	 * Gibt an, mit welcher Tastenkombination man das interaktive Element der Komponente auslösen oder fokussieren kann.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Gibt an, ob der Screenreader die Meldung aktiv vorlesen soll.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = true;

	/**
	 * Deaktiviert das interaktive Element in der Komponente und erlaubt keine Interaktion mehr damit.
	 */
	@Prop() public _disabled?: boolean;

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 */
	@Prop() public _error?: string;

	/**
	 * Blendet die Beschriftung (Label) aus und zeigt sie stattdessen mittels eines Tooltips an.
	 */
	@Prop() public _hideLabel?: boolean;

	/**
	 * Gibt den Hinweistext an.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Gibt die interne ID des primären Elements in der Komponente an.
	 */
	@Prop() public _id?: string;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Gibt die Liste der Optionen für das Eingabefeld an.
	 */
	@Prop() public _list!: Stringified<Option<W3CInputValue>[]>;

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	@Prop() public _name?: string;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Gibt die horizontale oder vertikale Ausrichtung der Komponente an.
	 */
	@Prop() public _orientation?: Orientation = 'vertical';

	/**
	 * Macht das Eingabeelement zu einem Pflichtfeld.
	 */
	@Prop() public _required?: boolean;

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: string;

	/**
	 * Gibt an, welchen Tab-Index das primäre Element in der Komponente hat. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Gibt an, ob der Tooltip bevorzugt entweder oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop() public _tooltipAlign?: Align = 'top';

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 */
	@Prop({ mutable: true, reflect: true }) public _touched?: boolean = false;

	/**
	 * Gibt den Wert der Radio an. (Known Bug: https://github.com/ionic-team/stencil/issues/3902)
	 */
	@Prop() public _value?: Stringified<W3CInputValue>;

	@State() public state: States = {
		_id: nonce(), // ⚠ required
		_label: false, // ⚠ required
		_list: [],
		_orientation: 'vertical',
	};

	public constructor() {
		this.controller = new InputRadioController(this, 'radio', this.host);
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

	@Watch('_list')
	public validateList(value?: Stringified<Option<W3CInputValue>[]>): void {
		this.controller.validateList(value);
	}

	@Watch('_name')
	public validateName(value?: string): void {
		this.controller.validateName(value);
	}

	@Watch('_on')
	public validateOn(value?: InputTypeOnDefault): void {
		this.controller.validateOn(value);
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
	public validateSyncValueBySelector(value?: string): void {
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
	public validateValue(value?: Stringified<unknown>): void {
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
				this.controller.setValue(event, option.value as string); // TODO: fix type
			}
		}
	};
}
