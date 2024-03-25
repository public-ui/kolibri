import { Component, h, Host, JSX } from '@stencil/core';

import { Props } from './types';
import { KolButtonGroupWcTag } from '../../core/component-names';

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
			<Host class="kol-button-group">
				<KolButtonGroupWcTag>
					<slot />
				</KolButtonGroupWcTag>
			</Host>
		);
	}
}
