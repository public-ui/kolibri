import { Component, Element, h, Host, JSX, Method, Prop, State, Watch } from '@stencil/core';

import type { HrefPropType, LabelPropType, OpenPropType, TreeItemAPI, TreeItemStates } from '@public-ui/schema';
import { validateHref, validateLabel, validateOpen } from '@public-ui/schema';

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
					<kol-link _label="" _href={this.state._href} ref={(element) => (this.linkElement = element!)}>
						<span slot="expert">
							{this.state._hasChildren &&
								(this.state._open ? (
									<span class="toggle-button" onClick={this.collapse.bind(this)}>
										-
									</span>
								) : (
									<span class="toggle-button" onClick={this.expand.bind(this)}>
										+
									</span>
								))}{' '}
							{this.state._label}
						</span>
					</kol-link>
					<ul hidden={!this.state._hasChildren || !this.state._open}>
						<slot />
					</ul>
				</li>
			</Host>
		);
	}

	@State() public state: TreeItemStates = {
		_label: '',
		_open: false,
		_hasChildren: false,
		_href: '',
	};

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

	@Method() async focusLink() {
		this.linkElement.focus();
	}

	@Method() async expand() {
		if (this.state._hasChildren) {
			this.state = {
				...this.state,
				_open: true,
			};
		}
	}

	@Method() async collapse() {
		if (this.state._hasChildren) {
			this.state = {
				...this.state,
				_open: false,
			};
		}
	}

	@Method() async isOpen() {
		return this.state._open ?? false;
	}
}
