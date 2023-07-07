import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { ButtonOrLinkOrTextWithChildrenProps, ButtonWithChildrenProps } from '../../types/button-link-text';
import { Stringified } from '../../types/common';
import { Orientation } from '../../types/orientation';
import { AriaCurrent } from '../../types/props/aria-current';
import { validateCollapsible } from '../../types/props/collapsible';
import { validateCompact } from '../../types/props/compact';
import { validateHasCompactButton } from '../../types/props/has-compact-button';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { a11yHintLabelingLandmarks, devHint, devWarning } from '../../utils/a11y.tipps';
import { watchValidator } from '../../utils/prop.validators';
import { KoliBriNavAPI, KoliBriNavStates } from './types';
import { watchNavLinks } from './validation';

/**
 * @deprecated
 */
export type KoliBriNavVariant = 'primary' | 'secondary';

/**
 * There can be several navigations on one page (e.g. main navigation, subnavigation, breadcrumbs).
 * The navigations must be clearly named for accessibility reasons. To ensure this, all Aria labels are
 * stored in an set and checked for uniqueness.
 */
const UNIQUE_ARIA_LABEL: Set<string> = new Set();
function addAriaLabel(ariaLabel: string): void {
	if (UNIQUE_ARIA_LABEL.has(ariaLabel)) {
		console.error(`There already is a kol-nav with the label "${ariaLabel}"`);
	} else {
		UNIQUE_ARIA_LABEL.add(ariaLabel);
	}
}
function removeAriaLabel(ariaLabel: string): void {
	UNIQUE_ARIA_LABEL.delete(ariaLabel);
}

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
		default: './style.css',
	},
	shadow: true,
})
export class KolNav implements KoliBriNavAPI {
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

	private entry(collapsible: boolean, compact: boolean, hasChildren: boolean, link: ButtonOrLinkOrTextWithChildrenProps, selected: boolean): JSX.Element {
		return (
			<div class="entry">
				<kol-button-link-text-switch _has-children={hasChildren} _hide-label={compact} _link={link} _selected={selected} />
				{hasChildren ? this.expandButton(collapsible, link as ButtonWithChildrenProps, selected) : ''}
			</div>
		);
	}

	private expandButton(collapsible: boolean, link: ButtonWithChildrenProps, selected: boolean): JSX.Element {
		return (
			<kol-button-wc
				class="expand-button"
				_ariaExpanded={selected}
				_disabled={!collapsible}
				_icon={'codicon codicon-' + (selected ? 'remove' : 'add')}
				_hideLabel
				_label={`Untermenü zu ${link._label} ${selected ? 'schließen' : 'öffnen'}`}
				_on={{ onClick: () => this.onClick(link) }}
			></kol-button-wc>
		);
	}

	private li(
		collapsible: boolean,
		compact: boolean,
		deep: number,
		index: number,
		link: ButtonOrLinkOrTextWithChildrenProps,
		orientation: Orientation
	): JSX.Element {
		const hasChildren = Array.isArray(link._children) && link._children.length > 0;
		const selected = !!link._active;
		const expanded = hasChildren && !!link._active;
		return (
			<li class={{ expanded, selected, 'has-children': hasChildren }} key={index}>
				{this.entry(collapsible, compact, hasChildren, link, selected)}
				{hasChildren && selected ? (
					<this.linkList collapsible={collapsible} compact={compact} deep={deep + 1} links={link._children || []} orientation={orientation} />
				) : (
					''
				)}
			</li>
		);
	}

