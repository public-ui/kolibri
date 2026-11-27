import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import { TooltipFC } from '../../internal/functional-components/tooltip/component';
import { alignProp, badgeTextProp, idProp, labelLangSegmentsProp } from '../../internal/props';
import type { AlignPropType, BadgeTextPropType, IdPropType, LabelPropType } from '../../schema';

/**
 * @deprecated The tooltip element is deprecated. It is kept only for DESYBRI; do not use it in new code.
 * @internal
 */
@Component({
	tag: 'kol-tooltip-wc',
	shadow: false,
})
export class KolTooltipWc {
	@Element()
	private readonly host?: HTMLKolTooltipWcElement;

	private readonly tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);

	/**
	 * Defines the elements badge text.
	 */
	@Prop()
	public _badgeText?: BadgeTextPropType = undefined;

	@Watch('_badgeText')
	public validateBadgeText(value?: BadgeTextPropType): void {
		badgeTextProp.apply(value, (v) => this.tooltipBehavior.watchBadgeText(v));
	}

	/**
	 * Defines the alignment of the tooltip, popover or tabs in relation to the element.
	 */
	@Prop()
	public _align?: AlignPropType = 'top';

	@Watch('_align')
	public validateAlign(value?: AlignPropType): void {
		alignProp.apply(value, (v) => this.tooltipBehavior.watchAlign(v));
	}

	/**
	 * Defines the internal ID of the primary component element.
	 * @deprecated Will be removed in next major release. The ID is now generated internally and cannot be set via props.
	 * @internal
	 */
	@Prop()
	public _id?: IdPropType = undefined;

	@Watch('_id')
	public validateId(value?: IdPropType): void {
		idProp.apply(value, (v) => this.tooltipBehavior.watchId(v));
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label!: LabelPropType;

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		// The empty string records the "not set" state instead of an invalid-value warning.
		labelLangSegmentsProp.apply(value || undefined, (v) => this.tooltipBehavior.watchLabel(v));
	}

	/**
	 * Hides the tooltip.
	 */
	@Method()
	public hideTooltip(): Promise<void> {
		return Promise.resolve(this.tooltipBehavior?.hideTooltip());
	}

	public connectedCallback(): void {
		this.tooltipBehavior?.initContext((this.host?.previousElementSibling ?? undefined) as HTMLElement | undefined);
	}

	public componentWillLoad(): void {
		this.validateAlign(this._align);
		this.validateBadgeText(this._badgeText);
		this.validateId(this._id);
		this.validateLabel(this._label);
	}

	public componentDidRender(): void {
		if (this.host) {
			this.tooltipBehavior?.handleEventListeners(this.host as HTMLElement);
		}
	}

	public disconnectedCallback(): void {
		this.tooltipBehavior?.destroy();
	}

	public render(): JSX.Element {
		return (
			<Host class="kol-tooltip">
				<TooltipFC
					label={this.tooltipBehavior.getRenderProp('label')}
					badgeText={this._badgeText}
					id={this.tooltipBehavior.getRenderProp('id')}
					refFloating={(el?: HTMLDivElement) => this.tooltipBehavior?.setTooltipElementRef(el as HTMLElement)}
				/>
			</Host>
		);
	}
}
