import { h, type JSX } from '@stencil/core';
import type {
	IconsHorizontalPropType,
	MultiplePropType,
	Option,
	OptionsWithOptgroupPropType,
	SelectOption,
	ShortKeyPropType,
	StencilUnknown,
	Stringified,
	VariantClassNamePropType,
} from '../../../schema';
import { validateAccessAndShortKey } from '../../../schema/validators/access-and-short-key';
import clsx from '../../../utils/clsx';
import type { CtaRef } from '../../../utils/element-interaction';
import {
	accessKeyProp,
	horizontalIconsProp,
	multipleProp,
	optionsWithOptgroupProp,
	requiredProp,
	rowsProp,
	selectValueProp,
	shortKeyProp,
	tabIndexProp,
	variantProp,
} from '../../props';
import { getInputAdornments } from '../form-field/adornments';
import { BaseFormFieldWebComponent } from '../form-field/base-web-component';
import { FormFieldFC } from '../form-field/component';
import { InputContainerFC } from '../form-field/input-container';
import { fillKeyOptionMap } from '../form-field/options';
import type { SelectFCProps } from '../form-field/select';
import { SelectFC } from '../form-field/select';
import { assertSelectValueMatchesMultiplicity, normalizeSelectValue } from '../form-field/select-value';
import type { SelectApi } from './api';

/**
 * Shared orchestrator implementation of `kol-select` and its transitional tag `kol-select-wc`: the
 * option map, the value list and its normalization, the native select events and the render.
 *
 * The concrete elements keep what Stencil has to see in the component class itself (DD16).
 */
export abstract class BaseSelectWebComponent extends BaseFormFieldWebComponent<SelectApi> {
	/** Read for the multiplicity check and the first option preselection, like the raw prop. */
	public abstract _multiple?: boolean;
	/** Written on user input. */
	public abstract _value?: Stringified<StencilUnknown[]> | Stringified<StencilUnknown>;

	protected abstract readonly ctaRef: CtaRef<HTMLSelectElement>;

	/** Option of each native option value (`-<index>`). */
	private readonly keyOptionMap = new Map<string, Option<StencilUnknown>>();

	/**
	 * Whether the field has a value, for the class `kol-form-field--has-value`. It starts as `true`
	 * and follows each `change`; it does not trigger a render of its own.
	 */
	private hasValue = true;

	// --- Prop application (the concrete element's watchers delegate here) ---

	protected applyAccessKey(value?: string): void {
		accessKeyProp.apply(value, (v) => this.setRenderProp('accessKey', v));
		validateAccessAndShortKey(value, this.getShortKeyProp());
	}

	protected applyShortKey(value?: ShortKeyPropType): void {
		shortKeyProp.apply(value, (v) => this.setRenderProp('shortKey', v));
		validateAccessAndShortKey(this.getAccessKeyProp(), value);
	}

	protected abstract getAccessKeyProp(): string | undefined;
	protected abstract getShortKeyProp(): ShortKeyPropType | undefined;

	protected applyIcons(value?: IconsHorizontalPropType): void {
		horizontalIconsProp.apply(value, (v) => this.setRenderProp('icons', v));
	}

	protected applyMultiple(value?: MultiplePropType): void {
		assertSelectValueMatchesMultiplicity(this._value, value === true, 'current');
		multipleProp.apply(value, (v) => {
			this.setRenderProp('multiple', v);
			this.setRenderProp('value', normalizeSelectValue(this.getRenderProp('value'), this.getRenderProp('options'), this._multiple));
		});
	}

	/** The option map keeps its entries while the list is empty. */
	protected applyOptions(value?: OptionsWithOptgroupPropType): void {
		optionsWithOptgroupProp.apply(value, (v) => {
			this.setRenderProp('options', v);
			if (v.length > 0) {
				this.keyOptionMap.clear();
				fillKeyOptionMap(this.keyOptionMap, v as SelectOption<StencilUnknown>[]);
				this.setRenderProp('value', normalizeSelectValue(this.getRenderProp('value'), v, this._multiple));
			}
		});
	}

	protected applyRequired(value?: boolean): void {
		requiredProp.apply(value, (v) => this.setRenderProp('required', v));
	}

	protected applyRows(value?: number): void {
		rowsProp.apply(value, (v) => this.setRenderProp('rows', v));
	}

	protected applyTabIndex(value?: number): void {
		tabIndexProp.apply(value, (v) => this.setRenderProp('tabIndex', v));
	}

