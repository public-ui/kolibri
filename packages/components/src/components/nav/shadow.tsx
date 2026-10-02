import type { JSX } from '@stencil/core';
import { Component, h, Prop, State, Watch } from '@stencil/core';
import type { ButtonOrLinkOrTextWithChildrenProps, CollapsiblePropType, HideLabelPropType, LabelPropType, NavAPI, NavStates, Stringified } from '../../schema';
import {
	a11yHintLabelingLandmarks,
	devHint,
	validateCollapsible,
	validateHasCompactButton,
	validateHasIconsWhenExpanded,
	validateHideLabel,
	validateLabel,
} from '../../schema';

import { KolButtonWcTag, KolLinkWcTag } from '../../core/component-names';
import { translate } from '../../i18n';
import { buildEntryIcons, getInitiallyExpanded, getLeftIcon, isButtonEntry, isLinkEntry, toggleExpanded } from '../../internal/functional-components/nav/model';
import type { StencilUnknown } from '../../schema';
import clsx from '../../utils/clsx';
import { createRelatedUniqueId, createUniqueId } from '../../utils/dev.utils';
import { addNavLabel, removeNavLabel } from '../../utils/unique-nav-labels';
import { watchNavLinks } from './validation';

/**
 * The **Nav** component renders a group of related links or navigation elements that perform an action or display content when clicked.
 * It provides a highly configurable vertical or horizontal navigation bar that can represent multiple levels and vary in width.
 */
