import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { watchString } from '../../utils/prop.validators';
import { Loading, validateLoading } from '../../utils/validators/loading';

import { ComponentApi, States } from './types';

/**
 * Image component
 *
 * - https://www.mediaevent.de/html/srcset.html
 */
@Component({
	tag: 'kol-image',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolImage implements ComponentApi {
	/**
	 * Gibt den alternativen Text an.
	 */
	@Prop() public _alt!: string;

	/**
	 * Gibt den Lademodus an.
	 */
	@Prop() public _loading?: Loading = 'lazy';

	/**
	 * ...
	 */
	@Prop() public _sizes?: string;

	/**
	 * Gibt die Quell-URL an.
	 */
	@Prop() public _src!: string;

	/**
	 * Gibt eine Liste von Quell-URLs mit Breiten der Bilder an.
	 */
	@Prop() public _srcset?: string;

	@State() public state: States = {
		_alt: '…', // ⚠ required
		_loading: 'lazy', // ⚠ required
		_src: '…', // ⚠ required
	};

	@Watch('_alt')
	public validateAlt(value?: string): void {
		watchString(this, '_alt', value, {
			required: true,
		});
	}

	@Watch('_loading')
	public validateLoading(value?: Loading): void {
		validateLoading(this, value);
	}

	@Watch('_sizes')
	public validateSizes(value?: string): void {
		watchString(this, '_sizes', value);
	}

	@Watch('_src')
	public validateSrc(value?: string): void {
		console.log('src', value);
		watchString(this, '_src', value, {
			required: true,
		});
	}

	@Watch('_srcset')
	public validateSrcset(value?: string): void {
		watchString(this, '_srcset', value);
	}

	public componentWillLoad(): void {
		this.validateAlt(this._alt);
		this.validateLoading(this._loading);
		this.validateSizes(this._sizes);
		this.validateSrc(this._src);
		this.validateSrcset(this._srcset);
	}

	public render(): JSX.Element {
		return (
			<Host>
				<img alt={this.state._alt} loading={this.state._loading} sizes={this.state._sizes} src={this.state._src} srcset={this.state._srcset}></img>
			</Host>
		);
	}
}
