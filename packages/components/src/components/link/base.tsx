import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
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
	ariaOwnsProp,
	customClassProp,
	disabledProp,
	downloadProp,
	hideLabelProp,
	hrefProp,
	inlineProp,
	labelWithExpertSlotProp,
	linkCallbacksProp,
	linkRoleProp,
	linkTargetProp,
	shortKeyProp,
	spanIconsProp,
	tabIndexProp,
	tooltipAlignProp,
	variantProp,
} from '../../internal/props';
import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaCurrentValuePropType,
	AriaDescriptionPropType,
	AriaOwnsPropType,
	CustomClassPropType,
	DownloadPropType,
	HrefPropType,
	InlinePropType,
	KoliBriIconsProp,
	LabelWithExpertSlotPropType,
	LinkOnCallbacksPropType,
	LinkTargetPropType,
	ShortKeyPropType,
	Stringified,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { setEventTarget } from '../../schema';
import { createCtaRef } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import type { UnsubscribeFunction } from './ariaCurrentService';
import { onLocationChange } from './ariaCurrentService';

/**
 * Shared orchestrator implementation for every custom element that renders `LinkFC`:
 * `kol-link`, the transitional `kol-link-wc` and `kol-link-button`.
 *
 * The class carries everything that does not need a Stencil decorator — the composed
 * `TooltipBehavior`, the `aria-current` location subscription, the anchor click handler, one
 * `apply*` method per prop and the `LinkFC` render call. The concrete element keeps what Stencil
 * has to see in the component class itself: `@Component`, `@Element`, `@State`, `@Method`, every
 * `@Prop` with its `@Watch` (whose body is a one-line call into the matching `apply*` method) and
 * the lifecycle methods, which delegate here (ARC42 § 9, design decision 16).
 *
 * This is not a layer between the web component and the functional component — it *is* the web
 * component's implementation, shared between the tag variants of one FC.
 */
export abstract class BaseLinkWebComponent extends BaseWebComponent<LinkApi> {
	/** The custom element; declared with `@Element()` by the concrete class. */
	protected abstract readonly host?: HTMLElement;

	protected readonly ctaRef = createCtaRef<HTMLAnchorElement>();

	// --- Composed behaviors ---

	protected readonly tooltipBehavior = new TooltipBehavior(this.stateAccess);
	private unsubscribeOnLocationChange?: UnsubscribeFunction;

	// --- Lifecycle helpers (called from the concrete element's lifecycle methods) ---

	/**
	 * Seeds the render props. Call first in `componentWillLoad`, before the prop watchers run.
	 */
	protected initLinkRenderProps(): void {
		this.initRenderProps(linkPropsConfig);
		// An unset tabindex must not render as `tabindex="0"` — links are natively tabbable and
		// the attribute would trigger focus outlines that the predecessor did not draw.
		this.unsetRenderProp('tabIndex');
	}

