import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { getFeatureFlag } from 'adopted-style-sheets';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { BreadcrumbApi } from '../../internal/functional-components/breadcrumb/api';
import { breadcrumbPropsConfig } from '../../internal/functional-components/breadcrumb/api';
import { BreadcrumbFC } from '../../internal/functional-components/breadcrumb/component';
import type { BreadcrumbLinkItem } from '../../internal/functional-components/breadcrumb/link-item';
import { createBreadcrumbLinkItem } from '../../internal/functional-components/breadcrumb/link-item';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { breadcrumbLinksProp, labelWithExpertSlotProp } from '../../internal/props';
import type { BreadcrumbLinkProps, BreadcrumbProps, LabelPropType, Stringified } from '../../schema';
import { a11yHintLabelingLandmarks } from '../../schema';
import { addNavLabel, removeNavLabel } from '../../utils/unique-nav-labels';
import type { UnsubscribeFunction } from '../link/ariaCurrentService';
import { onLocationChange } from '../link/ariaCurrentService';

/**
 * The **Breadcrumb** component can be used to display the path to the current position of a web page within a hierarchical structure.
 */
@Component({
	tag: 'kol-breadcrumb',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolBreadcrumb extends BaseWebComponent<BreadcrumbApi> implements BreadcrumbProps, WebComponentInterface<BreadcrumbApi> {
	@Element() protected readonly host?: HTMLKolBreadcrumbElement;

	@State() public linkItems: BreadcrumbLinkItem[] = [];

	private unsubscribeOnLocationChange?: UnsubscribeFunction;

	/**
	 * Derived per render pass from the `breadcrumbCurrentPage` feature flag — deliberately not
	 * `@State`: a flag change must not schedule a render by itself.
	 */
	public showCurrentPage: boolean = true;

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
	@Prop() public _links!: Stringified<BreadcrumbLinkProps[]>;

	@Watch('_links')
	public watchLinks(value?: Stringified<BreadcrumbLinkProps[]>): void {
		this.applyLinks(value);
	}

	public componentWillLoad(): void {
		this.initRenderProps(breadcrumbPropsConfig);
		this.applyLabel(this._label, true);
		this.applyLinks(this._links);

		this.unsubscribeOnLocationChange = onLocationChange((location) => {
			this.linkItems = this.linkItems.map((item) => {
				const newValue = location === item.fcProps.href ? item.fcProps.ariaCurrentValue : '';
				if (item.fcProps.ariaCurrent === newValue) {
					return item;
				}
				return { ...item, fcProps: { ...item.fcProps, ariaCurrent: newValue } };
			});
		});
	}

	public componentDidRender(): void {
		this.linkItems.forEach((item) => item.syncTooltipListeners());
	}

	public disconnectedCallback(): void {
		if (this.unsubscribeOnLocationChange) {
			this.unsubscribeOnLocationChange();
			this.unsubscribeOnLocationChange = undefined;
		}
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
		labelWithExpertSlotProp.apply(value, (v) => this.setRenderProp('label', v));
		a11yHintLabelingLandmarks(value);
		addNavLabel(this.getRenderProp('label'));
	}

	private applyLinks(value: Stringified<BreadcrumbLinkProps[]> | undefined): void {
		breadcrumbLinksProp.apply(value, (links) => {
			this.setRenderProp('links', links);
			this.linkItems.forEach((item) => item.destroy());
			this.linkItems = links.map((link) => createBreadcrumbLinkItem(link, () => this.host));
		});
	}

	public render(): JSX.Element {
		// Read per render pass, with the host-scoped feature-flag lookup.
		this.showCurrentPage = getFeatureFlag('breadcrumbCurrentPage', this.host) !== 'hide';
		return (
			<Host>
				<BreadcrumbFC
					label={this.getRenderProp('label')}
					links={this.getRenderProp('links')}
					linkItems={this.linkItems}
					showCurrentPage={this.showCurrentPage}
				/>
			</Host>
		);
	}
}
