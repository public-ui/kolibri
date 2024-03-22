import type { CSSResize, HasCounterPropType, RowsPropType, TextareaProps, TextareaWatches } from '@public-ui/schema';
import { cssResizeOptions, validateRows, watchBoolean, watchNumber, watchString, watchValidator } from '@public-ui/schema';

import { InputController } from '../@deprecated/input/controller';

import type { Generic } from 'adopted-style-sheets';
export class TextareaController extends InputController implements TextareaWatches {
	protected readonly component: Generic.Element.Component & TextareaProps;

	public constructor(component: Generic.Element.Component & TextareaProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	private afterSyncCharCounter = () => {
		if (typeof this.component._value === 'string' && this.component._value.length > 0) {
			this.component.state._currentLength = this.component._value.length;
		}
	};

	public validateHasCounter(value?: HasCounterPropType): void {
		watchBoolean(this.component, '_hasCounter', value, {
			hooks: {
				afterPatch: this.afterSyncCharCounter,
			},
		});
	}

	public validateMaxLength(value?: number): void {
		watchNumber(this.component, '_maxLength', value, {
			hooks: {
				afterPatch: this.afterSyncCharCounter,
			},
			min: 0,
		});
	}

	public validatePlaceholder(value?: string): void {
		watchString(this.component, '_placeholder', value);
	}

	public validateReadOnly(value?: boolean): void {
		watchBoolean(this.component, '_readOnly', value);
	}

	public validateResize(value?: CSSResize): void {
		watchValidator(
			this.component,
			'_resize',
			(value) => typeof value === 'string' && cssResizeOptions.includes(value),
			new Set(`String {${cssResizeOptions.join(', ')}`),
			value,
		);
	}

	public validateRequired(value?: boolean): void {
		watchBoolean(this.component, '_required', value);
	}

	public validateRows(value?: RowsPropType): void {
		validateRows(this.component, value);
	}

	public validateValue(value?: string): void {
		watchString(this.component, '_value', value, {
			hooks: {
				afterPatch: this.afterSyncCharCounter,
			},
		});
		this.setFormAssociatedValue(this.component._value as string);
	}

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
