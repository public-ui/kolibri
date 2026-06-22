import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import clsx from '../../utils/clsx';

import type {
	AcceptPropType,
	AriaDetailsPropType,
	ClickableElement,
	DisabledPropType,
	FocusableElement,
	HideLabelPropType,
	HideMsgPropType,
	HintPropType,
	IconsHorizontalPropType,
	InputFileAPI,
	InputFileStates,
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

import { KolButtonWcTag } from '../../core/component-names';
import KolFormFieldStateWrapperFc, { type FormFieldStateWrapperProps } from '../../functional-component-wrappers/FormFieldStateWrapper/FormFieldStateWrapper';
import KolInputContainerFc from '../../functional-component-wrappers/InputContainerStateWrapper/InputContainerStateWrapper';
import KolInputStateWrapperFc, { type InputStateWrapperProps } from '../../functional-component-wrappers/InputStateWrapper/InputStateWrapper';
import { translate } from '../../i18n';
import { createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { InputFileController } from './controller';

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
export class KolInputFile implements ClickableElement, FocusableElement, InputFileAPI {
	@Element() protected readonly host?: HTMLKolInputFileElement;
	protected readonly ctaRef = createCtaRef<HTMLInputElement>();

	private readonly translateDataBrowseText = translate('kol-data-browse-text');
	private readonly translateFilenameText = translate('kol-filename-text');

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
		this.controller.setFormAssociatedValue('');
		this.filename = this.translateFilenameText;
		this.hasFileSelected = false;

		if (this.ctaRef.el) {
			this.ctaRef.el.value = '';
		}
	}

	private getFormFieldProps(): FormFieldStateWrapperProps {
		return {
			state: this.state,
			class: clsx('kol-input-file', 'file'),
			tooltipAlign: this._tooltipAlign,
			alert: this.showAsAlert(),
		};
	}

	private getInputProps(): InputStateWrapperProps {
		return {
			ref: this.ctaRef,
			state: this.state,
			type: 'file',
			accept: this.state._accept,
			multiple: this.state._multiple,
			...this.controller.onFacade,
			onChange: this.onChange,
			onInput: this.onInput,
			onFocus: (event: FocusEvent) => {
				this.controller.onFacade.onFocus(event);
				this.inputHasFocus = true;
			},
			onBlur: (event: FocusEvent) => {
				this.controller.onFacade.onBlur(event);
				this.inputHasFocus = false;
			},
		};
	}

	public render(): JSX.Element {
		return (
			<KolFormFieldStateWrapperFc {...this.getFormFieldProps()}>
				<KolInputContainerFc state={this.state}>
					<span class={clsx('kol-input-container__filename', { 'kol-input-container__filename--has-file': this.hasFileSelected })}>{this.filename}</span>
					<KolInputStateWrapperFc {...this.getInputProps()} />
					<KolButtonWcTag class="kol-input-container__button" _label={this.translateDataBrowseText} _variant="primary" _disabled={this._disabled} />
				</KolInputContainerFc>
			</KolFormFieldStateWrapperFc>
		);
	}

	private readonly controller: InputFileController;

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
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: IconsHorizontalPropType;

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

	@State() private filename: string = this.translateFilenameText;
	@State() private hasFileSelected: boolean = false;

	@State() public state: InputFileStates = {
		_hideMsg: false,
		_id: createUniqueId('input-file'),
		_label: '', // ⚠ required
	};

	@State() private inputHasFocus = false;

	public constructor() {
		this.controller = new InputFileController(this, 'file', this.host);
	}

	private showAsAlert(): boolean {
		return Boolean(this.state._touched) && !this.inputHasFocus;
	}

	@Watch('_accept')
	public validateAccept(value?: AcceptPropType): void {
		this.controller.validateAccept(value);
	}

	@Watch('_accessKey')
	public validateAccessKey(value?: string): void {
		this.controller.validateAccessKey(value);
	}

	@Watch('_ariaDetails')
	public validateAriaDetails(value?: AriaDetailsPropType): void {
		this.controller.validateAriaDetails(value);
	}

	@Watch('_disabled')
	public validateDisabled(value?: DisabledPropType): void {
		this.controller.validateDisabled(value);
	}

	@Watch('_hideMsg')
	public validateHideMsg(value?: HideMsgPropType): void {
		this.controller.validateHideMsg(value);
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: HideLabelPropType): void {
		this.controller.validateHideLabel(value);
	}

	@Watch('_hint')
	public validateHint(value?: HintPropType): void {
		this.controller.validateHint(value);
	}

	@Watch('_icons')
	public validateIcons(value?: IconsHorizontalPropType): void {
		this.controller.validateIcons(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		this.controller.validateLabel(value);
	}

	@Watch('_msg')
	public validateMsg(value?: Stringified<MsgPropType>): void {
		this.controller.validateMsg(value);
	}

	@Watch('_multiple')
	public validateMultiple(value?: MultiplePropType): void {
		this.controller.validateMultiple(value);
	}

	@Watch('_name')
	public validateName(value?: string): void {
		this.controller.validateName(value);
	}

	@Watch('_on')
	public validateOn(value?: InputTypeOnDefault): void {
		this.controller.validateOn(value);
	}

	@Watch('_required')
	public validateRequired(value?: RequiredPropType): void {
		this.controller.validateRequired(value);
	}

	@Watch('_shortKey')
	public validateShortKey(value?: ShortKeyPropType): void {
		this.controller.validateShortKey(value);
	}

	@Watch('_smartButton')
	public validateSmartButton(value?: InternalButtonProps | string): void {
		this.controller.validateSmartButton(value);
	}

	@Watch('_syncValueBySelector')
	public validateSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.controller.validateSyncValueBySelector(value);
	}

	@Watch('_touched')
	public validateTouched(value?: boolean): void {
		this.controller.validateTouched(value);
	}

	@Watch('_variant')
	public validateVariant(value?: VariantClassNamePropType): void {
		this.controller.validateVariant(value);
	}

	public componentWillLoad(): void {
		this._touched = this._touched === true;
		this.validateAriaDetails(this._ariaDetails);
		this.controller.componentWillLoad();
	}

	public componentDidLoad(): void {
		const container = this.ctaRef.el?.parentElement?.parentElement;
		container?.addEventListener('dragover', this.onDragOver);
		container?.addEventListener('dragleave', this.onDragLeave);
		container?.addEventListener('drop', this.onDrop);
	}

	private onDragOver = (event: DragEvent): void => {
		event.preventDefault();
		this.ctaRef.el?.parentElement?.parentElement?.classList.add('kol-input-container--is-dragover');
	};

	private onDragLeave = (): void => {
		this.ctaRef.el?.parentElement?.parentElement?.classList.remove('kol-input-container--is-dragover');
	};

	private onDrop = (event: DragEvent): void => {
		event.preventDefault();
		if (!this.ctaRef.el) {
			return;
		}
		this.ctaRef.el.parentElement?.parentElement?.classList.remove('kol-input-container--is-dragover');
		if (event.dataTransfer?.files.length) {
			const files = event.dataTransfer.files;
			this.ctaRef.el.files = files;
			this.filename = Array.from(files)
				.map((file) => file.name)
				.join(', ');
			this.controller.setFormAssociatedValue(files);
			this.controller.onFacade.onChange(event, files);
			this.controller.onFacade.onInput(event, false, files);
		}
	};
	private onChange = (event: Event): void => {
		if (this.ctaRef.el instanceof HTMLInputElement && this.ctaRef.el.type === 'file') {
			const value = this.ctaRef.el.files;
			this.hasFileSelected = !!value?.length;
			this.filename = value?.length
				? Array.from(value)
						.map((file) => file.name)
						.join(', ')
				: this.translateFilenameText;

			this.controller.onFacade.onChange(event, value);
			this.controller.setFormAssociatedValue(value);
		}
	};

	private onInput = (event: Event): void => {
		if (this.ctaRef.el instanceof HTMLInputElement && this.ctaRef.el.type === 'file') {
			const files = this.ctaRef.el.files;
			this.controller.onFacade.onInput(event, false, files);
		}
	};
}
