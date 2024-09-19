import type { IndentedTextProps } from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, h, Host } from '@stencil/core';
import { KolIndentedTextWcTag } from '../../core/component-names';

/**
 * @slot - Der Text.
 */
@Component({
	tag: 'kol-indented-text',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
/**
 * @deprecated Will be removed in v3. Replace with custom HTML and styling.
 */
export class KolIndentedText implements IndentedTextProps {
	public render(): JSX.Element {
		return (
			<Host class="kol-indented-text">
				<KolIndentedTextWcTag>
					<slot />
				</KolIndentedTextWcTag>
			</Host>
		);
	}
}
