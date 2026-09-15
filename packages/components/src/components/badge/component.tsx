import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import type { BadgeApi } from '../../internal/functional-components/badge/api';
import { badgePropsConfig } from '../../internal/functional-components/badge/api';
import { BadgeFC } from '../../internal/functional-components/badge/component';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { ResolvedButtonProps } from '../../internal/functional-components/button/resolve-props';
import { resolveButtonProps } from '../../internal/functional-components/button/resolve-props';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import { colorProp, labelWithExpertSlotProp, smartButtonProp, spanIconsProp } from '../../internal/props';
import type { BadgeProps, FocusableElement, InternalButtonProps, KolFocusOptions, KoliBriIconsProp, LabelPropType, PropColor, Stringified } from '../../schema';
import { featureHint, objectObjectHandler, setEventTarget } from '../../schema';
import { createUniqueId, nonce } from '../../utils/dev.utils';
import { createCtaRef, delegateFocus } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

featureHint(`[KolBadge] Optimierung des _color-Properties (rgba, rgb, hex usw.).`);

/**
 * The **Badge** component allows you to visually highlight specific information.
 * In addition to specifying the background color and automatically calculating the text color, it also supports adding an icon and/or a different font style.
 *
 * @slot expert - Custom label content, e.g. for rich text or icons. https://public-ui.github.io/docs/concepts/expert-slot
 */
@Component({
	tag: 'kol-badge',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolBadge extends BaseWebComponent<BadgeApi> implements BadgeProps, FocusableElement, WebComponentInterface<BadgeApi> {
	@Element() protected readonly host?: HTMLKolBadgeElement;

	protected readonly ctaRef = createCtaRef<HTMLButtonElement>();

	// --- Composed behaviors ---

	/**
	 * Stays idle while no smart button is configured — it is only fed in `applySmartButton`, and
	 * `syncListeners` needs the button ref. Once there *is* a smart button the tooltip is not
	 * optional: the badge renders it with `hideLabel`, so its label lives in the tooltip.
	 */
	private readonly tooltipBehavior = new TooltipBehavior(this.stateAccess);

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(badgePropsConfig);
		// A badge without `_smartButton` renders no button at all, so the seeded default must not
		// survive initialization — see `applySmartButton`.
		this.unsetRenderProp('smartButton');

		this.watchColor(this._color);
		this.watchIcons(this._icons);
		this.watchLabel(this._label);
		this.watchSmartButton(this._smartButton);
	}

	public componentDidRender(): void {
		if (this.ctaRef.el) {
			this.tooltipBehavior.syncListeners(undefined, this.ctaRef.el, true);
		}
	}

	public disconnectedCallback(): void {
		this.tooltipBehavior.destroy();
	}

	/**
	 * `_smartButton` is the only prop that may end up unset rather than defaulted. Clearing the
	 * render prop first means an unusable value renders no button, same as no value at all.
	 */
	private applySmartButton(value?: Stringified<InternalButtonProps>): void {
		objectObjectHandler(value, () => {
			this.unsetRenderProp('smartButton');
			this.smartButtonProps = undefined;
			if (value !== undefined && value !== null) {
				smartButtonProp.apply(value, (smartButton) => {
					this.setRenderProp('smartButton', smartButton);
					this.smartButtonProps = resolveButtonProps({ ...smartButton, _hideLabel: true, _ariaControls: this.labelId }, this.host);
					this.tooltipBehavior.componentWillLoad({
						label: this.smartButtonProps.label,
						align: this.smartButtonProps.tooltipAlign,
					});
				});
			}
		});
	}

	// --- Event handling ---

	private readonly handleClick = (event: MouseEvent): void => {
		event.stopPropagation();
		this.tooltipBehavior.hideTooltip();

		const onClick = this.smartButtonProps?.on.onClick;
		if (typeof onClick === 'function') {
			setEventTarget(event, this.ctaRef.el);
			onClick(event, undefined);
		}

		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.click);
		}
	};

	private readonly handleMouseDown = (event: MouseEvent): void => {
		this.smartButtonProps?.on.onMouseDown?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.mousedown);
		}
	};

	private readonly handleFocus = (event: FocusEvent): void => {
		this.smartButtonProps?.on.onFocus?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.focus);
		}
	};

	private readonly handleBlur = (event: FocusEvent): void => {
		this.smartButtonProps?.on.onBlur?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.blur);
		}
	};

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
		return (
			<Host>
				<BadgeFC
					color={this.getRenderProp('color')}
					icons={this.getRenderProp('icons')}
					label={this.getRenderProp('label')}
					labelId={this.labelId}
					smartButton={this.getRenderProp('smartButton')}
					smartButtonProps={this.smartButtonProps}
					ariaDescriptionId={this.ariaDescriptionId}
					handleBlur={this.handleBlur}
					handleClick={this.handleClick}
					handleFocus={this.handleFocus}
					handleMouseDown={this.handleMouseDown}
					refSmartButton={this.ctaRef}
					refTooltip={this.tooltipBehavior.setTooltipElementRef}
				/>
			</Host>
		);
	}

	// --- @State ---

	@State() public labelId: string = createUniqueId('badge-label');

	@State() public ariaDescriptionId: string = nonce();

	/**
	 * The smart button's normalized `ButtonFC` render props, or `undefined` while no smart button
	 * is configured. Not a `@State`: it is recomputed inside `applySmartButton`, whose
	 * `setRenderProp` call already drives the re-render.
	 */
	private smartButtonProps?: ResolvedButtonProps;

	// --- Props + Watchers ---

	/**
	 * Defines the backgroundColor and foregroundColor.
	 */
	@Prop() public _color?: Stringified<PropColor> = '#000';
	@Watch('_color')
	public watchColor(value?: Stringified<PropColor>): void {
		colorProp.apply(value, (v) => this.setRenderProp('color', v));
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
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;
	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		labelWithExpertSlotProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	/**
	 * Allows to add a button with an arbitrary action within the element (_hide-label only).
	 */
	@Prop() public _smartButton?: Stringified<InternalButtonProps>;
	@Watch('_smartButton')
	public watchSmartButton(value?: Stringified<InternalButtonProps>): void {
		this.applySmartButton(value);
	}
}
