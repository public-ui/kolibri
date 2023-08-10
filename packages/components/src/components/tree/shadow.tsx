import { Component, h, JSX } from '@stencil/core';

import { Props } from './types';

@Component({
	tag: 'kol-tree',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolTree implements Props {
	public render(): JSX.Element {
		return (
			<kol-tree-wc>
				<slot />
			</kol-tree-wc>
		);
	}
}
