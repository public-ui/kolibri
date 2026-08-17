import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop } from '@stencil/core';

import { KolTreeWcTag } from '../../core/component-names';
import type { FocusableElement, KolFocusOptions, LabelPropType, TreeProps } from '../../schema';
import { createCtaRef, delegateFocus } from '../../utils/element-interaction';

/**
 * @slot - Children as TreeItem Components
 */
@Component({
	tag: 'kol-tree',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTree implements FocusableElement, TreeProps {
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
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	public render(): JSX.Element {
		return (
			<KolTreeWcTag _label={this._label} ref={this.ctaRef}>
				<slot />
			</KolTreeWcTag>
		);
	}
}
