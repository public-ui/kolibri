import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { watchBoolean, watchString } from '../../utils/prop.validators';

type RequiredProps = {
	summary: string;
};
type OptionalProps = {
	open: boolean;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

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
export class KolDetails implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
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
	 * Gibt an, ob die Detailbeschreibung geöffnet oder geschlossen ist.
	 */
	@Prop({ mutable: true, reflect: true }) public _open?: boolean = false;

	/**
	 * Gibt die Zusammenfassung der Detailbeschreibung an.
	 */
	@Prop() public _summary!: string;

	@State() public state: States = {
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
