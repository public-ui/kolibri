import { h } from '@stencil/core';
import type { VNode } from '@stencil/core/internal';
import { propagateSubmitEventToForm } from '../../../components/form/controller';
import type {
	AccessKeyPropType,
	AutoCompletePropType,
	IconsHorizontalPropType,
	InternalButtonProps,
	MaxLengthBehaviorPropType,
	ShortKeyPropType,
	Stringified,
	VariantClassNamePropType,
	W3CInputValue,
} from '../../../schema';
import { validateAccessAndShortKey } from '../../../schema/validators/access-and-short-key';
import clsx from '../../../utils/clsx';
import { createCtaRef } from '../../../utils/element-interaction';
import {
	accessKeyProp,
	autoCompleteProp,
	horizontalIconsProp,
	patternProp,
	placeholderProp,
	readOnlyProp,
	requiredProp,
	shortKeyProp,
	smartButtonProp,
	stringValueProp,
	variantProp,
} from '../../props';
import { BaseWebComponent } from '../base-web-component';
import { CounterBehavior } from '../counter/behavior';
import { getInputAdornments } from '../form-field/adornments';
import { BaseFormFieldWebComponent } from '../form-field/base-web-component';
import type { FormFieldFCProps } from '../form-field/component';
import type { InputFCProps } from '../form-field/input';
import { SuggestionsFC } from '../form-field/suggestions';
import type { TextInputBaseApi } from './api';

type TextInputFieldProps = {
	/** Native type; `kol-input-text` passes it where its state carried `_type`, before the value. */
	type?: InputFCProps['type'];
	spellcheck?: boolean;
	multiple?: boolean;
	suggestions?: W3CInputValue[];
};

/**
 * Shared orchestrator implementation of `kol-input-email`, `kol-input-password` and `kol-input-text`
 * on top of the form field base: the common text input props, the character counter, the submit on
 * Enter and the props of the native `<input>`.
 *
 * As in the form field base, the concrete element declares every `@Prop` with its `@Watch`, which
 * calls the matching `apply*` method (DD16).
 */
export abstract class BaseTextInputWebComponent<Api extends TextInputBaseApi> extends BaseFormFieldWebComponent<Api> {
	public abstract _accessKey?: AccessKeyPropType;
	public abstract _shortKey?: ShortKeyPropType;
	/** Written on every input, so the watcher updates the counter and the form value. */
	public abstract _value?: string;

	protected readonly ctaRef = createCtaRef<HTMLInputElement>();

	protected readonly counter = new CounterBehavior(BaseWebComponent.stateLess);

	/**
	 * Whether the field has a value, rendered as the root class `has-value`. It is a plain field, not
	 * state: changing it does not re-render, the class follows with the next render (#11053).
	 */
	protected hasValue = false;

	/** Typed view on the text input props, see `shared` in the form field base. */
	private get textShared(): BaseTextInputWebComponent<TextInputBaseApi> {
		return this as unknown as BaseTextInputWebComponent<TextInputBaseApi>;
	}

	/** Call from `componentWillLoad`, after the value has been applied. */
	protected initHasValue(): void {
		this.hasValue = Boolean(this.textShared.getRenderProp('value'));
	}

	/** Call from `componentDidLoad`: fills the counter spans once they exist. */
	protected didLoadTextInput(): void {
		if (this.counter.hasCounter() || this.counter.hasSoftLimit()) {
			this.counter.updateImmediate(this._value?.length ?? 0);
		}
	}

	/** Call from `disconnectedCallback`. */
	protected destroyTextInput(): void {
		this.destroyFormField();
		this.counter.destroy();
	}

	// --- Prop application ---

	protected applyAccessKey(value?: AccessKeyPropType): void {
		accessKeyProp.apply(value, (v) => this.textShared.setRenderProp('accessKey', v));
		validateAccessAndShortKey(value, this._shortKey);
	}

