import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import type { FocusableElement, KolFocusOptions, LabelPropType, LinkProps, SkipNavAPI, SkipNavStates, Stringified } from '../../schema';
import { validateLabel } from '../../schema';

import { addNavLabel, removeNavLabel } from '../../utils/unique-nav-labels';
import { watchNavLinks } from '../nav/validation';

import type { JSX } from '@stencil/core';
import { KolLinkWcTag } from '../../core/component-names';
import { createCtaRef, delegateFocus } from '../../utils/element-interaction';

/**
 * The **SkipNav** component renders a hidden navigation that allows keyboard and assistive technology users to skip repetitive navigation sections and jump directly to the main content. It only becomes visible when reached via the Tab key.
 */
@Component({
	tag: 'kol-skip-nav',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSkipNav implements SkipNavAPI, FocusableElement {
	@Element() protected readonly host?: HTMLKolSkipNavElement;
	protected readonly ctaRef = createCtaRef<HTMLKolLinkWcElement>();

	public render(): JSX.Element {
		return (
			<nav class="kol-skip-nav" aria-label={this.state._label}>
				<ul class="kol-skip-nav__list">
					{this.state._links.map((link: LinkProps, index: number) => {
						return (
							<li class="kol-skip-nav__list-item" key={index}>
								<KolLinkWcTag {...link} ref={index === 0 ? this.ctaRef : undefined}></KolLinkWcTag>
							</li>
						);
					})}
				</ul>
			</nav>
		);
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Defines the list of links combined with their labels to render.
	 */
	@Prop() public _links!: Stringified<LinkProps[]>;

	@State() public state: SkipNavStates = {
		_label: '', // ⚠ required
		_links: [],
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType, _oldValue?: LabelPropType, initial = false): void {
		if (!initial) {
			removeNavLabel(this.state._label); // remove the current
		}
		validateLabel(this, value, {
			required: true,
		});
		addNavLabel(this.state._label); // add the state instead of prop, because the prop could be invalid and not set as new label
	}

	@Watch('_links')
	public validateLinks(value?: Stringified<LinkProps[]>): void {
		watchNavLinks('KolSkipNav', this, value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label, undefined, true);
		this.validateLinks(this._links);
	}

	public disconnectedCallback(): void {
		removeNavLabel(this.state._label);
	}
}
