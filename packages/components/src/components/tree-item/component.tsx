import { Component, Element, h, Host, type JSX, Method, Prop, State, Watch } from '@stencil/core';

import type { ActivePropType, HrefPropType, LabelPropType, OpenPropType, TreeItemAPI, TreeItemStates } from '../../schema';
import { validateActive, validateHref, validateLabel, validateOpen } from '../../schema';
import { KolLinkWcTag, KolIconTag, KolTreeTag } from '../../core/component-names';
import { nonce } from '../../utils/dev.utils';
import clsx from 'clsx';

@Component({
	tag: `kol-tree-item-wc`,
	shadow: false,
})
export class KolTreeItemWc implements TreeItemAPI {
	private linkElement!: HTMLKolLinkWcElement;
	private groupId = `tree-group-${nonce()}`;

	@State() private level?: number;
	@Element() host!: HTMLElement;

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
					<KolLinkWcTag
						class={clsx('kol-tree-item__link', {
							'kol-tree-item__link--first-level': this.level === 0,
							'kol-tree-item__link--active': _active,
						})}
						_href={_href}
						_label=""
						_role="treeitem"
						_tabIndex={_active ? 0 : -1}
						_ariaExpanded={_hasChildren ? _open : undefined}
						_ariaOwns={_hasChildren ? this.groupId : undefined}
						ref={(element?: HTMLKolLinkWcElement) => (this.linkElement = element!)}
					>
						<span slot="expert">
							{_hasChildren && (
								// eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
								<span
									class="kol-tree-item__toggle-button"
									onClick={(event) => (_open ? void this.handleCollapseClick(event) : void this.handleExpandClick(event))}
								>
									<KolIconTag
										class="kol-tree-item__toggle-button-icon"
										_icons={`codicon codicon-${_open ? 'chevron-down' : 'chevron-right'}`}
										_label={'' /* Label deliberately left empty */}
									/>
								</span>
							)}{' '}
							{_label}
						</span>
					</KolLinkWcTag>
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
	}

	public componentWillLoad(): void {
		this.validateActive(this._active);
		this.validateLabel(this._label);
		this.validateOpen(this._open);
		this.validateHref(this._href);

		this.checkForChildren();
		this.determineTreeItemDepth();
	}

	private determineTreeItemDepth() {
		let level = 0;
		let traverseItem: HTMLElement | null = (this.host.parentNode as unknown as ShadowRoot).host.parentNode as HTMLElement;
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
			_hasChildren: Boolean(this.host.querySelector('slot')?.assignedElements?.().length),
		};
	}

	@Method() async focusLink() {
		await this.linkElement.kolFocus();
	}

	private async handleExpandClick(event: MouseEvent) {
		event.preventDefault();
		await this.linkElement.kolFocus();
		await this.expand();
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async expand() {
		if (this.state._hasChildren) {
			this.state = {
				...this.state,
				_open: true,
			};
		}
	}

	private async handleCollapseClick(event: MouseEvent) {
		event.preventDefault();
		this.linkElement.focus();
		await this.collapse();
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async collapse() {
		if (this.state._hasChildren) {
			this.state = {
				...this.state,
				_open: false,
			};
		}
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async isOpen() {
		return this.state._open ?? false;
	}
}
