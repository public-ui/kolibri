import { h, type VNode } from '@stencil/core';

import type { TooltipAlignPropType } from '../../../schema';
import { BaseWebComponent } from '../base-web-component';
import { TooltipFC } from './component';
import { TooltipController } from './controller';

export type TooltipDecoratorOptions = {
	/**
	 * Lazily returns the element the tooltip is anchored to (the trigger),
	 * e.g. `() => this.ctaRef.el`.
	 */
	getTrigger: () => HTMLElement | undefined;
	/**
	 * Component-specific CSS class for the element wrapping the tooltip
	 * (e.g. `kol-button__tooltip`). When omitted, the tooltip is rendered
	 * without a wrapping element.
	 */
	wrapperClass?: string;
};

export type RenderTooltipProps = {
	label?: string;
	badgeText?: string;
	/** Whether the tooltip should currently be rendered (e.g. `hideLabel && hasLabel`). */
	visible: boolean;
};

/**
 * Reusable tooltip integration for web components.
 *
 * Encapsulates the {@link TooltipController} lifecycle (initialization, event
 * listener synchronization, teardown) and the tooltip rendering, so a component
 * only needs to compose it instead of re-implementing the wiring in every
 * component (see issue #9938).
 *
 * @example
 * ```tsx
 * private readonly tooltip = new TooltipDecorator({
 *   getTrigger: () => this.ctaRef.el,
 *   wrapperClass: 'kol-button__tooltip',
 * });
 * // ...
 * public componentWillLoad(): void {
 *   this.tooltip.componentWillLoad({ label, align: this._tooltipAlign });
 * }
 * public componentDidRender(): void {
 *   this.tooltip.componentDidRender();
 * }
 * public disconnectedCallback(): void {
 *   this.tooltip.disconnectedCallback();
 * }
 * ```
 */
export class TooltipDecorator {
	private readonly controller = new TooltipController(BaseWebComponent.stateLess);
	private lastTrigger?: HTMLElement;

	public constructor(private readonly options: TooltipDecoratorOptions) {}

	/** Initializes the tooltip controller. Call from the component's `componentWillLoad`. */
	public componentWillLoad(props: { label?: string; align?: TooltipAlignPropType }): void {
		this.controller.componentWillLoad({
			label: props.label ?? '',
			align: props.align,
		});
	}

	/**
	 * Synchronizes the event listeners with the current trigger element. Call from
	 * the component's `componentDidRender`. When the anchored element changes (or is
	 * removed), listeners are detached from the previous trigger first, so the
	 * decorator stays leak-safe even if the trigger is swapped over time.
	 */
	public componentDidRender(): void {
		const trigger = this.options.getTrigger();
		if (trigger === this.lastTrigger) {
			return;
		}
		this.controller.syncListeners(this.lastTrigger, trigger, true);
		this.lastTrigger = trigger;
	}

	/** Tears down listeners and timers. Call from the component's `disconnectedCallback`. */
	public disconnectedCallback(): void {
		this.controller.destroy();
		this.lastTrigger = undefined;
	}

	/** Forwards the `_label` watcher to the tooltip controller. */
	public watchLabel(value?: string): void {
		this.controller.watchLabel(value);
	}

	/** Forwards the `_tooltipAlign` watcher to the tooltip controller. */
	public watchAlign(value?: TooltipAlignPropType): void {
		this.controller.watchAlign(value);
	}

	/** Hides the tooltip immediately, e.g. on click. */
	public hide(): void {
		this.controller.hideTooltip();
	}

	/**
	 * Renders the tooltip, or `null` when it should not be shown. Visibility is the
	 * caller's responsibility (it is component-specific), so this is the single
	 * source of truth and does not add any further conditions of its own.
	 */
	public render({ label, badgeText, visible }: RenderTooltipProps): VNode | null {
		if (!visible) {
			return null;
		}

		const tooltip = (
			<TooltipFC label={label ?? ''} badgeText={badgeText ?? ''} id={this.controller.getRenderProp('id')} refFloating={this.controller.setTooltipElementRef} />
		);

		return this.options.wrapperClass ? <div class={this.options.wrapperClass}>{tooltip}</div> : tooltip;
	}
}
