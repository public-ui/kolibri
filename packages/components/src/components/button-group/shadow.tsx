import type { ButtonGroupProps } from '@public-ui/schema';
import type { JSX } from '@stencil/core';
import { Component, h, Host } from '@stencil/core';

@Component({
	tag: 'kol-button-group',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolButtonGroup implements ButtonGroupProps {
	public render(): JSX.Element {
		return (
			<Host class="kol-button-group">
				<kol-button-group-wc>
					<slot />
				</kol-button-group-wc>
			</Host>
		);
	}
}
