import { Component, Fragment, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@public-ui/core';
import { Stringified } from '../../types/common';
import { Icofont } from '../../types/icofont';
import { a11yHintLabelingLandmarks } from '../../utils/a11y.tipps';
import { watchString } from '../../utils/prop.validators';
import { NavLinkProps } from '../link/component';
import { watchNavLinks } from '../nav/validation';

/**
 * API
 */
type RequiredProps = {
	ariaLabel: string;
	links: Stringified<NavLinkProps[]>;
};
type OptionalProps = unknown;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	ariaLabel: string;
	links: NavLinkProps[];
};
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

/**
 * @part link - Ermöglicht das Stylen der Links.
 * @part separator - Ermöglicht das Ändern des Separator-Icons.
 */
@Component({
	tag: 'kol-breadcrumb',
	styleUrls: {
		default: '../style.sass',
	},
	shadow: true,
})
export class KolBreadcrumb implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		const lastIndex = this.state._links.length - 1;
		return (
			<Host>
				<nav aria-label={this.state._ariaLabel}>
					<ul>
						{this.state._links.length === 0 && (
							<li>
								<kol-icon-icofont _ariaLabel="" _icon="home" />…
							</li>
						)}
						{this.state._links.map((link, index: number) => {
							return (
								<li key={index}>
									{index !== 0 && <kol-icon-icofont _ariaLabel="" _icon="rounded-right" _part="separator" exportparts="separator" />}
									{index === lastIndex ? (
										<span>
											{link._iconOnly ? (
												<kol-icon-icofont _ariaLabel={link._label as string} _icon={link._icon as Icofont} />
											) : (
												<Fragment>{link._label}</Fragment>
											)}
										</span>
									) : (
										<kol-link exportparts="link" _useCase="nav" {...link} _ariaLabel={link._label}>
											{link._label}
										</kol-link>
									)}
								</li>
							);
						})}
					</ul>
				</nav>
			</Host>
		);
	}

	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 */
	@Prop() public _ariaLabel!: string;

	/**
	 * Gibt die geordnete Liste der Seitenhierarchie in Links an.
	 */
	@Prop() public _links!: Stringified<NavLinkProps[]>;

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_ariaLabel: '…', // '⚠'
		_links: [],
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
	@Watch('_links')
	public validateLinks(value?: Stringified<NavLinkProps[]>): void {
		watchNavLinks('KolBreadcrumb', this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateAriaLabel(this._ariaLabel);
		this.validateLinks(this._links);
	}
}
