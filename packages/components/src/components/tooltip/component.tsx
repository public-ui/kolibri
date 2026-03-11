import type { JSX } from '@stencil/core';
import { Component, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { TooltipApi } from '../../internal/functional-components/tooltip/api';
import { TooltipFC } from '../../internal/functional-components/tooltip/component';
import { TooltipController } from '../../internal/functional-components/tooltip/controller';
import type { AlignPropType } from '../../schema';

/**
 * @internal
 */
@Component({
	tag: 'kol-tooltip-wc',
	shadow: false,
})
export class KolTooltipWc extends BaseWebComponent<TooltipApi> implements WebComponentInterface<TooltipApi> {
	private readonly ctrl = new TooltipController(this.setState, this.getState);

	private handleHostRef = (el?: HTMLElement | null): void => {
		if (el) {
			this.ctrl.setPreviousSibling(el.previousElementSibling);
			this.ctrl.setParentElement(el.parentElement);
		}
	};

	/**
	 * Defines the elements badge text.
	 */
	@Prop()
	public _badgeText?: string;

	@Watch('_badgeText')
	public watchBadgeText(value?: string): void {
		this.ctrl.watchBadgeText(value);
	}

	/**
	 * Defines the alignment of the tooltip in relation to the element.
	 */
	@Prop()
	public _align?: AlignPropType = 'top';

	@Watch('_align')
	public watchAlign(value?: AlignPropType): void {
		this.ctrl.watchAlign(value);
	}

	/**
	 * Defines the internal ID of the primary component element.
	 * @internal
	 */
	@Prop()
	public _id?: string;

	@Watch('_id')
	public watchId(value?: string): void {
		this.ctrl.watchId(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label!: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		this.ctrl.watchLabel(value);
	}

	@State()
	public id: string = '';

	/**
	 * Hides the tooltip.
	 */
	@Method()
	public async hideTooltip(): Promise<void> {
		return Promise.resolve(this.ctrl.hideTooltip());
	}

	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
			label: this._label,
			align: this._align,
			badgeText: this._badgeText,
			id: this._id,
		});
	}

	public disconnectedCallback(): void {
		this.ctrl.destroy();
	}

	public render(): JSX.Element {
		return (
			<Host ref={this.handleHostRef}>
				<TooltipFC
					align={this.ctrl.getRenderProp('align')}
					badgeText={this.ctrl.getRenderProp('badgeText')}
					label={this.ctrl.getRenderProp('label')}
					id={this.id}
					refTooltipElement={(el) => this.ctrl.setTooltipElementRef(el)}
					refArrowElement={(el) => this.ctrl.setArrowElementRef(el)}
				/>
			</Host>
		);
	}
}
