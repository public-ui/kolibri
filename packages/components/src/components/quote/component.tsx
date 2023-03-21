import { h, Component, Host, JSX, Prop, State, Watch } from '@stencil/core';
import { watchString, watchValidator } from '../../utils/prop.validators';
import { ComponentApi, KoliBriQuoteVariant, States } from './types';

@Component({
	tag: 'kol-quote',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolQuote implements ComponentApi {
	/**
	 * The caption of the quote.
	 */
	@Prop() public _caption?: string;

	/**
	 * The cite of the quote.
	 */
	@Prop() public _cite!: string;

	/**
	 * The quote of the quote.
	 */
	@Prop() public _quote!: string;

	/**
	 * The variant of the quote.
	 */
	@Prop() public _variant?: KoliBriQuoteVariant = 'inline';

	@State() public state: States = {
		_cite: '…', // ⚠ required
		_quote: '…', // ⚠ required
		_variant: 'inline',
	};

	@Watch('_caption')
	public validateCaption(value?: string): void {
		watchString(this, '_caption', value);
	}

	@Watch('_cite')
	public validateCite(value?: string): void {
		watchString(this, '_cite', value);
	}

	@Watch('_quote')
	public validateQuote(value?: string): void {
		watchString(this, '_quote', value);
	}

	@Watch('_variant')
	public validateVariant(value?: KoliBriQuoteVariant): void {
		watchValidator(this, '_variant', (value) => value === 'block' || value === 'inline', new Set(['block', 'inline']), value);
	}

	public componentWillLoad(): void {
		this.validateCaption(this._caption);
		this.validateCite(this._cite);
		this.validateQuote(this._quote);
		this.validateVariant(this._variant);
	}

	public render(): JSX.Element {
		const hideExpertSlot = this.state._quote !== '';
		return (
			<Host>
				<figure>
					{this.state._variant === 'block' ? (
						<blockquote cite={this.state._cite}>
							{this.state._quote}
							<span aria-hidden={hideExpertSlot ? 'true' : undefined} hidden={hideExpertSlot}>
								<slot name="expert" />
							</span>
						</blockquote>
					) : (
						<q cite={this.state._cite}>
							{this.state._quote}
							<span aria-hidden={hideExpertSlot ? 'true' : undefined} hidden={hideExpertSlot}>
								<slot name="expert" />
							</span>
						</q>
					)}
					{typeof this.state._caption === 'string' && this.state._caption.length > 0 && (
						<figcaption>
							{` — `}
							<cite>
								<kol-link _href={this.state._cite} _label={this.state._caption} _target="_blank" />
							</cite>
						</figcaption>
					)}
				</figure>
			</Host>
		);
	}
}
