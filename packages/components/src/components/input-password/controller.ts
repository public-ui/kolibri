import type { InputPasswordProps, InputPasswordWatches, InputTypeOnOff } from '@public-ui/schema';
import { validateHasCounter, watchBoolean, watchNumber, watchString, watchValidator } from '@public-ui/schema';

import { InputIconController } from '../@deprecated/input/controller-icon';

import type { Generic } from 'adopted-style-sheets';
export class InputPasswordController extends InputIconController implements InputPasswordWatches {
	protected readonly component: Generic.Element.Component & InputPasswordProps;
	private placeholderCache?: string;

	public constructor(component: Generic.Element.Component & InputPasswordProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	public validateAutoComplete(value?: InputTypeOnOff): void {
		watchValidator(
			this.component,
			'_autoComplete',
			(value): boolean => typeof value === 'string' && (value === 'on' || value === 'off'),
			new Set(['on | off']),
			value
		);
	}

	public validateHasCounter(value?: boolean): void {
		validateHasCounter(this.component, value);
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
		watchBoolean(this.component, '_required', value);
	}

	public validateValue(value?: string): void {
		watchString(this.component, '_value', value);
		this.setFormAssociatedValue(this.component.state._value as string);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAutoComplete(this.component._autoComplete);
		this.validateHasCounter(this.component._hasCounter);
		this.validateMaxLength(this.component._maxLength);
		this.validatePattern(this.component._pattern);
		this.validatePlaceholder(this.component._placeholder);
		this.validateReadOnly(this.component._readOnly);
		this.validateRequired(this.component._required);
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
