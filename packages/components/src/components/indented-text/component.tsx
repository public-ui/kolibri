import type { IndentedTextAPI, IndentedTextStates } from '@public-ui/schema';
import type { JSX } from '@stencil/core';
import { Component, h, Host, State } from '@stencil/core';

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
export class KolIndentedText implements IndentedTextAPI {
	@State() public state: IndentedTextStates = {};

	public render(): JSX.Element {
		return (
			<Host>
				<div>
					{/* TODO: Für was wird dieses div benötigt? */}
					<slot />
				</div>
			</Host>
		);
	}
}
