import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';

import { translate } from '../../i18n';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { ResolvedButtonProps } from '../../internal/functional-components/button/resolve-props';
import { resolveButtonProps } from '../../internal/functional-components/button/resolve-props';
import type { CardApi } from '../../internal/functional-components/card/api';
import { cardPropsConfig } from '../../internal/functional-components/card/api';
import { CardFC } from '../../internal/functional-components/card/component';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import { cardCallbacksProp, hasCloserProp, idProp, labelProp, levelProp, linkTargetProp, optionalHrefProp } from '../../internal/props';
import type { HeadingLevel, HrefPropType, KoliBriCardEventCallbacks, LabelPropType, LinkTargetPropType } from '../../schema';
import { createCtaRef } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

/**
 * Orchestrator shared by `kol-card` and the transitional `kol-card-wc` (ARC42 § 9, decision 16).
 * Both elements render the same `CardFC`; the concrete element only declares the Stencil members
 * and delegates from its watchers and lifecycle hooks.
 */
export abstract class BaseCardWebComponent extends BaseWebComponent<CardApi> {
	protected abstract readonly host?: HTMLElement;

	protected readonly ctaRef = createCtaRef<HTMLAnchorElement>();
	protected readonly closeButtonRef = createCtaRef<HTMLButtonElement>();

	/** Drives the close button's tooltip — it renders with `hideLabel`, so its label lives there. */
	private readonly tooltipBehavior = new TooltipBehavior(this.stateAccess);

	/** Resolved once in `componentWillLoad`: the close button's configuration never changes. */
	private closeButtonProps!: ResolvedButtonProps;

	// --- Lifecycle ---

	protected initCardRenderProps(): void {
		this.initRenderProps(cardPropsConfig);

		this.closeButtonProps = resolveButtonProps(
			{
				_hideLabel: true,
				_icons: { left: { icon: 'kolicon-cross' } },
				_label: translate('kol-close'),
				_tooltipAlign: 'left',
			},
			this.host,
		);
		this.tooltipBehavior.componentWillLoad({
			label: this.closeButtonProps.label,
			align: this.closeButtonProps.tooltipAlign,
		});
	}

	protected syncTooltipListeners(): void {
		if (this.closeButtonRef.el) {
			this.tooltipBehavior.syncListeners(undefined, this.closeButtonRef.el, true);
		}
	}

	protected destroyTooltipBehavior(): void {
		this.tooltipBehavior.destroy();
	}

	// --- Prop application ---

	protected applyHasCloser(value?: boolean): void {
		hasCloserProp.apply(value, (v) => this.setRenderProp('hasCloser', v));
	}

	/**
	 * Only an explicit id overrides the generated one — `idProp`'s empty-string default would
	 * otherwise strip the `aria-labelledby` target from every card that sets no id.
	 */
	protected applyHeadingId(value?: string): void {
		if (value === undefined) {
			return;
		}
		idProp.apply(value, (v) => this.setState('headingId', v));
	}

	protected applyHref(value?: HrefPropType): void {
		optionalHrefProp.apply(value, (v) => this.setRenderProp('href', v));
	}

	protected applyLabel(value?: LabelPropType): void {
		labelProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	protected applyLevel(value?: HeadingLevel): void {
		levelProp.apply(value, (v) => this.setRenderProp('level', v));
	}

	protected applyOn(value?: KoliBriCardEventCallbacks): void {
		cardCallbacksProp.apply(value, (v) => this.setRenderProp('on', v));
	}

	protected applyTarget(value?: LinkTargetPropType): void {
		linkTargetProp.apply(value, (v) => this.setRenderProp('target', v));
	}

	// --- Event handling ---

	private readonly handleClose = (): void => {
		this.tooltipBehavior.hideTooltip();
		this.getRenderProp('on').onClose?.(new Event('Close'));
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.close);
		}
	};

	private readonly handleFocus = (event: FocusEvent): void => {
		this.getRenderProp('on').onFocus?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.focus);
		}
	};

	private readonly handleBlur = (event: FocusEvent): void => {
		this.getRenderProp('on').onBlur?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.blur);
		}
	};

	// --- Render ---

	/**
	 * Stencil derives light-DOM slot relocation from the `<slot />` it finds in the element file,
	 * so each element supplies its own through `renderSlot`.
	 */
	protected abstract renderSlot(): JSX.Element;

	protected renderCardFC(): JSX.Element {
		return (
			<CardFC
				ariaDescriptionId={this.getState('ariaDescriptionId')}
				closeButtonProps={this.closeButtonProps}
				handleBlur={this.handleBlur}
				handleClose={this.handleClose}
				handleFocus={this.handleFocus}
				hasCloser={this.getRenderProp('hasCloser')}
				headingId={this.getState('headingId')}
				href={this.getRenderProp('href')}
				label={this.getRenderProp('label')}
				level={this.getRenderProp('level')}
				on={this.getRenderProp('on')}
				refCloseButton={this.closeButtonRef}
				refCta={this.ctaRef}
				refTooltip={this.tooltipBehavior.setTooltipElementRef}
				target={this.getRenderProp('target')}
			>
				{this.renderSlot()}
			</CardFC>
		);
	}
}
