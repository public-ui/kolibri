import { Generic } from '@a11y-ui/core';
import { InputTypeOnOff } from '../../types/input/types';
import { devHint } from '../../utils/a11y.tipps';
import { watchBoolean, watchNumber, watchString, watchValidator } from '../../utils/prop.validators';
import { InputIconController } from '../@deprecated/input/controller-icon';
import { Props, Watches } from './types';

export class InputPasswordController extends InputIconController implements Watches {
	protected readonly component: Generic.Element.Component & Props;
	private placeholderCache?: string;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	private handleHiddenLabelAndRequired = (): void => {
		if (this.component.state._hideLabel === true && this.component.state._required === true) {
			devHint(`[KolInput*] Wenn man das Label ausblendet, dann kann der sehende Nutzer:in nicht mehr erkennen, ob die Eingabe erforderlich ist.`);
			this.hideLabel = false;
		} else {
			this.hideLabel = this.component.state._hideLabel === true;
		}
	};

	public validateAutoComplete(value?: InputTypeOnOff): void {
		watchValidator(
			this.component,
			'_autoComplete',
			(value): boolean => typeof value === 'string' && (value === 'on' || value === 'off'),
			new Set(['on | off']),
			value
		);
	}

	public validateHideLabel(value?: boolean): void {
		watchBoolean(this.component, '_hideLabel', value, {
			hooks: {
				afterPatch: this.handleHiddenLabelAndRequired,
			},
		});
	}

	public validateMaxLength(value?: number): void {
		watchNumber(this.component, '_maxLength', value, {
			min: 0,
		});
	}

	public validatePattern(value?: string): void {
		watchString(this.component, '_pattern', value);
	}

	public validatePlaceholder(value?: string): void {
		watchString(this.component, '_placeholder', value);
	}

	public validateReadOnly(value?: boolean): void {
		watchBoolean(this.component, '_readOnly', value);
	}

	public validateRequired(value?: boolean): void {
		watchBoolean(this.component, '_required', value, {
			hooks: {
				afterPatch: this.handleHiddenLabelAndRequired,
			},
		});
	}

	public validateSize(value?: number): void {
		watchNumber(this.component, '_size', value, {
			min: 1,
		});
	}

	public validateValue(value?: string): void {
		watchString(this.component, '_value', value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAutoComplete(this.component._autoComplete);
		this.validateMaxLength(this.component._maxLength);
		this.validatePattern(this.component._pattern);
		this.validatePlaceholder(this.component._placeholder);
		this.validateReadOnly(this.component._readOnly);
		this.validateRequired(this.component._required);
		this.validateSize(this.component._size);
		this.validateValue(this.component._value);
	}

	protected onBlur(event: Event): void {
		/**
		 * Beim Screenreader NVDA wird der Placeholder mit
		 * vorgelesen. Somit kann es vorkommen, dass das
		 * Label und der Placeholder vorgelesen werden.
		 *
		 * Aufgrund dessen, dass das Label immer vorgelesen
		 * werden muss, kann das zusätzliche Vorlesen des
		 * Placeholders störend sein.
		 *
		 * Damit beim Fokussieren das "doppelte" vorlesen
		 * vermieden werden kann, wird der Placeholder für
		 * den fokussierten Feldstatus entfernt.
		 *
		 * Hinweis: Für alle Nutzenden müssen die all dar-
		 *          gestellten Inhalte, also auch der Place-
		 *          holder, gleichermaßen zugänglich sein.
		 *          Das oben beschriebene Handling erfüllt
		 *          diese Anforderung nicht.
		 */
		this.component.state = {
			...this.component.state,
			_placeholder: this.placeholderCache,
		};
		this.placeholderCache = undefined;
		super.onBlur(event);
	}

	protected onFocus(event: Event): void {
		this.placeholderCache = this.component.state._placeholder as string;
		this.component.state = {
			...this.component.state,
			_placeholder: undefined,
		};
		super.onFocus(event);
	}
}
