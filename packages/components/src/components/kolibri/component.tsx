import { devHint, validateColor, watchBoolean } from '@public-ui/schema';
import { Component, Host, Prop, State, Watch, h } from '@stencil/core';

import { colorRgba } from './color-rgba';

import { translate } from '@public-ui/core';

import type { JSX } from '@stencil/core';
import type { Generic } from 'adopted-style-sheets';

import type { KolibriAPI, KolibriStates, PropColor, Stringified } from '@public-ui/schema';

@Component({
	tag: 'kol-kolibri',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolKolibri implements KolibriAPI {
	public render(): JSX.Element {
		const fillColor = `rgb(${this.state._color.red},${this.state._color.green},${this.state._color.blue})`;
		return (
			<Host>
				<svg role="img" aria-label={translate('kol-kolibri-logo')} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" fill={fillColor}>
					<path d="M353 322L213 304V434L353 322Z" />
					<path d="M209 564V304L149 434L209 564Z" />
					<path d="M357 316L417 250L361 210L275 244L357 316Z" />
					<path d="M329 218L237 92L250 222L272 241L329 218Z" />
					<path d="M353 318L35 36L213 300L353 318Z" />
					<path d="M391 286L565 272L421 252L391 286Z" />
					{this.state._labeled === true && (
						<text x="250" y="525" fill={fillColor}>
							KoliBri
						</text>
					)}
				</svg>
			</Host>
		);
	}

	/**
	 * Defines the color of the logo and label.
	 */
	@Prop() public _color?: Stringified<PropColor> = '#003c78';

	/**
	 * Defines whether the component has a label.
	 */
	@Prop() public _labeled?: boolean = true;

	@State() public state: KolibriStates = {
		_color: {
			red: 0,
			green: 60,
			blue: 120,
		},
		_labeled: true,
	};

	private handleColorChange: Generic.Element.NextStateHooksCallback = (nextValue: unknown, nextState: Map<string, unknown>): void => {
		if (typeof nextValue === 'string') {
			const rgba = colorRgba(nextValue);
			nextState.set('_color', {
				red: rgba[0],
				green: rgba[1],
				blue: rgba[2],
			});
		} else {
			devHint(`[KolKolibri] You used the complex color schema. For the KoliBri we use need the color as hex string.`);
		}
	};

	@Watch('_color')
	public validateColor(value?: Stringified<PropColor>): void {
		validateColor(this, value, {
			defaultValue: '#003c78',
			hooks: {
				beforePatch: this.handleColorChange,
			},
		});
	}

	@Watch('_labeled')
	public validateLabeled(value?: boolean): void {
		watchBoolean(this, '_labeled', value, {
			defaultValue: true,
		});
	}

	public componentWillLoad(): void {
		this.validateColor(this._color);
		this.validateLabeled(this._labeled);
	}
}
