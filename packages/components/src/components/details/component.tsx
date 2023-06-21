import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { watchBoolean, watchString } from '../../utils/prop.validators';
import { KoliBriDetailsAPI, KoliBriDetailsStates } from './types';

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
export class KolDetails implements KoliBriDetailsAPI {
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
						{this.state._open ? (
							<kol-icon _ariaLabel="" _icon="codicon codicon-chevron-down" />
						) : (
							<kol-icon _ariaLabel="" _icon="codicon codicon-chevron-right" />
						)}
						<span>{this.state._summary}</span>
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
	 * Gibt an, ob die Komponente entweder geöffnet oder geschlossen ist.
	 */
	@Prop({ mutable: true, reflect: true }) public _open?: boolean = false;

	/**
	 * Gibt die Zusammenfassung der Detailbeschreibung an.
	 */
	@Prop() public _summary!: string;

	@State() public state: KoliBriDetailsStates = {
		_summary: '…', // '⚠'
	};

	@Watch('_open')
	public validateOpen(value?: boolean): void {
		watchBoolean(this, '_open', value);
	}

	@Watch('_summary')
	public validateSummary(value?: string): void {
		watchString(this, '_summary', value, {
			required: true,
		});
	}

	public componentWillLoad(): void {
		this.validateOpen(this._open);
		this.validateSummary(this._summary);
	}

	private onClick = () => {
		setTimeout(() => {
			this._open = this.htmlDetailsElement?.open;
		}, 25);
	};
}
