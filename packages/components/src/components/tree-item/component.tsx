import { Component, Element, h, Host, type JSX, Method, Prop, State, Watch } from '@stencil/core';

import type { ActivePropType, HrefPropType, LabelPropType, OpenPropType, TreeItemAPI, TreeItemStates } from '../../schema';
import { validateActive, validateHref, validateLabel, validateOpen } from '../../schema';
import { KolLinkWcTag, KolIconTag, KolTreeTag } from '../../core/component-names';

@Component({
	tag: `kol-tree-item-wc`,
	shadow: false,
})
export class KolTreeItemWc implements TreeItemAPI {
	private linkElement!: HTMLKolLinkWcElement;

	@State() private level?: number;
	@Element() host!: HTMLElement;

	public renderIcon = (props: { icon: string; label: string }) => {
		return <KolIconTag class="toggle-button-icon" _label={props.label} _icons={props.icon} />;
	};

	public render(): JSX.Element {
		const { _href, _active, _hasChildren, _open } = this.state;
		return (
			<Host onSlotchange={this.handleSlotchange.bind(this)} class="kol-tree-item-wc">
				<li
					class="tree-item"
					style={{
						'--level': `${this.level}`,
					}}
				>
					<KolLinkWcTag
						class={{
							'tree-link': true,
							active: Boolean(_active),
						}}
						_label=""
						_href={_href}
						ref={(element?: HTMLKolLinkWcElement) => (this.linkElement = element!)}
						_tabIndex={_active ? 0 : -1}
					>
						<span slot="expert">
							{_hasChildren ? (
								// eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
								<span class="toggle-button" onClick={(event) => (_open ? void this.handleCollapseClick(event) : void this.handleExpandClick(event))}>
									{this.renderIcon({
										icon: `codicon codicon-${_open ? 'chevron-down' : 'chevron-right'}`,
										label: _open ? 'Vorschläge öffnen' : 'Vorschläge schließen',
									})}
								</span>
							) : (
								<span class="toggle-button"></span>
							)}{' '}
							{this.state._label}
						</span>
					</KolLinkWcTag>
					<ul hidden={!_hasChildren || !_open} role="group">
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

	// eslint-disable-next-line @typescript-eslint/require-await
	@Method() async focusLink() {
		this.linkElement.focus();
	}

	private async handleExpandClick(event: MouseEvent) {
		event.preventDefault();
		this.linkElement.focus();
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
