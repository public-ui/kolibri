import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { getFeatureFlag } from 'adopted-style-sheets';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { CollapsibleApi } from '../../internal/functional-components/collapsible/api';
import { collapsiblePropsConfig } from '../../internal/functional-components/collapsible/api';
import { CollapsibleFC } from '../../internal/functional-components/collapsible/component';
import { createCollapsibleOpenAnimation, DEFAULT_COLLAPSIBLE_TRANSITION_MS } from '../../internal/functional-components/collapsible/open-animation';
import { createCollapsibleToggleHandler } from '../../internal/functional-components/collapsible/toggle-handler';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { collapsibleCallbacksProp, disabledProp, labelProp, levelProp, openProp } from '../../internal/props';
import type {
	ClickableElement,
	CollapsibleCallbacksPropType,
	DetailsProps,
	FocusableElement,
	HeadingLevel,
	KolFocusOptions,
	LabelPropType,
} from '../../schema';
import { createRelatedUniqueId, createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';

/**
 * The **Details** component allows additional information to be initially shown with a short introductory text,
 * which is only fully expanded after the user clicks on an arrow icon.
 *
 * By default, the **Details** component is displayed as a single-line layout element consisting of an arrow icon
 * followed by a short introductory text. The actual content is revealed below after clicking the header area. The arrow icon
 * changes its orientation from **_right_** to **_down_**.
 * The component can also be closed again to hide the content.
 *
 * @slot - The content displayed in the detail description.
 */
@Component({
	tag: 'kol-details',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolDetails
	extends BaseWebComponent<CollapsibleApi>
	implements ClickableElement, DetailsProps, FocusableElement, WebComponentInterface<CollapsibleApi>
{
	@Element() protected readonly host?: HTMLKolDetailsElement;

	private readonly detailsId = createUniqueId('details');

	/* A disabled `<summary>` stays technically focusable, unlike the `<button disabled>` it replaced.
	   Emptying the ref keeps the public `focus()` and `click()` methods from reaching it. */
	protected readonly ctaRef = createCtaRef<HTMLElement>(() => this.getRenderProp('disabled') === true);

	private hasLoaded = false;

	private readonly openAnimation = createCollapsibleOpenAnimation({
		getTransitionMs: () => this.transitionMs,
		setDetailsOpen: (value) => (this.detailsOpen = value),
		setExpanded: (value) => (this.expanded = value),
	});

	// --- @State ---

	@State() public controlId: string = createRelatedUniqueId(this.detailsId, 'control');
	@State() public detailsOpen: boolean = false;
	@State() public expanded: boolean = false;
	@State() public headingId: string = createRelatedUniqueId(this.detailsId, 'heading');
	@State() public transitionMs: number = DEFAULT_COLLAPSIBLE_TRANSITION_MS;

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(collapsiblePropsConfig);
		this.transitionMs = getFeatureFlag('collapsibleTransitionMs', this.host) ?? DEFAULT_COLLAPSIBLE_TRANSITION_MS;

		this.watchDisabled(this._disabled);
		this.watchLabel(this._label);
		this.watchLevel(this._level);
		this.watchOn(this._on);
		this.watchOpen(this._open);
	}

	public componentDidLoad(): void {
		this.hasLoaded = true;
	}

	public disconnectedCallback(): void {
		this.openAnimation.dispose();
	}

	// --- Event handling ---

	private readonly handleToggle = createCollapsibleToggleHandler({
		getHost: () => this.host,
		getOn: () => this.getRenderProp('on'),
		isDisabled: () => this.getRenderProp('disabled') === true,
		isOpen: () => this.getRenderProp('open') === true,
		setOpen: (open) => (this._open = open),
	});

	// --- Public methods ---

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	/**
	 * Triggers a click on the heading toggle button.
	 */
	@Method()
	@delegateClick('ctaRef')
	public async click(): Promise<void> {}

	// --- Render ---

	public render(): JSX.Element {
		return (
			<Host>
				<CollapsibleFC
					block="kol-details"
					contentClass="indented-text"
					controlId={this.controlId}
					detailsOpen={this.detailsOpen}
					disabled={this.getRenderProp('disabled')}
					expanded={this.expanded}
					handleToggle={this.handleToggle}
					headingId={this.headingId}
					icons="kolicon-chevron-right"
					label={this.getRenderProp('label')}
					level={this.getRenderProp('level')}
					on={this.getRenderProp('on')}
					open={this.getRenderProp('open')}
					refHeadingButton={this.ctaRef}
					transitionMs={this.transitionMs}
				>
					<slot />
				</CollapsibleFC>
			</Host>
		);
	}

	// --- Props + Watchers ---

	/**
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;
	@Watch('_disabled')
	public watchDisabled(value?: boolean): void {
		disabledProp.apply(value, (v) => this.setRenderProp('disabled', v));
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;
	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		labelProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 0;
	@Watch('_level')
	public watchLevel(value?: HeadingLevel): void {
		levelProp.apply(value, (v) => this.setRenderProp('level', v));
	}

	/**
	 * Defines the callback functions for the collapsible.
	 */
	@Prop() public _on?: CollapsibleCallbacksPropType<boolean>;
	@Watch('_on')
	public watchOn(value?: CollapsibleCallbacksPropType<boolean>): void {
		collapsibleCallbacksProp.apply(value, (v) => this.setRenderProp('on', v));
	}

	/**
	 * Opens/expands the element when truthy, closes/collapses when falsy.
	 * @TODO: Change type back to `OpenPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _open?: boolean = false;
	@Watch('_open')
	public watchOpen(value?: boolean): void {
		openProp.apply(value, (v) => {
			this.setRenderProp('open', v);
			/* The very first pass runs during componentWillLoad: render the final state straight
			   away instead of animating into it. */
			this.openAnimation.syncOpen(v, this.hasLoaded);
		});
	}
}
