import { Component, h, Host, JSX, State } from '@stencil/core';

import { API, States } from './types';

/**
 * @slot - Der Text.
 */
@Component({
	tag: 'kol-indented-text',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolIndentedText implements API {
	@State() public state: States = {};

	public render(): JSX.Element {
		return (
			<Host class="kol-indented-text-wc">
				<div>
					{/* TODO: Für was wird dieses div benötigt? */}
					<slot />
				</div>
			</Host>
		);
	}
}
