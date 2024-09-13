import type { IndentedTextAPI, IndentedTextStates } from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, h, Host, State } from '@stencil/core';

/**
 * @slot - Der Text.
 */
@Component({
	tag: 'kol-indented-text-wc',
	shadow: false,
})
/**
 * @deprecated This component has been deprecated as it ist just styling.
 */
export class KolIndentedTextWc implements IndentedTextAPI {
	@State() public state: IndentedTextStates = {};

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
