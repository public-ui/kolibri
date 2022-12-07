import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@public-ui/core';
import { watchBoolean, watchString } from '../../utils/prop.validators';

/**
 * API
 */
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

@Component({
	tag: 'kol-details',
	styleUrls: {
		default: '../style.sass',
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
							<kol-icon-icofont _ariaLabel="" _icon="fa-solid fa-angle-down" />
						) : (
							<kol-icon-icofont _ariaLabel="" _icon="fa-solid fa-angle-right" />
						)}
						<span>{this.state._summary}</span>
					</summary>
					<kol-indented-text>
						<slot />
					</kol-indented-text>
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

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_summary: '…', // '⚠'
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_open')
	public validateOpen(value?: boolean): void {
		watchBoolean(this, '_open', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_summary')
	public validateSummary(value?: string): void {
		watchString(this, '_summary', value, {
			required: true,
		});
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
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
