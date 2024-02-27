import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { HrefPropType } from '../../types/props/href';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { watchString, watchValidator } from '../../utils/prop.validators';
import { showExpertSlot } from '../../utils/reuse';
import { API, KoliBriQuoteVariant, States } from './types';

@Component({
	tag: 'kol-quote',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolQuote implements API {
	/**
	 * Deprecated: Defines the visible caption of the component.
	 * @deprecated Use _label.
	 */
	@Prop() public _caption?: string;

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

	@State() public state: States = {
		_href: '', // ⚠ required
		_quote: '', // ⚠ requireds
		_variant: 'inline',
	};

	@Watch('_caption')
	public validateCaption(value?: string): void {
		this.validateLabel(value);
	}

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
		watchValidator(this, '_variant', (value) => value === 'block' || value === 'inline', new Set(['block', 'inline']), value);
	}

	public componentWillLoad(): void {
		this.validateHref(this._href);
		this.validateLabel(this._label || this._caption);
		this.validateQuote(this._quote);
		this.validateVariant(this._variant);
	}

	public render(): JSX.Element {
		const hasExpertSlot = showExpertSlot(this.state._quote); // _quote instead of _caption as _label
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