	protected applyAutoComplete(value?: AutoCompletePropType): void {
		autoCompleteProp.apply(value, (v) => this.textShared.setRenderProp('autoComplete', v));
	}

	protected applyIcons(value?: IconsHorizontalPropType): void {
		horizontalIconsProp.apply(value, (v) => this.textShared.setRenderProp('icons', v));
	}

	protected applyPattern(value?: string): void {
		patternProp.apply(value, (v) => this.textShared.setRenderProp('pattern', v));
	}

	protected applyPlaceholder(value?: string): void {
		placeholderProp.apply(value, (v) => this.textShared.setRenderProp('placeholder', v));
	}

	protected applyReadOnly(value?: boolean): void {
		readOnlyProp.apply(value, (v) => this.textShared.setRenderProp('readOnly', v));
	}

	protected applyRequired(value?: boolean): void {
		requiredProp.apply(value, (v) => this.textShared.setRenderProp('required', v));
	}

	protected applyShortKey(value?: ShortKeyPropType): void {
		shortKeyProp.apply(value, (v) => this.textShared.setRenderProp('shortKey', v));
		validateAccessAndShortKey(this._accessKey, value);
	}

	/** Without `_smartButton` no button is rendered, so no default may remain. */
	protected applySmartButton(value?: Stringified<InternalButtonProps>): void {
		if (value === undefined || value === null) {
			this.textShared.unsetRenderProp('smartButton');
		} else {
			smartButtonProp.apply(value, (v) => this.textShared.setRenderProp('smartButton', v));
		}
	}

	protected applyValue(value?: string): void {
		this.initValue(value);
		this.counter.update(value?.length ?? 0);
	}

	/** Applies the value on load, without a counter update: `didLoadTextInput` fills the counter once its spans exist. */
	protected initValue(value?: string): void {
		stringValueProp.apply(value, (v) => this.textShared.setRenderProp('value', v));
		this.formAssociation.setFormAssociatedValue(this.textShared.getRenderProp('value'));
	}

	/** Applies the maximum on load, without a counter update, see `initValue`. */
	protected initMaxLength(value?: number): void {
		this.counter.watchMaxLength(value);
	}

	protected applyVariant(value?: VariantClassNamePropType): void {
		variantProp.apply(value, (v) => this.textShared.setRenderProp('variant', v));
	}

	protected applyHasCounter(value?: boolean): void {
		this.counter.watchHasCounter(value);
	}

	protected applyMaxLength(value?: number): void {
		this.counter.watchMaxLength(value);
		this.counter.updateImmediate(this._value?.length ?? 0);
	}

	protected applyMaxLengthBehavior(value?: MaxLengthBehaviorPropType): void {
		this.counter.watchMaxLengthBehavior(value);
	}

	// --- Event handling ---

	/** Writes the value before the input event is dispatched, so the watcher has run when listeners read it. */
	protected readonly handleTextInput = (event: Event): void => {
		this._value = (event.target as HTMLInputElement).value;
		this.handleInput(event);
	};

	protected readonly handleTextChange = (event: Event, value?: unknown): void => {
		this.handleChange(event, value);
		this.hasValue = Boolean(value ?? (event.target as HTMLInputElement).value);
	};

	protected readonly handleTextFocus = (event: FocusEvent): void => {
		this.handleFocus(event);
		this.counter.retriggerAria(this._value?.length ?? 0);
	};

