import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { watchString } from '../../utils/prop.validators';

import { ComponentApi, States } from './types';

/**
 * API
 */

@Component({
	tag: 'kol-img',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolImg implements ComponentApi {
	public render(): JSX.Element {
		return (
			<Host>
				<img alt={this._alt} loading={this._loading} src={this._src} srcset={this._srcset}></img>
			</Host>
		);
	}

	/**
	 * Gibt den alternativen Text an.
	 */
	@Prop() public _alt!: string;

	/**
	 * Gibt die Quell-URL an.
	 */
	@Prop() public _src!: string;

	/**
	 * Gibt den Lademodus an.
	 */
	@Prop() public _loading?: 'eager' | 'lazy';

	/**
	 * Gibt eine Liste von Quell-URLs mit Breiten der Bilder an.
	 */
	@Prop() public _srcset?: string;

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_src: '',
		_alt: '',
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_alt')
	public validateAlt(value?: string): void {
		watchString(this, '_alt', value, {
			required: true,
		});
	}
	@Watch('_src')
	public validateSrc(value?: string): void {
		watchString(this, '_src', value, {
			required: true,
		});
	}
	@Watch('_loading')
	public validateLoading(value?: 'eager' | 'lazy'): void {
		watchString(this, '_loading', value, {
			required: false,
		});
	}
	@Watch('_srcset')
	public validateSrcset(value?: string): void {
		watchString(this, '_srcset', value, {
			required: false,
		});
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateAlt(this._alt);
		this.validateSrc(this._src);
		this.validateLoading(this._loading);
		this.validateSrcset(this._srcset);
	}
}
