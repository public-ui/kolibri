import type { LabelPropType, LinkGroupAPI, LinkGroupStates, LinkProps, ListStyleType, Orientation, Stringified } from '@public-ui/schema';
import { validateLabel, watchValidator } from '@public-ui/schema';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

import { addNavLabel, removeNavLabel } from '../../utils/unique-nav-labels';
import { watchNavLinks } from '../nav/validation';

import type { JSX } from '@stencil/core';
const ListItem = (props: { links: LinkProps[]; orientation: Orientation; listStyleType: ListStyleType }): JSX.Element => {
	const list: JSX.Element[] = [];
	props.links.map((link, index: number) => {
		list.push(
			(
				<li
					key={index}
					class={{
						ident: index > 0 && props.orientation === 'vertical',
						'list-none': index === 0 && props.orientation === 'horizontal',
					}}
					style={{
						listStyleType: props.listStyleType,
					}}
				>
					<kol-link {...link}></kol-link>
				</li>
			) as JSX.Element,
		);
	});
	return list;
};

@Component({
	tag: 'kol-link-group',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})

/**
 * @deprecated This component has been deprecated as it does not contribute significantly to accessibility.
 */
export class KolLinkGroup implements LinkGroupAPI {
	public render(): JSX.Element {
		return (
			<Host class="kol-link-group">
				<ol
					aria-label={this.state._label}
					class={{
						vertical: this.state._orientation === 'vertical',
						horizontal: this.state._orientation === 'horizontal',
					}}
				>
					{this.isUl === false ? (
						<ol>
							<ListItem links={this.state._links} orientation={this.state._orientation} listStyleType={this.state._listStyleType} />
						</ol>
					) : (
						<ul>
							<ListItem links={this.state._links} orientation={this.state._orientation} listStyleType={this.state._listStyleType} />
						</ul>
					)}
				</ol>
			</Host>
		);
	}

	private isUl = true;

	/**
	 * Gibt den List-Style-Typen für ungeordnete Listen aus. Wird bei horizontalen LinkGroups als Trenner verwendet
	 */
	@Prop() public _listStyleType?: ListStyleType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType;

	/**
	 * Defines the list of links to render.
	 */
	@Prop() public _links!: Stringified<LinkProps[]>;

	/**
	 * Defines whether the orientation of the component is horizontal or vertical.
	 */
	@Prop() public _orientation?: Orientation = 'vertical';

	@State() public state: LinkGroupStates = {
		_label: '',
		_listStyleType: 'disc',
		_links: [],
		_orientation: 'vertical',
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType, _oldValue?: LabelPropType, initial = false): void {
		if (!initial && this.state._label) {
			removeNavLabel(this.state._label); // remove the current
		}
		validateLabel(this, value, {
			required: true,
		});
		this.state._label && addNavLabel(this.state._label); // add the state instead of prop, because the prop could be invalid and not set as new label
	}

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
			value,
			{ defaultValue: 'disc' },
		);
	}

	@Watch('_links')
	public validateLinks(value?: Stringified<LinkProps[]>): void {
		watchNavLinks('KolLinkGroup', this, value);
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
		this.validateLabel(this._label, undefined, true);
		this.validateListStyleType(this._listStyleType);
		this.validateLinks(this._links);
		this.validateOrientation(this._orientation);
	}

	public disconnectedCallback(): void {
		this.state._label && removeNavLabel(this.state._label);
	}
}

// console.log(
//   stringifyJson([
//     { _label: 'Fehler 1', _id: '#anschrift_anschrift_adresse_strasse', _icons: 'error' },
//     { _label: 'Fehler 2', _id: '#anschrift_anschrift_adresse_hausnummer', _icons: 'error' },
//   ])
// );
