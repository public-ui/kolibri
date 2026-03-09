import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { QuoteApi } from '../../internal/functional-components/quote/api';
import { QuoteFC } from '../../internal/functional-components/quote/component';
import { QuoteController } from '../../internal/functional-components/quote/controller';
import type { QuoteVariantType } from '../../internal/props/variant-quote';

@Component({
	tag: 'kol-quote',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolQuote extends BaseWebComponent<QuoteApi> implements WebComponentInterface<QuoteApi> {
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
	public _variant?: QuoteVariantType = 'inline';

	@Watch('_variant')
	public watchVariant(value?: QuoteVariantType): void {
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
		return (
			<Host>
				<QuoteFC
					href={this.ctrl.getRenderProp('href')}
					label={this.ctrl.getRenderProp('label')}
					quote={this.ctrl.getRenderProp('quote')}
					variant={this.ctrl.getRenderProp('variant')}
				/>
			</Host>
		);
	}
}
