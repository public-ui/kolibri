import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop } from '@stencil/core';

import type { AbbrApi } from '../../internal/functional-components/abbr/api';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { LabelPropType } from '../../schema';

/**
 * The **Abbr** component implements the HTML tag `abbr`.
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
	/**
	 * DEPRECATED!
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType;

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
