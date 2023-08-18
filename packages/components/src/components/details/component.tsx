import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { LabelPropType, validateLabel } from '../../types/props/label';
import { watchBoolean } from '../../utils/prop.validators';
import { API, States } from './types';

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
				>
					{/* Link: https://github.com/public-ui/kolibri/issues/3558 */}
					{/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
					<summary onClick={this.onClick}>
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
	 * If set (to true) opens/expands the element, closes if not set (or set to false).
	 * @TODO: Change type back to `OpenPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _open?: boolean = false;

	/**
	 * Gibt die Zusammenfassung der Detailbeschreibung an.
	 * @deprecated Use _label.
	 */
	@Prop() public _summary?: string;

	@State() public state: States = {
		_label: '…', // '⚠'
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	@Watch('_open')
	public validateOpen(value?: boolean): void {
		watchBoolean(this, '_open', value);
	}

	@Watch('_summary')
	public validateSummary(value?: string): void {
		this.validateLabel(value);
	}

	public componentWillLoad(): void {
		this.validateOpen(this._open);
		this.validateLabel(this._label || this._summary);
	}

	private onClick = () => {
		setTimeout(() => {
			this._open = this.htmlDetailsElement?.open;
		}, 25);
	};
}
