import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { LabelPropType, validateLabel } from '../../types/props/label';
import { validateOpen } from '../../types/props/open';
import { API, EventCallbacks, States } from './types';
import { setState } from '../../utils/prop.validators';

/**
 * @slot - Der Inhalt, der in der Detailbeschreibung angezeigt wird.
 */
@Component({
	tag: 'kol-details',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolDetails implements API {
	private htmlDetailsElement?: HTMLDetailsElement;

	public render(): JSX.Element {
		return (
			<Host>
				<details
					ref={(el) => {
						this.htmlDetailsElement = el as HTMLDetailsElement;
					}}
					open={this.state._open}
					onToggle={this.handleToggle}
				>
					<summary>
						{this.state._open ? <kol-icon _label="" _icon="codicon codicon-chevron-down" /> : <kol-icon _label="" _icon="codicon codicon-chevron-right" />}
						<span>{this.state._label}</span>
					</summary>
					<div class="content">
						<kol-indented-text>
							<slot />
						</kol-indented-text>
					</div>
				</details>
			</Host>
		);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType;

	/**
	 * Defines the callback functions for details.
	 */
	@Prop() public _on?: EventCallbacks;

	/**
	 * If set (to true) opens/expands the element, closes if not set (or set to false).
	 * @TODO: Change type back to `OpenPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _open?: boolean = false;

	/**
	 * Deprecated: Gibt die Zusammenfassung der Detailbeschreibung an.
	 * @deprecated Use _label.
	 */
	@Prop() public _summary?: string;

	@State() public state: States = {
		_label: '…', // '⚠'
		_on: {},
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	@Watch('_on')
	public validateOn(on?: EventCallbacks) {
		if (typeof on === 'object' && on !== null && typeof on.onToggle === 'function') {
			setState<EventCallbacks>(this, '_on', on);
		}
	}

	@Watch('_open')
	public validateOpen(value?: boolean): void {
		validateOpen(this, value);
	}

	@Watch('_summary')
	public validateSummary(value?: string): void {
		this.validateLabel(value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label || this._summary);
		this.validateOn(this._on);
		this.validateOpen(this._open);
	}

	private handleToggle = (event: Event) => {
		setTimeout(() => {
			this._open = Boolean(this.htmlDetailsElement?.open);
			if (this.state._on?.onToggle) {
				this.state._on?.onToggle(event, this._open);
			}
		}, 25);
	};
}
