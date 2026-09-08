import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { LinkApi } from '../../internal/functional-components/link/api';
import { linkPropsConfig } from '../../internal/functional-components/link/api';
import { LinkFC } from '../../internal/functional-components/link/component';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import {
	accessKeyProp,
	ariaControlsProp,
	ariaCurrentValueProp,
	ariaDescriptionProp,
	ariaExpandedProp,
	disabledProp,
	downloadProp,
	hideLabelProp,
	hrefProp,
	inlineProp,
	labelWithExpertSlotProp,
	linkCallbacksProp,
	linkTargetProp,
	shortKeyProp,
	spanIconsProp,
	tooltipAlignProp,
	variantProp,
} from '../../internal/props';
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
import { setEventTarget } from '../../schema';
import { validateAccessAndShortKey } from '../../schema/validators/access-and-short-key';
import { nonce } from '../../utils/dev.utils';
import { createCtaRef, delegateFocus } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import type { UnsubscribeFunction } from './ariaCurrentService';
import { onLocationChange } from './ariaCurrentService';

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
export class KolLink extends BaseWebComponent<LinkApi> implements FocusableElement, LinkProps, WebComponentInterface<LinkApi> {
	@Element() protected readonly host?: HTMLKolLinkElement;

	protected readonly ctaRef = createCtaRef<HTMLAnchorElement>();

	// --- Composed behaviors ---

	private readonly tooltipBehavior = new TooltipBehavior(this.stateAccess);
	private unsubscribeOnLocationChange?: UnsubscribeFunction;

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(linkPropsConfig);
		// The props config seeds `tabIndex` with its default `0`. An unset tabindex must not
		// render as `tabindex="0"` — links are natively tabbable and the attribute would trigger
		// focus outlines that the predecessor did not draw.
		this.setRenderProp('tabIndex', undefined as unknown as number);

		accessKeyProp.apply(this._accessKey, (v) => this.setRenderProp('accessKey', v));
		ariaControlsProp.apply(this._ariaControls, (v) => this.setRenderProp('ariaControls', v));
		ariaCurrentValueProp.apply(this._ariaCurrentValue, (v) => this.setRenderProp('ariaCurrentValue', v));
		ariaDescriptionProp.apply(this._ariaDescription, (v) => this.setRenderProp('ariaDescription', v));
		ariaExpandedProp.apply(this._ariaExpanded, (v) => this.setRenderProp('ariaExpanded', v));
		disabledProp.apply(this._disabled, (v) => this.setRenderProp('disabled', v));
		downloadProp.apply(this._download, (v) => this.setRenderProp('download', v));
		hideLabelProp.apply(this._hideLabel, (v) => this.setRenderProp('hideLabel', v));
		hrefProp.apply(this._href, (v) => this.setRenderProp('href', v));
		spanIconsProp.apply(this._icons, (v) => this.setRenderProp('icons', v));
		inlineProp.apply(this._inline, (v) => this.setRenderProp('inline', v));
		this.applyLabel(this._label);
		linkCallbacksProp.apply(this._on, (v) => this.setRenderProp('on', v));
		shortKeyProp.apply(this._shortKey, (v) => this.setRenderProp('shortKey', v));
		linkTargetProp.apply(this._target, (v) => this.setRenderProp('target', v));
		this.applyTooltipAlign(this._tooltipAlign);
		variantProp.apply(this._variant, (v) => this.setRenderProp('variant', v));

		validateAccessAndShortKey(this._accessKey, this._shortKey);

		this.unsubscribeOnLocationChange = onLocationChange((location) => {
			const href = this.getRenderProp('href');
			const ariaCurrentValue = this.getRenderProp('ariaCurrentValue');
			const newValue = location === href ? ariaCurrentValue : '';
			if (this.getState('ariaCurrent') !== newValue) {
				this.setState('ariaCurrent', newValue);
			}
		});

