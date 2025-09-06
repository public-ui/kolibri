import type {
	HasCounterPropType,
	MaxLengthBehaviorPropType,
	PlaceholderPropType,
	ReadOnlyPropType,
	RequiredPropType,
	RowsPropType,
	SpellCheckPropType,
	TextareaProps,
	TextareaResizePropType,
	TextareaWatches,
} from '../../../schema';
import {
	validateHasCounter,
	validateMaxLength,
	validateMaxLengthBehavior,
	validatePlaceholder,
	validateReadOnly,
	validateRequired,
	validateResizeTextarea,
	validateRows,
	validateSpellCheck,
	watchString,
} from '../../../schema';

import { InputIconController } from '../../@deprecated/input/controller-icon';

import type { Generic } from 'adopted-style-sheets';

export class TextareaController extends InputIconController implements TextareaWatches {
	protected readonly component: Generic.Element.Component & TextareaProps;

	public constructor(component: Generic.Element.Component & TextareaProps, name: string, host?: HTMLElement) {
		super(component, name, host);
		this.component = component;
	}

	private afterSyncCharCounter = () => {
		if (typeof this.component._value === 'string') {
			this.component.state._currentLength = this.component._value.length;
			this.updateCurrentLengthDebounced(this.component._value.length);
		}
	};

	public validateHasCounter(value?: HasCounterPropType): void {
		validateHasCounter(this.component, value);
	}

	public validateMaxLengthBehavior(value?: MaxLengthBehaviorPropType): void {
		validateMaxLengthBehavior(this.component, value);
	}

	public validateMaxLength(value?: number): void {
		validateMaxLength(this.component, value, {
			hooks: { afterPatch: this.afterSyncCharCounter },
		});
	}

	public validatePlaceholder(value?: PlaceholderPropType): void {
		validatePlaceholder(this.component, value);
	}

	public validateReadOnly(value?: ReadOnlyPropType): void {
		validateReadOnly(this.component, value);
	}

	public validateResize(value?: TextareaResizePropType): void {
		validateResizeTextarea(this.component, value);
	}

	public validateRequired(value?: RequiredPropType): void {
		validateRequired(this.component, value);
	}

	public validateRows(value?: RowsPropType): void {
		validateRows(this.component, value);
	}

	public validateSpellCheck(value?: SpellCheckPropType): void {
		validateSpellCheck(this.component, value);
	}

	public validateValue(value?: string): void {
		watchString(this.component, '_value', value, {
			hooks: {
				afterPatch: this.afterSyncCharCounter,
			},
		});
		this.setFormAssociatedValue(this.component._value);
	}

	public componentWillLoad(): void {
		super.componentWillLoad();
		this.validateHasCounter(this.component._hasCounter);
		this.validateMaxLengthBehavior(this.component._maxLengthBehavior);
		this.validateMaxLength(this.component._maxLength);
		this.validatePlaceholder(this.component._placeholder);
		this.validateReadOnly(this.component._readOnly);
		this.validateRequired(this.component._required);
		this.validateResize(this.component._resize);
		this.validateRows(this.component._rows);
		this.validateSpellCheck(this.component._spellCheck);
		this.validateValue(this.component._value);
	}
}
