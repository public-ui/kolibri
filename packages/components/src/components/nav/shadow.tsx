import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { ButtonOrLinkOrTextWithChildrenProps, ButtonWithChildrenProps } from '../../types/button-link-text';
import { Stringified } from '../../types/common';
import { Orientation } from '../../types/orientation';
import { AriaCurrentPropType } from '../../types/props/aria-current';
import { CollapsiblePropType, validateCollapsible } from '../../types/props/collapsible';
import { validateHasCompactButton } from '../../types/props/has-compact-button';
import { HideLabelPropType, validateHideLabel } from '../../types/props/hide-label';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { a11yHintLabelingLandmarks, devHint, devWarning } from '../../utils/a11y.tipps';
import { watchValidator } from '../../utils/prop.validators';
import { addNavLabel, removeNavLabel } from '../../utils/unique-nav-labels';
import { API, States } from './types';
import { watchNavLinks } from './validation';
import { KolButtonLinkTextSwitchTag, KolButtonTag, KolButtonWcTag } from '../../core/component-names';

/**
 * @deprecated Removed in v2
 */
export type KoliBriNavVariant = 'primary' | 'secondary';

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

@Component({
	tag: 'kol-nav',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolNav implements API {
	private readonly onClick = (link: ButtonOrLinkOrTextWithChildrenProps): void => {
		link._active = !link._active;
		this.state = {
			...this.state,
		};
	};

	private readonly hasActiveChild = (link: ButtonOrLinkOrTextWithChildrenProps): boolean => {
		if (Array.isArray(link._children) && link._children.length > 0) {
			return link._children.some(this.hasActiveChild);
		}

		return false;
	};

	private entry(
		collapsible: boolean,
		hideLabel: HideLabelPropType,
		hasChildren: boolean,
		link: ButtonOrLinkOrTextWithChildrenProps,
		expanded: boolean,
	): JSX.Element {
		return (
			<div class={{ entry: true, 'hide-label': hideLabel }}>
				<KolButtonLinkTextSwitchTag
					_link={{
						...link,
						_hideLabel: hideLabel,
					}}
				/>
				{hasChildren ? this.expandButton(collapsible, link as ButtonWithChildrenProps, expanded) : ''}
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
				_label={`Untermenü zu ${link._label} ${expanded ? 'schließen' : 'öffnen'}`}
				_on={{ onClick: () => this.onClick(link) }}
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
		const expanded = hasChildren && active;
		return (
			<li
				class={{
					active,
					expanded,
					'has-children': hasChildren,
					selected: expanded, // TODO: remove in v2
				}}
				key={index}
			>
				{this.entry(collapsible, hideLabel, hasChildren, link, active)}
				{expanded ? (
					<this.linkList collapsible={collapsible} hideLabel={hideLabel} deep={deep + 1} links={link._children || []} orientation={orientation} />
				) : (
					''
				)}
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
						[orientation]: true,
						[this.state._variant]: true,
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
								_label={translate(hideLabel ? 'kol-nav-maximize' : 'kol-nav-minimize')}
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
	 * Defines the value of aria-current to be used with the current context within the navigation.
	 */
	@Prop() public _ariaCurrentValue: AriaCurrentPropType = false;

	/**
	 * Deprecated: Setzt die semantische Beschriftung der Komponente.
	 *
	 * @deprecated use _label instead
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * Defines if navigation nodes can be collapsed or not. Enabled by default.
	 * @TODO: Change type back to `CollapsiblePropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _collapsible?: boolean = true;

	/**
	 * Deprecated: Gibt an, ob die Navigation kompakt angezeigt wird.
	 * @deprecated Use _hide-label
	 */
	@Prop() public _compact?: boolean = false;

	/**
	 * Deprecated: Gibt an, ob die Navigation eine zusätzliche Schaltfläche zum Aus- und Einklappen der Navigation anzeigen soll.
	 * @deprecated Version 2
	 */
	@Prop() public _hasCompactButton?: boolean = false;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType; // TODO: required in v2

	/**
	 * Defines the list of links, buttons or texts to render.
	 */
	@Prop() public _links!: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>;

	/**
	 * Defines whether the orientation of the component is horizontal or vertical.
	 */
	@Prop() public _orientation?: Orientation = 'vertical';

	/**
	 * Deprecated: Defines which variant should be used for presentation.
	 *
	 * @deprecated This property is deprecated and will be removed in the next major version.
	 */
	@Prop() public _variant?: KoliBriNavVariant = 'primary';

	@State() public state: States = {
		_ariaCurrentValue: false,
		_collapsible: true,
		_hasCompactButton: false,
		_hideLabel: false,
		_label: '…', // ⚠ required
		_links: [],
		_orientation: 'vertical',
		_variant: 'primary',
	};

	@Watch('_ariaCurrentValue')
	public validateAriaCurrentValue(value?: AriaCurrentPropType): void {
		watchValidator(
			this,
			'_ariaCurrentValue',
			(value) => value === true || value === 'date' || value === 'location' || value === 'page' || value === 'step' || value === 'time',
			new Set(['boolean', 'String {data, location, page, step, time}']),
			value,
		);
	}

	/**
	 * @deprecated
	 */
	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		this.validateLabel(value);
	}

	@Watch('_collapsible')
	public validateCollapsible(value?: CollapsiblePropType): void {
		validateCollapsible(this, value);
	}

	@Watch('_compact')
	public validateCompact(value?: boolean): void {
		this.validateHideLabel(value);
	}

	/**
	 * @deprecated Version 2
	 */
	@Watch('_hasCompactButton')
	public validateHasCompactButton(value?: boolean): void {
		validateHasCompactButton(this, value);
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
		devHint(`[KolNav] Die Navigationsstruktur wird noch nicht rekursiv validiert.`);
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

	@Watch('_variant')
	public validateVariant(value?: KoliBriNavVariant): void {
		watchValidator(this, '_variant', (value) => value === 'primary' || value === 'secondary', new Set(['KoliBriNavVariant {primary, secondary}']), value, {
			defaultValue: 'primary',
		});
	}

	public componentWillLoad(): void {
		this.validateAriaCurrentValue(this._ariaCurrentValue);
		this.validateCollapsible(this._collapsible);
		this.validateHideLabel(this._hideLabel || this._compact);
		this.validateHasCompactButton(this._hasCompactButton);
		this.validateLabel(this._label || this._ariaLabel, undefined, true);
		this.validateLinks(this._links);
		this.validateOrientation(this._orientation);
		this.validateVariant(this._variant);
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
