import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';

import { Stringified } from '../../types/common';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { addNavLabel, removeNavLabel } from '../../utils/unique-nav-labels';
import { LinkProps } from '../link/types';
import { watchNavLinks } from '../nav/validation';
import { API, States } from './types';

@Component({
	tag: 'kol-skip-nav',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolSkipNav implements API {
	public render(): JSX.Element {
		return (
			<nav aria-label={this.state._label} class="kol-skip-nav">
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
	 * Deprecated: Setzt die semantische Beschriftung der Komponente.
	 *
	 * @deprecated use _label instead
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType; // TODO: required in v2

	/**
	 * Defines the list of links combined with their labels to render.
	 */
	@Prop() public _links!: Stringified<LinkProps[]>;

	@State() public state: States = {
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
	public validateLabel(value?: LabelPropType, _oldValue?: LabelPropType, initial = false): void {
		if (!initial) {
			removeNavLabel(this.state._label); // remove the current
		}
		validateLabel(this, value, {
			required: true,
		});
		addNavLabel(this.state._label); // add the state instead of prop, because the prop could be invalid and not set as new label
	}

	@Watch('_links')
	public validateLinks(value?: Stringified<LinkProps[]>): void {
		watchNavLinks('KolSkipNav', this, value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label || this._ariaLabel, undefined, true);
		this.validateLinks(this._links);
	}

	public disconnectedCallback(): void {
		removeNavLabel(this.state._label);
	}
}
