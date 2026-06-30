import { Component, Element, h, Host, type JSX, Method, Prop, State, Watch } from '@stencil/core';

import { KolTreeTag } from '../../core/component-names';
import { IconFC } from '../../internal/functional-components/icon/component';
import { LinkFC } from '../../internal/functional-components/link/component';
import { createLinkStateAccess, LinkController } from '../../internal/functional-components/link/controller';
import type { ActivePropType, HrefPropType, KolFocusOptions, LabelPropType, OpenPropType, TreeItemAPI, TreeItemStates } from '../../schema';
import { validateActive, validateHref, validateLabel, validateOpen } from '../../schema';
import clsx from '../../utils/clsx';
import { nonce } from '../../utils/dev.utils';

/**
 * @internal
 */
@Component({
	tag: `kol-tree-item-wc`,
	shadow: false,
})
export class KolTreeItemWc implements TreeItemAPI {
	@Element() private readonly host?: HTMLKolTreeItemWcElement;

	// @State() private ariaCurrent: string = '';
	private readonly linkCtrl = new LinkController(createLinkStateAccess());
	private groupId = `tree-group-${nonce()}`;

	@State() private level?: number;

	public render(): JSX.Element {
		const { _href, _active, _hasChildren, _open, _label } = this.state;
		return (
			<Host onSlotchange={this.handleSlotchange.bind(this)}>
				<li
					class="kol-tree-item"
					style={{
						'--level': `${this.level}`,
					}}
				>
					<LinkFC
						class={clsx('kol-tree-item__link', {
							'kol-tree-item__link--first-level': this.level === 0,
							'kol-tree-item__link--active': _active,
						})}
						accessKey={this.linkCtrl.getRenderProp('accessKey')}
						ariaControls={this.linkCtrl.getRenderProp('ariaControls')}
						ariaDescription={this.linkCtrl.getRenderProp('ariaDescription')}
						ariaExpanded={_hasChildren ? (_open ? 'true' : 'false') : ''}
						ariaOwns={_hasChildren ? this.groupId : ''}
						disabled={this.linkCtrl.getRenderProp('disabled')}
						download={this.linkCtrl.getRenderProp('download')}
						hideLabel={this.linkCtrl.getRenderProp('hideLabel')}
						href={_href}
						icons={this.linkCtrl.getRenderProp('icons')}
						inline={this.linkCtrl.getRenderProp('inline')}
						label=""
						role="treeitem"
						shortKey={this.linkCtrl.getRenderProp('shortKey')}
						tabIndex={_active ? 0 : -1}
						target={this.linkCtrl.getRenderProp('target')}
						tooltipAlign={this.linkCtrl.getRenderProp('tooltipAlign')}
						variant={this.linkCtrl.getRenderProp('variant')}
						onAnchorClick={this.linkCtrl.handleAnchorClick}
						tooltipId={this.linkCtrl.getTooltipId()}
						refTooltipFloating={this.linkCtrl.setTooltipRef}
						refAnchor={(el) => this.linkCtrl.setAnchorRef(el)}
					>
						<span class="kol-tree-item__link-inner" slot="expert">
							{_hasChildren ? (
								// eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
								<span
									class="kol-tree-item__toggle-button"
									onClick={(event) => (_open ? void this.handleCollapseClick(event) : void this.handleExpandClick(event))}
								>
									<IconFC
										class="kol-tree-item__toggle-button-icon"
										icons={`kolicon kolicon-${_open ? 'chevron-down' : 'chevron-right'}`}
										label={'' /* Label deliberately left empty */}
									/>
								</span>
							) : (
								<span class="kol-tree-item__toggle-button-placeholder"></span>
							)}
							<span class="kol-tree-item__text">{_label}</span>
						</span>
					</LinkFC>
					<ul class="kol-tree-item__children" hidden={!_hasChildren || !_open} role="group" id={this.groupId}>
						<slot />
					</ul>
				</li>
			</Host>
		);
	}

	@State() public state: TreeItemStates = {
		_active: false,
		_hasChildren: false,
		_href: '',
		_label: '',
		_open: false,
	};

