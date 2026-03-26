import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop } from '@stencil/core';

import { KolTreeWcTag } from '../../core/component-names';
import type { FocusableElement, LabelPropType, TreeProps } from '../../schema';
import { delegateFocus } from '../../utils/element-focus';

@Component({
	tag: 'kol-tree',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTree implements TreeProps, FocusableElement {
	@Element() private readonly host?: HTMLKolTreeElement;
	private treeWcRef?: HTMLKolTreeWcElement;

	private readonly setTreeWcRef = (ref: HTMLKolTreeWcElement | null) => {
		this.treeWcRef = ref || undefined;
	};

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() _label!: LabelPropType;

	/**
	 * Sets focus on the first focusable tree item.
	 */
	@Method()
	public async focus() {
		return delegateFocus(this.host!, () => Promise.resolve(this.treeWcRef?.focus?.()));
	}

	public render(): JSX.Element {
		return (
			<KolTreeWcTag _label={this._label} ref={this.setTreeWcRef}>
				<slot />
			</KolTreeWcTag>
		);
	}
}
