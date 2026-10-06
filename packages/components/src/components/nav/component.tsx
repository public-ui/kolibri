import type { JSX } from '@stencil/core';
import { Component, Element, forceUpdate, h, Host, Prop, State, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { ButtonItem, ButtonItemFcProps } from '../../internal/functional-components/button/item';
import { createButtonItem } from '../../internal/functional-components/button/item';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { createItemPool } from '../../internal/functional-components/item-pool';
import type { LinkFCProps } from '../../internal/functional-components/link/component';
import type { LinkItem } from '../../internal/functional-components/link/item';
import { createLinkItem } from '../../internal/functional-components/link/item';
import type { EmbeddedLinkProps } from '../../internal/functional-components/link/resolve-props';
import type { NavApi } from '../../internal/functional-components/nav/api';
import { navPropsConfig } from '../../internal/functional-components/nav/api';
import { NavFC } from '../../internal/functional-components/nav/component';
import type { NavChildren } from '../../internal/functional-components/nav/model';
import { getInitiallyExpanded, toggleExpanded } from '../../internal/functional-components/nav/model';
import { collapsibleProp, hasCompactButtonProp, hasIconsWhenExpandedProp, hideLabelProp, labelProp, navLinksProp } from '../../internal/props';
import type {
	ButtonOrLinkOrTextWithChildrenProps,
	CollapsiblePropType,
	HideLabelPropType,
	InternalButtonProps,
	LabelPropType,
	NavProps,
	Stringified,
} from '../../schema';
import { a11yHintLabelingLandmarks, devHint } from '../../schema';
import { createRelatedUniqueId, createUniqueId } from '../../utils/dev.utils';
import { addNavLabel, removeNavLabel } from '../../utils/unique-nav-labels';

/**
 * The **Nav** component renders a group of related links or navigation elements that perform an action or display content when clicked.
 * It provides a highly configurable vertical or horizontal navigation bar that can represent multiple levels and vary in width.
 */
@Component({
	tag: 'kol-nav',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolNav extends BaseWebComponent<NavApi> implements NavProps, WebComponentInterface<NavApi> {
	@Element() protected readonly host?: HTMLKolNavElement;

	@State() public compact: boolean = false;

	@State() public expandedChildren: NavChildren[] = [];

	private readonly navId = createUniqueId('kol-nav');

	private readonly listId = createRelatedUniqueId(this.navId, 'list');

	/** The entry buttons and the compact toggle, one item per key the nav FC renders. */
	private readonly buttonItems = createItemPool<ButtonItem>(
		() => createButtonItem(() => this.host),
		(item) => item.syncListeners(),
		(item) => item.destroy(),
	);

	/** The entry links, one item per key the nav FC renders. */
	private readonly linkItems = createItemPool<LinkItem>(
		() => createLinkItem(() => forceUpdate(this)),
		(item) => item.syncListeners(),
		(item) => item.destroy(),
	);

	/**
	 * Defines if navigation nodes can be collapsed or not. Enabled by default.
	 * @TODO: Change type back to `CollapsiblePropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _collapsible?: boolean = true;

	@Watch('_collapsible')
	public watchCollapsible(value?: CollapsiblePropType): void {
		collapsibleProp.apply(value, (v) => this.setRenderProp('collapsible', v));
	}

	/**
	 * Creates a button below the navigation, that toggles _collapsible.
	 */
	@Prop() public _hasCompactButton?: boolean = false;

	@Watch('_hasCompactButton')
	public watchHasCompactButton(value?: boolean): void {
		hasCompactButtonProp.apply(value, (v) => this.setRenderProp('hasCompactButton', v));
	}

	/**
	 * Shows icons next to the navigation item labels, even when the navigation is not collapsed.
	 */
	@Prop() public _hasIconsWhenExpanded?: boolean = false;

	@Watch('_hasIconsWhenExpanded')
	public watchHasIconsWhenExpanded(value?: boolean): void {
		hasIconsWhenExpandedProp.apply(value, (v) => this.setRenderProp('hasIconsWhenExpanded', v));
	}

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	@Watch('_hideLabel')
	public watchHideLabel(value?: HideLabelPropType): void {
		hideLabelProp.apply(value, (v) => {
			this.compact = v;
		});
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		this.applyLabel(value);
	}

	/**
	 * Defines the list of links, buttons or texts to render.
	 */
	@Prop() public _links!: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>;

	/** Every `_links` value resets the expansion to the active entries, also when the value is rejected. */
	@Watch('_links')
	public watchLinks(value?: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>): void {
		navLinksProp.apply(value, (v) => this.setRenderProp('links', v));
		devHint(`[KolNav] The navigation structure is not yet validated recursively.`);
		this.expandedChildren = getInitiallyExpanded(this.getRenderProp('links'));
	}

	public componentWillLoad(): void {
		this.initRenderProps(navPropsConfig);
		this.watchCollapsible(this._collapsible);
		this.watchHideLabel(this._hideLabel);
		this.watchHasCompactButton(this._hasCompactButton);
		this.watchHasIconsWhenExpanded(this._hasIconsWhenExpanded);
		this.applyLabel(this._label, true);
		this.watchLinks(this._links);
	}

	public componentDidRender(): void {
		this.buttonItems.endRender();
		this.linkItems.endRender();
	}

	public disconnectedCallback(): void {
		removeNavLabel(this.getRenderProp('label'));
		this.buttonItems.destroy();
		this.linkItems.destroy();
	}

	private readonly getButtonFcProps = (key: string, props: InternalButtonProps): ButtonItemFcProps => this.buttonItems.get(key).getFcProps(props);

	private readonly getLinkFcProps = (key: string, props: EmbeddedLinkProps): LinkFCProps => this.linkItems.get(key).getFcProps(props);

	/**
	 * Keeps the register of unique navigation labels in sync: the previous label is removed (not on the
	 * initial pass, so a second instance with the same label still warns), then the current one is added.
	 */
	private applyLabel(value: LabelPropType | undefined, initial = false): void {
		if (!initial) {
			removeNavLabel(this.getRenderProp('label'));
		}
		labelProp.apply(value, (v) => this.setRenderProp('label', v));
		a11yHintLabelingLandmarks(value);
		addNavLabel(this.getRenderProp('label'));
	}

	private readonly handleToggleExpansion = (children?: NavChildren): void => {
		if (children) {
			this.expandedChildren = toggleExpanded(this.expandedChildren, children);
		}
	};

	private readonly handleToggleCompact = (): void => {
		this.compact = !this.compact;
	};

	public render(): JSX.Element {
		this.buttonItems.beginRender();
		this.linkItems.beginRender();
		return (
			<Host>
				<NavFC
					collapsible={this.getRenderProp('collapsible')}
					compact={this.compact}
					expandedChildren={this.expandedChildren}
					getButtonFcProps={this.getButtonFcProps}
					getLinkFcProps={this.getLinkFcProps}
					handleToggleCompact={this.handleToggleCompact}
					handleToggleExpansion={this.handleToggleExpansion}
					hasCompactButton={this.getRenderProp('hasCompactButton')}
					hasIconsWhenExpanded={this.getRenderProp('hasIconsWhenExpanded')}
					label={this.getRenderProp('label')}
					links={this.getRenderProp('links')}
					listId={this.listId}
					navId={this.navId}
				/>
			</Host>
		);
	}
}
