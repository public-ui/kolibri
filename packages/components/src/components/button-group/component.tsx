import type { ButtonGroupAPI, ButtonGroupStates } from '@public-ui/schema';
import type { JSX } from '@stencil/core';
import { Component, h, Host, State } from '@stencil/core';

@Component({
	tag: 'kol-button-group-wc',
	shadow: false,
})
export class KolButtonGroupWc implements ButtonGroupAPI {
	public render(): JSX.Element {
		return (
			<Host>
				<slot />
			</Host>
		);
	}

	@State() public state: ButtonGroupStates = {};
}
