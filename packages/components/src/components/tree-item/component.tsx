import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { API, States } from './types';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { OpenPropType, validateOpen } from '../../types/props/open';
import { HrefPropType, validateHref } from '../../types/props/href';

const TAG_NAME = 'kol-tree-item';

@Component({
	tag: `kol-tree-item`, // keep in sync with const TAG_NAME
	shadow: false,
	styleUrls: {
		default: './style.css',
	},
})
export class KolTreeItemWc implements API {
	private observer?: MutationObserver;

	@Element() host!: HTMLElement;

	public render(): JSX.Element {
		return (
			<Host>
				<li>
					<a href={this.state._href}>{this.state._label}</a>
					{this.state._hasChildren &&
						(this.state._open ? <button onClick={this.handleCollapse.bind(this)}>-</button> : <button onClick={this.handleExpand.bind(this)}>+</button>)}
					<ul hidden={!this.state._hasChildren || !this.state._open}>
						<slot />
					</ul>
				</li>
			</Host>
		);
	}

	@State() public state: States = {
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

		this.observeChildListMutations();
		this.checkForChildren();
	}

	disconnectedCallback(): void {
		this.observer?.disconnect();
	}

	observeChildListMutations() {
		this.observer = new MutationObserver(this.checkForChildren.bind(this));

		this.observer.observe(this.host, { childList: true });
	}

	checkForChildren() {
		this.state = {
			...this.state,
			_hasChildren: this.host.querySelector(TAG_NAME) !== null,
		};
	}

	handleExpand() {
		this.state = {
			...this.state,
			_open: true,
		};
	}

	handleCollapse() {
		this.state = {
			...this.state,
			_open: false,
		};
	}
}
