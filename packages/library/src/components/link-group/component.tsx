import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@public-ui/core';
import { Orientation } from '../../types/orientation';
import { HeadingLevel } from '../../types/heading-level';
import { a11yHintLabelingLandmarks } from '../../utils/a11y.tipps';
import { watchBoolean, watchString, watchValidator } from '../../utils/prop.validators';
import { watchHeadingLevel } from '../heading/validation';
import { NavLinkProps } from '../link/component';
import { watchNavLinks } from '../nav/validation';
import { Stringified } from '../../types/common';

const ListItem = (props: { links: NavLinkProps[]; orientation: Orientation; listStyleType: ListStyleType }): JSX.Element => {
	const list: JSX.Element[] = [];
	props.links.map((link, index: number) => {
		list.push(
			(
				<li
					key={index}
					class={{
						'list-none': index === 0 && props.orientation === 'horizontal',
						'ml-6': index > 0 || props.orientation === 'vertical',
					}}
					style={{
						listStyleType: props.listStyleType,
					}}
				>
					<kol-link exportparts="link" {...link} _ariaLabel={link._label}>
						{link._label}
					</kol-link>
				</li>
			) as JSX.Element
		);
	});
	return list;
};

export type ListStyleType =
	| 'disc'
	| 'circle'
	| 'square'
	| 'none'
	| 'decimal'
	| 'decimal-leading-zero'
	| 'lower-alpha'
	| 'lower-greek'
	| 'lower-latin'
	| 'lower-roman'
	| 'upper-alpha'
	| 'upper-latin'
	| 'upper-roman';

/**
 * API
 */
type RequiredProps = {
	ariaLabel: string;
	links: Stringified<NavLinkProps[]>;
};
type OptionalProps = {
	heading: string;
	level: HeadingLevel;
	listStyleType: ListStyleType;
	ordered: boolean;
	orientation: Orientation;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	ariaLabel: string;
	links: NavLinkProps[];
	listStyleType: ListStyleType;
	orientation: Orientation;
};
type OptionalStates = {
	heading: string;
	level: HeadingLevel;
	ordered: boolean;
};
type States = Generic.Element.Members<RequiredStates, OptionalStates>;
/**
 * @part link - Ermöglicht das Stylen der Links.
 */
@Component({
	tag: 'kol-link-group',
	styleUrls: {
		default: '../style.sass',
	},
	shadow: true,
})
export class KolLinkGroup implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		return (
			<nav
				aria-label={this.state._ariaLabel}
				class={{
					'bg-white': true,
					rounded: true,
					vertical: this.state._orientation === 'vertical',
					horizontal: this.state._orientation === 'horizontal',
				}}
			>
				{typeof this.state._heading === 'string' && this.state._heading?.length > 0 && (
					<kol-heading-wc _level={this.state._level}>{this.state._heading}</kol-heading-wc>
				)}

				{this.isUl === false ? (
					<ol
						class={{
							//'pl-8': this.state._orientation === 'vertical',
							flex: this.state._orientation === 'horizontal',
						}}
					>
						<ListItem links={this.state._links} orientation={this.state._orientation} listStyleType={this.state._listStyleType} />
					</ol>
				) : (
					<ul
						class={{
							flex: this.state._orientation === 'horizontal',
						}}
					>
						<ListItem links={this.state._links} orientation={this.state._orientation} listStyleType={this.state._listStyleType} />
					</ul>
				)}
			</nav>
		);
	}

	private isUl = true;

	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 */
	@Prop() public _ariaLabel!: string;

	/**
	 * Gibt den List-Style-Typen für ungeordnete Listen aus. Wird bei horizontalen LinkGroups als Trenner verwendet
	 */
	@Prop() public _listStyleType?: ListStyleType;

	/**
	 * Gibt die optionale Überschrift zur Link-Gruppe an.
	 */
	@Prop() public _heading?: string;

	/**
	 * Gibt die geordnete Liste der Seitenhierarchie in Links an.
	 */
	@Prop() public _level?: HeadingLevel;

	/**
	 * Gibt die geordnete Liste der Seitenhierarchie in Links an.
	 */
	@Prop() public _links!: Stringified<NavLinkProps[]>;

	/**
	 * @deprecated Wird mittels der Property _list-style-type automatisch gesteuert.
	 * Gibt an, ob eine Ordered- oder eine Unordered-List verwendet werden soll.
	 */
	@Prop() public _ordered?: boolean;

	/**
	 * Gibt die Ausrichtung der LinkList an.
	 */
	@Prop() public _orientation?: Orientation = 'vertical';

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_ariaLabel: '…', // '⚠'
		_listStyleType: 'disc',
		_links: [],
		_orientation: 'vertical',
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_ariaLabel')
	public validateAriaLabel(value?: string): void {
		watchString(this, '_ariaLabel', value, {
			required: true,
		});
		a11yHintLabelingLandmarks(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_listStyleType')
	public validateListStyleType(value?: ListStyleType): void {
		watchValidator(
			this,
			'_listStyleType',
			(value) => {
				switch (value) {
					case 'disc':
					case 'circle':
					case 'square':
					case 'none':
						this.isUl = true;
						return true;
					case 'decimal':
					case 'decimal-leading-zero':
					case 'lower-alpha':
					case 'lower-latin':
					case 'lower-greek':
					case 'lower-roman':
					case 'upper-alpha':
					case 'upper-latin':
					case 'upper-roman':
						this.isUl = false;
						return true;
					default:
						return false;
				}
			},
			new Set(['https://www.w3schools.com/tags/tag_ol.asp']),
			value
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_heading')
	public validateHeading(value?: string): void {
		watchString(this, '_heading', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_links')
	public validateLinks(value?: Stringified<NavLinkProps[]>): void {
		watchNavLinks('KolLinkGroup', this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_ordered')
	public validateOrdered(value?: boolean): void {
		watchBoolean(this, '_ordered', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
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

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateAriaLabel(this._ariaLabel);
		this.validateListStyleType(this._listStyleType);
		this.validateHeading(this._heading);
		this.validateLevel(this._level);
		this.validateLinks(this._links);
		//this.validateOrdered(this._ordered);
		this.validateOrientation(this._orientation);
	}
}

// console.log(
//   stringifyJson([
//     { _label: 'Fehler 1', _id: '#anschrift_anschrift_adresse_strasse', _icon: 'error' },
//     { _label: 'Fehler 2', _id: '#anschrift_anschrift_adresse_hausnummer', _icon: 'error' },
//   ])
// );
