import { Component, Fragment, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { InputTypeOnDefault } from '../../types/input/types';
import { setState } from '../../utils/prop.validators';
import { getRenderStates } from '../input/controller';
import { TextareaController } from './controller';
import { ComponentApi, CSSResize, States } from './types';

/**
 * https://stackoverflow.com/questions/17772260/textarea-auto-height
 */
const increaseTextareaHeight = (el: HTMLTextAreaElement): number => {
	el.style.overflow = 'hidden'; // verhindert, dass ein Scrollbalken kurz angezeigt wird
	const currentRows = el.rows;
	const rowHeight = el.clientHeight / currentRows;
	el.rows = 1;
	const nextRows = Math.round(el.scrollHeight / rowHeight);
	el.rows = currentRows;
	return nextRows;
};

@Component({
	tag: 'kol-textarea',
	styleUrls: {
		default: '../input-line.sass',
	},
	shadow: true,
})
export class KolTextarea implements ComponentApi {
	public render(): JSX.Element {
		const { ariaDiscribedBy } = getRenderStates(this.state);
		return (
			<Host>
				<kol-input
					_alert={this.state._alert}
					_disabled={this.state._disabled}
					_error={this.state._error}
					_hideLabel={this.state._hideLabel}
					_hint={this.state._hint}
					_id={this.state._id}
					_readOnly={this.state._readOnly}
					_required={this.state._required}
					_touched={this.state._touched}
				>
					<span slot="label">
						<slot />
					</span>
					<div slot="input">
						<textarea
							part="textarea"
							title=""
							aria-describedby={ariaDiscribedBy.length > 0 ? ariaDiscribedBy.join(' ') : undefined}
							aria-labelledby={`${this.state._id}-label`}
							autoCapitalize="off"
							aria-hidden="true"
							autoCorrect="off"
							disabled={this.state._disabled}
							id={this.state._id}
							maxlength={this.state._maxLength}
							name={this.state._name}
							readOnly={this.state._readOnly}
							required={this.state._required}
							rows={this.state._rows}
							placeholder={this.state._placeholder}
							spellcheck="false"
							{...this.controller.onFacade}
							onKeyUp={this.onChange}
							style={{
								resize: this.state._resize,
							}}
							value={this.state._value}
						></textarea>
						{/**
						 * https://webstandardssherpa.com/reviews/improving-the-tweet-box/
						 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-live
						 */}
						{this.state._hasCounter && (
							<span aria-atomic="true" aria-live="polite">
								{this.state._currentLength}
								{this.state._maxLength && (
									<Fragment>
										<span aria-label="von" role="img">
											/
										</span>
										{this.state._maxLength}
									</Fragment>
								)}{' '}
								<span>Zeichen</span>
							</span>
						)}
					</div>
				</kol-input>
			</Host>
		);
	}

	private readonly controller: TextareaController;

	/**
	 * Gibt an, mit welcher Tastenkombination man das Input auslösen oder fokussieren kann.
	 */
	@Prop() public _accessKey?: string;

	/**
	 * Passt die Höhe des Eingabefeldes automatisch an den Füllstand an.
	 */
	@Prop({ reflect: true }) public _adjustHeight?: boolean = false;

	/**
	 * Gibt an, ob die Fehlermeldung vorgelesen werden soll, wenn es eine gibt.
	 */
	@Prop({ mutable: true, reflect: true }) public _alert?: boolean = true;

	/**
	 * Gibt an, ob am unteren Rand des Eingabefeldes die Anzahl der Zeichen angezeigt werden soll.
	 */
	@Prop({ reflect: true }) public _hasCounter?: boolean;

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
	 * Gibt an, wie viele Zeichen man maximal eingeben kann.
	 */
	@Prop() public _maxLength?: number;

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
	 * Gibt an, ob das Eingabefeld nur lesend ist.
	 */
	@Prop({ reflect: true }) public _readOnly?: boolean;

	/**
	 * Gibt an, ob die Größe des Eingabefeldes geändert werden kann. (https://developer.mozilla.org/de/docs/Web/CSS/resize)
	 */
	@Prop() public _resize?: CSSResize = 'vertical';

	/**
	 * Gibt an, ob das Eingabefeld ein Pflichtfeld ist.
	 */
	@Prop({ reflect: true }) public _required?: boolean;

	/**
	 * Gibt die Anzahl der anzuzeigenden Zeilen des Eingabefeldes an.
	 */
	@Prop({ mutable: true, reflect: false }) public _rows?: number;

	/**
	 * Gibt an, welchen Tab-Index dieses Input hat.
	 */
	@Prop() public _tabIndex?: number;

	/**
	 * Gibt an, ob dieses Eingabefeld von Nutzer:innen einmal besucht/berührt wurde.
	 */
	@Prop({ mutable: true, reflect: true }) public _touched?: boolean = false;

	/**
	 * Gibt den Wert des Eingabefeldes an.
	 */
	@Prop() public _value?: string;

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_adjustHeight: false,
		_currentLength: 0,
		_id: '⚠',
		_name: '⚠',
		_resize: 'vertical',
	};

	public constructor() {
		this.controller = new TextareaController(this, 'textarea');
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
	@Watch('_adjustHeight')
	public validateAdjustHeight(value?: boolean): void {
		this.controller.validateAdjustHeight(value);
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
	@Watch('_hasCounter')
	public validateHasCounter(value?: boolean): void {
		this.controller.validateHasCounter(value);
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
	@Watch('_maxLength')
	public validateMaxLength(value?: number): void {
		this.controller.validateMaxLength(value);
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
	@Watch('_placeholder')
	public validatePlaceholder(value?: string): void {
		this.controller.validatePlaceholder(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_readOnly')
	public validateReadOnly(value?: boolean): void {
		this.controller.validateReadOnly(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_resize')
	public validateResize(value?: CSSResize): void {
		this.controller.validateResize(value);
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
	@Watch('_rows')
	public validateRows(value?: number): void {
		this.controller.validateRows(value);
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
	@Watch('_value')
	public validateValue(value?: string): void {
		this.controller.validateValue(value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this._alert = this._alert === true;
		this._touched = this._touched === true;
		this.controller.componentWillLoad();
		this.validateAdjustHeight(this._adjustHeight);
	}

	private readonly onChange = (event: Event) => {
		const path: HTMLElement[] = (event as unknown as { path: HTMLElement[] })?.path;
		if (Array.isArray(path) && path[0] instanceof HTMLTextAreaElement) {
			setState(this, '_currentLength', path[0].value.length);
			if (this.state._adjustHeight) {
				this._rows = increaseTextareaHeight(path[0]);
			}
		}
		if (typeof this.controller.onFacade.onChange === 'function') {
			this.controller.onFacade.onChange(event);
		}
	};
}
