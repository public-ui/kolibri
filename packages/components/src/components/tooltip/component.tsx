import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core';
import type { AlignPropType, BadgeTextPropType, IdPropType, LabelPropType } from '../../schema';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import { TooltipFC } from '../../internal/functional-components/tooltip/component';

/**
 * @deprecated The tooltip component is deprecated and will be removed in the next major release
 * @internal
 */
@Component({
	tag: 'kol-tooltip-wc',
	shadow: false,
})
export class KolTooltipWc {
	@Element() private readonly host?: HTMLKolTooltipWcElement;

	private readonly tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);

	/**
	 * Defines the elements badge text.
	 */
	@Prop() public _badgeText?: BadgeTextPropType;

	/**
	 * Defines the alignment of the tooltip, popover or tabs in relation to the element.
	 */
	@Prop() public _align?: AlignPropType = 'top';

	/**
	 * Defines the internal ID of the primary component element.
	 * @deprecated Will be removed in next major release. The ID is now generated internally and cannot be set via props.
	 * @internal
	 */
	@Prop() public _id?: IdPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	@Watch('_align')
	public validateAlign(value?: AlignPropType): void {
		this.tooltipBehavior?.watchAlign(value);
	}

	@Watch('_id')
	public validateId(value?: IdPropType): void {
		this.tooltipBehavior?.watchId(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		this.tooltipBehavior?.watchLabel(value);
	}

	/**
	 * Hides the tooltip.
	 */
	@Method()
	public hideTooltip(): Promise<void> {
		return Promise.resolve(this.tooltipBehavior?.hideTooltip());
	}

	public componentWillLoad(): void {
		this.tooltipBehavior.componentWillLoad({
			label: this._label,
			align: this._align,
			badgeText: this._badgeText,
			id: this._id,
		});
	}

	public connectedCallback(): void {
		this.tooltipBehavior?.initContext((this.host?.previousElementSibling ?? undefined) as HTMLElement | undefined);
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
