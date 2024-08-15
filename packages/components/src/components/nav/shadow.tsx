import type {
	ButtonOrLinkOrTextWithChildrenProps,
	ButtonWithChildrenProps,
	CollapsiblePropType,
	HideLabelPropType,
	LabelPropType,
	LinkProps,
	LinkWithChildrenProps,
	NavAPI,
	NavStates,
	Orientation,
	Stringified,
} from '../../schema';
import {
	a11yHintLabelingLandmarks,
	devHint,
	devWarning,
	validateCollapsible,
	validateHasCompactButton,
	validateHasIconsWhenExpanded,
	validateHideLabel,
	validateLabel,
	watchValidator,
} from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { addNavLabel, removeNavLabel } from '../../utils/unique-nav-labels';
import { watchNavLinks } from './validation';
import { KolButtonTag, KolButtonWcTag, KolLinkWcTag } from '../../core/component-names';
import type { StencilUnknown } from '../../schema';

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

@Component({
	tag: 'kol-nav',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolNav implements NavAPI {
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

	private entry(
		collapsible: boolean,
		hideLabel: HideLabelPropType,
		hasChildren: boolean,
		entry: ButtonOrLinkOrTextWithChildrenProps,
		expanded: boolean,
	): JSX.Element {
		const icons =
			this.state._hasIconsWhenExpanded || this.state._hideLabel
				? entry._icons || (this.state._hideLabel ? 'codicon codicon-symbol-method' : undefined)
				: undefined;

		return (
			<div class={{ entry: true, 'hide-label': hideLabel }}>
				{entryIsLink(entry) ? (
					<KolLinkWcTag class="entry-item" {...entry} _hideLabel={hideLabel} _icons={icons} />
				) : (
					<KolButtonWcTag
						class="entry-item"
						_label={entry._label}
						_hideLabel={hideLabel}
						_icons={icons}
						_on={{
							onClick: (event: MouseEvent, value: Stringified<StencilUnknown>) => {
								if (entryIsButton(entry) && typeof entry._on.onClick === 'function') {
									entry._on.onClick(event, value);
								} else {
									this.handleToggleExpansionClick(entry._children);
								}
							},
						}}
					/>
				)}

				{hasChildren ? this.expandButton(collapsible, entry as ButtonWithChildrenProps, expanded) : ''}
			</div>
		);
	}

	private expandButton(collapsible: boolean, link: ButtonWithChildrenProps, expanded: boolean): JSX.Element {
		return (
			<KolButtonWcTag
				class="expand-button"
				_ariaExpanded={expanded}
				_disabled={!collapsible}
				_icons={'codicon codicon-' + (expanded ? 'remove' : 'add')}
				_hideLabel
				_label={`${expanded ? translate('kol-nav-label-close', { placeholders: { label: link._label } }) : translate('kol-nav-label-open', { placeholders: { label: link._label } })}`}
				_on={{ onClick: () => this.handleToggleExpansionClick(link._children) }}
			></KolButtonWcTag>
		);
	}

	private li(
		collapsible: boolean,
		hideLabel: HideLabelPropType,
		deep: number,
		index: number,
		link: ButtonOrLinkOrTextWithChildrenProps,
		orientation: Orientation,
	): JSX.Element {
		const active = !!link._active;
		const hasChildren = Array.isArray(link._children) && link._children.length > 0;
		const expanded = Boolean(link._children && this.state._expandedChildren.includes(link._children));
		return (
			<li
				class={{
					active,
					expanded,
					'has-children': hasChildren,
				}}
				key={index}
			>
				{this.entry(collapsible, hideLabel, hasChildren, link, expanded)}
				{expanded && <this.linkList collapsible={collapsible} hideLabel={hideLabel} deep={deep + 1} links={link._children || []} orientation={orientation} />}
			</li>
		);
	}

	private linkList = (props: {
		collapsible: boolean;
		hideLabel: HideLabelPropType;
		deep: number;
		links: ButtonOrLinkOrTextWithChildrenProps[];
		orientation: Orientation;
	}): JSX.Element => {
		return (
			<ul class={`list ${props.deep === 0 && props.orientation === 'horizontal' ? ' horizontal' : ' vertical'}`} data-deep={props.deep}>
				{props.links.map((link, index: number) => {
					return this.li(props.collapsible, props.hideLabel, props.deep, index, link, props.orientation);
				})}
			</ul>
		);
	};

	private initializeExpandedChildren() {
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
		let hasCompactButton = this.state._hasCompactButton;
		if (this.state._orientation === 'horizontal' && this.state._hasCompactButton === true) {
			hasCompactButton = false;
			devWarning(`[KolNav] Wenn eine horizontale Navigation verwendet wird, kann die Option _hasCompactButton nicht aktiviert werden.`);
		}
		const collapsible = this.state._collapsible === true;
		const hideLabel = this.state._hideLabel === true;
		const orientation = this.state._orientation;
		return (
			<Host class="kol-nav">
				<div
					class={{
						nav: true,
						[orientation]: true,
						'is-compact': this.state._hideLabel,
					}}
				>
					<nav aria-label={this.state._label} id="nav">
						<this.linkList collapsible={collapsible} hideLabel={hideLabel} deep={0} links={this.state._links} orientation={orientation}></this.linkList>
					</nav>
					{hasCompactButton && (
						<div class="compact">
							<KolButtonTag
								_ariaControls="nav"
								_ariaExpanded={!hideLabel}
								_icons={hideLabel ? 'codicon codicon-chevron-right' : 'codicon codicon-chevron-left'}
								_hideLabel
								_label={translate(hideLabel ? 'kol-nav-maximize' : 'kol-nav-minimize') || ''}
								_on={{
									onClick: (): void => {
										this.state = {
											...this.state,
											_hideLabel: this.state._hideLabel === false,
										};
									},
								}}
								_tooltipAlign="right"
								_variant="ghost"
							></KolButtonTag>
						</div>
					)}
				</div>
			</Host>
		);
	}

	/**
	 * Defines if navigation nodes can be collapsed or not. Enabled by default.
	 * @TODO: Change type back to `CollapsiblePropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _collapsible?: boolean;

	/**
	 * Creates a button below the navigation, that toggles _collapsible. Only available for _orientation="vertical".
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

	/**
	 * Defines whether the orientation of the component is horizontal or vertical.
	 */
	@Prop() public _orientation?: Orientation = 'vertical';

	@State() public state: NavStates = {
		_collapsible: true,
		_hasCompactButton: false,
		_hasIconsWhenExpanded: false,
		_hideLabel: false,
		_label: '', // ⚠ required
		_links: [],
		_orientation: 'vertical',
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
	}

	@Watch('_orientation')
	public validateOrientation(value?: Orientation): void {
		watchValidator(
			this,
			'_orientation',
			(value): boolean => value === 'horizontal' || value === 'vertical',
			new Set(['Orientation {horizontal, vertical}']),
			value,
			{
				defaultValue: 'vertical',
			},
		);
	}

	public componentWillLoad(): void {
		this.validateCollapsible(this._collapsible);
		this.validateHideLabel(this._hideLabel);
		this.validateHasCompactButton(this._hasCompactButton);
		this.validateHasIconsWhenExpanded(this._hasIconsWhenExpanded);
		this.validateLabel(this._label, undefined, true);
		this.validateLinks(this._links);
		this.validateOrientation(this._orientation);
		this.initializeExpandedChildren();
	}

	public disconnectedCallback(): void {
		removeNavLabel(this.state._label);
	}
}

// console.log(
//   stringifyJson([
//     { _label: '1 Navigationspunkt', _href: '#abc', _icons: 'codicon codicon-folder-closed', _target: 'asdasd' },
//     { _label: '2 Navigationspunkt', _href: '#abc', _icons: 'codicon codicon-folder-closed' },
//     {
//       _active: true,
//       _label: '3 Navigationspunkt',
//       _href: '#abc',
//       _icons: 'codicon codicon-folder-closed',
//       _children: [
//         { _label: '3.1 Navigationspunkt', _href: '#abc', _icons: 'codicon codicon-folder-closed' },
//         { _label: '3.2 Navigationspunkt', _href: '#abc', _icons: 'codicon codicon-folder-closed', _target: 'asdasd' },
//         {
//           _active: true,
//           _label: '3.3 Navigationspunkt',
//           _href: '#abc',
//           _children: [
//             { _active: true, _label: '3.3.1 Navigationspunkt (aktiv)', _href: '#abc' },
//             { _label: '3.3.2 Navigationspunkt', _href: '#abc' },
//           ],
//         },
//         {
//           _label: '3.4 Navigationspunkt',
//           _href: '#abc',
//           _children: [
//             { _label: '3.4.1 Navigationspunkt', _href: '#abc' },
//             { _label: '3.4.2 Navigationspunkt', _href: '#abc' },
//           ],
//         },
//         { _label: '3.5 Navigationspunkt', _href: '#abc' },
//       ],
//     },
//     { _label: '4 Navigationspunkt', _href: '#abc' },
//   ])
// );
