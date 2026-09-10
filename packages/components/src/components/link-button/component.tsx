import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { getFeatureFlag } from 'adopted-style-sheets';

import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { LinkApi } from '../../internal/functional-components/link/api';
import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaCurrentValuePropType,
	AriaDescriptionPropType,
	ClickableElement,
	CustomClassPropType,
	DownloadPropType,
	FocusableElement,
	HrefPropType,
	IconsPropType,
	InlinePropType,
	KolFocusOptions,
	LabelWithExpertSlotPropType,
	LinkButtonProps,
	LinkOnCallbacksPropType,
	LinkTargetPropType,
	ShortKeyPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { validateAccessAndShortKey } from '../../schema/validators/access-and-short-key';
import { nonce } from '../../utils/dev.utils';
import { delegateClick, delegateFocus } from '../../utils/element-interaction';
import { BaseLinkWebComponent } from '../link/base';

/**
 * The **LinkButton** component is semantically a link but has the appearance of a button. All relevant properties of the Link component are adopted and extended with the design-defining properties of a button.
 *
 * @slot expert - Custom label content, e.g. for rich text or icons.
 */
@Component({
	tag: 'kol-link-button',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolLinkButton extends BaseLinkWebComponent implements ClickableElement, FocusableElement, LinkButtonProps, WebComponentInterface<LinkApi> {
	@Element() protected readonly host?: HTMLKolLinkButtonElement;

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initLinkRenderProps();

		this.watchAccessKey(this._accessKey);
		this.watchAriaCurrentValue(this._ariaCurrentValue);
		this.watchAriaControls(this._ariaControls);
		this.watchAriaDescription(this._ariaDescription);
		this.watchCustomClass(this._customClass);
		this.watchDisabled(this._disabled);
		this.watchDownload(this._download);
		this.watchHideLabel(this._hideLabel);
		this.watchHref(this._href);
		this.watchIcons(this._icons);
		this.watchInline(this._inline);
		this.watchLabel(this._label);
		this.watchOn(this._on);
		this.watchShortKey(this._shortKey);
		this.watchTarget(this._target);
		this.watchTooltipAlign(this._tooltipAlign);
		this.watchVariant(this._variant);

		validateAccessAndShortKey(this._accessKey, this._shortKey);

		this.initLinkBehaviors();
	}

	public componentDidRender(): void {
		this.syncTooltipListeners();
	}

	public disconnectedCallback(): void {
		this.destroyLinkBehaviors();
	}

	// --- Public methods ---

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
		return <Host>{this.renderLinkFC()}</Host>;
	}

	// --- @State ---

	@State() public ariaCurrent: string = '';

	@State() public ariaDescriptionId: string = nonce();

	@State() public expertSlot: boolean = false;

	// --- Props + Watchers ---

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;
	@Watch('_accessKey')
	public watchAccessKey(value?: AccessKeyPropType): void {
		this.applyAccessKey(value);
	}

	/**
	 * Defines the value for the aria-current attribute.
	 */
	@Prop() public _ariaCurrentValue?: AriaCurrentValuePropType;
	@Watch('_ariaCurrentValue')
	public watchAriaCurrentValue(value?: AriaCurrentValuePropType): void {
		this.applyAriaCurrentValue(value);
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
	 * Defines the custom class attribute if _variant="custom" is set.
	 */
	@Prop() public _customClass?: CustomClassPropType;
	@Watch('_customClass')
	public watchCustomClass(value?: CustomClassPropType): void {
		this.applyCustomClass(value);
	}

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;
	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		this.applyDisabled(value);
	}

	/**
	 * Tells the browser that the link contains a file. Optionally sets the filename.
	 */
	@Prop() public _download?: DownloadPropType;
	@Watch('_download')
	public watchDownload(value?: DownloadPropType): void {
		this.applyDownload(value);
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
	 * Defines the target URI of the link.
	 */
	@Prop() public _href!: HrefPropType;
	@Watch('_href')
	public watchHref(value?: HrefPropType): void {
		this.applyHref(value);
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
	@Prop() public _inline?: InlinePropType = false;
	@Watch('_inline')
	public watchInline(value?: InlinePropType): void {
		this.applyInline(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label?: LabelWithExpertSlotPropType;
	@Watch('_label')
	public watchLabel(value?: LabelWithExpertSlotPropType): void {
		this.applyLabel(value);
	}

	/**
	 * Defines the callback functions for links.
	 */
	@Prop() public _on?: LinkOnCallbacksPropType;
	@Watch('_on')
	public watchOn(value?: LinkOnCallbacksPropType): void {
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
		this.applyShortKey(value);
	}

	/**
	 * Defines where to open the link.
	 */
	@Prop() public _target?: LinkTargetPropType;
	@Watch('_target')
	public watchTarget(value?: LinkTargetPropType): void {
		this.applyTarget(value);
	}

	/**
	 * Defines where to show the Tooltip preferably: top, right, bottom or left.
	 */
	@Prop() public _tooltipAlign?: TooltipAlignPropType = 'right';
	@Watch('_tooltipAlign')
	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		this.applyTooltipAlign(value);
	}

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: VariantClassNamePropType = getFeatureFlag('buttonVariantDefault', this.host) ?? 'normal';
	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		this.applyVariant(value);
	}
}
