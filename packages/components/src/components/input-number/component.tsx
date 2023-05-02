import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';
import { ButtonProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { InputNumberType } from '../../types/input/control/number';
import { Iso8601 } from '../../types/input/iso8601';
import { InputTypeOnDefault, InputTypeOnOff } from '../../types/input/types';
import { propagateFocus } from '../../utils/reuse';
import { propagateSubmitEventToForm } from '../form/controller';
import { KoliBriHorizontalIcon } from '../../types/icon';
import { getRenderStates } from '../input/controller';
import { InputNumberController } from './controller';
import { ComponentApi, States } from './types';
import { nonce } from '../../utils/dev.utils';

@Component({
	tag: 'kol-input-number',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolInputNumber implements ComponentApi {
	@Element() private readonly host?: HTMLKolInputNumberElement;
	private ref?: HTMLInputElement;

	private readonly catchRef = (ref?: HTMLInputElement) => {
		this.ref = ref;
		propagateFocus(this.host, this.ref);
	};

	private readonly onKeyUp = (event: KeyboardEvent) => {
		if (event.code === 'Enter') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.ref,
			});
		} else {
			this.controller.onFacade.onChange(event);
		}
	};

	public render(): JSX.Element {
		const { ariaDescribedBy } = getRenderStates(this.state);
		const hasList = Array.isArray(this.state._list) && this.state._list.length > 0;
		return (
			<Host
				class={{
					'has-value': this.state._hasValue,
				}}
			>
				<kol-input
					class={{
						[this.state._type]: true,
					}}
					_disabled={this.state._disabled}
					_error={this.state._error}
					_hideLabel={this.state._hideLabel}
					_hint={this.state._hint}
					_icon={this.state._icon}
					_id={this.state._id}
					_list={this.state._list}
					_readOnly={this.state._readOnly}
					_required={this.state._required}
					_smartButton={this.state._smartButton}
					_touched={this.state._touched}
				>
					{' '}
					<span slot="label">
						<slot />
					</span>
					<input
						ref={this.catchRef}
						title=""
						accessKey={this.state._accessKey}
						aria-describedby={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
						aria-labelledby={`${this.state._id}-label`}
						autoCapitalize="off"
						autoComplete={this.state._autoComplete}
						autoCorrect="off"
						disabled={this.state._disabled}
						id={this.state._id}
						list={hasList ? `${this.state._id}-list` : undefined}
						max={this.state._max}
						min={this.state._min}
						name={this.state._name}
						readOnly={this.state._readOnly}
						required={this.state._required}
						placeholder={this.state._placeholder}
						slot="input"
						step={this.state._step}
						spellcheck="false"
						type={this.state._type}
						value={this.state._value as string}
						{...this.controller.onFacade}
						onKeyUp={this.onKeyUp}
					/>
				</kol-input>
			</Host>
		);
	}

	private readonly controller: InputNumberController;

	/**
	 * Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = true;

	/**
	 * Gibt an, ob das Eingabefeld autovervollständigt werden kann.
	 */
	@Prop() public _autoComplete?: InputTypeOnOff;

	/**
	 * Setzt das Feld in einen inaktiven Zustand, in dem es keine Interaktion erlaubt.
	 */
	@Prop({ reflect: true }) public _disabled?: boolean;

	/**
	 * Gibt den Text für eine Fehlermeldung an.
	 */
	@Prop() public _error?: string;

	/**
	 * Versteckt das sichtbare Label des Elements.
	 */
	@Prop({ reflect: true }) public _hideLabel?: boolean;

	/**
	 * Gibt den Hinweistext an.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Ermöglicht das Anzeigen von Icons links und/oder rechts am Rand des Eingabefeldes.
	 */
	@Prop() public _icon?: Stringified<KoliBriHorizontalIcon>;

	/**
	 * Gibt die technische ID des Eingabefeldes an.
	 */
	@Prop() public _id?: string;

	/**
	 * Gibt die Liste der Vorschlagszahlen an.
	 */
	@Prop() public _list?: Stringified<string[]>;

	/**
	 * Gibt den größtmöglichen Zahlenwert an.
	 */
	@Prop() public _max?: number | Iso8601;

	/**
	 * Gibt den kleinstmöglichen Zahlenwert an.
	 */
	@Prop() public _min?: number | Iso8601;

	/**
	 * Gibt den technischen Namen des Eingabefeldes an.
	 */
	@Prop() public _name?: string;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Gibt den Platzhalter des Eingabefeldes an, wenn es leer ist.
	 */
	@Prop() public _placeholder?: string;

	/**
	 * Setzt das Eingabefeld in den schreibgeschützten Modus.
	 */
	@Prop({ reflect: true }) public _readOnly?: boolean;

	/**
	 * Macht das Eingabeelement zu einem Pflichtfeld.
	 */
	@Prop({ reflect: true }) public _required?: boolean;

	/**
	 * Ermöglicht eine Schaltfläche ins das Eingabefeld mit einer beliebigen Aktion zu einzufügen (ohne label).
	 */
	@Prop() public _smartButton?: ButtonProps;

	/**
	 * Gibt die Schrittweite der Wertveränderung an
	 */
	@Prop() public _step?: number;

	/**
	 * Gibt an, welchen Tab-Index dieses Input hat.
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 */
	@Prop({ mutable: true, reflect: true }) public _touched?: boolean = false;

	/**
	 * Gibt an, ob es ein DateTime-, Date-, Month-, Week-, Time-, DateTime-Local-, Number-Eingabefeld ist.
	 *
	 * @deprecated Das W3C hat die Date-Typen in eine eigene Gruppe zusammengefasst. Verwende hierfür die InputDate-Komponente.
	 */
	@Prop() public _type?: InputNumberType = 'number';

	/**
	 * Gibt den Wert des Eingabefeldes an.
	 */
	@Prop({ mutable: true }) public _value?: number | Iso8601 | null;

	@State() public state: States = {
		_autoComplete: 'off',
		_id: nonce(), // ⚠ required
		_hasValue: false,
		_list: [],
		_type: 'number',
	};

	public constructor() {
		this.controller = new InputNumberController(this, 'number', this.host);
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

	@Watch('_list')
	public validateList(value?: Stringified<string[]>): void {
		this.controller.validateList(value);
	}

	@Watch('_max')
	public validateMax(value?: number | Iso8601): void {
		this.controller.validateMax(value);
	}

	@Watch('_min')
	public validateMin(value?: number | Iso8601): void {
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

	@Watch('_placeholder')
	public validatePlaceholder(value?: string): void {
		this.controller.validatePlaceholder(value);
	}

	@Watch('_readOnly')
	public validateReadOnly(value?: boolean): void {
		this.controller.validateReadOnly(value);
	}

	@Watch('_required')
	public validateRequired(value?: boolean): void {
		this.controller.validateRequired(value);
	}

	@Watch('_smartButton')
	public validateSmartButton(value?: ButtonProps | string): void {
		this.controller.validateSmartButton(value);
	}

	@Watch('_step')
	public validateStep(value?: number): void {
		this.controller.validateStep(value);
	}

	@Watch('_tabIndex')
	public validateTabIndex(value?: number): void {
		this.controller.validateTabIndex(value);
	}

	@Watch('_touched')
	public validateTouched(value?: boolean): void {
		this.controller.validateTouched(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 * @deprecated
	 */
	@Watch('_type')
	public validateType(value?: InputNumberType): void {
		this.controller.validateType(value);
	}

	@Watch('_value')
	public validateValue(value?: number | Iso8601 | null): void {
		this.controller.validateValueEx(value, (v) => {
			if (v === '' && this.ref) {
				this.ref.value = '';
			}
		});
	}

	public componentWillLoad(): void {
		this._alert = this._alert === true;
		this._touched = this._touched === true;
		this.controller.componentWillLoad();

		this.state._hasValue = !!this.state._value;
		this.controller.addValueChangeListener((v) => (this.state._hasValue = !!v));
	}
}
