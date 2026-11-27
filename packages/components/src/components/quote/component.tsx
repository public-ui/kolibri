import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { PropsConfigShape, WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { QuoteApi } from '../../internal/functional-components/quote/api';
import { quotePropsConfig } from '../../internal/functional-components/quote/api';
import { QuoteFC } from '../../internal/functional-components/quote/component';
import { hrefProp, labelLangSegmentsProp, quoteProp, variantQuoteProp, type QuoteVariantType } from '../../internal/props';
import type { HrefPropType, LabelLangSegmentsPropType, QuotePropType } from '../../schema';

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
	protected readonly propsConfig: PropsConfigShape = quotePropsConfig;

	/**
	 * Defines the target URI of the link.
	 */
	@Prop()
	public _href!: HrefPropType;

	@Watch('_href')
	public watchHref(value?: HrefPropType): void {
		this.applyProp(hrefProp, value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label?: LabelLangSegmentsPropType = undefined;

	@Watch('_label')
	public watchLabel(value?: LabelLangSegmentsPropType): void {
		this.applyProp(labelLangSegmentsProp, value);
	}

	/**
	 * Defines the text of the quote.
	 */
	@Prop()
	public _quote!: QuotePropType;

	@Watch('_quote')
	public watchQuote(value?: QuotePropType): void {
		this.applyProp(quoteProp, value);
	}

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop()
	public _variant?: QuoteVariantType = 'inline';

	@Watch('_variant')
	public watchVariant(value?: QuoteVariantType): void {
		this.applyProp(variantQuoteProp, value);
	}

	public componentWillLoad(): void {
		this.watchHref(this._href);
		this.watchLabel(this._label);
		this.watchQuote(this._quote);
		this.watchVariant(this._variant);
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
