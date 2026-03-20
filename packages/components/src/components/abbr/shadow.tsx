import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import { KolTooltipWcTag } from '../../core/component-names';
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
	public render(): JSX.Element {
		return (
			<Host class="kol-abbr">
				{/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
				<abbr tabIndex={this.state._label ? 0 : undefined}>
					<slot />
				</abbr>
				{this.state._label ? <KolTooltipWcTag aria-hidden="true" _label={this.state._label}></KolTooltipWcTag> : null}
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
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
	}
}
