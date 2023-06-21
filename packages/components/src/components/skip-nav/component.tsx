import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';

import { LinkProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { watchNavLinks } from '../nav/validation';
import { KoliBriSkipNavAPI, KoliBriSkipNavStates } from './types';
import { watchString } from '../../utils/prop.validators';
import { a11yHintLabelingLandmarks } from '../../utils/a11y.tipps';

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
			<nav aria-label={this.state._ariaLabel}>
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
	 */
	@Prop() public _ariaLabel!: string;

	/**
	 * Gibt die Liste der darzustellenden Button, Links oder Texte an.
	 */
	@Prop() public _links!: Stringified<LinkProps[]>;

	@State() public state: KoliBriSkipNavStates = {
		_ariaLabel: '…', // '⚠'
		_links: [],
	};

	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		watchString(this, '_ariaLabel', value, {
			required: true,
		});
		a11yHintLabelingLandmarks(value);
	}

	@Watch('_links')
	public validateLinks(value?: Stringified<LinkProps[]>): void {
		watchNavLinks('KolSkipNav', this, value);
	}

	public componentWillLoad(): void {
		this.validateAriaLabel(this._ariaLabel);
		this.validateLinks(this._links);
	}
}
