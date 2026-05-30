import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop } from '@stencil/core';

import { KolTreeWcTag } from '../../core/component-names';
import type { FocusableElement, FocusOptions, LabelPropType, TreeProps } from '../../schema';
import { createCtaRef, delegateFocus } from '../../utils/element-interaction';

@Component({
	tag: 'kol-tree',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTree implements TreeProps, FocusableElement {
	@Element() protected readonly host?: HTMLKolTreeElement;
	protected readonly ctaRef = createCtaRef<HTMLKolTreeWcElement>();

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() _label!: LabelPropType;

	/**
	 * Sets focus on the first focusable tree item.
	 */
	@Method()
	@delegateFocus('ctaRef')
	public async focus(options?: FocusOptions): Promise<void> {}

	public render(): JSX.Element {
		return (
			<KolTreeWcTag _label={this._label} ref={this.ctaRef}>
				<slot />
			</KolTreeWcTag>
		);
	}
}
