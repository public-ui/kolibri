import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../../internals/src/controller/base-web-component';
import type { PropsConfigShape, WebComponentInterface } from '../../../internals/src/controller/generic-types';
import type { SkipNavApi } from '../../../internals/src/controller/skip-nav/api';
import { skipNavPropsConfig } from '../../../internals/src/controller/skip-nav/api';
import type { SkipNavLinkItem } from '../../../internals/src/controller/skip-nav/link-item';
import { createSkipNavLinkItem } from '../../../internals/src/controller/skip-nav/link-item';
import { labelProp, skipNavLinksProp } from '../../../internals/src/props/index';
import type { FocusableElement, KolFocusOptions, LabelPropType, LinkProps, SkipNavProps, Stringified } from '../../../internals/src/schema/index';
import { a11yHintLabelingLandmarks } from '../../../internals/src/schema/index';
import { createCtaRef, delegateFocus } from '../../../internals/src/utils/element-interaction';
import { addNavLabel, removeNavLabel } from '../../../internals/src/utils/unique-nav-labels';
import { SkipNavFC } from '../../internal/functional-components/skip-nav/component';

/**
 * The **SkipNav** component renders a hidden navigation that allows keyboard and assistive
 * technology users to skip repetitive navigation sections and jump directly to the main
 * content. It only becomes visible when reached via the Tab key.
 */
@Component({
	tag: 'kol-skip-nav',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolSkipNav extends BaseWebComponent<SkipNavApi> implements FocusableElement, SkipNavProps, WebComponentInterface<SkipNavApi> {
	@Element() protected readonly host?: HTMLKolSkipNavElement;

	@State() public linkItems: SkipNavLinkItem[] = [];

	/** Anchor of the first skip link, used as the delegation target for `focus()`. */
	protected readonly ctaRef = createCtaRef<HTMLAnchorElement>();

	protected readonly propsConfig: PropsConfigShape = skipNavPropsConfig;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		this.applyLabel(value);
	}

	/**
	 * Defines the list of links combined with their labels to render.
	 */
	@Prop() public _links!: Stringified<LinkProps[]>;

	@Watch('_links')
	public watchLinks(value?: Stringified<LinkProps[]>): void {
		this.applyLinks(value);
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	public focus(options?: KolFocusOptions): Promise<void> {
		// The focus decorator owns the implementation and forwards `options` to `setFocus`; this body only declares the public signature.
		void options;
		return Promise.resolve();
	}

	public componentWillLoad(): void {
		this.applyLabel(this._label, true);
		this.applyLinks(this._links);
	}

	public componentDidRender(): void {
		// Keep the host focus-delegation ref in sync with the first link's anchor.
		this.ctaRef(this.linkItems[0]?.getAnchor());
		this.linkItems.forEach((item) => item.syncTooltipListeners());
	}

	public disconnectedCallback(): void {
		this.linkItems.forEach((item) => item.destroy());
		removeNavLabel(this.getRenderProp('label'));
	}

	/**
	 * Keeps the cross-instance nav-label uniqueness registry in sync: the previously rendered
	 * label is unregistered (skipped on the initial pass, so a second instance with the same
	 * label still triggers the duplicate warning), then the validated label is registered.
	 */
	private applyLabel(value: LabelPropType | undefined, initial = false): void {
		if (!initial) {
			removeNavLabel(this.getRenderProp('label'));
		}
		labelProp.apply(value, (v) => this.setRenderProp('label', v), this.isRequired('label'));
		a11yHintLabelingLandmarks(value);
		addNavLabel(this.getRenderProp('label'));
	}

	private applyLinks(value: Stringified<LinkProps[]> | undefined): void {
		skipNavLinksProp.apply(value, (links) => {
			this.setRenderProp('links', links);
			this.linkItems.forEach((item) => item.destroy());
			this.linkItems = links.map((link) => createSkipNavLinkItem(link, () => this.host));
		});
	}

	public render(): JSX.Element {
		return (
			<Host>
				<SkipNavFC label={this.getRenderProp('label')} links={this.getRenderProp('links')} linkItems={this.linkItems} />
			</Host>
		);
	}
}
