import { Component, Fragment, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Stringified } from '../../types/common';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { a11yHintLabelingLandmarks } from '../../utils/a11y.tipps';
import { addNavLabel, removeNavLabel } from '../../utils/unique-nav-labels';
import { LinkProps } from '../link/types';
import { watchNavLinks } from '../nav/validation';
import { API, BreadcrumbLinkProps, States } from './types';

@Component({
	tag: 'kol-breadcrumb',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolBreadcrumb implements API {
	private readonly renderLink = (link: BreadcrumbLinkProps, index: number): JSX.Element => {
		const lastIndex = this.state._links.length - 1;
		const hideLabel = link._iconOnly || link._hideLabel;
		return (
			<li key={index}>
				{index !== 0 && <kol-icon _label="" _icons="codicon codicon-chevron-right" />}
				{index === lastIndex ? (
					<span>
						{hideLabel ? (
							<kol-icon _label={link._label} _icons={typeof link._icon === 'string' ? link._icon : 'codicon codicon-symbol-event'} />
						) : (
							<Fragment>{link._label}</Fragment>
						)}
					</span>
				) : (
					<kol-link {...link}></kol-link>
				)}
			</li>
		);
	};

	public render(): JSX.Element {
		return (
			<Host class="kol-breadcrumb">
				<nav aria-label={this.state._label ?? ''}>
					<ul>
						{this.state._links.length === 0 && (
							<li>
								<kol-icon _label="" _icons="codicon codicon-home" />…
							</li>
						)}
						{this.state._links.map(this.renderLink)}
					</ul>
				</nav>
			</Host>
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
	@Prop() public _links!: Stringified<BreadcrumbLinkProps[]>;

	@State() public state: States = {
		_label: '…',
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
			defaultValue: '…',
		});
		a11yHintLabelingLandmarks(value);
		addNavLabel(this.state._label); // add the state instead of prop, because the prop could be invalid and not set as new label
	}

	@Watch('_links')
	public validateLinks(value?: Stringified<LinkProps[]>): void {
		watchNavLinks('KolBreadcrumb', this, value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label || this._ariaLabel, undefined, true);
		this.validateLinks(this._links);
	}

	public disconnectedCallback(): void {
		removeNavLabel(this.state._label);
	}
}
