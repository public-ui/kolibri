import { Component, h, type JSX, Method, Prop } from '@stencil/core';

import type { HrefPropType, LabelPropType, OpenPropType, TreeItemProps } from '../../schema';
import { KolTreeItemWcTag } from '../../core/component-names';

@Component({
	tag: 'kol-tree-item', // keep in sync with `const TREE_ITEM_TAG_NAME`
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTreeItem implements TreeItemProps {
	private element?: HTMLKolTreeItemWcElement;

	/**
	 * If set (to true) the tree item is the active one.
	 */
	@Prop() _active?: OpenPropType;

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

	/**
	 * Sets focus to link element in tree item.
	 */
	@Method()
	public async focusLink() {
		if (this.element) {
			await this.element.focusLink();
		}
	}

	/**
	 * Closes the tree item.
	 */
	@Method()
	public async expand() {
		if (this.element) {
			await this.element.expand();
		}
	}

	/**
	 * Opens the tree item.
	 */
	@Method()
	public async collapse() {
		if (this.element) {
			await this.element.collapse();
		}
	}

	/**
	 * Returns the open state of tree item.
	 */
	@Method()
	public async isOpen() {
		return (await this.element?.isOpen()) ?? false;
	}

	public render(): JSX.Element {
		return (
			<KolTreeItemWcTag
				class="kol-tree-item"
				_active={this._active}
				_label={this._label}
				_open={this._open}
				_href={this._href}
				ref={(element?: HTMLKolTreeItemWcElement) => (this.element = element)}
			>
				<slot />
			</KolTreeItemWcTag>
		);
	}
}
