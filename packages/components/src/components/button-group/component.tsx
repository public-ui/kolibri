import { Component, h, Host, JSX, State } from '@stencil/core';

import { Generic } from '@a11y-ui/core';

/**
 * API
 */
type RequiredProps = unknown;
type OptionalProps = unknown;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-button-group-wc',
	shadow: false,
})
export class KolButtonGroupWc implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		return (
			<Host>
				<slot />
			</Host>
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {};
}