	/**
	 * Subscribes to location changes and hands the resolved label and alignment to the tooltip
	 * behavior. Call last in `componentWillLoad`, after every prop watcher has run.
	 */
	protected initLinkBehaviors(): void {
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

	/** Call from `componentDidRender`. */
	protected syncTooltipListeners(): void {
		if (this.ctaRef.el) {
			this.tooltipBehavior.syncListeners(undefined, this.ctaRef.el, true);
		}
	}

	/** Call from `disconnectedCallback`. */
	protected destroyLinkBehaviors(): void {
		if (this.unsubscribeOnLocationChange) {
			this.unsubscribeOnLocationChange();
			this.unsubscribeOnLocationChange = undefined;
		}
		this.tooltipBehavior.destroy();
	}

	// --- Click handling ---

	protected readonly handleAnchorClick = (event: Event): void => {
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

	// --- Prop application (one per prop; the concrete element's watchers delegate here) ---

	protected applyAccessKey(value?: AccessKeyPropType): void {
		accessKeyProp.apply(value, (v) => this.setRenderProp('accessKey', v));
	}

	protected applyAriaControls(value?: string): void {
		ariaControlsProp.apply(value, (v) => this.setRenderProp('ariaControls', v));
	}

	protected applyAriaCurrentValue(value?: AriaCurrentValuePropType): void {
		ariaCurrentValueProp.apply(value, (v) => this.setRenderProp('ariaCurrentValue', v));
	}

	protected applyAriaDescription(value?: AriaDescriptionPropType): void {
		ariaDescriptionProp.apply(value, (v) => this.setRenderProp('ariaDescription', v));
	}

	protected applyAriaExpanded(value?: boolean): void {
		ariaExpandedProp.apply(value, (v) => this.setRenderProp('ariaExpanded', v));
	}

	protected applyAriaOwns(value?: AriaOwnsPropType): void {
		ariaOwnsProp.apply(value, (v) => this.setRenderProp('ariaOwns', v));
	}

	protected applyCustomClass(value?: CustomClassPropType): void {
		customClassProp.apply(value, (v) => this.setRenderProp('customClass', v));
	}

	protected applyDisabled(value?: boolean): void {
		disabledProp.apply(value, (v) => this.setRenderProp('disabled', v));
	}

	protected applyDownload(value?: DownloadPropType): void {
		downloadProp.apply(value, (v) => this.setRenderProp('download', v));
	}

	protected applyHideLabel(value?: boolean): void {
		hideLabelProp.apply(value, (v) => this.setRenderProp('hideLabel', v));
	}

	protected applyHref(value?: HrefPropType): void {
		hrefProp.apply(value, (v) => this.setRenderProp('href', v));
	}

	protected applyIcons(value?: Stringified<KoliBriIconsProp>): void {
		spanIconsProp.apply(value, (v) => this.setRenderProp('icons', v));
	}

	protected applyInline(value?: InlinePropType): void {
		inlineProp.apply(value, (v) => this.setRenderProp('inline', v));
	}

	protected applyLabel(value?: LabelWithExpertSlotPropType): void {
		labelWithExpertSlotProp.apply(value, (v) => {
			this.setRenderProp('label', v);
			this.setState('expertSlot', value === '');
			this.tooltipBehavior.watchLabel(this.getTooltipLabel());
		});
	}

	protected applyOn(value?: LinkOnCallbacksPropType): void {
		linkCallbacksProp.apply(value, (v) => this.setRenderProp('on', v));
	}

	protected applyRole(value?: AlternativeButtonLinkRolePropType): void {
		linkRoleProp.apply(value, (v) => this.setRenderProp('role', v));
	}

	protected applyShortKey(value?: ShortKeyPropType): void {
		shortKeyProp.apply(value, (v) => this.setRenderProp('shortKey', v));
	}

	protected applyTabIndex(value?: number): void {
		// The props config seeds `tabIndex` with its default `0`, but an unset tabindex must not
		// render as `tabindex="0"`. Unsetting the prop has to restore that state, so the else branch
		// is not optional: without it a reset would keep the previous number.
		if (typeof value === 'number') {
			tabIndexProp.apply(value, (v) => this.setRenderProp('tabIndex', v));
		} else {
			this.unsetRenderProp('tabIndex');
		}
	}

	protected applyTarget(value?: LinkTargetPropType): void {
		linkTargetProp.apply(value, (v) => this.setRenderProp('target', v));
	}

	protected applyTooltipAlign(value?: TooltipAlignPropType): void {
		tooltipAlignProp.apply(value, (v) => {
			this.setRenderProp('tooltipAlign', v);
			this.tooltipBehavior.watchAlign(v);
		});
	}

	protected applyVariant(value?: VariantClassNamePropType): void {
		variantProp.apply(value, (v) => this.setRenderProp('variant', v));
	}

	// --- Refs ---

	private readonly setAnchorRef = (el?: HTMLAnchorElement): void => {
		this.ctaRef(el);
	};

	// --- Render ---

	/** Renders `LinkFC` from the current render props and state. */
	protected renderLinkFC(): JSX.Element {
		return (
			<LinkFC
				accessKey={this.getRenderProp('accessKey')}
				ariaControls={this.getRenderProp('ariaControls')}
				ariaCurrent={this.getState('ariaCurrent')}
				ariaCurrentValue={this.getRenderProp('ariaCurrentValue')}
				ariaDescription={this.getRenderProp('ariaDescription')}
				ariaDescriptionId={this.getState('ariaDescriptionId')}
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
				expertSlot={this.getState('expertSlot')}
			/>
		);
	}
}
