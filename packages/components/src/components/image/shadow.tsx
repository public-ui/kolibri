import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { watchString } from '../../utils/prop.validators';

import { ComponentApi, States } from './types';

/**
 * Image component
 */
@Component({
	tag: 'kol-img',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolImg implements ComponentApi {
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

	@State() public state: States = {
		_alt: '', // TODO
		_src: '',
	};

	@Watch('_alt')
	public validateAlt(value?: string): void {
		watchString(this, '_alt', value, {
			required: true,
		});
	}
	@Watch('_src')
	public validateSrc(value?: string): void {
		console.log('src', value);
		watchString(this, '_src', value, {
			required: true,
		});
	}
	@Watch('_loading')
	public validateLoading(value?: 'eager' | 'lazy'): void {
		watchString(this, '_loading', value, {});
	}
	@Watch('_srcset')
	public validateSrcset(value?: string): void {
		watchString(this, '_srcset', value, {});
	}

	public componentWillLoad(): void {
		this.validateAlt(this._alt);
		this.validateSrc(this._src);
		this.validateLoading(this._loading);
		this.validateSrcset(this._srcset);
	}

	public render(): JSX.Element {
		return (
			<Host>
				<img alt={this.state._alt} loading={this.state._loading} src={this.state._src} srcset={this.state._srcset}></img>
			</Host>
		);
	}
}
