import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';
import { Stringified } from '../../types/common';

import { InputTypeOnDefault, Option } from '../../types/input/types';
import { Orientation } from '../../types/orientation';
import { W3CInputValue } from '../../types/w3c';
import { propagateFocus } from '../../utils/reuse';
import { getRenderStates } from '../input/controller';
import { InputRadioController } from './controller';
import { ComponentApi, States } from './types';

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
		const { ariaDiscribedBy, hasError } = getRenderStates(this.state);
		return (
			<Host>
				<fieldset
					class={{
						error: hasError === true,
						disabled: this.state._disabled === true,
						required: this.state._required === true,
						[this.state._orientation]: true,
					}}
				>
					<legend class="block w-full mb-1 leading-normal">
						<span>
							<slot />
						</span>
					</legend>

					{this.state._list.map((option, index) => {
						/**
						 * Damit der Value einer Option ein beliebigen Typ haben kann
						 * muss man auf HTML-Ebene den Value auf einen String-Wert
						 * mappen. Das tun wir mittels der Map.
						 */
						const customId = `${this.state._id}-${index}`;
						return (
							<kol-input
								key={customId}
								_disabled={this.state._disabled || option.disabled}
								_hideLabel={this.state._hideLabel}
								_hint={this.state._hint}
								_id={customId}
								_renderNoLabel={true}
								_required={this.state._required}
								_touched={this.state._touched}
							>
								<div slot="input">
									<input
										ref={this.state._value === option.value ? this.catchRef : undefined}
										accessKey={this.state._accessKey} // by radio?!
										aria-describedby={ariaDiscribedBy.length > 0 ? ariaDiscribedBy.join(' ') : undefined}
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
	 * Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = true;

	/**
	 * Gibt an, ob das Eingabefeld aktiviert oder deaktiviert ist.
	 */
	@Prop({ reflect: true }) public _disabled?: boolean;

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 */
	@Prop() public _error?: string;

	/**
	 * Gibt an, ob das Eingabefeld kein sichtbares Label haben soll.
	 */
	@Prop({ reflect: true }) public _hideLabel?: boolean;

	/**
	 * Gibt den Text für eine Hinweistext an.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Gibt die technische ID des Eingabefeldes an.
	 */
	@Prop() public _id!: string;

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
	 * Gibt die Ausrichtung der LinkList an.
	 */
	@Prop() public _orientation?: Orientation = 'vertical';

	/**
	 * Gibt an, ob das Eingabefeld ein Pflichtfeld ist.
	 */
	@Prop({ reflect: true }) public _required?: boolean;

	/**
	 * Gibt an, welchen Tab-Index dieses Input hat.
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 */
	@Prop({ mutable: true, reflect: true }) public _touched?: boolean = false;

	/**
	 * Gibt den Wert der Radio an. (Known Bug: https://github.com/ionic-team/stencil/issues/3902)
	 */
	@Prop() public _value?: Stringified<W3CInputValue>;

	@State() public state: States = {
		_id: '…', // ⚠ required
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
