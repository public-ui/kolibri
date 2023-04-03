import { Component, Fragment, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

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
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	ariaLabel: string;
	links: LinkProps[];
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
		default: './style.css',
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
								<kol-icon _ariaLabel="" _icon="codicon codicon-home" />…
							</li>
						)}
						{this.state._links.map((link, index: number) => {
							return (
								<li key={index}>
									{index !== 0 && <kol-icon _ariaLabel="" _icon="codicon codicon-chevron-right" />}
									{index === lastIndex ? (
										<span>
											{link._iconOnly ? (
												<kol-icon _ariaLabel={link._label} _icon={typeof link._icon === 'string' ? link._icon : 'codicon codicon-symbol-event'} />
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
