import type { JSX } from '@stencil/core';
import { Component, h, Prop } from '@stencil/core';

import type { LabelPropType, TreeProps } from '@public-ui/schema';

@Component({
	tag: 'kol-tree',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTree implements TreeProps {
	/**
	 * Defines the label of the tree.
	 */
	@Prop() _label!: LabelPropType;

	public render(): JSX.Element {
		return (
			<kol-tree-wc _label={this._label}>
				<slot />
			</kol-tree-wc>
		);
	}
}