	private linkList = (props: {
		collapsible: boolean;
		compact: boolean;
		deep: number;
		links: ButtonOrLinkOrTextWithChildrenProps[];
		orientation: Orientation;
	}): JSX.Element => {
		return (
			<ul class={`list ${props.deep === 0 && props.orientation === 'horizontal' ? ' horizontal' : ' vertical'}`} data-deep={props.deep}>
				{props.links.map((link, index: number) => {
					return this.li(props.collapsible, props.compact, props.deep, index, link, props.orientation);
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
		const compact = this.state._compact === true;
		const orientation = this.state._orientation;
		return (
			<Host>
				<div
					class={{
						[orientation]: true,
						[this.state._variant]: true,
					}}
				>
					<nav aria-label={this.state._label} id="nav">
						<this.linkList collapsible={collapsible} compact={compact} deep={0} links={this.state._links} orientation={orientation}></this.linkList>
					</nav>
					{hasCompactButton && (
						<div class="mt-2 w-full compact">
							<kol-button
								_ariaControls="nav"
								_ariaExpanded={!compact}
								_icon={compact ? 'codicon codicon-chevron-right' : 'codicon codicon-chevron-left'}
								_hideLabel
								_label={translate(compact ? 'kol-nav-maximize' : 'kol-nav-minimize')}
								_on={{
									onClick: (): void => {
										this.state = {
											...this.state,
											_compact: this.state._compact === false,
										};
									},
								}}
								_tooltipAlign="right"
								_variant="ghost"
							></kol-button>
						</div>
					)}
				</div>
			</Host>
		);
	}

	/**
	 * Gibt den Wert von aria-current an, der bei dem aktuellen Kontext innerhalb der Navigation verwendet werden soll.
	 */
	@Prop() public _ariaCurrentValue: AriaCurrent = false;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 *
	 *  @deprecated use _label instead
	 */
	@Prop() public _ariaLabel?: string;

	/**
	 * Gibt an, ob Knoten in der Navigation zusammengeklappt werden können. Ist standardmäßig aktiv.
	 */
	@Prop() public _collapsible?: boolean = true;

	/**
	 * Gibt an, ob die Navigation kompakt angezeigt wird.
	 */
	@Prop() public _compact?: boolean = false;

	/**
	 * Gibt an, ob die Navigation eine zusätzliche Schaltfläche zum Aus- und Einklappen der Navigation anzeigen soll.
	 * @deprecated Version 2
	 */
	@Prop() public _hasCompactButton?: boolean = false;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label?: LabelPropType; // TODO: required in v2

	/**
	 * Gibt die Liste der darzustellenden Button, Links oder Texte an.
	 */
	@Prop() public _links!: Stringified<ButtonOrLinkOrTextWithChildrenProps[]>;

	/**
	 * Gibt die horizontale oder vertikale Ausrichtung der Komponente an.
	 */
	@Prop() public _orientation?: Orientation = 'vertical';

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 *
	 * @deprecated This property is deprecated and will be removed in the next major version.
	 */
	@Prop() public _variant?: KoliBriNavVariant = 'primary';

	@State() public state: KoliBriNavStates = {
		_ariaCurrentValue: false,
		_label: '…', // ⚠ required
		_collapsible: true,
		_hasCompactButton: false,
		_links: [],
		_orientation: 'vertical',
		_variant: 'primary',
	};

	@Watch('_ariaCurrentValue')
	public validateAriaCurrentValue(value?: AriaCurrent): void {
		watchValidator(
			this,
			'_ariaCurrentValue',
			(value) => value === true || value === 'date' || value === 'location' || value === 'page' || value === 'step' || value === 'time',
			new Set(['boolean', 'String {data, location, page, step, time}']),
			value
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
	public validateCollapsible(value?: boolean): void {
		validateCollapsible(this, value);
	}

	@Watch('_compact')
	public validateCompact(value?: boolean): void {
		validateCompact(this, value);
	}

	/**
	 * @deprecated Version 2
	 */
	@Watch('_hasCompactButton')
	public validateHasCompactButton(value?: boolean): void {
		validateHasCompactButton(this, value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		removeAriaLabel(this.state._label); // remove the current
		validateLabel(this, value);
		a11yHintLabelingLandmarks(value);
		addAriaLabel(this.state._label); // add the new; not value, because that could be invalid and not set as new label
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
			}
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
		this.validateCompact(this._compact);
		this.validateHasCompactButton(this._hasCompactButton);
		this.validateLabel(this._label || this._ariaLabel);
		this.validateLinks(this._links);
		this.validateOrientation(this._orientation);
		this.validateVariant(this._variant);
	}

	public disconnectedCallback(): void {
		removeAriaLabel(this.state._label);
	}
}

// console.log(
//   stringifyJson([
//     { _label: '1 Navigationspunkt', _href: '#abc', _icon: 'codicon codicon-folder-closed', _target: 'asdasd' },
//     { _label: '2 Navigationspunkt', _href: '#abc', _icon: 'codicon codicon-folder-closed' },
//     {
//       _active: true,
//       _label: '3 Navigationspunkt',
//       _href: '#abc',
//       _icon: 'codicon codicon-folder-closed',
//       _children: [
//         { _label: '3.1 Navigationspunkt', _href: '#abc', _icon: 'codicon codicon-folder-closed' },
//         { _label: '3.2 Navigationspunkt', _href: '#abc', _icon: 'codicon codicon-folder-closed', _target: 'asdasd' },
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
