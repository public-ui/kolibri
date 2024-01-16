import { Component, Element, Host, JSX, Prop, h } from '@stencil/core';

import { renderToString } from '@public-ui/hydrate';
import { SpinVariantPropType } from '../../types/props/variant/spin';
import { Props } from './types';

@Component({
	tag: 'kol-hyd-spin',
})
export class KolSpin implements Props {
	@Element() public el!: HTMLElement;

	public render(): JSX.Element {
		return (
			<Host>
				<kol-spin _show={this._show}>
					<slot name="expert" />
				</kol-spin>
			</Host>
		);
	}

	public async componentDidRender(): Promise<void> {
		const html = '<kol-span _label="Martin"></kol-span>';
		const doc = (await renderToString(html, {
			// https://stenciljs.com/docs/hydrate-app#rendertostring-options
			prettyHtml: true, // default: false
		})) as { html: string };
		console.log(
			doc,
			this.el.innerHTML,
			await renderToString(html, {
				// approximateLineWidth: ,
				prettyHtml: true,
				removeAttributeQuotes: true,
				removeBooleanAttributeQuotes: true,
				removeEmptyAttributes: true,
				removeHtmlComments: true,
				// afterHydrate: ,
				// beforeHydrate: ,
			})
		);
	}

	/**
	 * Makes the element show up.
	 * @TODO: Change type back to `ShowPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _show?: boolean = false;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: SpinVariantPropType = 'dot';
}
