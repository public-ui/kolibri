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

import { createButtonItem } from '../../internal/functional-components/button/item';
import { BaseFormFieldWebComponent } from '../../internal/functional-components/form-field/base-web-component';
import { FormFieldFC } from '../../internal/functional-components/form-field/component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { InputFileApi } from '../../internal/functional-components/input-file/api';
import { inputFilePropsConfig } from '../../internal/functional-components/input-file/api';
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

	@State() public id = createUniqueId('input-file');

	/** Whether the info popover of the label is open. */
	@State() public infoPopoverOpen = false;

	@State() public inputHasFocus = false;

	protected readonly ctaRef = createCtaRef<HTMLInputElement>();

	private readonly browseButton = createButtonItem(() => this.host);

	public constructor() {
		super();
		this.initFormAssociation('file', this._name);
	}

	/**
	 * Defines which file formats are accepted.
	 */
	@Prop() public _accept?: string;

	@Watch('_accept')
	public watchAccept(value?: AcceptPropType): void {
		acceptProp.apply(value, (v) => this.setRenderProp('accept', v));
	}

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: string;

	@Watch('_accessKey')
	public watchAccessKey(value?: string): void {
		accessKeyProp.apply(value, (v) => this.setRenderProp('accessKey', v));
		validateAccessAndShortKey(value, this._shortKey);
	}

	/**
	 * References an external element by ID that provides accessible details for this input.
	 * Uses ElementInternals.ariaDetailsElements to cross the Shadow DOM boundary.
	 * Supported by desktop screen readers (NVDA, JAWS with Chrome/Firefox).
	 * Not yet supported by mobile screen readers (TalkBack, VoiceOver iOS).
	 */
	@Prop() public _ariaDetails?: AriaDetailsPropType;

	@Watch('_ariaDetails')
	public watchAriaDetails(value?: AriaDetailsPropType): void {
		this.applyAriaDetails(value);
	}

	/**
	 * Makes the element not focusable and ignore all events.
	 * @TODO: Change type back to `DisabledPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _disabled?: boolean = false;

	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		this.applyDisabled(value);
	}

	/**
	 * Hides the error message but leaves it in the DOM for the input's aria-describedby.
	 * @TODO: Change type back to `HideMsgPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideMsg?: boolean = false;

	@Watch('_hideMsg')
	public watchHideMsg(value?: boolean): void {
		this.applyHideMsg(value);
	}

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	@Watch('_hideLabel')
	public watchHideLabel(value?: boolean): void {
		this.applyHideLabel(value);
	}

	/**
	 * Defines the hint text.
	 */
	@Prop() public _hint?: string = '';

	@Watch('_hint')
	public watchHint(value?: string): void {
		this.applyHint(value);
	}

	/**
	 * Defines the icon classnames.
	 */
	@Prop() public _icons?: IconsHorizontalPropType;

	@Watch('_icons')
	public watchIcons(value?: IconsHorizontalPropType): void {
		horizontalIconsProp.apply(value, (v) => this.setRenderProp('icons', v));
	}

	/**
	 * Defines the informational popover after the label.
	 */
	@Prop() public _infoPopover?: FormFieldLabelInfoPopoverProps;

	@Watch('_infoPopover')
	public watchInfoPopover(value?: FormFieldLabelInfoPopoverProps): void {
		this.applyInfoPopover(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	@Watch('_label')
	public watchLabel(value?: LabelWithExpertSlotPropType): void {
		this.applyLabel(value);
	}

	/**
	 * Defines the properties for a message rendered as Alert component.
	 */
	@Prop() public _msg?: Stringified<MsgPropType>;

	@Watch('_msg')
	public watchMsg(value?: Stringified<MsgPropType>): void {
		this.applyMsg(value);
	}

	/**
	 * Makes the input accept multiple inputs.
	 * @TODO: Change type back to `MultiplePropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _multiple?: boolean = false;

	@Watch('_multiple')
	public watchMultiple(value?: MultiplePropType): void {
		multipleProp.apply(value, (v) => this.setRenderProp('multiple', v));
	}

	/**
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: NamePropType;

	@Watch('_name')
	public watchName(value?: NamePropType): void {
		this.applyName(value);
	}

	/**
	 * Gibt die EventCallback-Funktionen für das Input-Event an.
	 */
	@Prop() public _on?: InputTypeOnDefault;

	@Watch('_on')
	public watchOn(value?: InputTypeOnDefault): void {
		this.applyOn(value);
	}

	/**
	 * Makes the input element required.
	 * @TODO: Change type back to `RequiredPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _required?: boolean = false;

	@Watch('_required')
	public watchRequired(value?: RequiredPropType): void {
		requiredProp.apply(value, (v) => this.setRenderProp('required', v));
	}

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;

	@Watch('_shortKey')
	public watchShortKey(value?: ShortKeyPropType): void {
		shortKeyProp.apply(value, (v) => this.setRenderProp('shortKey', v));
		validateAccessAndShortKey(this._accessKey, value);
	}

	/**
	 * Allows to add a button with an arbitrary action within the element (_hide-label only).
	 */
	@Prop() public _smartButton?: Stringified<InternalButtonProps>;

	@Watch('_smartButton')
	public watchSmartButton(value?: Stringified<InternalButtonProps>): void {
		if (value === undefined || value === null) {
			this.unsetRenderProp('smartButton');
		} else {
			smartButtonProp.apply(value, (v) => this.setRenderProp('smartButton', v));
		}
	}

	/**
	 * Selector for synchronizing the value with another input element.
	 * @internal
	 */
	@Prop() public _syncValueBySelector?: SyncValueBySelectorPropType;

	@Watch('_syncValueBySelector')
	public watchSyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.applySyncValueBySelector(value);
	}

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'top';

	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		this.applyTooltipAlign(value);
	}

	/**
	 * Shows if the input was touched by a user.
	 * @TODO: Change type back to `TouchedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _touched?: boolean = false;

	@Watch('_touched')
	public watchTouched(value?: boolean): void {
		this.applyTouched(value);
	}

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: VariantClassNamePropType;

	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		variantProp.apply(value, (v) => this.setRenderProp('variant', v));
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
		this.formAssociation.setFormAssociatedValue('');

		if (this.ctaRef.el) {
			this.ctaRef.el.value = '';
			this.destroyFormField();
		}
	}

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

	public componentDidRender(): void {
		this.browseButton.syncListeners();
		this.syncFormField();
	}

	public disconnectedCallback(): void {
		this.browseButton.destroy();
		this.destroyFormField();
	}

	public render(): JSX.Element {
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
					<div class="kol-input-container">
						<input type="file" class="kol-input" />
					</div>
				</FormFieldFC>
			</Host>
		);
	}
}
