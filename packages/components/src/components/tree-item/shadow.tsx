import { Component, h, type JSX, Method, Prop } from '@stencil/core';

import { KolTreeItemWcTag } from '../../core/component-names';
import type { HrefPropType, KolFocusOptions, LabelPropType, OpenPropType, TreeItemProps } from '../../schema';

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
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() _label!: LabelPropType;

	/**
	 * Opens/expands the element when truthy, closes/collapses when falsy.
	 */
	@Prop() _open?: OpenPropType;

	/**
	 * Defines the target URI of the link.
	 */
	@Prop() _href!: HrefPropType;

	/**
	 * Focuses the link element.
	 */
	@Method() async focus(options?: KolFocusOptions) {
		return this.element?.focus(options);
	}

	/**
	 * Expands the tree item.
	 */
	@Method() async expand() {
		return Promise.resolve(this.element?.expand());
	}

	/**
	 * Collapses the tree item.
	 */
	@Method() async collapse() {
		return Promise.resolve(this.element?.collapse());
	}

	/**
	 * Returns whether the tree item is expanded.
	 */
	@Method() async isOpen() {
		return (await this.element?.isOpen()) ?? false;
	}

	public render(): JSX.Element {
		return (
			<KolTreeItemWcTag
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
