import { Component, h, JSX, Method, Prop } from '@stencil/core';

import type { TreeItemProps } from '@public-ui/schema';
import { HrefPropType, LabelPropType, OpenPropType } from '@public-ui/schema';

@Component({
	tag: 'kol-tree-item',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolTreeItem implements TreeItemProps {
	private element?: HTMLKolTreeItemWcElement;

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

	@Method() async focusLink() {
		if (this.element) {
			await this.element.focusLink();
		}
	}

	@Method() async expand() {
		if (this.element) {
			await this.element.expand();
		}
	}

	@Method() async collapse() {
		if (this.element) {
			await this.element.collapse();
		}
	}

	@Method() async isOpen() {
		return (await this.element?.isOpen()) ?? false;
	}

	public render(): JSX.Element {
		return (
			<kol-tree-item-wc _label={this._label} _open={this._open} _href={this._href} ref={(element?: HTMLKolTreeItemWcElement) => (this.element = element)}>
				<slot />
			</kol-tree-item-wc>
		);
	}
}
