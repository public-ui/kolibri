import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { LinkProps } from '../../types/button-link';
import { Stringified } from '../../types/common';
import { a11yHintLabelingLandmarks } from '../../utils/a11y.tipps';
import { watchString } from '../../utils/prop.validators';
import { watchNavLinks } from '../nav/validation';

/**
 * API
 */
type RequiredProps = {
	ariaLabel: string;
	links: Stringified<LinkProps[]>;
};
type OptionalProps = unknown;
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	ariaLabel: string;
	links: LinkProps[];
};
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

/**
 * @part link - Ermöglicht das Stylen der Links.
 */
@Component({
	tag: 'kol-skip-nav',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolSkipNav implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		return (
			<nav aria-label={this.state._ariaLabel}>
				<ul>
					{this.state._links.map((link: LinkProps, index: number) => {
						return (
							<li key={index}>
								{/*
									This stealth link should be replaced with the kol-link-wc and
									styled only inside skip-nav css.
								*/}
								<kol-link {...link} _stealth={true}></kol-link>
							</li>
						);
					})}
				</ul>
			</nav>
		);
	}

	/**
	 * Gibt den Text an, der die Navigation von anderen Navigationen differenziert.
	 */
	@Prop() public _ariaLabel!: string;

	/**
	 * Setzt die Liste der darzustellenden Links.
	 */
	@Prop() public _links!: Stringified<LinkProps[]>;

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
	public validateLinks(value?: Stringified<LinkProps[]>): void {
		watchNavLinks('KolSkipNav', this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateAriaLabel(this._ariaLabel);
		this.validateLinks(this._links);
	}
}
