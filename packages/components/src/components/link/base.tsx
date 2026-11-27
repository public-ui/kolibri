import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { PropsConfigShape } from '../../internal/functional-components/generic-types';
import type { LinkApi } from '../../internal/functional-components/link/api';
import { linkPropsConfig } from '../../internal/functional-components/link/api';
import type { UnsubscribeFunction } from '../../internal/functional-components/link/aria-current-service';
import { onLocationChange } from '../../internal/functional-components/link/aria-current-service';
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
	AriaControlsPropType,
	AriaCurrentValuePropType,
	AriaDescriptionPropType,
	AriaOwnsPropType,
	CustomClassPropType,
	DisabledPropType,
	DownloadPropType,
	HideLabelPropType,
	HrefPropType,
	InlinePropType,
	KoliBriIconsProp,
	LabelWithExpertSlotPropType,
	LinkOnCallbacksPropType,
	LinkTargetPropType,
	ShortKeyPropType,
	Stringified,
	TabIndexPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { setEventTarget } from '../../schema';
import { createCtaRef } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

/**
 * Shared orchestrator implementation for every custom element that renders `LinkFC`:
 * `kol-link` and `kol-link-button`.
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

	/* An `<a>` carries no native `disabled`, so a disabled link stays focusable. Emptying the ref
	   keeps the public `focus()` and `click()` methods from reaching it. */
	protected readonly ctaRef = createCtaRef<HTMLAnchorElement>(() => this.getRenderProp('disabled') === true);

	// --- Composed behaviors ---

	protected readonly tooltipBehavior = new TooltipBehavior(this.stateAccess);
	private unsubscribeOnLocationChange?: UnsubscribeFunction;

	protected readonly propsConfig: PropsConfigShape = linkPropsConfig;

	// --- Lifecycle helpers (called from the concrete element's lifecycle methods) ---

	/**
	 * Marks `tabIndex` as unset. Call first in `componentWillLoad`, before the prop watchers run.
	 */
	protected unsetLinkTabIndex(): void {
		// An unset tabindex must not render as `tabindex="0"`: links are natively tabbable and the
		// attribute would trigger additional focus outlines. The first
		// render-prop access seeds the store, so this unset runs against seeded defaults.
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
		this.applyProp(accessKeyProp, value);
	}

	protected applyAriaControls(value?: AriaControlsPropType): void {
		this.applyProp(ariaControlsProp, value);
	}

	protected applyAriaCurrentValue(value?: AriaCurrentValuePropType): void {
		this.applyProp(ariaCurrentValueProp, value);
	}

	protected applyAriaDescription(value?: AriaDescriptionPropType): void {
		this.applyProp(ariaDescriptionProp, value);
	}

	protected applyAriaExpanded(value?: boolean): void {
		this.applyProp(ariaExpandedProp, value);
	}

	protected applyAriaOwns(value?: AriaOwnsPropType): void {
		this.applyProp(ariaOwnsProp, value);
	}

	protected applyCustomClass(value?: CustomClassPropType): void {
		this.applyProp(customClassProp, value);
	}

	protected applyDisabled(value?: DisabledPropType): void {
		this.applyProp(disabledProp, value);
	}

	protected applyDownload(value?: DownloadPropType): void {
		this.applyProp(downloadProp, value);
	}

	protected applyHideLabel(value?: HideLabelPropType): void {
		this.applyProp(hideLabelProp, value);
	}

	protected applyHref(value?: HrefPropType): void {
		this.applyProp(hrefProp, value);
	}

	protected applyIcons(value?: Stringified<KoliBriIconsProp>): void {
		this.applyProp(spanIconsProp, value);
	}

	protected applyInline(value?: InlinePropType): void {
		this.applyProp(inlineProp, value);
	}

	protected applyLabel(value?: LabelWithExpertSlotPropType): void {
		this.applyProp(labelWithExpertSlotProp, value, (v) => {
			this.setRenderProp('label', v);
			this.setState('expertSlot', value === '');
			this.tooltipBehavior.watchLabel(this.getTooltipLabel());
		});
	}

	protected applyOn(value?: LinkOnCallbacksPropType): void {
		this.applyProp(linkCallbacksProp, value);
	}

	protected applyRole(value?: AlternativeButtonLinkRolePropType): void {
		this.applyProp(linkRoleProp, value);
	}

	protected applyShortKey(value?: ShortKeyPropType): void {
		this.applyProp(shortKeyProp, value);
	}

	protected applyTabIndex(value?: TabIndexPropType): void {
		// The props config seeds `tabIndex` with its default `0`, but an unset tabindex must not
		// render as `tabindex="0"`. Unsetting the prop has to restore that state, so the else branch
		// is not optional: without it a reset would keep the previous number.
		if (typeof value === 'number') {
			this.applyProp(tabIndexProp, value);
		} else {
			this.unsetRenderProp('tabIndex');
		}
	}

	protected applyTarget(value?: LinkTargetPropType): void {
		this.applyProp(linkTargetProp, value);
	}

	protected applyTooltipAlign(value?: TooltipAlignPropType): void {
		this.applyProp(tooltipAlignProp, value, (v) => {
			this.setRenderProp('tooltipAlign', v);
			this.tooltipBehavior.watchAlign(v);
		});
	}

	protected applyVariant(value?: VariantClassNamePropType): void {
		this.applyProp(variantProp, value);
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
