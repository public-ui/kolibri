import { Component, Element, Fragment, h, Prop, State, Watch } from '@stencil/core';
import type { BreadcrumbAPI, BreadcrumbLinkProps, BreadcrumbStates, LabelPropType, LinkProps, Stringified } from '../../schema';
import { a11yHintLabelingLandmarks, validateLabel } from '../../schema';

import { addNavLabel, removeNavLabel } from '../../utils/unique-nav-labels';
import { watchNavLinks } from '../nav/validation';

import type { JSX } from '@stencil/core';
import { getFeatureFlag } from 'adopted-style-sheets';
import { KolLinkWcTag } from '../../core/component-names';
import { IconFC } from '../../internal/functional-components/icon/component';

/**
 * The **Breadcrumb** component can be used to display the path to the current position of a web page within a hierarchical structure.
 */
@Component({
	tag: 'kol-breadcrumb',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolBreadcrumb implements BreadcrumbAPI {
	@Element() private readonly host?: HTMLElement;

	private readonly renderLink = (link: BreadcrumbLinkProps, index: number): JSX.Element => {
		const lastIndex = this.state._links.length - 1;

		const showCurrent = getFeatureFlag('breadcrumbCurrentPage', this.host) !== 'hide';
		const showSeparator = showCurrent ? index !== lastIndex : index < lastIndex - 1;

		if (index === lastIndex && !showCurrent) {
			return <></>;
		}

		return (
			<li class="kol-breadcrumb__list-element" key={index}>
				{index === lastIndex ? (
					<span class="kol-breadcrumb__list-element-span" aria-current="page">
						{link._hideLabel ? (
							<IconFC class="kol-breadcrumb__icon" label={link._label} icons={typeof link._icons === 'string' ? link._icons : 'kolicon-link'} />
						) : (
							<>{link._label}</>
						)}
					</span>
				) : (
					<KolLinkWcTag class="kol-breadcrumb__link" _inline={false} {...link}></KolLinkWcTag>
				)}
				{showSeparator && <IconFC class="kol-breadcrumb__separator" label="" icons="kolicon-chevron-right" />}
			</li>
		);
	};

	public render(): JSX.Element {
		return (
			<nav class="kol-breadcrumb" aria-label={this.state._label}>
				<ul class="kol-breadcrumb__list">
					{this.state._links.length === 0 && (
						<li>
							<IconFC class="kol-breadcrumb_icon" label="" icons="kolicon-house" />…
						</li>
					)}
					{this.state._links.map(this.renderLink)}
				</ul>
			</nav>
		);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Defines the list of links combined with their labels to render.
	 */
	@Prop() public _links!: Stringified<BreadcrumbLinkProps[]>;

	@State() public state: BreadcrumbStates = {
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
		a11yHintLabelingLandmarks(value);
		addNavLabel(this.state._label); // add the state instead of prop, because the prop could be invalid and not set as new label
	}

	@Watch('_links')
	public validateLinks(value?: Stringified<LinkProps[]>): void {
		watchNavLinks('KolBreadcrumb', this, value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label, undefined, true);
		this.validateLinks(this._links);
	}

	public disconnectedCallback(): void {
		removeNavLabel(this.state._label);
	}
}
