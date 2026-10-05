import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { QuoteApi } from '../../internal/functional-components/quote/api';
import { quotePropsConfig } from '../../internal/functional-components/quote/api';
import { QuoteFC } from '../../internal/functional-components/quote/component';
import { hrefProp, labelProp, quoteProp, variantQuoteProp, type QuoteVariantType } from '../../internal/props';

/**
 * The **Quote** component has two variants: a short inline (`inline`) and an indented block (`block`) variant. Both variants include a link to the source of the quote.
 */
@Component({
	tag: 'kol-quote',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolQuote extends BaseWebComponent<QuoteApi> implements WebComponentInterface<QuoteApi> {
	/**
	 * Sets the target URI of the link or citation source.
	 */
	@Prop()
	public _href!: string;

	@Watch('_href')
	public watchHref(value?: string): void {
		hrefProp.apply(value, (v) => this.setRenderProp('href', v));
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label?: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	/**
	 * Defines the text of the quote.
	 */
	@Prop()
	public _quote!: string;

	@Watch('_quote')
	public watchQuote(value?: string): void {
		quoteProp.apply(value, (v) => this.setRenderProp('quote', v));
	}

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop()
	public _variant?: QuoteVariantType = 'inline';

	@Watch('_variant')
	public watchVariant(value?: QuoteVariantType): void {
		variantQuoteProp.apply(value, (v) => this.setRenderProp('variant', v));
	}

	public componentWillLoad(): void {
		this.initRenderProps(quotePropsConfig);

		hrefProp.apply(this._href, (v) => this.setRenderProp('href', v));
		labelProp.apply(this._label, (v) => this.setRenderProp('label', v));
		quoteProp.apply(this._quote, (v) => this.setRenderProp('quote', v));
		variantQuoteProp.apply(this._variant, (v) => this.setRenderProp('variant', v));
	}

	public render(): JSX.Element {
		return (
			<Host>
				<QuoteFC
					href={this.getRenderProp('href')}
					label={this.getRenderProp('label')}
					quote={this.getRenderProp('quote')}
					variant={this.getRenderProp('variant')}
				/>
			</Host>
		);
	}
}