	/**
	 * A single value is wrapped into a list and `null` is kept as `[null]`. Only a `_value` change sets
	 * the form value; the preselection on an `_options` or `_multiple` change does not.
	 */
	protected applyValue(value?: Stringified<StencilUnknown[]> | Stringified<StencilUnknown>): void {
		assertSelectValueMatchesMultiplicity(value, this._multiple === true, 'received');
		const setValue = (list: StencilUnknown[]): void => {
			const normalized = normalizeSelectValue(list, this.getRenderProp('options'), this._multiple);
			this.setRenderProp('value', normalized);
			this.formAssociation.setFormAssociatedValue(normalized as unknown as StencilUnknown);
		};
		if (value === null) {
			setValue([null]);
		} else {
			selectValueProp.apply(value, setValue);
		}
	}

	protected applyVariant(value?: VariantClassNamePropType): void {
		variantProp.apply(value, (v) => this.setRenderProp('variant', v));
	}

	// --- Value ---

	/** The value list with `_multiple`, otherwise its first entry (the list itself when empty). */
	protected getModelValue(): StencilUnknown[] | StencilUnknown {
		const value = this.getRenderProp('value');
		if (this._multiple) {
			return value;
		}
		return Array.isArray(value) && value.length > 0 ? value[0] : value;
	}

	// --- Event handling of the native select ---

	private readonly handleSelectInput = (event: Event): void => {
		const selectedValues = Array.from(this.ctaRef.el?.options || [])
			.filter((option) => option.selected)
			.map((option) => this.keyOptionMap.get(option.value)?.value);

		if (this._multiple) {
			this._value = selectedValues;
			this.handleInput(event, selectedValues);
		} else {
			const singleValue: StencilUnknown = selectedValues.length > 0 ? selectedValues[0] : undefined;
			this._value = singleValue as Stringified<StencilUnknown>;
			this.handleInput(event, singleValue);
		}
	};

	private readonly handleSelectChange = (event: Event): void => {
		const value = this._value as StencilUnknown;
		this.handleChange(event, value);
		this.hasValue = !!value;
	};

	// --- Render ---

	private getSelectProps(): SelectFCProps {
		const { ariaDescribedBy, hasError } = this.getAria();
		const multiple = this.getRenderProp('multiple');
		const shortKey = this.getRenderProp('shortKey');

		return {
			id: this.getState('id'),
			hideLabel: this.getRenderProp('hideLabel'),
			label: this.getRenderProp('label'),
			value: this.getRenderProp('value'),
			options: this.getRenderProp('options'),
			accessKey: this.getRenderProp('accessKey') || undefined,
			disabled: this.getRenderProp('disabled'),
			name: this.getRenderProp('name') || undefined,
			'aria-invalid': hasError ? 'true' : undefined,
			ariaDescribedBy,
			size: multiple ? this.getRenderProp('rows') : undefined,
			multiple,
			required: this.getRenderProp('required'),
			touched: this.getRenderProp('touched'),
			msg: this.getRenderProp('msg'),
			...(shortKey ? { 'aria-keyshortcuts': shortKey } : {}),
			ref: this.ctaRef,
			onBlur: this.handleBlur,
			onChange: this.handleSelectChange,
			onClick: this.handleClick,
			onFocus: this.handleFocus,
			onInput: this.handleSelectInput,
			onKeyDown: this.handleKeyDown,
		};
	}

	protected renderSelectField(): JSX.Element {
		const disabled = this.getRenderProp('disabled');
		const { startAdornment, endAdornment } = getInputAdornments({ icons: this.getRenderProp('icons'), disabled });

		return (
			<FormFieldFC
				{...this.getFormFieldProps({
					class: clsx('kol-form-field-select', { 'kol-form-field--has-value': this.hasValue }),
					accessKey: this.getRenderProp('accessKey') || undefined,
					shortKey: this.getRenderProp('shortKey') || undefined,
					required: this.getRenderProp('required'),
					variant: this.getRenderProp('variant'),
				})}
				onClick={() => this.ctaRef.el?.focus()}
			>
				<InputContainerFC
					disabled={disabled}
					msg={this.getRenderProp('msg')}
					touched={this.getRenderProp('touched')}
					startAdornment={startAdornment}
					endAdornment={endAdornment}
				>
					<SelectFC {...this.getSelectProps()} />
				</InputContainerFC>
			</FormFieldFC>
		);
	}
}
