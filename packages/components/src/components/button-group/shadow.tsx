import { Component, h, Host, JSX } from '@stencil/core';

import { Props } from './types';

@Component({
	tag: 'kol-button-group',
	styleUrls: {
		default: './style.scss',
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
