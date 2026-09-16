import type { JSX } from '@stencil/core';
import { Component, Element, Method, Prop, State, Watch } from '@stencil/core';

import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { LinkApi } from '../../internal/functional-components/link/api';
import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaCurrentValuePropType,
	AriaDescriptionPropType,
	AriaOwnsPropType,
	ClickableElement,
	CustomClassPropType,
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
import { directClick, directFocus } from '../../utils/element-interaction';
import { BaseLinkWebComponent } from './base';

/**
 * Transitional `kol-link-wc` — a `shadow:false` wrapper that renders `LinkFC` directly into the light DOM.
 *
 * This exists because Legacy consumers (skip-nav, tree-item, nav, breadcrumb, etc.) render
 * `<kol-link-wc>` inside their own shadow DOM and rely on being able to reach the inner `.kol-link`
 * CSS classes from their stylesheets. A `shadow:true` element would encapsulate those classes
 * behind a shadow boundary, breaking consumer styling.
 *
 * When a consumer migrates to the Skeleton pattern, it renders `LinkFC` directly (see
 * `BaseLinkWebComponent`, as `kol-link-button` does) instead of instantiating this element. Once
 * all consumers have migrated, this component can be deleted.
 *
 * The orchestrator logic lives in `BaseLinkWebComponent`; the differences to `kol-link` are the
 * direct focus/click delegation (no shadow root) and the four internal props `_ariaOwns`,
 * `_customClass`, `_role` and `_tabIndex` plus `click()`, which legacy consumers set from inside
 * their own shadow DOM.
 *
 * @internal
 */
@Component({
	tag: 'kol-link-wc',
	shadow: false,
})
export class KolLinkWc extends BaseLinkWebComponent implements ClickableElement, FocusableElement, LinkProps, WebComponentInterface<LinkApi> {
	@Element() protected readonly host?: HTMLKolLinkWcElement;

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initLinkRenderProps();

		this.watchAccessKey(this._accessKey);
		this.watchAriaControls(this._ariaControls);
		this.watchAriaCurrentValue(this._ariaCurrentValue);
		this.watchAriaDescription(this._ariaDescription);
		this.watchAriaExpanded(this._ariaExpanded);
		this.watchAriaOwns(this._ariaOwns);
		this.watchCustomClass(this._customClass);
		this.watchDisabled(this._disabled);
		this.watchDownload(this._download);
		this.watchHideLabel(this._hideLabel);
		this.watchHref(this._href);
		this.watchIcons(this._icons);
		this.watchInline(this._inline);
		this.watchLabel(this._label);
		this.watchOn(this._on);
		this.watchRole(this._role);
		this.watchShortKey(this._shortKey);
		this.watchTabIndex(this._tabIndex);
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
	@directFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	@directClick('ctaRef')
	public async click(): Promise<void> {}

	// --- Render ---

	public render(): JSX.Element {
		return this.renderLinkFC();
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
	 * Marks this element as open/expanded, or that the connected element (aria-controls/aria-owns) is open/expanded.
	 * @TODO: Change type to `AriaExpandedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _ariaExpanded?: boolean;
	@Watch('_ariaExpanded')
	public watchAriaExpanded(value?: boolean): void {
		this.applyAriaExpanded(value);
	}

	/**
	 * Defines the contextual relationship between a parent and its child elements.
	 */
	@Prop() public _ariaOwns?: AriaOwnsPropType;
	@Watch('_ariaOwns')
	public watchAriaOwns(value?: AriaOwnsPropType): void {
		this.applyAriaOwns(value);
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
	 * Defines the role of the components primary element.
	 */
	@Prop() public _role?: AlternativeButtonLinkRolePropType;
	@Watch('_role')
	public watchRole(value?: AlternativeButtonLinkRolePropType): void {
		this.applyRole(value);
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
	 * Defines which tab-index the primary element of the component has. (https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/tabindex)
	 */
	@Prop() public _tabIndex?: number;
	@Watch('_tabIndex')
	public watchTabIndex(value?: number): void {
		this.applyTabIndex(value);
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
	 * Defines which button variant should be used for presentation.
	 * @internal
	 */
	@Prop() public _variant?: VariantClassNamePropType;
	@Watch('_variant')
	public watchVariant(value?: VariantClassNamePropType): void {
		this.applyVariant(value);
	}
}
