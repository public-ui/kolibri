import type { JSX } from '@stencil/core';
import { Component, h, Prop, State, Watch } from '@stencil/core';
import type {
	ButtonOrLinkOrTextWithChildrenProps,
	ButtonWithChildrenProps,
	CollapsiblePropType,
	HideLabelPropType,
	KoliBriIconsProp,
	LabelPropType,
	LinkProps,
	LinkWithChildrenProps,
	NavAPI,
	NavStates,
	Stringified,
} from '../../schema';
import {
	a11yHintLabelingLandmarks,
	devHint,
	validateCollapsible,
	validateHasCompactButton,
	validateHasIconsWhenExpanded,
	validateHideLabel,
	validateLabel,
} from '../../schema';

import { translate } from '../../i18n';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { ButtonController } from '../../internal/functional-components/button/controller';
import { renderButtonFC } from '../../internal/functional-components/button/render';
import { LinkFC } from '../../internal/functional-components/link/component';
import { createLinkStateAccess, initLinkControllerFromProps, LinkController } from '../../internal/functional-components/link/controller';
import type { StencilUnknown } from '../../schema';
import clsx from '../../utils/clsx';
import { createRelatedUniqueId, createUniqueId } from '../../utils/dev.utils';
import { addNavLabel, removeNavLabel } from '../../utils/unique-nav-labels';
import { watchNavLinks } from './validation';

const linkValidator = (link: ButtonOrLinkOrTextWithChildrenProps): boolean => {
	if (typeof link === 'object' && typeof link._label === 'string' /* && typeof newLink._href === 'string' */) {
		if (Array.isArray(link._children)) {
			return linksValidator(link._children);
		}
		return false;
	}
	return true;
};

const linksValidator = (links: ButtonOrLinkOrTextWithChildrenProps[]): boolean => {
	if (Array.isArray(links)) {
		return links.find(linkValidator) !== undefined;
	}
	return true;
};

const entryIsLink = (entryProps: ButtonOrLinkOrTextWithChildrenProps): entryProps is LinkWithChildrenProps => {
	return typeof (entryProps as LinkProps)._href === 'string';
};

