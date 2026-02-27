import type { HrefProp, LabelProp, QuoteProp, VariantQuoteProp } from '../../props';
import { hrefProp, labelProp, quoteProp, variantQuoteProp, withValidPropValue } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps } from '../generic-types';
import type { QuoteApi } from './api';

export class QuoteController extends BaseController<QuoteApi> implements ControllerInterface<QuoteApi> {
	public constructor() {
		super(
			{},
			{
				href: '',
				label: '',
				quote: '',
				variant: 'inline',
			},
		);
	}

	public componentWillLoad(props: ResolvedInputProps<QuoteApi>): void {
		const { href, label, quote, variant } = props;
		this.watchHref(href);
		this.watchLabel(label);
		this.watchQuote(quote);
		this.watchVariant(variant);
	}

	public watchHref(value?: string): void {
		withValidPropValue<HrefProp>(hrefProp, value, (v) => {
			this.setProp('href', v);
		});
	}

	public watchLabel(value?: string): void {
		withValidPropValue<LabelProp>(labelProp, value, (v) => {
			this.setProp('label', v);
		});
	}

	public watchQuote(value?: string): void {
		withValidPropValue<QuoteProp>(quoteProp, value, (v) => {
			this.setProp('quote', v);
		});
	}

	public watchVariant(value?: string): void {
		withValidPropValue<VariantQuoteProp>(variantQuoteProp, value, (v) => {
			this.setProp('variant', v);
		});
	}
}
