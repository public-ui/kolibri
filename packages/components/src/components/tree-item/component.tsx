import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import { KolTreeTag } from '../../core/component-names';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { TreeItemApi } from '../../internal/functional-components/tree-item/api';
import { treeItemPropsConfig } from '../../internal/functional-components/tree-item/api';
import { TreeItemFC } from '../../internal/functional-components/tree-item/component';
import { activeProp, ariaCurrentValueProp, hrefProp, labelWithExpertSlotProp, openProp } from '../../internal/props';
import type { HrefPropType, KolFocusOptions, LabelPropType, OpenPropType, TreeItemProps } from '../../schema';
import { createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, directFocus } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import type { UnsubscribeFunction } from '../link/ariaCurrentService';
import { onLocationChange } from '../link/ariaCurrentService';
import { invalidateOpenItemsCache } from '../tree/open-items-cache';

/**
 * @slot - Further Children as TreeItem Components
 */
@Component({
	tag: 'kol-tree-item', // keep in sync with `const TREE_ITEM_TAG_NAME`
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolTreeItem extends BaseWebComponent<TreeItemApi> implements TreeItemProps, WebComponentInterface<TreeItemApi> {
	@Element() protected readonly host?: HTMLKolTreeItemElement;

	protected readonly anchorRef = createCtaRef<HTMLAnchorElement>();

	private unsubscribeOnLocationChange?: UnsubscribeFunction;

	// --- @State ---

	@State() public ariaCurrent: string = '';
	@State() public groupId: string = createUniqueId('tree-group');
	@State() public hasChildren: boolean = false;
	@State() public level: number = 0;
	@State() public open: boolean = false;

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(treeItemPropsConfig);
		this.watchActive(this._active);
		this.watchHref(this._href);
		this.watchLabel(this._label);
		this.watchOpen(this._open);

		this.checkForChildren();
		this.determineTreeItemDepth();

		// The link marks itself as the current page, as `kol-link` does.
		this.unsubscribeOnLocationChange = onLocationChange((location) => {
			const ariaCurrent = location === this.getRenderProp('href') ? ariaCurrentValueProp.getDefaultValue() : '';
			if (this.ariaCurrent !== ariaCurrent) {
				this.ariaCurrent = ariaCurrent;
			}
		});
	}

	public disconnectedCallback(): void {
		if (this.unsubscribeOnLocationChange) {
			this.unsubscribeOnLocationChange();
			this.unsubscribeOnLocationChange = undefined;
		}
	}

	// --- Tree structure ---

	private determineTreeItemDepth(): void {
		let level = 0;
		let traverseItem: HTMLElement | null = this.host?.parentElement ?? null;
		while (traverseItem !== null && traverseItem.tagName.toLowerCase() !== KolTreeTag && traverseItem !== document.body) {
			traverseItem = traverseItem.parentElement;
			level += 1;
		}
		this.level = level;
	}

	/**
	 * Nested tree items are the elements assigned to the default slot. Read from the host's
	 * children rather than from the slot, because the slot is not rendered yet on the first check.
	 */
	private checkForChildren(): void {
		this.hasChildren = Array.from(this.host?.children ?? []).some((element) => !element.slot);
	}

	/** The `kol-tree` this item belongs to, looked up across shadow boundaries. */
	private getTree(): Element | undefined {
		let element: Element | null | undefined = this.host;
		while (element) {
			const tree = element.closest(KolTreeTag);
			if (tree) {
				return tree;
			}
			const shadowHost: Element | undefined = (element.getRootNode() as ShadowRoot)?.host;
			if (!shadowHost || shadowHost === document.body) {
				break;
			}
			element = shadowHost;
		}
		return undefined;
	}

	private setOpen(open: boolean): void {
		if (this.hasChildren) {
			this.open = open;
			invalidateOpenItemsCache(this.getTree());
		}
	}

	// --- Event handling ---

	private readonly handleAnchorClick = (): void => {
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.click, this.getRenderProp('href'));
		}
	};

	private readonly handleSlotchange = (): void => {
		this.checkForChildren();
	};

	/* The chevron sits inside the anchor: prevent the navigation, keep the focus on the item. */
	private readonly handleToggleClick = (event: MouseEvent): void => {
		event.preventDefault();
		const open = this.open;
		void this.focus().then(() => this.setOpen(!open));
	};

	// --- Public methods ---

	/**
	 * Focuses the link element.
	 */
	@Method()
	@directFocus('anchorRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	/**
	 * Expands the tree item.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async expand(): Promise<void> {
		this.setOpen(true);
	}

	/**
	 * Collapses the tree item.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async collapse(): Promise<void> {
		this.setOpen(false);
	}

	/**
	 * Returns whether the tree item is expanded.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async isOpen(): Promise<boolean> {
		return this.open;
	}

	// --- Render ---

	public render(): JSX.Element {
		return (
			<Host>
				<TreeItemFC
					active={this.getRenderProp('active')}
					ariaCurrent={this.ariaCurrent}
					groupId={this.groupId}
					handleAnchorClick={this.handleAnchorClick}
					handleSlotchange={this.handleSlotchange}
					handleToggleClick={this.handleToggleClick}
					hasChildren={this.hasChildren}
					href={this.getRenderProp('href')}
					label={this.getRenderProp('label')}
					level={this.level}
					open={this.open}
					refAnchor={this.anchorRef}
				/>
			</Host>
		);
	}

	// --- Props + Watchers ---

	/**
	 * If set (to true) the tree item is the active one.
	 */
	@Prop() public _active?: OpenPropType;
	@Watch('_active')
	public watchActive(value?: OpenPropType): void {
		activeProp.apply(value, (v) => this.setRenderProp('active', v));
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;
	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		labelWithExpertSlotProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	/**
	 * Opens/expands the element when truthy, closes/collapses when falsy.
	 */
	@Prop() public _open?: OpenPropType;
	@Watch('_open')
	public watchOpen(value?: OpenPropType): void {
		openProp.apply(value, (v) => (this.open = v));
	}

	/**
	 * Defines the target URI of the link.
	 */
	@Prop() public _href!: HrefPropType;
	@Watch('_href')
	public watchHref(value?: HrefPropType): void {
		hrefProp.apply(value, (v) => this.setRenderProp('href', v));
	}
}
