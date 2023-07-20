import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { HeadingLevel } from '../../types/heading-level';
import { validateHasFooter } from '../../types/props/has-footer';
import { watchString } from '../../utils/prop.validators';
import { watchHeadingLevel } from '../heading/validation';
import { KoliBriCardAPI, KoliBriCardStates } from './types';

/**
 * @slot - Ermöglicht das Einfügen beliebigen HTML's in den Inhaltsbereich der Card.
 * @slot content - Ermöglicht das Einfügen beliebigen HTML's in den Inhaltsbereich der Card.
 * @slot header - Deprecated für Version 2: Ermöglicht das Einfügen beliebigen HTML's in den Kopfbereich unterhalb der Überschrift der Card.
 * @slot footer - Deprecated für Version 2: Ermöglicht das Einfügen beliebigen HTML's in den Fußbereich der Card.
 */
@Component({
	tag: 'kol-card',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class KolCard implements KoliBriCardAPI {
	public render(): JSX.Element {
		return (
			<Host>
				<div class="card">
					<div class="header">
						<kol-heading-wc _label={this.state._heading} _level={this.state._level}></kol-heading-wc>
						<slot name="header"></slot>
					</div>
					<div class="content">
						<slot name="content"></slot> {/* Deprecated for version 2 */}
						<slot />
					</div>
					{this.state._hasFooter && (
						<div class="footer">
							<slot name="footer"></slot>
						</div>
					)}
				</div>
			</Host>
		);
	}

	/**
	 * Macht den Footerbereich der Card sichtbar.
	 */
	@Prop() public _hasFooter?: boolean = false;

	/**
	 * Gibt die Beschriftung der Komponente an.
	 */
	@Prop() public _heading!: string;

	/**
	 * Gibt die Beschriftung der Komponente an.
	 *
	 * @deprecated Verwende stattdessen das Property _heading.
	 */
	@Prop() public _headline?: string;

	/**
	 * Gibt an, welchen H-Level von 1 bis 6 die Überschrift hat. Oder bei 0, ob es keine Überschrift ist und als fett gedruckter Text angezeigt werden soll.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	@State() public state: KoliBriCardStates = {
		_heading: '…', // '⚠'
	};

	@Watch('_hasFooter')
	public validateHasFooter(value?: boolean): void {
		validateHasFooter(this, value);
	}

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

	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	public componentWillLoad(): void {
		this.validateHasFooter(this._hasFooter);
		this.validateHeading(this._heading || this._headline);
		this.validateLevel(this._level);
	}
}
