import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { HeadingLevel } from '../../types/heading-level';
import { watchString } from '../../utils/prop.validators';
import { watchHeadingLevel } from './validation';

type RequiredProps = {
	label: string;
};
type OptionalProps = {
	secondaryHeadline: string;
	level: HeadingLevel;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = {
	label: string;
	level: HeadingLevel;
};
type OptionalStates = {
	secondaryHeadline: string;
};
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-heading-wc',
	shadow: false,
})
export class KolHeadingWc implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	/**
	 * Gibt den Text der Überschrift an.
	 */
	@Prop() public _label!: string;

	/**
	 * Setzt den H-Level, von 1 bis 6, der Überschrift.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	/**
	 * Setzt den Text einer weiteren Überschrift, einen Level kleiner, unter der Ersten.
	 */
	@Prop() public _secondaryHeadline?: string;

	@State() public state: States = {
		_label: '…', // ⚠ required
		_level: 1,
	};

	@Watch('_label')
	public validateLabel(value?: string): void {
		watchString(this, '_label', value);
	}

	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	@Watch('_secondaryHeadline')
	public validateSecondaryHeadline(value?: string): void {
		watchString(this, '_secondaryHeadline', value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateLevel(this._level);
		this.validateSecondaryHeadline(this._secondaryHeadline);
	}

	private readonly renderHeadline = (headline: string, level?: number): JSX.Element => {
		switch (level) {
			case 1:
				return (
					<h1 class="headline">
						{headline}
						<slot />
					</h1>
				);
			case 2:
				return (
					<h2 class="headline">
						{headline}
						<slot />
					</h2>
				);
			case 3:
				return (
					<h3 class="headline">
						{headline}
						<slot />
					</h3>
				);
			case 4:
				return (
					<h4 class="headline">
						{headline}
						<slot />
					</h4>
				);
			case 5:
				return (
					<h5 class="headline">
						{headline}
						<slot />
					</h5>
				);
			case 6:
				return (
					<h6 class="headline">
						{headline}
						<slot />
					</h6>
				);
			default:
				return (
					<strong class="headline">
						{headline}
						<slot />
					</strong>
				);
		}
	};

	private readonly renderSecondaryHeadline = (headline: string, level?: number): JSX.Element => {
		switch (level) {
			case 1: // if the headline is only strong
				return <span class="secondary-headline">{headline}</span>;
			case 2: // if the headline is h1
				return <h2 class="secondary-headline">{headline}</h2>;
			case 3: // if the headline is h2
				return <h3 class="secondary-headline">{headline}</h3>;
			case 4: // if the headline is h3
				return <h4 class="secondary-headline">{headline}</h4>;
			case 5: // if the headline is h4
				return <h5 class="secondary-headline">{headline}</h5>;
			case 6: // if the headline is h5
				return <h6 class="secondary-headline">{headline}</h6>;
			default: // if the headline is h6
				return <strong class="secondary-headline">{headline}</strong>;
		}
	};

	public render(): JSX.Element {
		return (
			<Host>
				{typeof this.state._secondaryHeadline === 'string' && this.state._secondaryHeadline.length > 0 ? (
					<hgroup>
						{this.renderHeadline(this.state._label, this.state._level)}
						{this.state._secondaryHeadline && this.renderSecondaryHeadline(this.state._secondaryHeadline, this.state._level + 1)}
					</hgroup>
				) : (
					this.renderHeadline(this.state._label, this.state._level)
				)}
			</Host>
		);
	}
}
