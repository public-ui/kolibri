import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../../internals/src/controller/base-web-component';
import type { PropsConfigShape, WebComponentInterface } from '../../../internals/src/controller/generic-types';
import type { QuoteApi } from '../../../internals/src/controller/quote/api';
import { quotePropsConfig } from '../../../internals/src/controller/quote/api';
import { hrefProp, labelLangSegmentsProp, quoteProp, variantQuoteProp, type QuoteVariantType } from '../../../internals/src/props/index';
import type { HrefPropType, LabelLangSegmentsPropType, QuotePropType } from '../../../internals/src/schema/index';
import { QuoteFC } from '../../internal/functional-components/quote/component';

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
		hrefProp.apply(value, (v) => this.setRenderProp('href', v), this.isRequired('href'));
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label?: LabelLangSegmentsPropType = undefined;

	@Watch('_label')
	public watchLabel(value?: LabelLangSegmentsPropType): void {
		labelLangSegmentsProp.apply(value, (v) => this.setRenderProp('label', v), this.isRequired('label'));
	}

	/**
	 * Defines the text of the quote.
	 */
	@Prop()
	public _quote!: QuotePropType;

	@Watch('_quote')
	public watchQuote(value?: QuotePropType): void {
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
		hrefProp.apply(this._href, (v) => this.setRenderProp('href', v), this.isRequired('href'));
		labelLangSegmentsProp.apply(this._label, (v) => this.setRenderProp('label', v), this.isRequired('label'));
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
