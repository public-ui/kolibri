import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';

import type { AbbrApi } from '../../internal/functional-components/abbr/api';
import { AbbrFC } from '../../internal/functional-components/abbr/component';
import { AbbrController } from '../../internal/functional-components/abbr/controller';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { TooltipDecorator } from '../../internal/functional-components/tooltip/decorator';
import type { LabelPropType } from '../../schema';

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
export class KolAbbr extends BaseWebComponent<AbbrApi> implements WebComponentInterface<AbbrApi> {
	private readonly ctrl = new AbbrController(this.stateAccess);
	private readonly tooltip = new TooltipDecorator({
		getTrigger: () => this.abbrRef,
	});

	private abbrRef?: HTMLElement;

	private readonly setAbbrRef = (ref?: HTMLElement): void => {
		this.abbrRef = ref;
	};

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType;

	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		this.ctrl.watchLabel(value);
		this.tooltip.watchLabel(value);
	}

	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({ label: this._label });
		this.tooltip.componentWillLoad({ label: typeof this._label === 'string' ? this._label : '' });
	}

	public componentDidRender(): void {
		this.tooltip.componentDidRender();
	}

	public disconnectedCallback(): void {
		this.tooltip.disconnectedCallback();
	}

	public render(): JSX.Element {
		const label = this.ctrl.getRenderProp('label');

		return (
			<Host>
				<AbbrFC label={label} refAbbr={this.setAbbrRef} />
				{this.tooltip.render({
					label,
					visible: Boolean(label),
				})}
			</Host>
		);
	}
}
