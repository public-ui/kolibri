import type { ButtonGroupAPI, ButtonGroupStates } from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, h, Host, State } from '@stencil/core';

/**
 * @deprecated This component has been deprecated as it does not contribute significantly to accessibility.
 * @internal
 */
@Component({
	tag: 'kol-button-group-wc',
	shadow: false,
})
export class KolButtonGroupWc implements ButtonGroupAPI {
	public render(): JSX.Element {
		return (
			<Host class="kol-button-group-wc">
				<slot />
			</Host>
		);
	}

	@State() public state: ButtonGroupStates = {};
}
