import { Component, h, Host, JSX, State } from '@stencil/core';

import { Generic } from '@public-ui/core';

/**
 * API
 */
type RequiredProps = unknown;
type OptionalProps = unknown;
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-button-group',
	styleUrls: {
		default: './style.sass',
	},
	shadow: true,
})
export class KolButtonGroup implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		return (
			<Host>
				<div class="flex flex-wrap bg-normal">
					<slot />
				</div>
			</Host>
		);
	}

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {};
}
