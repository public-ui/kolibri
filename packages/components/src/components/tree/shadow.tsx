import type { JSX } from '@stencil/core';
import { Component, h, Prop } from '@stencil/core';

import { KolTreeWcTag } from '../../core/component-names';
import type { LabelPropType, TreeProps } from '../../schema';

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
			<KolTreeWcTag _label={this._label}>
				<slot />
			</KolTreeWcTag>
		);
	}
}
