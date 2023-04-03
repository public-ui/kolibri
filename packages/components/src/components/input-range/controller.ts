import { Generic } from '@a11y-ui/core';
import { Stringified } from '../../types/common';
import { InputTypeOnOff, Option } from '../../types/input/types';
import { watchJsonArrayString, watchNumber, watchValidator } from '../../utils/prop.validators';
import { InputIconController } from '../@deprecated/input/controller-icon';
import { Props, Watches } from './types';

export class InputRangeController extends InputIconController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateAutoComplete(value?: InputTypeOnOff): void {
		watchValidator(
			this.component,
			'_autoComplete',
			(value): boolean => typeof value === 'string' && (value === 'on' || value === 'off'),
			new Set(['on | off']),
			value
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateList(value?: Stringified<Option<number>[]>): void {
		watchJsonArrayString(
			this.component,
			'_list',
			(item: Option<number>) => typeof item === 'object' && typeof item.label === 'string' && item.label.length > 0,
			value
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateMax(value?: number): void {
		watchNumber(this.component, '_max', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateMin(value?: number): void {
		watchNumber(this.component, '_min', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateStep(value?: number): void {
		watchNumber(this.component, '_step', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateValue(value?: number): void {
		watchNumber(this.component, '_value', value);
		this.setFormAssociatedValue(this.component.state._value as string);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateAutoComplete(this.component._autoComplete);
		this.validateList(this.component._list);
		this.validateMax(this.component._max);
		this.validateMin(this.component._min);
		this.validateStep(this.component._step);
		this.validateValue(this.component._value);
	}
}
