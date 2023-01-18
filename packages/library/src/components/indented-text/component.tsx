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
	tag: 'kol-indented-text',
	styleUrls: {
		default: '../style.sass',
	},
	shadow: true,
})
export class KolIndentedText implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {};

	public render(): JSX.Element {
		return (
			<Host>
				<div>
					<slot />
				</div>
			</Host>
		);
	}
}