		this.tooltipBehavior.componentWillLoad({
			label: this.getTooltipLabel(),
			align: this.getRenderProp('tooltipAlign'),
		});
	}

	public componentDidRender(): void {
		if (this.ctaRef.el) {
			this.tooltipBehavior.syncListeners(undefined, this.ctaRef.el, true);
		}
	}

	public disconnectedCallback(): void {
		if (this.unsubscribeOnLocationChange) {
			this.unsubscribeOnLocationChange();
			this.unsubscribeOnLocationChange = undefined;
		}
		this.tooltipBehavior.destroy();
	}

	// --- Click handling ---

	private readonly handleAnchorClick = (event: Event): void => {
		this.tooltipBehavior.hideTooltip();
		const disabled = this.getRenderProp('disabled');
		if (disabled === true) {
			event.preventDefault();
			return;
		}
		const href = this.getRenderProp('href');
		const on = this.getRenderProp('on');
		if (typeof on?.onClick === 'function') {
			setEventTarget(event, this.ctaRef.el);
			on.onClick(event, href);
		}
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.click, href);
		}
	};

	// --- Tooltip helpers ---

	private getTooltipLabel(): string {
		const label = this.getRenderProp('label');
		if (typeof label === 'string' && label.length > 0) {
			return label;
		}
		const href = this.getRenderProp('href');
		return typeof href === 'string' ? href : '';
	}

	private applyLabel(value?: string): void {
		labelWithExpertSlotProp.apply(value, (v) => {
			this.setRenderProp('label', v);
			this.setState('expertSlot', value === '');
			this.tooltipBehavior.watchLabel(this.getTooltipLabel());
		});
	}

	private applyTooltipAlign(value?: string): void {
		tooltipAlignProp.apply(value, (v) => {
			this.setRenderProp('tooltipAlign', v);
			this.tooltipBehavior.watchAlign(v);
		});
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

	// --- Refs ---

	private readonly setAnchorRef = (el?: HTMLAnchorElement): void => {
		this.ctaRef(el);
	};

	// --- Render ---

	public render(): JSX.Element {
		return (
			<Host>
				<LinkFC
					accessKey={this.getRenderProp('accessKey')}
					ariaControls={this.getRenderProp('ariaControls')}
					ariaCurrent={this.ariaCurrent}
					ariaCurrentValue={this.getRenderProp('ariaCurrentValue')}
					ariaDescription={this.getRenderProp('ariaDescription')}
					ariaDescriptionId={this.ariaDescriptionId}
					ariaExpanded={this.getRenderProp('ariaExpanded')}
					ariaOwns={this.getRenderProp('ariaOwns')}
					customClass={this.getRenderProp('customClass')}
					disabled={this.getRenderProp('disabled')}
					download={this.getRenderProp('download')}
					handleAnchorClick={this.handleAnchorClick}
					hideLabel={this.getRenderProp('hideLabel')}
					href={this.getRenderProp('href')}
					icons={this.getRenderProp('icons')}
					inline={this.getRenderProp('inline')}
					label={this.getRenderProp('label')}
					on={this.getRenderProp('on')}
					refAnchor={this.setAnchorRef}
					refTooltip={this.tooltipBehavior.setTooltipElementRef}
					role={this.getRenderProp('role')}
					shortKey={this.getRenderProp('shortKey')}
					tabIndex={this.getRenderProp('tabIndex')}
					target={this.getRenderProp('target')}
					tooltipAlign={this.getRenderProp('tooltipAlign')}
					variant={this.getRenderProp('variant')}
					expertSlot={this.expertSlot}
				/>
			</Host>
		);
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
		accessKeyProp.apply(value, (v) => this.setRenderProp('accessKey', v));
	}

	/**
	 * Defines the value for the aria-current attribute.
	 */
	@Prop() public _ariaCurrentValue?: AriaCurrentValuePropType;
	@Watch('_ariaCurrentValue')
	public watchAriaCurrentValue(value?: AriaCurrentValuePropType): void {
		ariaCurrentValueProp.apply(value, (v) => this.setRenderProp('ariaCurrentValue', v));
	}

	/**
	 * Defines which elements are controlled by this component. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-controls)
	 */
	@Prop() public _ariaControls?: string;
	@Watch('_ariaControls')
	public watchAriaControls(value?: string): void {
		ariaControlsProp.apply(value, (v) => this.setRenderProp('ariaControls', v));
	}

	/**
	 * Defines the value for the aria-description attribute.
	 */
	@Prop() public _ariaDescription?: AriaDescriptionPropType;
	@Watch('_ariaDescription')
	public watchAriaDescription(value?: AriaDescriptionPropType): void {
		ariaDescriptionProp.apply(value, (v) => this.setRenderProp('ariaDescription', v));
	}

	/**
	 * Defines whether the interactive element of the component expanded something. (https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded)
	 * @TODO: Change type back to `AriaExpandedPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _ariaExpanded?: boolean;
	@Watch('_ariaExpanded')
	public watchAriaExpanded(value?: boolean): void {
		ariaExpandedProp.apply(value, (v) => this.setRenderProp('ariaExpanded', v));
	}

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;
	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		disabledProp.apply(value, (v) => this.setRenderProp('disabled', v));
	}

	/**
	 * Tells the browser that the link contains a file. Optionally sets the filename.
	 */
	@Prop() public _download?: DownloadPropType;
	@Watch('_download')
	public watchDownload(value?: DownloadPropType): void {
		downloadProp.apply(value, (v) => this.setRenderProp('download', v));
	}

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;
	@Watch('_hideLabel')
	public watchHideLabel(value?: boolean): void {
		hideLabelProp.apply(value, (v) => this.setRenderProp('hideLabel', v));
	}

	/**
	 * Sets the target URI of the link or citation source.
	 */
	@Prop() public _href!: HrefPropType;
	@Watch('_href')
	public watchHref(value?: HrefPropType): void {
		hrefProp.apply(value, (v) => this.setRenderProp('href', v));
	}

	/**
	 * Defines the icon classnames.
	 */
	@Prop() public _icons?: Stringified<KoliBriIconsProp>;
	@Watch('_icons')
	public watchIcons(value?: Stringified<KoliBriIconsProp>): void {
		spanIconsProp.apply(value, (v) => this.setRenderProp('icons', v));
	}

	/**
	 * Defines whether the component is displayed as a standalone block or inline without enforcing a minimum size of 44px.
	 */
	@Prop() public _inline?: InlinePropType = true;
	@Watch('_inline')
	public watchInline(value?: InlinePropType): void {
		inlineProp.apply(value, (v) => this.setRenderProp('inline', v));
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
		linkCallbacksProp.apply(value, (v) => this.setRenderProp('on', v));
	}

	/**
	 * Adds a visual shortcut hint after the label and instructs the screen reader to read the shortcut aloud.
	 */
	@Prop() public _shortKey?: ShortKeyPropType;
	@Watch('_shortKey')
	public watchShortKey(value?: ShortKeyPropType): void {
		shortKeyProp.apply(value, (v) => this.setRenderProp('shortKey', v));
	}

	/**
	 * Defines where to open the link.
	 */
	@Prop() public _target?: LinkTargetPropType;
	@Watch('_target')
	public watchTarget(value?: LinkTargetPropType): void {
		linkTargetProp.apply(value, (v) => this.setRenderProp('target', v));
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
		variantProp.apply(value, (v) => this.setRenderProp('variant', v));
	}
}
