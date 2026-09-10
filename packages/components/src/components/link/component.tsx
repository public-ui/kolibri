import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { LinkApi } from '../../internal/functional-components/link/api';
import type {
	AccessKeyPropType,
	AriaCurrentValuePropType,
	AriaDescriptionPropType,
	DownloadPropType,
	FocusableElement,
	HrefPropType,
	InlinePropType,
	KolFocusOptions,
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
export class KolLink extends BaseLinkWebComponent implements FocusableElement, LinkProps, WebComponentInterface<LinkApi> {
	@Element() protected readonly host?: HTMLKolLinkElement;

	// --- Lifecycle ---

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

	// --- Public methods ---

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

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
	 * Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 * @TODO: Change type back to `AriaExpandedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _ariaExpanded?: boolean;
	@Watch('_ariaExpanded')
	public watchAriaExpanded(value?: boolean): void {
		this.applyAriaExpanded(value);
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
	@Prop() public _icons?: Stringified<KoliBriIconsProp>;
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
	@Prop() public _variant?: VariantClassNamePropType;
	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		this.applyVariant(value);
	}
}
