import type { LabelPropType, LinkProps, SkipNavAPI, SkipNavStates, Stringified } from '../../schema';
import { validateLabel } from '../../schema';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

import { addNavLabel, removeNavLabel } from '../../utils/unique-nav-labels';
import { watchNavLinks } from '../nav/validation';

import type { JSX } from '@stencil/core';
import { KolLinkWcTag } from '../../core/component-names';
@Component({
	tag: 'kol-skip-nav',
	styleUrls: {
		default: './style.scss',
	},
	shadow: {
		delegatesFocus: true,
	},
})
export class KolSkipNav implements SkipNavAPI {
	public render(): JSX.Element {
		return (
			<Host class="kol-skip-nav">
				<nav aria-label={this.state._label}>
					<ul>
						{this.state._links.map((link: LinkProps, index: number) => {
							return (
								<li key={index}>
									<KolLinkWcTag {...link}></KolLinkWcTag>
								</li>
							);
						})}
					</ul>
				</nav>
			</Host>
		);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Defines the list of links combined with their labels to render.
	 */
	@Prop() public _links!: Stringified<LinkProps[]>;

	@State() public state: SkipNavStates = {
		_label: '', // ⚠ required
		_links: [],
	};

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
		this.validateLabel(this._label, undefined, true);
		this.validateLinks(this._links);
	}

	public disconnectedCallback(): void {
		removeNavLabel(this.state._label);
	}
}
