import { Component, h, Host, JSX } from '@stencil/core';

import { Props } from './component';

@Component({
	tag: 'kol-button-group',
	styleUrls: {
		default: './style.sass',
	},
	shadow: true,
})
export class KolButtonGroup implements Props {
	public render(): JSX.Element {
		return (
			<Host>
				<kol-button-group-wc>
					<slot />
				</kol-button-group-wc>
			</Host>
		);
	}
}