const entryIsButton = (entryProps: ButtonOrLinkOrTextWithChildrenProps): entryProps is ButtonWithChildrenProps => {
	return (entryProps as LinkProps)._href === undefined && typeof (entryProps as ButtonWithChildrenProps)._on?.onClick === 'function';
};

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

	@State() private _tick = 0;
	private readonly forceRender = () => this._tick++;
	private navLinkCtrls = new Map<LinkWithChildrenProps, LinkController>();
	private navButtonCtrls = new Map<ButtonOrLinkOrTextWithChildrenProps, ButtonController>();
	private readonly compactButtonCtrl = new ButtonController(BaseWebComponent.stateLess);

	private getNavButtonCtrl(entry: ButtonOrLinkOrTextWithChildrenProps): ButtonController {
		let ctrl = this.navButtonCtrls.get(entry);
		if (!ctrl) {
			ctrl = new ButtonController(BaseWebComponent.stateLess);
			this.navButtonCtrls.set(entry, ctrl);
		}
		return ctrl;
	}

	private syncNavLinkControllers(): void {
		const newEntries = new Set<ButtonOrLinkOrTextWithChildrenProps>();

		const traverse = (links: ButtonOrLinkOrTextWithChildrenProps[]) => {
			for (const link of links) {
				newEntries.add(link);
				if (entryIsLink(link) && !this.navLinkCtrls.has(link)) {
					const ctrl = new LinkController(createLinkStateAccess(this.forceRender));
					initLinkControllerFromProps(ctrl, link as { _href: string } & Partial<Record<string, unknown>>);
					this.navLinkCtrls.set(link, ctrl);
				}
				if (Array.isArray(link._children)) {
					traverse(link._children);
				}
			}
		};

		traverse(this.state._links);

		// Destroy controllers for removed entries
		for (const [entry, ctrl] of this.navLinkCtrls) {
			if (!newEntries.has(entry)) {
				ctrl.destroy();
				this.navLinkCtrls.delete(entry);
			}
		}
		for (const [entry, ctrl] of this.navButtonCtrls) {
			if (!newEntries.has(entry)) {
				ctrl.destroy();
				this.navButtonCtrls.delete(entry);
			}
		}
	}

	private expandChildren(children: ButtonOrLinkOrTextWithChildrenProps[]) {
		this.state = {
			...this.state,
			_expandedChildren: [...this.state._expandedChildren, children],
		};
	}
	private collapseChildren(children: ButtonOrLinkOrTextWithChildrenProps[]) {
		this.state = {
			...this.state,
			_expandedChildren: this.state._expandedChildren.filter((searchChildren) => searchChildren !== children),
		};
	}

	private readonly handleToggleExpansionClick = (children?: ButtonOrLinkOrTextWithChildrenProps[]): void => {
		if (children) {
			if (this.state._expandedChildren.includes(children)) {
				this.collapseChildren(children);
			} else {
				this.expandChildren(children);
			}
		}
	};

	private buildIconObject(collapsible: boolean, expanded: boolean, leftIcon?: string): KoliBriIconsProp {
		const icon = {
			left: '',
			right: '',
		};
		if (this.state._hasIconsWhenExpanded && leftIcon) {
			icon.left = leftIcon;
		}
		if (this.state._hideLabel) {
			if (leftIcon) {
				icon.left = leftIcon;
			} else {
				icon.left = 'kolicon-link';
			}
		}
		if (collapsible) {
			if (expanded) {
				icon.right = 'kolicon-minus';
			} else {
				icon.right = 'kolicon-plus';
			}
		}
		return icon;
	}

	private entry(collapsible: boolean, hasChildren: boolean, entry: ButtonOrLinkOrTextWithChildrenProps, expanded: boolean, ariaID: string): JSX.Element {
		const leftIcon = typeof entry._icons === 'string' ? entry._icons : typeof entry._icons?.left === 'string' ? entry._icons.left : undefined;
		const icons = this.buildIconObject(collapsible && hasChildren, expanded, leftIcon);

		return (
			<div class="kol-nav__entry-wrapper">
				{entryIsLink(entry)
					? (() => {
							const ctrl = this.navLinkCtrls.get(entry)!;
							return (
								<LinkFC
									class={clsx('kol-nav__entry kol-nav__entry--link', {
										'kol-nav__entry--collapsible': collapsible,
									})}
									href={ctrl.getRenderProp('href')}
									label={ctrl.getRenderProp('label')}
									icons={icons}
									hideLabel={ctrl.getRenderProp('hideLabel')}
									target={ctrl.getRenderProp('target')}
									download={ctrl.getRenderProp('download')}
									inline={ctrl.getRenderProp('inline')}
									disabled={ctrl.getRenderProp('disabled')}
									role={ctrl.getRenderProp('role')}
									tabIndex={ctrl.getRenderProp('tabIndex')}
									accessKey={ctrl.getRenderProp('accessKey')}
									shortKey={ctrl.getRenderProp('shortKey')}
									tooltipAlign={ctrl.getRenderProp('tooltipAlign')}
									ariaControls={collapsible && hasChildren && expanded ? ariaID : ctrl.getRenderProp('ariaControls')}
									ariaDescription={ctrl.getRenderProp('ariaDescription')}
									ariaExpanded={collapsible && hasChildren ? String(expanded) : ctrl.getRenderProp('ariaExpanded')}
									ariaOwns={ctrl.getRenderProp('ariaOwns')}
									variant={ctrl.getRenderProp('variant')}
									onAnchorClick={ctrl.handleAnchorClick}
									tooltipId={ctrl.getTooltipId()}
									refTooltipFloating={ctrl.setTooltipRef}
									refAnchor={ctrl.setAnchorRef}
								/>
							);
						})()
					: (() => {
							const ctrl = this.getNavButtonCtrl(entry);
							ctrl.applyProps({
								label: entry._label,
								hideLabel: this.state._hideLabel,
								icons: icons,
								ariaControls: collapsible && hasChildren && expanded ? ariaID : undefined,
								ariaExpanded: collapsible && hasChildren ? expanded : undefined,
								on: {
									onClick: (event: MouseEvent, value: Stringified<StencilUnknown>) => {
										if (entryIsButton(entry) && typeof entry._on.onClick === 'function') {
											entry._on.onClick(event, value);
										}
										this.handleToggleExpansionClick(entry._children);
									},
								},
							});
							return renderButtonFC(ctrl, {
								class: clsx('kol-nav__entry kol-nav__entry--button', {
									'kol-nav__entry--collapsible': collapsible,
								}),
							});
						})()}
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
		//Reset expandedChildren before recalculation
		this.state = {
			...this.state,
			_expandedChildren: [],
		};
		/**
		 * Recursively process branches and expand branches which are active or have active children somewhere in the tree.
		 * @param {ButtonOrLinkOrTextWithChildrenProps} branch
		 * @return boolean - true indicates that the current branch or a child branch is active
		 */
		const handleBranch = (branch: ButtonOrLinkOrTextWithChildrenProps) => {
			if (branch._active) {
				if (branch._children) {
					this.expandChildren(branch._children);
				}
				return true;
			} else if (branch._children) {
				for (const childBranch of branch._children) {
					if (handleBranch(childBranch)) {
						this.expandChildren(branch._children);
						return true;
					}
				}
			}
			return false;
		};
		this.state._links.forEach(handleBranch);
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
						{(() => {
							this.compactButtonCtrl.applyProps({
								ariaControls: this.navId,
								ariaExpanded: !this.state._hideLabel,
								icons: this.state._hideLabel ? 'kolicon-chevron-right' : 'kolicon-chevron-left',
								hideLabel: true,
								label: translate(this.state._hideLabel ? 'kol-nav-maximize' : 'kol-nav-minimize'),
								on: {
									onClick: (): void => {
										this.state = {
											...this.state,
											_hideLabel: !this.state._hideLabel,
										};
									},
								},
								tooltipAlign: 'right',
							});
							return renderButtonFC(this.compactButtonCtrl, { class: 'kol-nav__toggle-button' });
						})()}
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
		this.syncNavLinkControllers();
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
		for (const ctrl of this.navLinkCtrls.values()) {
			ctrl.destroy();
		}
		this.navLinkCtrls.clear();
	}
}