	/** Enter submits the surrounding `kol-form`, like in a native form. */
	protected readonly handleTextKeyDown = (event: KeyboardEvent): void => {
		this.handleKeyDown(event);
		this.counter.handleKeyDown(event, this.ctaRef.el?.value.length ?? 0);
		if (event.code === 'Enter' || event.code === 'NumpadEnter') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.ctaRef.el,
			});
		}
	};

	// --- Render ---

	/** Props of the form field shell, with the counter, the limit and the root classes of the text fields. */
	protected getTextFormFieldProps(classNames: string): FormFieldFCProps {
		const shared = this.textShared;
		return this.getFormFieldProps({
			class: clsx(classNames, {
				'has-value': this.hasValue,
				'kol-form-field--has-counter': this.counter.hasSoftLimit() || this.counter.hasCounter(),
			}),
			accessKey: shared.getRenderProp('accessKey') || undefined,
			shortKey: shared.getRenderProp('shortKey') || undefined,
			variant: shared.getRenderProp('variant'),
			required: shared.getRenderProp('required'),
			readOnly: shared.getRenderProp('readOnly'),
			maxLength: this.counter.getRenderProp('maxLength'),
			counter: this.counter.getCounterProps(),
		});
	}

	/** Adornments of the input container; `endAdornment` is the field-specific button, if any. */
	protected getTextInputAdornments(endAdornment?: VNode | null): { startAdornment: VNode[]; endAdornment: VNode[] } {
		return getInputAdornments({
			icons: this.textShared.getRenderProp('icons'),
			smartButton: this.textShared.getRenderProp('smartButton') as InternalButtonProps | undefined,
			disabled: this.textShared.getRenderProp('disabled'),
			endAdornment,
		});
	}

	/**
	 * Props of the native `<input>`. The keys follow the order of the legacy state wrapper, and props
	 * the legacy state only held once set are only passed when set: the rendered attributes keep their
	 * order in the hydrate snapshot.
	 */
	protected getTextInputProps({ type, spellcheck, multiple, suggestions }: TextInputFieldProps, overrides: Partial<InputFCProps> = {}): InputFCProps {
		const shared = this.textShared;
		const id = shared.getState('id');
		const accessKey = shared.getRenderProp('accessKey');
		const shortKey = shared.getRenderProp('shortKey');
		const placeholder = shared.getRenderProp('placeholder');
		const pattern = shared.getRenderProp('pattern');
		const maxLength = this.counter.getMaxLengthAttribute();
		const characterLimitHintId = this.counter.getCharacterLimitHintId(id);
		const { ariaDescribedBy, hasError } = this.getAria();

		return {
			id,
			hideLabel: shared.getRenderProp('hideLabel'),
			label: shared.getRenderProp('label'),
			disabled: shared.getRenderProp('disabled'),
			// The name prop defaults to `''`; an unnamed field renders no `name` attribute.
			name: shared.getRenderProp('name') || undefined,
			...(accessKey ? { accessKey } : {}),
			...(type !== undefined ? { type } : {}),
			value: shared.getRenderProp('value'),
			required: shared.getRenderProp('required'),
			...(maxLength !== undefined ? { maxlength: maxLength } : {}),
			...(placeholder !== undefined ? { placeholder } : {}),
			autoComplete: shared.getRenderProp('autoComplete'),
			...(spellcheck !== undefined ? { spellcheck } : {}),
			...(pattern !== undefined ? { pattern } : {}),
			readonly: shared.getRenderProp('readOnly'),
			...(multiple !== undefined ? { multiple } : {}),
			touched: shared.getRenderProp('touched'),
			msg: shared.getRenderProp('msg'),
			...(shortKey ? { 'aria-keyshortcuts': shortKey } : {}),
			...(suggestions && suggestions.length > 0 ? { suggestions: (<SuggestionsFC id={id} suggestions={suggestions} />) as VNode } : {}),
			ref: this.ctaRef,
			onBlur: this.handleBlur,
			onChange: this.handleTextChange,
			onClick: this.handleClick,
			onFocus: this.handleTextFocus,
			onInput: this.handleTextInput,
			onKeyDown: this.handleTextKeyDown,
			...overrides,
			ariaDescribedBy: characterLimitHintId ? [...ariaDescribedBy, characterLimitHintId] : ariaDescribedBy,
			'aria-invalid': hasError ? 'true' : undefined,
		};
	}
}
