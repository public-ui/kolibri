import { Component, h, JSX } from '@stencil/core';

import type { TreeProps } from '@public-ui/schema';

@Component({
	tag: 'kol-tree',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolTree implements TreeProps {
	public render(): JSX.Element {
		return (
			<kol-tree-wc>
				<slot />
			</kol-tree-wc>
		);
	}
}
