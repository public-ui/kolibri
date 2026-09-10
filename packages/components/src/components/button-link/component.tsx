import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import type { ButtonApi } from '../../internal/functional-components/button/api';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaDescriptionPropType,
	ButtonCallbacksPropType,
	ButtonLinkProps,
	ButtonTypePropType,
	ClickableElement,
	FocusableElement,
	IconsPropType,
	InlinePropType,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	NamePropType,
	ShortKeyPropType,
	StencilUnknown,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { nonce } from '../../utils/dev.utils';
import { delegateClick, delegateFocus } from '../../utils/element-interaction';
import { BaseButtonWebComponent } from '../button/base';

/**
 * The **ButtonLink** component is semantically a button but has the appearance of a link. All relevant properties of the Button component are adopted and extended with the design-defining properties of a link.
 *
 * A button can be disabled, therefore the **ButtonLink** also has the `_disabled` property. How this is styled visually is determined by the UX designer.
 *
 * Instead of using `_href` as with a regular link, the **ButtonLink**'s behavior is controlled via a click callback using the `_on` property.
 *
 * A link has the `target` property which optionally opens the link in a new window/tab. This behavior is not yet implemented.
 *
 * Since a link, unlike a button, is not offered in multiple variants (`primary`, `secondary`, etc.), the `_customClass` and `_variant` properties are not available.
 *
 * @slot expert - Custom label content, e.g. for rich text or icons.
 */
@Component({
	tag: 'kol-button-link',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolButtonLink extends BaseButtonWebComponent implements ButtonLinkProps, ClickableElement, FocusableElement, WebComponentInterface<ButtonApi> {
	@Element() protected readonly host?: HTMLKolButtonLinkElement;

	public constructor() {
		super();
		this.initFormAssociation();
	}

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initButtonRenderProps();

		this.watchAccessKey(this._accessKey);
		this.watchAriaControls(this._ariaControls);
		this.watchAriaDescription(this._ariaDescription);
		this.watchAriaExpanded(this._ariaExpanded);
		this.watchAriaSelected(this._ariaSelected);
		this.watchDisabled(this._disabled);
		this.watchHideLabel(this._hideLabel);
		this.watchIcons(this._icons);
		this.watchInline(this._inline);
		this.watchLabel(this._label);
		this.watchName(this._name);
		this.watchOn(this._on);
		this.watchShortKey(this._shortKey);
		this.watchSyncValueBySelector(this._syncValueBySelector);
		this.watchTooltipAlign(this._tooltipAlign);
		this.watchType(this._type);
		this.watchValue(this._value);
		this.watchVariant(this._variant);

		this.initTooltipBehavior();
	}

	public componentDidRender(): void {
		this.syncTooltipListeners();
	}

	public disconnectedCallback(): void {
		this.destroyTooltipBehavior();
	}

	// --- Public methods ---

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

	// --- Render ---

	public render(): JSX.Element {
		return <Host>{this.renderButtonFC()}</Host>;
	}

	// --- @State ---

	@State() public ariaDescriptionId: string = nonce();

	// --- Props + Watchers ---

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;
	@Watch('_accessKey')
	public watchAccessKey(value?: AccessKeyPropType): void {
		this.applyAccessKey(value, this._shortKey);
	}

	/**
	 * Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;
	@Watch('_ariaControls')
	public watchAriaControls(value?: string): void {
		this.applyAriaControls(value);
	}

	/**
	 * Defines the value for the aria-description attribute.
	 */
	@Prop() public _ariaDescription?: AriaDescriptionPropType;
	@Watch('_ariaDescription')
	public watchAriaDescription(value?: AriaDescriptionPropType): void {
		this.applyAriaDescription(value);
	}

	/**
	 * Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 * @TODO: Change type back to `AriaExpandedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _ariaExpanded?: boolean;
	@Watch('_ariaExpanded')
	public watchAriaExpanded(value?: boolean): void {
		this.applyAriaExpanded(value);
	}

	/**
	 * Defines whether the interactive element of the component is selected (e.g. role=tab). (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected)
	 * @TODO: Change type back to `AriaSelectedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _ariaSelected?: boolean;
	@Watch('_ariaSelected')
	public watchAriaSelected(value?: boolean): void {
		this.applyAriaSelected(value);
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
	 * Defines the icon classnames.
	 */
	@Prop() public _icons?: IconsPropType;
	@Watch('_icons')
	public watchIcons(value?: IconsPropType): void {
		this.applyIcons(value);
	}

	/**
	 * Defines whether the component is displayed as a standalone block or inline without enforcing a minimum size of 44px.
	 */
	@Prop() public _inline?: InlinePropType = true;
	@Watch('_inline')
	public watchInline(value?: InlinePropType): void {
		this.applyInline(value);
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
	 * Defines the technical name of an input field.
	 */
	@Prop() public _name?: NamePropType;
	@Watch('_name')
	public watchName(value?: NamePropType): void {
		this.applyName(value);
	}

	/**
	 * Gibt die EventCallback-Funktionen für die Button-Events an.
	 */
	@Prop() public _on?: ButtonCallbacksPropType<StencilUnknown>;
	@Watch('_on')
	public watchOn(value?: ButtonCallbacksPropType<StencilUnknown>): void {
		this.applyOn(value);
	}

	/**
	 * Defines the role of the components primary element.
	 *
	 * @deprecated We prefer the semantic role of the HTML element and do not allow for customization. We will remove this prop in the future.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;
	@Watch('_role')
	public watchRole(): void {
		// Deliberately not forwarded: the predecessor never handed `_role` to its inner element, so a
		// consumer-set role was never rendered. Keeping that behaviour is public API parity; the link
		// owner's decision to drop `_role` from the public surface has not been taken here yet.
	}

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;
	@Watch('_shortKey')
	public watchShortKey(value?: ShortKeyPropType): void {
		this.applyShortKey(value, this._accessKey);
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
	 * Defines either the type of the component or of the components interactive element.
	 */
	@Prop() public _type?: ButtonTypePropType = 'button';
	@Watch('_type')
	public watchType(value?: ButtonTypePropType): void {
		this.applyType(value);
	}

	/**
	 * Defines the value of the element.
	 */
	@Prop() public _value?: StencilUnknown;
	@Watch('_value')
	public watchValue(value?: StencilUnknown): void {
		this.applyValue(value);
	}

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: VariantClassNamePropType;
	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		this.applyVariant(value);
	}
}
