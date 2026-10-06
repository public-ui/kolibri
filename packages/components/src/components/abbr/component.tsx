import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';

import type { AbbrApi } from '../../internal/functional-components/abbr/api';
import { abbrPropsConfig } from '../../internal/functional-components/abbr/api';
import { AbbrFC } from '../../internal/functional-components/abbr/component';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import { abbrProp, labelProp } from '../../internal/props';
import type { LabelPropType } from '../../schema';
import { devHint, devWarning } from '../../schema';
import { createRelatedUniqueId, createUniqueId } from '../../utils/dev.utils';

const NODE_TYPE_ELEMENT = 1;
const NODE_TYPE_TEXT = 3;

/**
 * The **Abbr** component implements the HTML tag `abbr`. With `_label` the long form is shown as a
 * tooltip on hover and keyboard focus.
 *
 * @slot - Deprecated: the abbreviation as plain text. Use `_abbr` instead. Markup in the slot is not rendered.
 */
@Component({
	tag: 'kol-abbr',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolAbbr extends BaseWebComponent<AbbrApi> implements WebComponentInterface<AbbrApi> {
	@Element() private readonly host?: HTMLKolAbbrElement;

	/** Whether the default slot holds markup, which is not rendered. */
	@State() private hideSlot = false;

	private readonly id = createUniqueId('abbr');
	private readonly tooltipBehavior = new TooltipBehavior(this.stateAccess);
	private abbrElement?: HTMLElement;
	/** The element the tooltip listens to; `undefined` without a long form. */
	private tooltipTarget?: HTMLElement;
	private slotHintShown = false;

	/**
	 * Defines the abbreviation that is shown, e.g. `z. B.`.
	 */
	@Prop() public _abbr?: string;

	/**
	 * Defines the long form of the abbreviation, e.g. `zum Beispiel`. It is shown as a tooltip on hover and keyboard focus and is announced as the description of the abbreviation.
	 */
	@Prop() public _label?: LabelPropType;

	@Watch('_abbr')
	public watchAbbr(value?: string): void {
		abbrProp.apply(value, (v) => this.setRenderProp('abbr', v));
	}

	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		labelProp.apply(value, (v) => {
			this.setRenderProp('label', v);
			this.tooltipBehavior.watchLabel(v);
		});
	}

	public componentWillLoad(): void {
		this.initRenderProps(abbrPropsConfig);
		this.watchAbbr(this._abbr);
		this.watchLabel(this._label);
		this.tooltipBehavior.componentWillLoad({
			label: this.getRenderProp('label') ?? '',
			align: 'top',
			id: createRelatedUniqueId(this.id, 'tooltip'),
		});
	}

	public componentDidLoad(): void {
		const slot = this.host?.shadowRoot?.querySelector('slot');
		if (slot) {
			this.checkSlot(slot);
		}
	}

	/** Connects the tooltip to the abbreviation while a long form is set. */
	public componentDidRender(): void {
		const label = this.getRenderProp('label');
		const next = typeof label === 'string' && label.length > 0 ? this.abbrElement : undefined;
		if (next !== this.tooltipTarget) {
			this.tooltipBehavior.syncListeners(this.tooltipTarget, next, true);
			this.tooltipTarget = next;
		}
	}

	public disconnectedCallback(): void {
		this.tooltipBehavior.destroy();
		this.tooltipTarget = undefined;
	}

	private readonly setAbbrRef = (element?: HTMLElement): void => {
		this.abbrElement = element;
	};

	private readonly handleSlotChange = (event: Event): void => {
		this.checkSlot(event.target as HTMLSlotElement);
	};

	/**
	 * The abbreviation is plain text. Markup in the slot is not rendered, because `kol-abbr` is no
	 * tooltip for arbitrary content. Text in the slot still works, with a hint to use `_abbr`.
	 */
	private checkSlot(slot: HTMLSlotElement): void {
		const nodes = slot.assignedNodes({ flatten: true });
		const hasMarkup = nodes.some((node) => node.nodeType === NODE_TYPE_ELEMENT);
		if (hasMarkup) {
			devWarning(
				`[KolAbbr] The abbreviation must be plain text, so the markup in the default slot is not rendered. Use _abbr for the abbreviation and kol-popover-button for explanatory content.`,
			);
		} else if (!this.slotHintShown && nodes.some((node) => node.nodeType === NODE_TYPE_TEXT && (node.textContent ?? '').trim().length > 0)) {
			this.slotHintShown = true;
			devHint(`[KolAbbr] The default slot is deprecated. Use _abbr for the abbreviation.`);
		}
		this.hideSlot = hasMarkup;
	}

	public render(): JSX.Element {
		return (
			<Host>
				<AbbrFC
					abbr={this.getRenderProp('abbr')}
					label={this.getRenderProp('label')}
					tooltipId={createRelatedUniqueId(this.id, 'tooltip')}
					hideSlot={this.hideSlot}
					onSlotChange={this.handleSlotChange}
					refAbbr={this.setAbbrRef}
					refTooltip={this.tooltipBehavior.setTooltipElementRef}
				/>
			</Host>
		);
	}
}
