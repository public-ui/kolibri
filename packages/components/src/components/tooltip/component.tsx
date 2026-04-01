import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, Watch } from '@stencil/core';
import type { AlignPropType, BadgeTextPropType, IdPropType, LabelPropType } from '../../schema';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { TooltipFC } from '../../internal/functional-components/tooltip/component';
import { TooltipController } from '../../internal/functional-components/tooltip/controller';

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

	private controller = new TooltipController(BaseWebComponent.withoutState);

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
		this.controller?.watchAlign(value);
	}

	@Watch('_id')
	public validateId(value?: IdPropType): void {
		this.controller?.watchId(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		this.controller?.watchLabel(value);
	}

	/**
	 * Hides the tooltip.
	 */
	@Method()
	public hideTooltip(): Promise<void> {
		return Promise.resolve(this.controller?.hideTooltip());
	}

	public componentWillLoad(): void {
		this.controller.componentWillLoad({
			label: this._label,
			align: this._align,
			badgeText: this._badgeText,
			id: this._id,
		});
	}

	public connectedCallback(): void {
		this.controller?.initContext((this.host?.previousElementSibling ?? undefined) as HTMLElement | undefined);
	}

	public componentDidRender(): void {
		if (this.host) {
			this.controller?.handleEventListeners(this.host as HTMLElement);
		}
	}

	public disconnectedCallback(): void {
		this.controller?.destroy();
	}

	public render(): JSX.Element {
		return (
			<Host class="kol-tooltip-wc">
				<TooltipFC
					label={this.controller.getRenderProp('label')}
					badgeText={this._badgeText}
					id={this.controller.getRenderProp('id')}
					refFloating={(el?: HTMLDivElement) => this.controller?.setTooltipElementRef(el as HTMLElement)}
				/>
			</Host>
		);
	}
}
