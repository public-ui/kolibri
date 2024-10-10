import type { CardAPI, CardStates, HasCloserPropType, HeadingLevel, KoliBriAlertEventCallbacks, KoliBriCardEventCallbacks, LabelPropType } from '../../schema';
import { setState, validateHasCloser, validateLabel } from '../../schema';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { watchHeadingLevel } from '../heading/validation';

import type { JSX } from '@stencil/core';
import { KolButtonWcTag, KolHeadingWcTag } from '../../core/component-names';
/**
 * @slot - Ermöglicht das Einfügen beliebigen HTML's in den Inhaltsbereich der Card.
 */
@Component({
	tag: 'kol-card',
	styleUrls: {
		default: './style.scss',
	},
	shadow: {
		delegatesFocus: true,
	},
})
export class KolCard implements CardAPI {
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
			<Host class="kol-card">
				<div class="card">
					<div class="header">
						<KolHeadingWcTag _label={this.state._label} _level={this.state._level}></KolHeadingWcTag>
					</div>
					<div class="content">
						<slot />
					</div>
					{this.state._hasCloser && (
						<KolButtonWcTag
							class="close"
							_hideLabel
							_icons={{
								left: {
									icon: 'codicon codicon-close',
								},
							}}
							_label={translate('kol-close')}
							_on={this.on}
							_tooltipAlign="left"
						></KolButtonWcTag>
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
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 1;

	@State() public state: CardStates = {
		_label: '', // ⚠ required
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

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	public componentWillLoad(): void {
		this.validateHasCloser(this._hasCloser);
		this.validateLabel(this._label);
		this.validateLevel(this._level);
		this.validateOn(this._on);
	}
}
