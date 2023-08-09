import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { LabelPropType, validateLabel } from '../../types/props/label';
import { watchString, watchValidator } from '../../utils/prop.validators';
import { API, States, KoliBriQuoteVariant } from './types';
import { HrefPropType } from '../../types/props/href';

@Component({
	tag: 'kol-quote',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolQuote implements API {
	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 * @deprecated Use _label.
	 */
	@Prop() public _caption?: string;

	/**
	 * Defines the label of the citation link.
	 */
	@Prop() public _label?: string;

	/**
	 * Defines the link the source of the quote.
	 */
	@Prop() public _href!: HrefPropType;

	/**
	 * Setzt den Text, also das Zitat selbst.
	 */
	@Prop() public _quote!: string;

	/**
	 * Gibt an, welche Variante der Darstellung genutzt werden soll.
	 */
	@Prop() public _variant?: KoliBriQuoteVariant = 'inline';

	@State() public state: States = {
		_href: '…', // ⚠ required
		_quote: '…', // ⚠ required
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
