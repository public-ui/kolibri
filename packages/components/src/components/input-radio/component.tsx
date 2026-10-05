import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import type {
	AriaDetailsPropType,
	ClickableElement,
	FocusableElement,
	FormFieldLabelInfoPopoverProps,
	InputRadioProps,
	InputTypeOnDefault,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	MsgPropType,
	NamePropType,
	RadioOption,
	RadioOptionsPropType,
	SelectOption,
	StencilUnknown,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import type { OrientationPropType } from '../../schema/props/orientation';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { BaseFormFieldWebComponent } from '../../internal/functional-components/form-field/base-web-component';
import { FormFieldFC } from '../../internal/functional-components/form-field/component';
import { FieldControlFC, isFieldControlLabelShownAsTooltip } from '../../internal/functional-components/form-field/field-control';
import type { InputFCProps } from '../../internal/functional-components/form-field/input';
import { fillKeyOptionMap, normalizeOptionValues } from '../../internal/functional-components/form-field/options';
import { RadioFC } from '../../internal/functional-components/form-field/radio';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { InputRadioApi } from '../../internal/functional-components/input-radio/api';
import { inputRadioPropsConfig } from '../../internal/functional-components/input-radio/api';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import { radioOptionsProp, radioOrientationProp, radioValueProp, requiredProp, variantProp } from '../../internal/props';
import { createRelatedUniqueId, createUniqueId } from '../../utils/dev.utils';
import { delegateClick, setClick } from '../../utils/element-click';
import { delegateFocus, setFocus } from '../../utils/element-focus';
import { propagateSubmitEventToForm } from '../form/controller';

/**
 * The **InputRadio** input type consists of a collection of radio elements, providing a choice between different values. Only a single value can be selected at a time. Selected radio elements are typically represented by a filled, visually highlighted circle.
 *
 * @slot - The label of the input field.
 * @slot expert - Custom label content, e.g. for rich text or icons. https://public-ui.github.io/docs/concepts/expert-slot
 */
@Component({
	tag: 'kol-input-radio',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolInputRadio
	extends BaseFormFieldWebComponent<InputRadioApi>
	implements ClickableElement, FocusableElement, InputRadioProps, WebComponentInterface<InputRadioApi>
{
	@Element() protected readonly host?: HTMLKolInputRadioElement;

	@State() public id = createUniqueId('input-radio');

	@State() public inputHasFocus = false;

	/** Input of the selected option, the target of `click()` and of the Enter submit. */
	private inputRef?: HTMLInputElement;
	private readonly inputRefs = new Map<number, HTMLInputElement>();

	/** Option of each input value (`-<index>`), with `value ?? label` as value. */
	private readonly keyOptionMap = new Map<string, RadioOption<StencilUnknown>>();

	/** Label tooltip of each option while `_hideLabel` is set, keyed by the option ID. */
	private readonly optionTooltips = new Map<string, TooltipBehavior>();

	public constructor() {
		super();
		this.initFormAssociation('radio', this._name);
	}

	private readonly setSelectedInputRef = (ref?: HTMLInputElement) => {
		this.inputRef = ref;
	};

	private readonly setOptionInputRef = (index: number) => (ref?: HTMLInputElement) => {
		if (ref) {
			this.inputRefs.set(index, ref);
		} else {
			this.inputRefs.delete(index);
		}
	};

	/**
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<StencilUnknown> {
		return this._value;
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	public async focus(options?: KolFocusOptions) {
		const input = this.getFocusableInput();
		return delegateFocus(this.host!, () => setFocus(input, options));
	}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	public async click(): Promise<void> {
		return delegateClick(this.host!, async () => setClick(this.inputRef!));
	}

	/** The input of the selected option, otherwise of the first enabled option. */
	private getFocusableInput(): HTMLInputElement | undefined {
		const options = this.getRenderProp('options');
		const isComponentDisabled = Boolean(this.getRenderProp('disabled'));
		const value = this.getRenderProp('value');

		const selectedIndex = options.findIndex((option) => option.value === value && !isComponentDisabled && !option.disabled);

		if (selectedIndex !== -1) {
			const input = this.inputRefs.get(selectedIndex);
			if (input) {
				return input;
			}
		}

		const firstEnabledIndex = options.findIndex((option) => !isComponentDisabled && !option.disabled);

		if (firstEnabledIndex !== -1) {
			return this.inputRefs.get(firstEnabledIndex);
		}

		return undefined;
	}

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(inputRadioPropsConfig);

		this._touched = this._touched === true;
		this.watchAriaDetails(this._ariaDetails);
		this.watchName(this._name);
		this.watchSyncValueBySelector(this._syncValueBySelector);
		this.watchTouched(this._touched);
		this.watchMsg(this._msg);
		this.watchDisabled(this._disabled);
		this.watchHideMsg(this._hideMsg);
		this.watchHideLabel(this._hideLabel);
		this.watchHint(this._hint);
		this.watchInfoPopover(this._infoPopover);
		this.watchLabel(this._label);
		this.watchOn(this._on);
		this.watchTooltipAlign(this._tooltipAlign);
		this.watchVariant(this._variant);
		this.watchRequired(this._required);
		this.watchOrientation(this._orientation);
		this.watchOptions(this._options);
		this.watchValue(this._value);
	}

	public disconnectedCallback(): void {
		this.destroyFormField();
		this.optionTooltips.forEach((tooltipBehavior) => tooltipBehavior.destroy());
		this.optionTooltips.clear();
	}

	// --- Event handling ---

	private getOptionOfEvent(event: Event): RadioOption<StencilUnknown> | undefined {
		return event.target instanceof HTMLInputElement ? this.keyOptionMap.get(event.target.value) : undefined;
	}

	private readonly handleRadioInput = (event: Event): void => {
		const option = this.getOptionOfEvent(event);
		if (option !== undefined) {
			this.handleInput(event, option.value);
		}
	};

	private readonly handleRadioChange = (event: Event): void => {
		const option = this.getOptionOfEvent(event);
		if (option !== undefined) {
			this.handleChange(event, option.value);
			this._value = option.value;
		}
	};

	private readonly handleRadioKeyDown = (event: KeyboardEvent): void => {
		this.handleKeyDown(event);

		if (event.code === 'Enter' || event.code === 'NumpadEnter') {
			propagateSubmitEventToForm({
				form: this.host,
				ref: this.inputRef,
			});
		}
	};

	// --- Render ---

	/**
	 * Connects the label tooltip of an option, or tears it down while its label is visible. A
	 * functional component has no lifecycle, so the field keeps one tooltip behavior per option.
	 */
	private getOptionTooltipRefs(id: string, label: string): { refInput: (el?: HTMLDivElement) => void; refTooltip: (el?: HTMLDivElement) => void } {
		let tooltipBehavior = this.optionTooltips.get(id);

		if (isFieldControlLabelShownAsTooltip({ hideLabel: this.getRenderProp('hideLabel'), label })) {
			if (!tooltipBehavior) {
				tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
				tooltipBehavior.componentWillLoad({ label: '' });
				this.optionTooltips.set(id, tooltipBehavior);
			}
			tooltipBehavior.watchAlign(this.getRenderProp('tooltipAlign'));
			tooltipBehavior.watchBadgeText('');
			tooltipBehavior.watchId(createRelatedUniqueId(id, 'label'));
			tooltipBehavior.watchLabel(label);
		} else if (tooltipBehavior) {
			tooltipBehavior.destroy();
			this.optionTooltips.delete(id);
			tooltipBehavior = undefined;
		}

		const shownTooltipBehavior = tooltipBehavior;
		return {
			refInput: (el?: HTMLDivElement): void => {
				if (shownTooltipBehavior && el) {
					shownTooltipBehavior.initContext(el);
					shownTooltipBehavior.syncListeners(undefined, el, true);
				}
			},
			refTooltip: (el?: HTMLDivElement): void => {
				shownTooltipBehavior?.setTooltipElementRef(el);
			},
		};
	}

	private isOptionDisabled(option: RadioOption<StencilUnknown>): boolean {
		return Boolean(this.getRenderProp('disabled')) || Boolean(option.disabled);
	}

	private getInputProps(option: RadioOption<StencilUnknown>, id: string, index: number, selected: boolean): InputFCProps {
		const { hasError } = this.getAria();
		const hideLabel = this.getRenderProp('hideLabel');

		return {
			id,
			hideLabel,
			label: this.getRenderProp('label'),
			value: `-${index}`,
			disabled: this.isOptionDisabled(option),
			name: this.getRenderProp('name') || this.id,
			required: this.getRenderProp('required'),
			touched: this.getRenderProp('touched'),
			msg: this.getRenderProp('msg'),
			ref: (ref?: HTMLInputElement) => {
				this.setOptionInputRef(index)(ref);
				if (selected) {
					this.setSelectedInputRef(ref);
				}
			},
			'aria-label': hideLabel && typeof option.label === 'string' ? option.label : undefined,
			type: 'radio',
			checked: selected,
			onBlur: this.handleBlur,
			onChange: this.handleRadioChange,
			onFocus: this.handleFocus,
			onInput: this.handleRadioInput,
			onKeyDown: this.handleRadioKeyDown,
			'aria-invalid': hasError ? 'true' : undefined,
		};
	}

	private renderOption(option: RadioOption<StencilUnknown>, index: number): JSX.Element {
		const customId = createRelatedUniqueId(this.id, String(index));
		const selected = this.getRenderProp('value') === option.value;
		const label = option.label as string;

		return (
			<FieldControlFC
				key={customId}
				id={customId}
				label={label}
				hint={option.hint}
				hideLabel={this.getRenderProp('hideLabel')}
				tooltipAlign={this.getRenderProp('tooltipAlign')}
				disabled={this.isOptionDisabled(option)}
				msg={this.getRenderProp('msg')}
				touched={this.getRenderProp('touched')}
				required={false}
				labelProps={{ showBadge: false }}
				{...this.getOptionTooltipRefs(customId, label)}
			>
				<RadioFC inputProps={this.getInputProps(option, customId, index, selected)} />
			</FieldControlFC>
		);
	}

	public render(): JSX.Element {
		const { ariaDescribedBy } = this.getAria();

		return (
			<Host>
				<FormFieldFC
					{...this.getFormFieldProps({
						class: 'kol-form-field--radio',
						required: this.getRenderProp('required'),
						variant: this.getRenderProp('variant'),
						renderNoTooltip: true,
					})}
					component="fieldset"
					orientation={this.getRenderProp('orientation')}
					hideLabel={false}
					ariaDescribedBy={ariaDescribedBy.length > 0 ? ariaDescribedBy.join(' ') : undefined}
				>
					{this.getRenderProp('options').map((option, index) => this.renderOption(option, index))}
				</FormFieldFC>
			</Host>
		);
	}

	// --- Props ---

	/**
	 * References an external element by ID that provides accessible details for this input.
	 * Uses ElementInternals.ariaDetailsElements to cross the Shadow DOM boundary.
	 * Supported by desktop screen readers (NVDA, JAWS with Chrome/Firefox).
	 * Not yet supported by mobile screen readers (TalkBack, VoiceOver iOS).
	 */
	@Prop() public _ariaDetails?: AriaDetailsPropType;

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Hides the error message but leaves it in the DOM for the input's aria-describedby.
	 * @TODO: Change type back to `HideMsgPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideMsg?: boolean = false;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the hint text.
	 */
	@Prop() public _hint?: string = '';

	/**
	 * Defines the informational popover after the label.
	 */
	@Prop() public _infoPopover?: FormFieldLabelInfoPopoverProps;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	/**
	 * Defines the properties for a message rendered as Alert component.
	 */
	@Prop() public _msg?: Stringified<MsgPropType>;

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: NamePropType;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Options the user can choose from.
	 */
	@Prop() public _options?: RadioOptionsPropType;

	/**
	 * Defines whether the orientation of the component is horizontal or vertical.
	 */
	@Prop() public _orientation?: OrientationPropType = 'vertical';

	/**
	 * Makes the input element required.
	 * @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _required?: boolean = false;

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: SyncValueBySelectorPropType;

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'top';

	/**
	 * Shows if the input was touched by a user.
	 * @TODO: Change type back to `TouchedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _touched?: boolean = false;

	/**
	 * Defines the value of the element.
	 * @see Known bug: https://github.com/ionic-team/stencil/issues/3902
	 */
	@Prop({ mutable: true, reflect: true }) public _value: StencilUnknown = null;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: VariantClassNamePropType;

	// --- Watchers ---

	@Watch('_ariaDetails')
	public watchAriaDetails(value?: AriaDetailsPropType): void {
		this.applyAriaDetails(value);
	}

	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		this.applyDisabled(value);
	}

	@Watch('_hideMsg')
	public watchHideMsg(value?: boolean): void {
		this.applyHideMsg(value);
	}

	@Watch('_hideLabel')
	public watchHideLabel(value?: boolean): void {
		this.applyHideLabel(value);
	}

	@Watch('_hint')
	public watchHint(value?: string): void {
		this.applyHint(value);
	}

	@Watch('_infoPopover')
	public watchInfoPopover(value?: FormFieldLabelInfoPopoverProps): void {
		this.applyInfoPopover(value);
	}

	@Watch('_label')
	public watchLabel(value?: LabelWithExpertSlotPropType): void {
		this.applyLabel(value);
	}

	@Watch('_msg')
	public watchMsg(value?: Stringified<MsgPropType>): void {
		this.applyMsg(value);
	}

	@Watch('_name')
	public watchName(value?: NamePropType): void {
		this.applyName(value);
	}

	@Watch('_on')
	public watchOn(value?: InputTypeOnDefault): void {
		this.applyOn(value);
	}

	/** The option map keeps its entries while the list is empty. */
	@Watch('_options')
	public watchOptions(value?: RadioOptionsPropType): void {
		radioOptionsProp.apply(value, (v) => {
			this.setRenderProp('options', v);
			if (v.length > 0) {
				this.keyOptionMap.clear();
				fillKeyOptionMap(this.keyOptionMap, normalizeOptionValues(v) as SelectOption<StencilUnknown>[]);
			}
		});
	}

	@Watch('_orientation')
	public watchOrientation(value?: OrientationPropType): void {
		radioOrientationProp.apply(value, (v) => this.setRenderProp('orientation', v));
	}

	@Watch('_required')
	public watchRequired(value?: boolean): void {
		requiredProp.apply(value, (v) => this.setRenderProp('required', v));
	}

	@Watch('_syncValueBySelector')
	public watchSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.applySyncValueBySelector(value);
	}

	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		this.applyTooltipAlign(value);
	}

	@Watch('_touched')
	public watchTouched(value?: boolean): void {
		this.applyTouched(value);
	}

	/** `null` and `undefined` are kept as value instead of falling back to the default. */
	@Watch('_value')
	public watchValue(value: StencilUnknown): void {
		if (value === null || value === undefined) {
			this.setRenderProp('value', value as unknown as NonNullable<StencilUnknown>);
		} else {
			radioValueProp.apply(value, (v) => this.setRenderProp('value', v));
		}
		this.formAssociation.setFormAssociatedValue(this.getRenderProp('value'));
	}

	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		variantProp.apply(value, (v) => this.setRenderProp('variant', v));
	}
}
