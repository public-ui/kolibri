import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { HeadingLevel } from '../../types/heading-level';
import { watchString } from '../../utils/prop.validators';
import { watchHeadingLevel } from '../heading/validation';
import { PropHasFooter, validateHasFooter } from '../../types/props';

/**
 * API
 */
type RequiredProps = {
	heading: string;
};
type OptionalProps = {
	/**
	 * @deprecated Use _headline instead
	 */
	headline: string;
	level: HeadingLevel;
} & PropHasFooter;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

/**
 * @part card - TBD
 *
 * @slot header - Ermöglicht das Einfügen beliebigen HTML's in den Kopfbereich unterhalb der Überschrift der Card.
 * @slot footer - Ermöglicht das Einfügen beliebigen HTML's in den Fußbereich der Card.
 * @slot content - Ermöglicht das Einfügen beliebigen HTML's in den Inhaltsbereich der Card.
 */
@Component({
	tag: 'kol-card',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolCard implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		return (
			<Host>
				<div>
					<div class="header">
						<kol-heading-wc _headline={this.state._heading} _level={this.state._level}></kol-heading-wc>
						<slot name="header" />
					</div>
					<div class="content">
						<slot name="content" />
					</div>
					{this.state._hasFooter && (
						<div class="footer">
							<slot name="footer" />
						</div>
					)}
				</div>
			</Host>
		);
	}

	/**
	 * Gibt an, ob die Card einen Footer-Bereich hat.
	 */
	@Prop({ reflect: true }) public _hasFooter?: boolean = false;

	/**
	 * Gibt die Überschrift der Card an.
	 */
	@Prop() public _heading!: string;

	/**
	 * Gibt die Überschrift der Card an.
	 *
	 * @deprecated Verwende stattdessen das Property _heading.
	 */
	@Prop() public _headline?: string;

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_heading: '…', // '⚠'
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_hasFooter')
	public validateHasFooter(value?: boolean): void {
		validateHasFooter(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_heading')
	public validateHeading(value?: string): void {
		watchString(this, '_heading', value, {
			required: true,
		});
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 * @deprecated
	 */
	@Watch('_headline')
	public validateHeadline(value?: string): void {
		this.validateHeading(value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateHasFooter(this._hasFooter);
		this.validateHeading(this._heading || this._headline);
		this.validateLevel(this._level);
	}
}
