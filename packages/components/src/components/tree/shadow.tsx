import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop } from '@stencil/core';

import type { LabelPropType, TreeProps } from '../../schema';
import { KolTreeWcTag } from '../../core/component-names';

@Component({
	tag: 'kol-tree',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTree implements TreeProps {
	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() _label!: LabelPropType;

	public render(): JSX.Element {
		return (
			<Host class="kol-tree">
				<KolTreeWcTag _label={this._label}>
					<slot />
				</KolTreeWcTag>
			</Host>
		);
	}
}
