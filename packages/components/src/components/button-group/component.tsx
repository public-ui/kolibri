import { Component, h, Host, JSX, State } from '@stencil/core';

import { API, States } from './types';

@Component({
	tag: 'kol-button-group-wc',
	shadow: false,
})
export class KolButtonGroupWc implements API {
	public render(): JSX.Element {
		return (
			<Host class="kol-button-group-wc">
				<slot />
			</Host>
		);
	}

	@State() public state: States = {};
}
