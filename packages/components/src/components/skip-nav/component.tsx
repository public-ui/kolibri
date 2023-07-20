import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';

import { LinkProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { watchNavLinks } from '../nav/validation';
import { KoliBriSkipNavAPI, KoliBriSkipNavStates } from './types';

@Component({
	tag: 'kol-skip-nav',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolSkipNav implements KoliBriSkipNavAPI {
	public render(): JSX.Element {
		return (
			<nav aria-label={this.state._label}>
				<ul>
					{this.state._links.map((link: LinkProps, index: number) => {
						return (
							<li key={index}>
								<kol-link-wc {...link}></kol-link-wc>
							</li>
						);
					})}
				</ul>
			</nav>
		);
	}

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 *  @deprecated use _label instead
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label?: LabelPropType; // TODO: required in v2

	/**
	 * Gibt die Liste der darzustellenden Button, Links oder Texte an.
	 */
	@Prop() public _links!: Stringified<LinkProps[]>;

	@State() public state: KoliBriSkipNavStates = {
		_label: '…', // ⚠ required
		_links: [],
	};

	/**
	 * @deprecated
	 */
	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		this.validateLabel(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	@Watch('_links')
	public validateLinks(value?: Stringified<LinkProps[]>): void {
		watchNavLinks('KolSkipNav', this, value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label || this._ariaLabel);
		this.validateLinks(this._links);
	}
}
