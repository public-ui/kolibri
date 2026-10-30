import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import type {
	AccessKeyPropType,
	AriaControlsPropType,
	AriaCurrentValuePropType,
	AriaDescriptionPropType,
	AriaExpandedPropType,
	DisabledPropType,
	DownloadPropType,
	FocusableElement,
	HideLabelPropType,
	HrefPropType,
	InlinePropType,
	KoliBriIconsProp,
	LabelWithExpertSlotPropType,
	LinkOnCallbacksPropType,
	LinkProps,
	LinkTargetPropType,
	ShortKeyPropType,
	Stringified,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { validateAccessAndShortKey } from '../../schema/validators/access-and-short-key';
import { nonce } from '../../utils/dev.utils';
import { delegateFocus } from '../../utils/element-interaction';
import { BaseLinkWebComponent } from './base';

/**
 * @slot expert - Custom label content, e.g. for rich text or icons. https://public-ui.github.io/docs/concepts/expert-slot
 */
@Component({
	tag: 'kol-link',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolLink extends BaseLinkWebComponent implements FocusableElement, LinkProps {
	@Element() protected readonly host?: HTMLKolLinkElement;

	@State() public ariaCurrent: string = '';

	@State() public ariaDescriptionId: string = nonce();

	@State() public expertSlot: boolean = false;

	/**
	 * Defines the key combination that can be used to trigger or focus the component's interactive element.
	 */
	@Prop() public _accessKey?: AccessKeyPropType = undefined;

	@Watch('_accessKey')
	public watchAccessKey(value?: AccessKeyPropType): void {
		this.applyAccessKey(value);
	}

	/**
	 * Defines the value for the aria-current attribute.
	 */
	@Prop() public _ariaCurrentValue?: AriaCurrentValuePropType = undefined;

	@Watch('_ariaCurrentValue')
	public watchAriaCurrentValue(value?: AriaCurrentValuePropType): void {
		this.applyAriaCurrentValue(value);
	}

	/**
	 * Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: AriaControlsPropType = undefined;

	@Watch('_ariaControls')
	public watchAriaControls(value?: AriaControlsPropType): void {
		this.applyAriaControls(value);
	}

	/**
	 * Defines the value for the aria-description attribute.
	 */
	@Prop() public _ariaDescription?: AriaDescriptionPropType = undefined;

	@Watch('_ariaDescription')
	public watchAriaDescription(value?: AriaDescriptionPropType): void {
		this.applyAriaDescription(value);
	}

	/**
	 * Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 */
	@Prop() public _ariaExpanded?: AriaExpandedPropType = undefined;

	@Watch('_ariaExpanded')
	public watchAriaExpanded(value?: AriaExpandedPropType): void {
		this.applyAriaExpanded(value);
	}

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: DisabledPropType = false;

	@Watch('_disabled')
	public watchDisabled(value?: DisabledPropType): void {
		this.applyDisabled(value);
	}

	/**
	 * Tells the browser that the link contains a file. Optionally sets the filename.
	 */
	@Prop() public _download?: DownloadPropType = undefined;

	@Watch('_download')
	public watchDownload(value?: DownloadPropType): void {
		this.applyDownload(value);
	}

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 */
	@Prop() public _hideLabel?: HideLabelPropType = false;

	@Watch('_hideLabel')
	public watchHideLabel(value?: HideLabelPropType): void {
		this.applyHideLabel(value);
	}

	/**
	 * Sets the target URI of the link or citation source.
	 */
	@Prop() public _href!: HrefPropType;

	@Watch('_href')
	public watchHref(value?: HrefPropType): void {
		this.applyHref(value);
	}

	/**
	 * Defines the icon classnames.
	 */
	@Prop() public _icons?: Stringified<KoliBriIconsProp> = undefined;

	@Watch('_icons')
	public watchIcons(value?: Stringified<KoliBriIconsProp>): void {
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
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `''` to enable the expert slot.
	 */
	@Prop() public _label?: LabelWithExpertSlotPropType = undefined;

	@Watch('_label')
	public watchLabel(value?: LabelWithExpertSlotPropType): void {
		this.applyLabel(value);
	}

	/**
	 * Defines the callback functions for links.
	 */
	@Prop() public _on?: LinkOnCallbacksPropType = undefined;

	@Watch('_on')
	public watchOn(value?: LinkOnCallbacksPropType): void {
		this.applyOn(value);
	}

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType = undefined;

	@Watch('_shortKey')
	public watchShortKey(value?: ShortKeyPropType): void {
		this.applyShortKey(value);
	}

	/**
	 * Defines where to open the link.
	 */
	@Prop() public _target?: LinkTargetPropType = undefined;

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
	@Prop() public _variant?: VariantClassNamePropType = undefined;

	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		this.applyVariant(value);
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	public focus(options?: FocusOptions): Promise<void> {
		void options;
		return Promise.resolve();
	}

	public componentWillLoad(): void {
		this.initLinkRenderProps();

		this.watchAccessKey(this._accessKey);
		this.watchAriaControls(this._ariaControls);
		this.watchAriaCurrentValue(this._ariaCurrentValue);
		this.watchAriaDescription(this._ariaDescription);
		this.watchAriaExpanded(this._ariaExpanded);
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

	public render(): JSX.Element {
		return <Host>{this.renderLinkFC()}</Host>;
	}
}
