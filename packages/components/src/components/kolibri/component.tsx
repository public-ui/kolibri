import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { colorRgba } from '../badge/color-rgba';

import { Generic } from '@a11y-ui/core';
import { watchBoolean, watchValidator } from '../../utils/prop.validators';
import { translate } from '../../i18n';

const HACK_REG_EX = /^#([a-f0-9]{3}|[a-f0-9]{6})$/;

type RequiredProps = unknown;
type OptionalProps = {
	animate: boolean;
	color: string;
	labeled: boolean;
};
// type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	animate: boolean;
	color: {
		red: number;
		green: number;
		blue: number;
	};
	labeled: boolean;
};
type OptionalStates = unknown;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

const max = 360;
function degreeToRadians(degree: number): number {
	return (degree * Math.PI) / 180;
}
function getColorNumber(degree: number): number {
	return Math.round(((Math.cos(degreeToRadians(degree)) + 1) / 2) * 225);
}

@Component({
	tag: 'kol-kolibri',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolKolibri implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		const fillColor: string =
			this.state._animate === true
				? `rgb(${getColorNumber(this.state._color.red)},${getColorNumber(this.state._color.green)},${getColorNumber(this.state._color.blue)})`
				: `rgb(${this.state._color.red},${this.state._color.green},${this.state._color.blue})`;
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

	private interval?: NodeJS.Timer;

	/**
	 * Gibt an, ob das Bild-Logo farblich animiert werden soll.
	 */
	@Prop({ reflect: true }) public _animate?: boolean;

	/**
	 * Gibt an, in welcher Farbe das Bild-Logo initial dargestellt werden soll.
	 */
	@Prop() public _color?: string = '#003c78';

	/**
	 * Gibt an, ob die Logo-Beschriftung angezeigt werden soll.
	 */
	@Prop({ reflect: true }) public _labeled?: boolean;

	@State() public state: States = {
		_animate: false,
		_color: {
			red: 0,
			green: 60,
			blue: 120,
		},
		_labeled: true,
	};

	@Watch('_animate')
	public validateAnimate(value?: boolean): void {
		watchBoolean(this, '_animate', value);
	}

	private handleColorChange: Generic.Element.NextStateHooksCallback = (nextValue: unknown, nextState: Map<string, unknown>): void => {
		const rgba = colorRgba(nextValue as string);
		nextState.set('_color', {
			red: rgba[0],
			green: rgba[1],
			blue: rgba[2],
		});
	};

	@Watch('_color')
	public validateColor(value?: string): void {
		watchValidator(this, '_color', (value) => typeof value === 'string' && HACK_REG_EX.test(value), new Set(['Color Hex Color Codes']), value, {
			defaultValue: '#003c78',
			hooks: {
				beforePatch: this.handleColorChange,
			},
		});
	}

	@Watch('_labeled')
	public validateLabeled(value?: boolean): void {
		watchBoolean(this, '_labeled', value);
	}

	public componentWillLoad(): void {
		this.validateAnimate(this._animate);
		this.validateColor(this._color);
		this.validateLabeled(this._labeled);
	}

	public componentDidRender(): void {
		clearInterval(this.interval as NodeJS.Timer);
		if (this.state._animate) {
			this.interval = setInterval(() => {
				this.state = {
					...this.state,
					_color: {
						red: (this.state._color.red + 1) % max,
						green: (this.state._color.green + 2) % max,
						blue: (this.state._color.blue + 3) % max,
					},
				};
			}, 50);
		}
	}

	public disconnectedCallback(): void {
		clearInterval(this.interval as NodeJS.Timer);
	}
}
