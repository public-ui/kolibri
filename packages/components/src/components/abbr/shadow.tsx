import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { TooltipFC } from '../../internal/functional-components/tooltip/component';
import { TooltipController } from '../../internal/functional-components/tooltip/controller';
import type { AbbrAPI, AbbrStates, LabelPropType } from '../../schema';
import { validateLabel } from '../../schema';

/**
 * The **Abbr** component implements the HTML tag `abbr` with an accessible tooltip.
 * The tooltip for the description is displayed and read aloud when the **Abbr** component is focused or hovered.
 *
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
	private abbrRef?: HTMLElement;

	private readonly tooltipCtrl = new TooltipController(BaseWebComponent.stateLess);

	private readonly setAbbrRef = (ref?: HTMLElement) => {
		this.abbrRef = ref;
	};

	public render(): JSX.Element {
		return (
			<Host class="kol-abbr">
				<abbr ref={this.setAbbrRef}>
					<slot />
				</abbr>
				{this.state._label ? (
					<TooltipFC
						aria-hidden="true"
						label={typeof this.state._label === 'string' ? this.state._label : ''}
						badgeText={''}
						id={this.tooltipCtrl.getRenderProp('id')}
						refFloating={this.tooltipCtrl.setTooltipElementRef}
					/>
				) : null}
			</Host>
		);
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
		this.tooltipCtrl.watchLabel(value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.tooltipCtrl.componentWillLoad({
			label: typeof this._label === 'string' ? this._label : '',
		});
	}

	public componentDidRender(): void {
		if (this.abbrRef) {
			this.tooltipCtrl.syncListeners(undefined, this.abbrRef, true);
		}
	}

	public disconnectedCallback(): void {
		this.tooltipCtrl.destroy();
	}
}
