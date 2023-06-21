import { Component, Fragment, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { LinkProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { a11yHintLabelingLandmarks } from '../../utils/a11y.tipps';
import { watchNavLinks } from '../nav/validation';
import { KoliBriBreadcrumbAPI, KoliBriBreadcrumbStates } from './types';
import { watchString } from '../../utils/prop.validators';

@Component({
	tag: 'kol-breadcrumb',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolBreadcrumb implements KoliBriBreadcrumbAPI {
	private readonly renderLink = (link: LinkProps, index: number): JSX.Element => {
		const lastIndex = this.state._links.length - 1;
		const hideLabel = link._iconOnly || link._hideLabel;
		return (
			<li key={index}>
				{index !== 0 && <kol-icon _ariaLabel="" _icon="codicon codicon-chevron-right" />}
				{index === lastIndex ? (
					<span>
						{hideLabel ? (
							<kol-icon _ariaLabel={link._label} _icon={typeof link._icon === 'string' ? link._icon : 'codicon codicon-symbol-event'} />
						) : (
							<Fragment>{link._label}</Fragment>
						)}
					</span>
				) : (
					<kol-link _useCase="nav" {...link} _ariaLabel={link._label}>
						{link._label}
					</kol-link>
				)}
			</li>
		);
	};

	public render(): JSX.Element {
		return (
			<Host>
				<nav aria-label={this.state._ariaLabel}>
					<ul>
						{this.state._links.length === 0 && (
							<li>
								<kol-icon _ariaLabel="" _icon="codicon codicon-home" />…
							</li>
						)}
						{this.state._links.map(this.renderLink)}
					</ul>
				</nav>
			</Host>
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

	@State() public state: KoliBriBreadcrumbStates = {
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
		watchNavLinks('KolBreadcrumb', this, value);
	}

	public componentWillLoad(): void {
		this.validateAriaLabel(this._ariaLabel);
		this.validateLinks(this._links);
	}
}
