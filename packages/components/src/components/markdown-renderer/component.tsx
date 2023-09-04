import { Component, h, Host, JSX, Prop } from '@stencil/core';

import { LabelPropType } from '../../types/props/label';
import { Props } from './types';
import MarkdownIt from 'markdown-it';

const md: MarkdownIt = new MarkdownIt();

/**
 * @internal
 */
@Component({
	tag: 'kol-markdown-renderer-wc',
	styleUrl: 'style.css',
	shadow: false,
})
export class KolMarkdownRendererWc implements Props {
	public render(): JSX.Element {
		const parsedMarkdown: string = typeof this._label === 'string' ? md.render(this._label) : '';
		return (
			<Host>
				<div class={'md'} innerHTML={parsedMarkdown}></div>
			</Host>
		);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;
}
