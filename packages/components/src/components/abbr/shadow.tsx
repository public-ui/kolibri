import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { TooltipFC } from '../../internal/functional-components/tooltip/component';
import { TooltipController } from '../../internal/functional-components/tooltip/controller';
import type { AbbrAPI, AbbrStates, LabelPropType } from '../../schema';
import { validateLabel } from '../../schema';

/**
 * @slot - The abbreviation (short form).
 */
@Component({
	tag: 'kol-abbr',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolAbbr implements AbbrAPI {
	private readonly tooltipCtrl = new TooltipController();

	public render(): JSX.Element {
		return (
			<Host class="kol-abbr">
				{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
				<abbr tabIndex={this.state._label ? 0 : undefined}>
					<slot />
				</abbr>
				{this.state._label ? (
					<TooltipFC
						aria-hidden="true"
						label={this.state._label}
						badgeText=""
						align="bottom"
						id={this.tooltipCtrl.id}
						containerRef={this.tooltipCtrl.setContainerRef}
						tooltipRef={this.tooltipCtrl.setTooltipElementRef}
						arrowRef={this.tooltipCtrl.setArrowElementRef}
					/>
				) : null}
			</Host>
		);
	}

	public disconnectedCallback(): void {
		this.tooltipCtrl.destroy();
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType;

	@State() public state: AbbrStates = {
		_label: '',
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
	}
}
