import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';

import type { AbbrApi } from '../../internal/functional-components/abbr/api';
import { abbrPropsConfig } from '../../internal/functional-components/abbr/api';
import { AbbrFC } from '../../internal/functional-components/abbr/component';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { PropsConfigShape, WebComponentInterface } from '../../internal/functional-components/generic-types';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import { labelLangSegmentsProp } from '../../internal/props';
import type { LabelLangSegmentsPropType } from '../../schema';
import { devWarning } from '../../schema';
import { createUniqueId } from '../../utils/dev.utils';

/**
 * The **Abbr** component implements the HTML tag `abbr` with an accessible tooltip.
 * The tooltip for the long form is displayed when the **Abbr** component is focused or hovered.
 *
 * @slot - The abbreviation (short form) as plain text.
 */
@Component({
	tag: 'kol-abbr',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolAbbr extends BaseWebComponent<AbbrApi> implements WebComponentInterface<AbbrApi> {
	private readonly tooltipBehavior = new TooltipBehavior(this.stateAccess);
	private readonly tooltipContentId = createUniqueId('abbr-tooltip-content');

	private abbrRef?: HTMLElement;
	private slotRef?: HTMLSlotElement;

	protected readonly propsConfig: PropsConfigShape = abbrPropsConfig;

	/**
	 * Defines the long form of the abbreviation, displayed in the tooltip of the slotted short form.
	 * Setting it makes the abbreviation focusable, so the tooltip is reachable by keyboard.
	 */
	@Prop()
	public _label?: LabelLangSegmentsPropType = undefined;

	@Watch('_label')
	public watchLabel(value?: LabelLangSegmentsPropType): void {
		labelLangSegmentsProp.apply(
			value,
			(v) => {
				this.setRenderProp('label', v);
				this.tooltipBehavior.watchLabel(v);
			},
			this.isRequired('label'),
		);
	}

	public componentWillLoad(): void {
		this.watchLabel(this._label);
	}

	public componentDidRender(): void {
		if (this.abbrRef) {
			this.tooltipBehavior.syncListeners(undefined, this.abbrRef, true);
		}
		this.checkSlotContent();
	}

	public disconnectedCallback(): void {
		this.tooltipBehavior.destroy();
	}

	private readonly setAbbrRef = (ref?: HTMLElement): void => {
		this.abbrRef = ref;
	};

	private readonly setSlotRef = (ref?: HTMLSlotElement): void => {
		this.slotRef = ref;
	};

	private readonly handleSlotchange = (): void => {
		this.checkSlotContent();
	};

	/** The slot carries the short form only: elements would break the inline semantics of the abbreviation. */
	private checkSlotContent(): void {
		if (typeof this.slotRef?.assignedNodes === 'function' && this.slotRef.assignedNodes().some((node) => node instanceof Element)) {
			devWarning('[KolAbbr] The slot accepts plain text only. Elements slotted into the component break the abbreviation.');
		}
	}

	public render(): JSX.Element {
		return (
			<Host>
				<AbbrFC
					handleSlotchange={this.handleSlotchange}
					label={this.getRenderProp('label')}
					refAbbr={this.setAbbrRef}
					refFloating={this.tooltipBehavior.setTooltipElementRef}
					refSlot={this.setSlotRef}
					tooltipContentId={this.tooltipContentId}
				/>
			</Host>
		);
	}
}
