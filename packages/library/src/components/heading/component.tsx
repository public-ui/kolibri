import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@public-ui/core';
import { HeadingLevel } from '../../types/heading-level';
import { watchHeadingLevel } from './validation';

/**
 * API
 */
type RequiredProps = unknown;
type OptionalProps = {
	level: HeadingLevel;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-heading-wc',
	shadow: false,
})
export class KolHeadingWc implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat.
	 */
	@Prop({ reflect: true }) public _level?: HeadingLevel = 1;

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateLevel(this._level);
	}

	public render(): JSX.Element {
		switch (this.state._level) {
			case 2:
				return (
					<h2>
						<slot />
					</h2>
				);
			case 3:
				return (
					<h3>
						<slot />
					</h3>
				);
			case 4:
				return (
					<h4>
						<slot />
					</h4>
				);
			case 5:
				return (
					<h5>
						<slot />
					</h5>
				);
			case 6:
				return (
					<h6>
						<slot />
					</h6>
				);
			default:
				return (
					<h1>
						<slot />
					</h1>
				);
		}
	}
}
