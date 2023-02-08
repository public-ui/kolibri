import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { HeadingLevel } from '../../types/heading-level';
import { watchHeadingLevel } from './validation';
import { watchString } from '../../utils/prop.validators';

/**
 * API
 */
type RequiredProps = {
	label: string;
};
type OptionalProps = {
	overline: string;
	level: HeadingLevel;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-heading-wc',
	shadow: false,
})
export class KolHeadingWc implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat. Oder ob es keine Überschrift ist, sondern nur fett gedruckt.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	/**
	 * Gibt den Text der Überschrift an.
	 */
	@Prop() public _label!: string;

	/**
	 * Gibt den Text der zusätzlichen Beschriftung an.
	 */
	@Prop() public _overline?: string = '';

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_label: 'Untitled',
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_label')
	public validateLabel(value?: string): void {
		watchString(this, '_label', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_overline')
	public validateOverline(value?: string): void {
		watchString(this, '_overline', value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateLabel(this._label);
		this.validateLevel(this._level);
		this.validateOverline(this._overline);
	}

	private readonly renderHeadline = (label: string, level?: HeadingLevel): JSX.Element => {
		switch (level) {
			case 1:
				return (
					<h1 class="headline">
						{label}
						<slot />
					</h1>
				);
			case 2:
				return (
					<h2 class="headline">
						{label}
						<slot />
					</h2>
				);
			case 3:
				return (
					<h3 class="headline">
						{label}
						<slot />
					</h3>
				);
			case 4:
				return (
					<h4 class="headline">
						{label}
						<slot />
					</h4>
				);
			case 5:
				return (
					<h5 class="headline">
						{label}
						<slot />
					</h5>
				);
			case 6:
				return (
					<h6 class="headline">
						{label}
						<slot />
					</h6>
				);
			default:
				return (
					<strong class="headline">
						{label}
						<slot />
					</strong>
				);
		}
	};

	public render(): JSX.Element {
		return (
			<Host>
				{this.renderHeadline(this.state._label, this.state._level)}
				{this.state._overline && <span class="overline">{this.state._overline}</span>}
			</Host>
		);
	}
}