	/**
	 * If set (to true) the tree item is the active one.
	 */
	@Prop() _active?: OpenPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() _label!: LabelPropType;

	/**
	 * Opens/expands the element when truthy, closes/collapses when falsy.
	 */
	@Prop() _open?: OpenPropType;

	/**
	 * Defines the target URI of the link.
	 */
	@Prop() _href!: HrefPropType;

	@Watch('_active') validateActive(value?: ActivePropType): void {
		validateActive(this, value || false);
	}

	@Watch('_label') validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	@Watch('_open') validateOpen(value?: OpenPropType): void {
		validateOpen(this, value);
	}

	@Watch('_href') validateHref(value?: HrefPropType): void {
		validateHref(this, value);
		this.linkCtrl.watchHref(value);
	}

	public componentWillLoad(): void {
		this.validateActive(this._active);
		this.validateLabel(this._label);
		this.validateOpen(this._open);
		this.validateHref(this._href);
		this.linkCtrl.componentWillLoad({ href: this._href });

		this.checkForChildren();
		this.determineTreeItemDepth();
	}

	public disconnectedCallback(): void {
		this.linkCtrl.destroy();
	}

	private determineTreeItemDepth() {
		let level = 0;
		let traverseItem: HTMLElement | null = (this.host?.parentNode as unknown as ShadowRoot)?.host.parentNode as HTMLElement;
		while (traverseItem !== null && traverseItem.tagName.toLowerCase() !== KolTreeTag && traverseItem !== document.body) {
			traverseItem = traverseItem.parentElement;
			level += 1;
		}
		this.level = level;
	}

	private handleSlotchange() {
		this.checkForChildren();
	}

	private checkForChildren() {
		this.state = {
			...this.state,
			_hasChildren: Boolean(this.host?.querySelector('slot')?.assignedElements?.().length),
		};
	}

	private getTreeParent(): (HTMLKolTreeWcElement & { invalidateOpenItemsCache(): void }) | undefined {
		// Traverse up through shadow boundaries manually
		let element: Element | null | undefined = this.host;
		while (element) {
			// Try closest in current DOM tree
			const parent = element.closest(KolTreeTag);
			if (parent) {
				// Found kol-tree (shadow wrapper), now find kol-tree-wc in its shadow DOM
				const treeWc = parent.shadowRoot?.querySelector('kol-tree-wc');
				if (treeWc) {
					return treeWc as HTMLKolTreeWcElement & { invalidateOpenItemsCache(): void };
				}
				return undefined;
			}
			// Cross shadow boundary: go to shadow host, then to its parent
			const shadowHost: Element | undefined = (element.getRootNode() as ShadowRoot)?.host;
			if (!shadowHost || shadowHost === document.body) {
				break;
			}
			element = shadowHost.parentElement;
		}
		return undefined;
	}

	/**
	 * Focuses the link element.
	 */
	@Method()
	public async focus(options?: KolFocusOptions): Promise<void> {
		const anchor = this.linkCtrl.getAnchorRef();
		if (anchor) anchor.focus(options);
		return Promise.resolve();
	}

	private async handleExpandClick(event: MouseEvent) {
		event.preventDefault();
		this.linkCtrl.getAnchorRef()?.focus();
		await this.expand();
	}

	/**
	 * Expands the tree item.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async expand() {
		if (this.state._hasChildren) {
			this.state = {
				...this.state,
				_open: true,
			};
			// Invalidate the tree's cache of open items
			void this.getTreeParent()?.invalidateOpenItemsCache?.();
		}
	}

	private async handleCollapseClick(event: MouseEvent) {
		event.preventDefault();
		this.linkCtrl.getAnchorRef()?.focus();
		await this.collapse();
	}

	/**
	 * Collapses the tree item.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async collapse() {
		if (this.state._hasChildren) {
			this.state = {
				...this.state,
				_open: false,
			};
			// Invalidate the tree's cache of open items
			void this.getTreeParent()?.invalidateOpenItemsCache?.();
		}
	}

	/**
	 * Returns whether the tree item is expanded.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async isOpen() {
		return this.state._open ?? false;
	}
}
