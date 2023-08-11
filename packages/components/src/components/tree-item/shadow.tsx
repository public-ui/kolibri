import { Component, h, JSX, Prop } from '@stencil/core';

import { Props } from './types';
import { LabelPropType } from '../../types/props/label';
import { OpenPropType } from '../../types/props/open';
import { HrefPropType } from '../../types/props/href';

// fix me : delete? and rename component
@Component({
	tag: 'kol-tree-item',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolTreeItem implements Props {
	public render(): JSX.Element {
		return (
			<kol-tree-item-wc _label={this._label} _open={this._open} _href={this._href}>
				<slot />
			</kol-tree-item-wc>
		);
	}

	/**
	 * Defines the label of the link.
	 */
	@Prop() _label!: LabelPropType;

	/**
	 * If set (to true) opens/expands the element, closes if not set (or set to false).
	 */
	@Prop() _open?: OpenPropType;

	/**
	 * This property is used for a link from a reference to the target URL.
	 */
	@Prop() _href!: HrefPropType;
}
