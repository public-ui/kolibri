import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
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
	public render(): JSX.Element {
		return (
			<Host class="kol-abbr">
				<abbr>
					<slot />
				</abbr>
				{this.state._label ? ` (${this.state._label})` : ''}
			</Host>
		);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType;

	@State() public state: AbbrStates = {
		_label: '', // ⚠ required
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
	}
}
