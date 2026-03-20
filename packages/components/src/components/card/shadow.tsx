import type { JSX } from '@stencil/core';
import { Component, h, Prop } from '@stencil/core';
import type { CardProps, HeadingLevel, KoliBriCardEventCallbacks, LabelPropType } from '../../schema';

import { KolCardWcTag } from '../../core/component-names';

/**
 * The **Card** component is ideal for visually highlighting individual sections of your website. It allows you to structure your content very easily.
 *
 * The **Card** component consists of a **_title area_** and a **_content area_**.
 *
 * The **title area** is displayed in a larger font. The **content area** is visually separated from the title area by a horizontal dividing line and is rendered in the default font.
 *
 * @slot - Allows arbitrary HTML to be inserted into the content area of the card.
 */
@Component({
	tag: 'kol-card',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolCard implements CardProps {
	public render(): JSX.Element {
		return (
			<KolCardWcTag _on={this._on} _hasCloser={this._hasCloser} _label={this._label} _level={this._level}>
				<slot />
			</KolCardWcTag>
		);
	}

	/**
	 * Defines the event callback functions for the component.
	 */
	@Prop() public _on?: KoliBriCardEventCallbacks;

	/**
	 * Defines whether the element can be closed.
	 * @TODO: Change type back to `HasCloserPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hasCloser?: boolean = false;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 0;
}
