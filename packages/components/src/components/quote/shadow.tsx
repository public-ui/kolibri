import type { HrefPropType, KoliBriQuoteVariant, LabelPropType, QuoteAPI, QuoteStates } from '@public-ui/schema';
import { koliBriQuoteVariantOptions, showExpertSlot, validateLabel, watchString, watchValidator } from '@public-ui/schema';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

import type { JSX } from '@stencil/core';
@Component({
	tag: 'kol-quote',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolQuote implements QuoteAPI {
	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: string;

	/**
	 * Sets the target URI of the link or citation source.
	 */
	@Prop() public _href!: HrefPropType;

	/**
	 * Defines the text of the quote.
	 */
	@Prop() public _quote!: string;

	/**
	 * Defines which variant should be used for presentation.
	 */
	@Prop() public _variant?: KoliBriQuoteVariant = 'inline';

	@State() public state: QuoteStates = {
		_href: '', // ⚠ required
		_quote: '', // ⚠ required
		_variant: 'inline',
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value);
	}

	@Watch('_href')
	public validateHref(value?: HrefPropType): void {
		watchString(this, '_href', value, {
			required: true,
		});
	}

	@Watch('_quote')
	public validateQuote(value?: string): void {
		watchString(this, '_quote', value, {
			required: true,
		});
	}

	@Watch('_variant')
	public validateVariant(value?: KoliBriQuoteVariant): void {
		watchValidator(
			this,
			'_variant',
			(value) => typeof value === 'string' && koliBriQuoteVariantOptions.includes(value),
			new Set(koliBriQuoteVariantOptions),
			value
		);
	}

	public componentWillLoad(): void {
		this.validateHref(this._href);
		this.validateLabel(this._label);
		this.validateQuote(this._quote);
		this.validateVariant(this._variant);
	}

	public render(): JSX.Element {
		const hasExpertSlot = showExpertSlot(this.state._quote); // _quote instead of _caption as _label
		return (
			<Host class="kol-quote">
				<figure
					class={{
						[this.state._variant]: true,
					}}
				>
					{this.state._variant === 'block' ? (
						<blockquote cite={this.state._href}>
							{this.state._quote}
							<span aria-hidden={!hasExpertSlot ? 'true' : undefined} hidden={!hasExpertSlot}>
								<slot name="expert" />
							</span>
						</blockquote>
					) : (
						<q cite={this.state._href}>
							{this.state._quote}
							<span aria-hidden={!hasExpertSlot ? 'true' : undefined} hidden={!hasExpertSlot}>
								<slot name="expert" />
							</span>
						</q>
					)}
					{typeof this.state._label === 'string' && this.state._label.length > 0 && (
						<figcaption>
							<cite>
								<kol-link _href={this.state._href} _label={this.state._label} _target="_blank" />
							</cite>
						</figcaption>
					)}
				</figure>
			</Host>
		);
	}
}