@Component({
	tag: 'kol-nav',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolNav implements NavAPI {
	private readonly navId = createUniqueId('kol-nav');

	private readonly listId = createRelatedUniqueId(this.navId, 'list');

	private readonly handleToggleExpansionClick = (children?: ButtonOrLinkOrTextWithChildrenProps[]): void => {
		if (children) {
			this.state = {
				...this.state,
				_expandedChildren: toggleExpanded(this.state._expandedChildren, children),
			};
		}
	};

	private entry(collapsible: boolean, hasChildren: boolean, entry: ButtonOrLinkOrTextWithChildrenProps, expanded: boolean, ariaID: string): JSX.Element {
		const icons = buildEntryIcons({
			collapsible: collapsible && hasChildren,
			expanded,
			hasIconsWhenExpanded: this.state._hasIconsWhenExpanded,
			hideLabel: this.state._hideLabel,
			leftIcon: getLeftIcon(entry),
		});

		return (
			<div class="kol-nav__entry-wrapper">
				{isLinkEntry(entry) ? (
					<KolLinkWcTag
						class={clsx('kol-nav__entry kol-nav__entry--link', {
							'kol-nav__entry--collapsible': collapsible,
						})}
						{...entry}
						_hideLabel={this.state._hideLabel}
						_icons={icons}
						_ariaControls={collapsible && hasChildren && expanded ? ariaID : undefined}
						_ariaExpanded={collapsible && hasChildren ? expanded : undefined}
					/>
				) : (
					<KolButtonWcTag
						class={clsx('kol-nav__entry kol-nav__entry--button', {
							'kol-nav__entry--collapsible': collapsible,
						})}
						_label={entry._label}
						_disabled={isButtonEntry(entry) ? entry._disabled : undefined}
						_hideLabel={this.state._hideLabel}
						_icons={icons}
						_ariaControls={collapsible && hasChildren && expanded ? ariaID : undefined}
						_ariaExpanded={collapsible && hasChildren ? expanded : undefined}
						_on={{
							onClick: (event: MouseEvent, value: Stringified<StencilUnknown>) => {
								if (isButtonEntry(entry) && typeof entry._on.onClick === 'function') {
									entry._on.onClick(event, value);
								}
								this.handleToggleExpansionClick(entry._children);
							},
						}}
					/>
				)}
			</div>
		);
	}

	private li(collapsible: boolean, deep: number, index: number, link: ButtonOrLinkOrTextWithChildrenProps, ariaIDparent: string): JSX.Element {
		const active = !!link._active;
		const hasChildren = Array.isArray(link._children) && link._children.length > 0;
		const expanded = Boolean(link._children && this.state._expandedChildren.includes(link._children));
		const ariaID = createRelatedUniqueId(ariaIDparent, `${deep}-${index}`);
		return (
			<li
				class={clsx('kol-nav__list-item', {
					'kol-nav__list-item--active': active,
					'kol-nav__list-item--expanded': expanded,
					'kol-nav__list-item--has-children': hasChildren,
				})}
				key={index}
			>
				{this.entry(collapsible, hasChildren, link, expanded, ariaID)}
				{expanded && <this.linkList collapsible={collapsible} deep={deep + 1} links={link._children || []} id={ariaID} />}
			</li>
		);
	}

	private linkList = (props: { collapsible: boolean; deep: number; links: ButtonOrLinkOrTextWithChildrenProps[]; id: string }): JSX.Element => {
		return (
			<ul
				class={clsx('kol-nav__list', {
					'kol-nav__list--nested': props.deep > 0,
					'kol-nav__list--vertical': props.deep !== 0,
				})}
				id={props.deep > 0 ? props.id : undefined}
			>
				{props.links.map((link, index: number) => {
					return this.li(props.collapsible, props.deep, index, link, props.id);
				})}
			</ul>
		);
	};

	private initializeExpandedChildren() {
		this.state = {
			...this.state,
			_expandedChildren: getInitiallyExpanded(this.state._links),
		};
	}

	public render(): JSX.Element {
		const collapsible = this.state._collapsible === true;
		return (
			<div
				class={clsx('kol-nav', {
					'kol-nav--is-compact': this.state._hideLabel,
				})}
			>
				<nav aria-label={this.state._label} class="kol-nav__navigation" id={this.navId}>
					<this.linkList collapsible={collapsible} deep={0} links={this.state._links} id={this.listId}></this.linkList>
				</nav>
				{this.state._hasCompactButton && (
					<div class="kol-nav__compact">
						<KolButtonWcTag
							class="kol-nav__toggle-button"
							_ariaControls={this.navId}
							_ariaExpanded={!this.state._hideLabel}
							_icons={this.state._hideLabel ? 'kolicon-chevron-right' : 'kolicon-chevron-left'}
							_hideLabel
							_label={this.state._hideLabel ? translate('kol-nav-maximize') : translate('kol-nav-minimize')}
							_on={{
								onClick: (): void => {
									this.state = {
										...this.state,
										_hideLabel: !this.state._hideLabel,
									};
								},
							}}
							_tooltipAlign="right"
						></KolButtonWcTag>
					</div>
				)}
			</div>
		);
	}

	/**
	 * Defines if navigation nodes can be collapsed or not. Enabled by default.
	 * @TODO: Change type back to `CollapsiblePropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _collapsible?: boolean = true;

	/**
	 * Creates a button below the navigation, that toggles _collapsible.
	 */
	@Prop() public _hasCompactButton?: boolean = false;

	/**
	 * Shows icons next to the navigation item labels, even when the navigation is not collapsed.
	 */
	@Prop() public _hasIconsWhenExpanded?: boolean = false;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Defines the list of links, buttons or texts to render.
	 */
	@Prop() public _links!: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>;

	@State() public state: NavStates = {
		_collapsible: true,
		_hasCompactButton: false,
		_hasIconsWhenExpanded: false,
		_hideLabel: false,
		_label: '', // ⚠ required
		_links: [],
		_expandedChildren: [],
	};

	@Watch('_collapsible')
	public validateCollapsible(value?: CollapsiblePropType): void {
		validateCollapsible(this, value);
	}

	@Watch('_hasCompactButton')
	public validateHasCompactButton(value?: boolean): void {
		validateHasCompactButton(this, value);
	}

	@Watch('_hasIconsWhenExpanded')
	public validateHasIconsWhenExpanded(value?: boolean): void {
		validateHasIconsWhenExpanded(this, value);
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: HideLabelPropType) {
		validateHideLabel(this, value);
	}

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
	public validateLinks(value?: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>): void {
		watchNavLinks('KolNav', this, value);
		devHint(`[KolNav] The navigation structure is not yet validated recursively.`);
		//Re-initialize expansion on links change
		this.initializeExpandedChildren();
	}

	public componentWillLoad(): void {
		this.validateCollapsible(this._collapsible);
		this.validateHideLabel(this._hideLabel);
		this.validateHasCompactButton(this._hasCompactButton);
		this.validateHasIconsWhenExpanded(this._hasIconsWhenExpanded);
		this.validateLabel(this._label, undefined, true);
		this.validateLinks(this._links);
		this.initializeExpandedChildren();
	}

	public disconnectedCallback(): void {
		removeNavLabel(this.state._label);
	}
}
