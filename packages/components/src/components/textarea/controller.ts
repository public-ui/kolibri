import { Generic } from '@a11y-ui/core';
import { watchBoolean, watchNumber, watchString, watchValidator } from '../../utils/prop.validators';
import { InputController } from '../@deprecated/input/controller';
import { CSSResize, Props, Watches } from './types';

export class TextareaController extends InputController implements Watches {
	protected readonly component: Generic.Element.Component & Props;

	public constructor(component: Generic.Element.Component & Props, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	private afterSyncCharCounter = () => {
		if (typeof this.component._value === 'string' && this.component._value.length > 0) {
			this.component.state._currentLength = this.component._value.length;
		}
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateHasCounter(value?: boolean): void {
		watchBoolean(this.component, '_hasCounter', value, {
			hooks: {
				afterPatch: this.afterSyncCharCounter,
			},
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateMaxLength(value?: number): void {
		watchNumber(this.component, '_maxLength', value, {
			hooks: {
				afterPatch: this.afterSyncCharCounter,
			},
			min: 0,
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validatePlaceholder(value?: string): void {
		watchString(this.component, '_placeholder', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateReadOnly(value?: boolean): void {
		watchBoolean(this.component, '_readOnly', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateResize(value?: CSSResize): void {
		watchValidator(
			this.component,
			'_resize',
			(value) => typeof value === 'string' && (value === 'both' || value === 'horizontal' || value === 'none' || value === 'vertical'),
			new Set('String {both, horizontal, vertical, none}'),
			value
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateRequired(value?: boolean): void {
		watchBoolean(this.component, '_required', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateRows(value?: number): void {
		watchNumber(this.component, '_rows', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	public validateValue(value?: string): void {
		watchString(this.component, '_value', value, {
			hooks: {
				afterPatch: this.afterSyncCharCounter,
			},
		});
		this.setFormAssociatedValue(this.component._value as string);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateHasCounter(this.component._hasCounter);
		this.validateMaxLength(this.component._maxLength);
		this.validatePlaceholder(this.component._placeholder);
		this.validateReadOnly(this.component._readOnly);
		this.validateResize(this.component._resize);
		this.validateRequired(this.component._required);
		this.validateRows(this.component._rows);
		this.validateValue(this.component._value);
	}
}
