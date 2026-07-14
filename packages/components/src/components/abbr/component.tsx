import type { JSX } from '@stencil/core';
import { Component, h, Host } from '@stencil/core';

import type { AbbrApi } from '../../internal/functional-components/abbr/api';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';

/**
 * The **Abbr** component implements the HTML tag `abbr` with an accessible tooltip.
 * The tooltip for the description is displayed and read aloud when the **Abbr** component is focused or hovered.
 *
 * @slot - The abbreviation (short form).
 */
@Component({
	tag: 'kol-abbr',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolAbbr extends BaseWebComponent<AbbrApi> {
	public render(): JSX.Element {
		return (
			<Host>
				<abbr>
					<slot />
				</abbr>
			</Host>
		);
	}
}
