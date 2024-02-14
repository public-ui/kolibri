import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { HeadingLevel } from '../../types/heading-level';
import { HasCloserPropType, validateHasCloser } from '../../types/props/has-closer';
import { HasFooterPropType, validateHasFooter } from '../../types/props/has-footer';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { setState } from '../../utils/prop.validators';
import { KoliBriAlertEventCallbacks } from '../alert/types';
import { watchHeadingLevel } from '../heading/validation';
import { API, KoliBriCardEventCallbacks, States } from './types';

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
export class KolCard implements API {
	private readonly close = () => {
		if (this._on?.onClose !== undefined) {
			this._on.onClose(new Event('Close'));
		}
	};

	private readonly on = {
		onClick: this.close,
	};

	public render(): JSX.Element {
		return (
			<Host>
				<div class="card">
					<div class="header">
						<kol-heading-wc _label={this.state._label} _level={this.state._level} class="kol-heading-wc"></kol-heading-wc>
						<slot name="header"></slot>
					</div>
					<div class="content">
						<slot name="content"></slot>
						{/* Deprecated for version 2 */}
						<slot />
					</div>
					{this.state._hasFooter && (
						<div class="footer">
							<slot name="footer"></slot>
						</div>
					)}

					{this.state._hasCloser && (
						<kol-button-wc
							class="kol-button-wc close"
							_hideLabel
							_icons={{
								left: {
									icon: 'codicon codicon-close',
								},
							}}
							_label={translate('kol-close')}
							_on={this.on}
							_tooltipAlign="left"
						></kol-button-wc>
					)}
				</div>
			</Host>
		);
	}

	/**
	 * Defines the event callback functions for the component.
	 */
	@Prop() public _on?: KoliBriCardEventCallbacks;

	/**
	 * Defines whether the element can be closed.
	 * @TODO: Change type back to `HasCloserPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hasCloser?: boolean = false;

	/**
	 * Shows the slot="footer".
	 * @TODO: Change type back to `HasFooterPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hasFooter?: boolean = false;

	/**
	 * Deprecated: Gibt die Beschriftung der Komponente an.
	 * @deprecated Use _label.
	 */
	@Prop() public _heading?: string;

	/**
	 * Deprecated: Gibt die Beschriftung der Komponente an.
	 * @deprecated Use _label.
	 */
	@Prop() public _headline?: string;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType;

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	@State() public state: States = {
		_label: '…', // ⚠ required
	};

	private validateOnValue = (value: unknown): boolean =>
		typeof value === 'object' && value !== null && typeof (value as KoliBriCardEventCallbacks).onClose === 'function';

	@Watch('_on')
	public validateOn(value?: KoliBriCardEventCallbacks): void {
		if (this.validateOnValue(value)) {
			setState<KoliBriCardEventCallbacks>(this, '_on', {
				onClose: (value as KoliBriAlertEventCallbacks).onClose,
			});
		}
	}

	@Watch('_hasCloser')
	public validateHasCloser(value?: HasCloserPropType): void {
		validateHasCloser(this, value);
	}

	@Watch('_hasFooter')
	public validateHasFooter(value?: HasFooterPropType): void {
		validateHasFooter(this, value);
	}

	/**
	 * @deprecated
	 */
	@Watch('_heading')
	public validateHeading(value?: string): void {
		this.validateLabel(value);
	}

	/**
	 * @deprecated
	 */
	@Watch('_headline')
	public validateHeadline(value?: string): void {
		this.validateLabel(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			defaultValue: '…',
		});
	}

	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	public componentWillLoad(): void {
		this.validateHasCloser(this._hasCloser);
		this.validateHasFooter(this._hasFooter);
		this.validateLabel(this._label || this._heading || this._headline);
		this.validateLevel(this._level);
		this.validateOn(this._on);
	}
}
