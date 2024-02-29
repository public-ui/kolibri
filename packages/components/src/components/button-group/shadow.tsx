import type { ButtonGroupProps } from '@public-ui/schema';
import type { JSX } from '@stencil/core';
import { Component, h, Host } from '@stencil/core';
import { KolButtonGroupWcTag } from '../../core/component-names';

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
			<Host>
				<KolButtonGroupWcTag>
					<slot />
				</KolButtonGroupWcTag>
			</Host>
		);
	}
}
