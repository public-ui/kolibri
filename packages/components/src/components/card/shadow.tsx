import type { JSX } from '@stencil/core';
import { Component, Element, h, Method, Prop } from '@stencil/core';
import type {
	CardProps,
	ClickableElement,
	FocusableElement,
	HeadingLevel,
	HrefPropType,
	KoliBriCardEventCallbacks,
	LabelPropType,
	LinkTargetPropType,
} from '../../schema';

import { KolCardWcTag } from '../../core/component-names';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';

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
export class KolCard implements CardProps, ClickableElement, FocusableElement {
	// @ts-expect-error: host is needed by the decorator.
	@Element() private readonly host?: HTMLKolCardElement;
	protected readonly ctaRef = createCtaRef<HTMLKolCardWcElement>();

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	@delegateClick('ctaRef')
	public async click(): Promise<void> {}

	public render(): JSX.Element {
		return (
			<KolCardWcTag
				_on={this._on}
				_hasCloser={this._hasCloser}
				_label={this._label}
				_level={this._level}
				_href={this._href}
				_target={this._target}
				ref={this.ctaRef}
			>
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
	 * Sets the target URI of the link or citation source.
	 */
	@Prop() public _href?: HrefPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 0;

	/**
	 * Defines where to open the link.
	 */
	@Prop() public _target?: LinkTargetPropType;
}
