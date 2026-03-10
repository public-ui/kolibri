import { hrefProp, labelProp, quoteProp, variantQuoteProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps } from '../generic-types';
import type { QuoteApi } from './api';

export class QuoteController extends BaseController<QuoteApi> implements ControllerInterface<QuoteApi> {
	public componentWillLoad(props: ResolvedInputProps<QuoteApi>): void {
		const { href, label, quote, variant } = props;
		this.watchHref(href);
		this.watchLabel(label);
		this.watchQuote(quote);
		this.watchVariant(variant);
	}

	public watchHref(value?: string): void {
		hrefProp.apply(value, (v) => {
			this.setRenderProp('href', v);
		});
	}

	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => {
			this.setRenderProp('label', v);
		});
	}

	public watchQuote(value?: string): void {
		quoteProp.apply(value, (v) => {
			this.setRenderProp('quote', v);
		});
	}

	public watchVariant(value?: string): void {
		variantQuoteProp.apply(value, (v) => {
			this.setRenderProp('variant', v);
		});
	}
}
