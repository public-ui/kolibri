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
	 * The href is a URL that designates a source document or message for the information quoted.
	 */
	@Prop() public _href!: string;

	/**
	 * The text of the quote.
	 */
	@Prop() public _quote!: string;

	/**
	 * The variant of the quote.
	 */
	@Prop() public _variant?: KoliBriQuoteVariant = 'inline';

	@State() public state: States = {
		_href: '…', // ⚠ required
		_quote: '…', // ⚠ required
		_variant: 'inline',
	};

	@Watch('_caption')
	public validateCaption(value?: string): void {
		watchString(this, '_caption', value);
	}

	@Watch('_href')
	public validateHref(value?: string): void {
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
		watchValidator(this, '_variant', (value) => value === 'block' || value === 'inline', new Set(['block', 'inline']), value);
	}

	public componentWillLoad(): void {
		this.validateCaption(this._caption);
		this.validateHref(this._href);
		this.validateQuote(this._quote);
		this.validateVariant(this._variant);
	}

	public render(): JSX.Element {
		const hideExpertSlot = this.state._quote !== '';
		return (
			<Host>
				<figure
					class={{
						[this.state._variant]: true,
					}}
				>
					{this.state._variant === 'block' ? (
						<blockquote cite={this.state._href}>
							{this.state._quote}
							<span aria-hidden={hideExpertSlot ? 'true' : undefined} hidden={hideExpertSlot}>
								<slot name="expert" />
							</span>
						</blockquote>
					) : (
						<q cite={this.state._href}>
							{this.state._quote}
							<span aria-hidden={hideExpertSlot ? 'true' : undefined} hidden={hideExpertSlot}>
								<slot name="expert" />
							</span>
						</q>
					)}
					{typeof this.state._caption === 'string' && this.state._caption.length > 0 && (
						<figcaption>
							<cite>
								<kol-link _href={this.state._href} _label={this.state._caption} _target="_blank" />
							</cite>
						</figcaption>
					)}
				</figure>
			</Host>
		);
	}
}
