import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { InputTypeOnDefault } from '../../types/input/types';
import { getRenderStates } from '../input/controller';
import { InputCheckboxController } from './controller';
import { ComponentApi, InputCheckboxVariant, States } from './types';

@Component({
	tag: 'kol-input-checkbox',
	styleUrls: {
		default: './style.sass',
	},
	shadow: true,
})
export class KolInputCheckbox implements ComponentApi {
	public render(): JSX.Element {
		const { ariaDiscribedBy } = getRenderStates(this.state);
		return (
			<Host>
				<kol-input
					class={{
						[this.state._variant]: true,
					}}
					_alert={this.state._alert}
					_disabled={this.state._disabled}
					_error={this.state._error}
					_hideLabel={this.state._hideLabel}
					_hint={this.state._hint}
					_id={this.state._id}
					_required={this.state._required}
					_touched={this.state._touched}
				>
					<span slot="label">
						<slot />
					</span>
					<input
						accessKey={this.state._accessKey}
						aria-describedby={ariaDiscribedBy.length > 0 ? ariaDiscribedBy.join(' ') : undefined}
						aria-labelledby={`${this.state._id}-label`}
						checked={this.state._checked === true}
						disabled={this.state._disabled === true}
						id={this.state._id}
						indeterminate={this.state._indeterminate === true}
						name={this.state._name}
						required={this.state._required === true}
						slot="input"
						tabIndex={this.state._tabIndex}
						title=""
						type="checkbox"
						value={typeof this.state._value === 'string' ? this.state._value : ''}
						{...this.controller.onFacade}
						onChange={this.onChange}
					/>
				</kol-input>
			</Host>
		);
	}

	private readonly controller: InputCheckboxController;

	/**
	 * Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = true;

	/**
	 * Gibt an, ob die Checkbox ausgewählt ist oder nicht.
	 */
	@Prop({ mutable: true, reflect: true }) public _checked?: boolean = false;

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
	 * Gibt an, ob die Checkbox weder ausgewählt noch nicht ausgewählt ist.
	 */
	@Prop({ reflect: true }) public _indeterminate?: boolean;

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	@Prop() public _name?: string;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Gibt an, ob die Checkbox ein Pflichtfeld ist.
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
	 * Gibt an, welchen Type das Input haben soll.
	 *
	 * @deprecated Verwende stattdessen das Attribute _variant.
	 */
	@Prop() public _type?: InputCheckboxVariant = 'checkbox';

	/**
	 * Gibt den Wert der Checkbox an.
	 */
	@Prop() public _value?: string;

	/**
	 * Gibt an, welchen Type das Input haben soll.
	 */
	@Prop() public _variant?: InputCheckboxVariant; // = 'checkbox'

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_checked: false,
		_id: '⚠',
		_name: '⚠',
		_variant: 'checkbox',
	};

	public constructor() {
		this.controller = new InputCheckboxController(this, 'checkbox');
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_alert')
	public validateAlert(value?: boolean): void {
		this.controller.validateAlert(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_checked')
	public validateChecked(value?: boolean): void {
		this.controller.validateChecked(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_disabled')
	public validateDisabled(value?: boolean): void {
		this.controller.validateDisabled(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_error')
	public validateError(value?: string): void {
		this.controller.validateError(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_hideLabel')
	public validateHideLabel(value?: boolean): void {
		this.controller.validateHideLabel(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_hint')
	public validateHint(value?: string): void {
		this.controller.validateHint(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_id')
	public validateId(value?: string): void {
		this.controller.validateId(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_indeterminate')
	public validateIndeterminate(value?: boolean): void {
		this.controller.validateIndeterminate(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_name')
	public validateName(value?: string): void {
		this.controller.validateName(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_on')
	public validateOn(value?: InputTypeOnDefault): void {
		this.controller.validateOn(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_required')
	public validateRequired(value?: boolean): void {
		this.controller.validateRequired(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_tabIndex')
	public validateTabIndex(value?: number): void {
		this.controller.validateTabIndex(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_touched')
	public validateTouched(value?: boolean): void {
		this.controller.validateTouched(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_type')
	public validateType(value?: InputCheckboxVariant): void {
		this.controller.validateType(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_value')
	public validateValue(value?: string): void {
		this.controller.validateValue(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_variant')
	public validateVariant(value?: InputCheckboxVariant): void {
		this.controller.validateVariant(value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this._alert = this._alert === true;
		this._touched = this._touched === true;
		this.controller.componentWillLoad();
	}

	private onChange = (event: Event): void => {
		this._checked = this._checked === false;
		this.controller.setValue(event, this._checked);
	};
}
