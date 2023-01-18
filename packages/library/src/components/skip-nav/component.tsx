import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { a11yHintLabelingLandmarks } from '../../utils/a11y.tipps';
import { watchString } from '../../utils/prop.validators';
import { NavLinkProps } from '../link/component';
import { watchNavLinks } from '../nav/validation';
import { Stringified } from '../../types/common';

/**
 * API
 */
type RequiredProps = {
	ariaLabel: string;
	links: Stringified<NavLinkProps[]>;
};
type OptionalProps = unknown;
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	ariaLabel: string;
	links: NavLinkProps[];
};
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

/**
 * @part link - Ermöglicht das Stylen der Links.
 */
@Component({
	tag: 'kol-skip-nav',
	styleUrls: {
		default: '../style.sass',
	},
	shadow: true,
})
export class KolSkipNav implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		return (
			<nav aria-label={this.state._ariaLabel}>
				<ul class="w-full z-50">
					{this.state._links.map((link: NavLinkProps, index: number) => {
						return (
							<li class="text-center content-center h-0 overflow-y-visible" key={index}>
								<kol-link class="inline-block mt-4 mx-auto w-4/5" exportparts="link" {...link} _ariaLabel={link._ariaLabel} _useCase="nav" _stealth={true}>
									{link._label}
								</kol-link>
								&#160;
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
	 * Ist die Liste der unsichtbaren Links.
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
