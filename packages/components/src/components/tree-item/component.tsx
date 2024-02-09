import { Component, Element, h, Host, type JSX, Method, Prop, State, Watch } from '@stencil/core';

import type { ActivePropType, HrefPropType, LabelPropType, OpenPropType, TreeItemAPI, TreeItemStates } from '@public-ui/schema';
import { validateActive, validateHref, validateLabel, validateOpen } from '@public-ui/schema';

@Component({
	tag: `kol-tree-item-wc`,
	shadow: false,
})
export class KolTreeItemWc implements TreeItemAPI {
	private linkElement!: HTMLKolLinkWcElement;

	@Element() host!: HTMLElement;

	public render(): JSX.Element {
		return (
			<Host onSlotchange={this.handleSlotchange.bind(this)}>
				<li class="tree-item">
					<kol-link
						class={{
							'tree-link': true,
							active: Boolean(this.state._active),
						}}
						_label=""
						_href={this.state._href}
						ref={(element) => (this.linkElement = element!)}
						_tabIndex={this.state._active ? 0 : -1}
					>
						<span slot="expert">
							{this.state._hasChildren &&
								(this.state._open ? (
									// eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
									<span class="toggle-button" onClick={(event) => void this.handleCollapseClick(event)}>
										-
									</span>
								) : (
									// eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
									<span class="toggle-button" onClick={(event) => void this.handleExpandClick(event)}>
										+
									</span>
								))}{' '}
							{this.state._label}
						</span>
					</kol-link>
					<ul hidden={!this.state._hasChildren || !this.state._open} role="group">
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
	 * Defines the label of the link.
	 */
	@Prop() _label!: LabelPropType;

	/**
	 * If set (to true) opens/expands the element, closes if not set (or set to false).
	 */
	@Prop() _open?: OpenPropType;

	/**
	 * This property is used for a link from a reference to the target URL.
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
	}

	private handleSlotchange() {
		this.checkForChildren();
	}

	private checkForChildren() {
		this.state = {
			...this.state,
			_hasChildren: Boolean(this.host.querySelector('slot')?.assignedElements().length),
		};
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	@Method() async focusLink() {
		this.linkElement.focus();
	}

	private async handleExpandClick(event: MouseEvent) {
		event.preventDefault();
		this.linkElement.focus();
		await this.expand();
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	@Method() async expand() {
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

	// eslint-disable-next-line @typescript-eslint/require-await
	@Method() async collapse() {
		if (this.state._hasChildren) {
			this.state = {
				...this.state,
				_open: false,
			};
		}
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	@Method() async isOpen() {
		return this.state._open ?? false;
	}
}
