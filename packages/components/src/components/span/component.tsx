import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Stringified } from '../../types/common';
import { KoliBriIconsProp } from '../../types/icons';
import { HideLabelPropType, validateHideLabel } from '../../types/props/hide-label';
import { validateIcons } from '../../types/props/icons';
import { LabelWithExpertSlotPropType, validateLabelWithExpertSlot } from '../../types/props/label';
import { md } from '../../utils/markdown';
import { watchBoolean } from '../../utils/prop.validators';
import { showExpertSlot } from '../../utils/reuse';
import { API, States } from './types';
import { AccessKeyPropType, validateAccessKey } from '../../types/props/access-key';
import { InternalUnderlinedAccessKey } from './InternalUnderlinedAccessKey';

/**
 * @internal
 */
@Component({
	tag: 'kol-span-wc',
	shadow: false,
})
export class KolSpanWc implements API {
	public render(): JSX.Element {
		const hideExpertSlot = !showExpertSlot(this.state._label);
		return (
			<Host
				class={{
					'hide-label': !!this.state._hideLabel,
				}}
			>
				{this.state._icons.top && <kol-icon class="icon top" style={this.state._icons.top.style} _label="" _icons={this.state._icons.top.icon} />}
				<span>
					{this.state._icons.left && <kol-icon class="icon left" style={this.state._icons.left.style} _label="" _icons={this.state._icons.left.icon} />}
					{!this.state._hideLabel && hideExpertSlot ? (
						this.state._allowMarkdown && typeof this.state._label === 'string' && this.state._label.length > 0 ? (
							<span class="span-label md" innerHTML={md(this.state._label)} />
						) : (
							<span class="span-label">
								{this.state._accessKey && this.state._label.length ? (
									<InternalUnderlinedAccessKey label={this.state._label} accessKey={this.state._accessKey} />
								) : (
									this.state._label ?? ''
								)}
							</span>
						)
					) : (
						''
					)}
					<span aria-hidden={hideExpertSlot ? 'true' : undefined} class="span-label" hidden={hideExpertSlot}>
						<slot name="expert" />
					</span>
					{this.state._accessKey && (
						<span class="access-key-hint" aria-hidden="true">
							{this.state._accessKey}
						</span>
					)}
					{this.state._icons.right && <kol-icon class="icon right" style={this.state._icons.right.style} _label="" _icons={this.state._icons.right.icon} />}
				</span>
				{this.state._icons.bottom && <kol-icon class="icon bottom" style={this.state._icons.bottom.style} _label="" _icons={this.state._icons.bottom.icon} />}
			</Host>
		);
	}

	/**
	 * Defines the elements access key.
	 */
	@Prop() public _accessKey?: AccessKeyPropType;

	/**
	 * Allows to use markdown in the label. Defaults to `false`.
	 */
	@Prop() public _allowMarkdown?: boolean = false;

	/**
	 * Hides the caption by default and displays the caption text with a tooltip when the
	 * interactive element is focused or the mouse is over it.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: Stringified<KoliBriIconsProp>;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	@State() public state: States = {
		_allowMarkdown: false,
		_hideLabel: false,
		_icons: {},
		_label: '', // ⚠ required
	};

	@Watch('_accessKey')
	public validateAccessKey(value?: AccessKeyPropType): void {
		validateAccessKey(this, value);
	}

	@Watch('_allowMarkdown')
	public validateAllowMarkdown(value?: boolean): void {
		watchBoolean(this, '_allowMarkdown', value, {
			defaultValue: false,
		});
	}

	@Watch('_hideLabel')
	public validateHideLabel(value?: HideLabelPropType): void {
		validateHideLabel(this, value);
	}

	@Watch('_icons')
	public validateIcons(value?: KoliBriIconsProp): void {
		validateIcons(this, value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		validateLabelWithExpertSlot(this, value);
	}

	public componentWillLoad(): void {
		this.validateAccessKey(this._accessKey);
		this.validateAllowMarkdown(this._allowMarkdown);
		this.validateHideLabel(this._hideLabel);
		this.validateIcons(this._icons);
		this.validateLabel(this._label);
	}
}
