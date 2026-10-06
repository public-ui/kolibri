import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import type {
	AcceptPropType,
	AriaDetailsPropType,
	ClickableElement,
	FocusableElement,
	FormFieldLabelInfoPopoverProps,
	IconsHorizontalPropType,
	InputFileProps,
	InputTypeOnDefault,
	InternalButtonProps,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	MsgPropType,
	MultiplePropType,
	NamePropType,
	RequiredPropType,
	ShortKeyPropType,
	Stringified,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { validateAccessAndShortKey } from '../../schema/validators/access-and-short-key';

import { KolButtonWcTag } from '../../core/component-names';
import { translate } from '../../i18n';
import { getInputAdornments } from '../../internal/functional-components/form-field/adornments';
import { BaseFormFieldWebComponent } from '../../internal/functional-components/form-field/base-web-component';
import { FormFieldFC } from '../../internal/functional-components/form-field/component';
import { getFileNames } from '../../internal/functional-components/form-field/file-value';
import { InputFC, type InputFCProps } from '../../internal/functional-components/form-field/input';
import { InputContainerFC } from '../../internal/functional-components/form-field/input-container';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { InputFileApi } from '../../internal/functional-components/input-file/api';
import { inputFilePropsConfig } from '../../internal/functional-components/input-file/api';
import { BEM_CLASS_INPUT_CONTAINER__BUTTON, InputFileNameFC } from '../../internal/functional-components/input-file/component';
import { acceptProp, accessKeyProp, horizontalIconsProp, multipleProp, requiredProp, shortKeyProp, smartButtonProp, variantProp } from '../../internal/props';
import { createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';

/**
 * The **File** input type creates an input field for file uploads. One or multiple files can be selected and submitted with a form.
 *
 * @slot - The label of the input field.
 */
@Component({
	tag: 'kol-input-file',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolInputFile
	extends BaseFormFieldWebComponent<InputFileApi>
	implements ClickableElement, FocusableElement, InputFileProps, WebComponentInterface<InputFileApi>
{
	@Element() protected readonly host?: HTMLKolInputFileElement;
	protected readonly ctaRef = createCtaRef<HTMLInputElement>();

	private readonly translateDataBrowseText = translate('kol-data-browse-text');
	private readonly translateFilenameText = translate('kol-filename-text');

	@State() public id = createUniqueId('input-file');

	@State() public inputHasFocus = false;

	@State() private filename: string = this.translateFilenameText;

	/** Set by a selection in the file dialog and cleared by `reset()`; a drop does not set it (#10865). */
	@State() private hasFileSelected = false;

	@State() private isDragover = false;

	public constructor() {
		super();
		this.initFormAssociation('file', this._name);
	}

	/**
	 * Returns the current value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async getValue(): Promise<FileList | null | undefined> {
		return this.ctaRef.el?.files;
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	@delegateClick('ctaRef')
	public async click(): Promise<void> {}

	/**
	 * Resets the component's value.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async reset() {
		// The form value goes first: with a form association it throws and leaves the rest unchanged (#11110).
		this.formAssociation.setFormAssociatedValue('');
		this.filename = this.translateFilenameText;
		this.hasFileSelected = false;

		if (this.ctaRef.el) {
			this.ctaRef.el.value = '';
		}
	}

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(inputFilePropsConfig);
		// Without `_smartButton` no button is rendered, so the seeded default must not survive.
		this.unsetRenderProp('smartButton');

		this._touched = this._touched === true;
		this.watchAriaDetails(this._ariaDetails);
		this.watchName(this._name);
		this.watchSyncValueBySelector(this._syncValueBySelector);
		this.watchTouched(this._touched);
		this.watchAccept(this._accept);
		this.watchAccessKey(this._accessKey);
		this.watchMsg(this._msg);
		this.watchDisabled(this._disabled);
		this.watchHideMsg(this._hideMsg);
		this.watchHideLabel(this._hideLabel);
		this.watchHint(this._hint);
		this.watchIcons(this._icons);
		this.watchInfoPopover(this._infoPopover);
		this.watchLabel(this._label);
		this.watchMultiple(this._multiple);
		this.watchOn(this._on);
		this.watchRequired(this._required);
		this.watchShortKey(this._shortKey);
		this.watchSmartButton(this._smartButton);
		this.watchTooltipAlign(this._tooltipAlign);
		this.watchVariant(this._variant);
	}

	public disconnectedCallback(): void {
		this.destroyFormField();
	}

	// --- Event handling ---

	private readonly handleFileChange = (event: Event): void => {
		if (this.ctaRef.el instanceof HTMLInputElement && this.ctaRef.el.type === 'file') {
			const files = this.ctaRef.el.files;
			this.hasFileSelected = !!files?.length;
			this.filename = getFileNames(files) ?? this.translateFilenameText;

			this.handleChange(event, files);
			this.formAssociation.setFormAssociatedValue(files);
		}
	};

	private readonly handleFileInput = (event: Event): void => {
		if (this.ctaRef.el instanceof HTMLInputElement && this.ctaRef.el.type === 'file') {
			this.handleInput(event, this.ctaRef.el.files);
		}
	};

	/*
	 * The drag listeners sit on the input container, not on the `<input disabled>` inside it, so the
	 * native disabled state does not stop them: without this guard a disabled file input still
	 * highlights as a drop zone and still accepts dropped files.
	 */
	private isDisabled = (): boolean => this._disabled === true;

	private readonly handleDragOver = (event: DragEvent): void => {
		if (this.isDisabled()) {
			return;
		}
		event.preventDefault();
		this.isDragover = true;
	};

	private readonly handleDragLeave = (): void => {
		this.isDragover = false;
	};

	/** A drop emits `change` before `input` and does not set `hasFileSelected`, unlike a selection in the dialog (#10865). */
	private readonly handleDrop = (event: DragEvent): void => {
		if (this.isDisabled()) {
			return;
		}
		event.preventDefault();
		if (!this.ctaRef.el) {
			return;
		}
		this.isDragover = false;
		if (event.dataTransfer?.files.length) {
			const files = event.dataTransfer.files;
			this.ctaRef.el.files = files;
			this.filename = getFileNames(files) ?? this.translateFilenameText;
			this.formAssociation.setFormAssociatedValue(files);
			this.handleChange(event, files);
			this.handleInput(event, files);
		}
	};

	// --- Render ---

	/**
	 * Props of the native `<input>`. The keys follow the order of the legacy state wrapper, and props
	 * the legacy state only held once set are only passed when set: the rendered attributes keep their
	 * order in the hydrate snapshot.
	 */
	private getInputProps(): InputFCProps {
		const accessKey = this.getRenderProp('accessKey');
		const shortKey = this.getRenderProp('shortKey');
		const { ariaDescribedBy, hasError } = this.getAria();

		return {
			id: this.id,
			hideLabel: this.getRenderProp('hideLabel'),
			label: this.getRenderProp('label'),
			disabled: this.getRenderProp('disabled'),
			// The name prop defaults to `''`; an unnamed field renders no `name` attribute.
			name: this.getRenderProp('name') || undefined,
			...(accessKey ? { accessKey } : {}),
			required: this.getRenderProp('required'),
			multiple: this.getRenderProp('multiple'),
			touched: this.getRenderProp('touched'),
			msg: this.getRenderProp('msg'),
			...(shortKey ? { 'aria-keyshortcuts': shortKey } : {}),
			ref: this.ctaRef,
			type: 'file',
			accept: this.getRenderProp('accept'),
			onBlur: this.handleBlur,
			onChange: this.handleFileChange,
			onClick: this.handleClick,
			onFocus: this.handleFocus,
			onInput: this.handleFileInput,
			onKeyDown: this.handleKeyDown,
			ariaDescribedBy,
			'aria-invalid': hasError ? 'true' : undefined,
		};
	}

	public render(): JSX.Element {
		const disabled = this.getRenderProp('disabled');
		const { startAdornment, endAdornment } = getInputAdornments({
			icons: this.getRenderProp('icons'),
			smartButton: this.getRenderProp('smartButton') as InternalButtonProps | undefined,
			disabled,
		});

		return (
			<Host>
				<FormFieldFC
					{...this.getFormFieldProps({
						class: 'kol-input-file file',
						accessKey: this.getRenderProp('accessKey') || undefined,
						shortKey: this.getRenderProp('shortKey') || undefined,
						variant: this.getRenderProp('variant'),
						required: this.getRenderProp('required'),
					})}
				>
					<InputContainerFC
						class={{ 'kol-input-container--is-dragover': this.isDragover }}
						disabled={disabled}
						msg={this.getRenderProp('msg')}
						touched={this.getRenderProp('touched')}
						startAdornment={startAdornment}
						endAdornment={endAdornment}
						onDragOver={this.handleDragOver}
						onDragLeave={this.handleDragLeave}
						onDrop={this.handleDrop}
					>
						<InputFileNameFC filename={this.filename} hasFile={this.hasFileSelected} />
						<InputFC {...this.getInputProps()} />
						<KolButtonWcTag class={BEM_CLASS_INPUT_CONTAINER__BUTTON} _label={this.translateDataBrowseText} _variant="primary" _disabled={disabled} />
					</InputContainerFC>
				</FormFieldFC>
			</Host>
		);
	}

	// --- Props ---

	/**
	 * Defines which file formats are accepted.
	 */
	@Prop() public _accept?: string;

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: string;

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
	 * Defines the icon classnames.
	 */
	@Prop() public _icons?: IconsHorizontalPropType;

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
	 * Makes the input accept multiple inputs.
	 * @TODO: Change type back to `MultiplePropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _multiple?: boolean = false;

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: NamePropType;

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	/**
	 * Makes the input element required.
	 * @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _required?: boolean = false;

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;

	/**
	 * Allows to add a button with an arbitrary action within the element (_hide-label only).
	 */
	@Prop() public _smartButton?: Stringified<InternalButtonProps>;

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
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: VariantClassNamePropType;

	// --- Watchers ---

	@Watch('_accept')
	public watchAccept(value?: AcceptPropType): void {
		acceptProp.apply(value, (v) => this.setRenderProp('accept', v));
	}

	@Watch('_accessKey')
	public watchAccessKey(value?: string): void {
		accessKeyProp.apply(value, (v) => this.setRenderProp('accessKey', v));
		validateAccessAndShortKey(value, this._shortKey);
	}

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

	@Watch('_icons')
	public watchIcons(value?: IconsHorizontalPropType): void {
		horizontalIconsProp.apply(value, (v) => this.setRenderProp('icons', v));
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

	@Watch('_multiple')
	public watchMultiple(value?: MultiplePropType): void {
		multipleProp.apply(value, (v) => this.setRenderProp('multiple', v));
	}

	@Watch('_name')
	public watchName(value?: NamePropType): void {
		this.applyName(value);
	}

	@Watch('_on')
	public watchOn(value?: InputTypeOnDefault): void {
		this.applyOn(value);
	}

	@Watch('_required')
	public watchRequired(value?: RequiredPropType): void {
		requiredProp.apply(value, (v) => this.setRenderProp('required', v));
	}

	@Watch('_shortKey')
	public watchShortKey(value?: ShortKeyPropType): void {
		shortKeyProp.apply(value, (v) => this.setRenderProp('shortKey', v));
		validateAccessAndShortKey(this._accessKey, value);
	}

	@Watch('_smartButton')
	public watchSmartButton(value?: Stringified<InternalButtonProps>): void {
		if (value === undefined || value === null) {
			this.unsetRenderProp('smartButton');
		} else {
			smartButtonProp.apply(value, (v) => this.setRenderProp('smartButton', v));
		}
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

	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		variantProp.apply(value, (v) => this.setRenderProp('variant', v));
	}
}
