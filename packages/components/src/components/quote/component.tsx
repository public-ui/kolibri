import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { QuoteApi } from '../../internal/functional-components/quote/api';
import { QuoteFC } from '../../internal/functional-components/quote/component';
import { QuoteController } from '../../internal/functional-components/quote/controller';

@Component({
	tag: 'kol-quote',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolQuote implements WebComponentInterface<QuoteApi> {
	private readonly ctrl = new QuoteController();

	/**
	 * Sets the target URI of the link or citation source.
	 */
	@Prop()
	public _href!: string;

	@Watch('_href')
	public watchHref(value?: string): void {
		this.ctrl.watchHref(value);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label?: string;

	@Watch('_label')
	public watchLabel(value?: string): void {
		this.ctrl.watchLabel(value);
	}

	/**
	 * Defines the text of the quote.
	 */
	@Prop()
	public _quote!: string;

	@Watch('_quote')
	public watchQuote(value?: string): void {
		this.ctrl.watchQuote(value);
	}

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop()
	public _variant?: string = 'inline';

	@Watch('_variant')
	public watchVariant(value?: string): void {
		this.ctrl.watchVariant(value);
	}

	public componentWillLoad(): void {
		this.ctrl.componentWillLoad({
			href: this._href,
			label: this._label,
			quote: this._quote,
			variant: this._variant,
		});
	}

	public render(): JSX.Element {
		const { href, label, quote, variant } = this.ctrl.getProps();
		return (
			<Host>
				<QuoteFC href={href} label={label} quote={quote} variant={variant} />
			</Host>
		);
	}
}
