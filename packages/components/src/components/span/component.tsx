import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Stringified } from '../../types/common';
import { KoliBriIconProp } from '../../types/icon';
import { HideLabelPropType, validateHideLabel } from '../../types/props/hide-label';
import { validateIcon } from '../../types/props/icon';
import { LabelWithExpertSlotPropType, validateLabelWithExpertSlot } from '../../types/props/label';
import { md } from '../../utils/markdown';
import { watchBoolean } from '../../utils/prop.validators';
import { showExpertSlot } from '../../utils/reuse';
import { API, States } from './types';

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
					'icon-only': !!this.state._hideLabel, // @deprecated in v2
					'hide-label': !!this.state._hideLabel,
				}}
			>
				{this.state._icon.top && <kol-icon class="icon top" style={this.state._icon.top.style} _label="" _icon={this.state._icon.top.icon} />}
				<span>
					{this.state._icon.left && <kol-icon class="icon left" style={this.state._icon.left.style} _label="" _icon={this.state._icon.left.icon} />}
					{!this.state._hideLabel && hideExpertSlot ? (
						this.state._allowMarkdown && typeof this.state._label === 'string' && this.state._label.length > 0 ? (
							<span class="span-label md" innerHTML={md(this.state._label)} />
						) : (
							<span class="span-label">{this.state._label ?? ''}</span>
						)
					) : (
						''
					)}
					<span aria-hidden={hideExpertSlot ? 'true' : undefined} class="span-label" hidden={hideExpertSlot}>
						<slot name="expert" />
					</span>
					{this.state._icon.right && <kol-icon class="icon right" style={this.state._icon.right.style} _label="" _icon={this.state._icon.right.icon} />}
				</span>
				{this.state._icon.bottom && <kol-icon class="icon bottom" style={this.state._icon.bottom.style} _label="" _icon={this.state._icon.bottom.icon} />}
			</Host>
		);
	}

	/**
	 * Allows to use markdown in the label. Defaults to `false`.
	 */
	@Prop() public _allowMarkdown?: boolean;

	/**
	 * Hides the label and shows the description in a Tooltip instead.
	 * @TODO: Change type back to `HideLabelPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hideLabel?: boolean = false;

	/**
	 * Defines the icon classnames (e.g. `_icon="fa-solid fa-user"`).
	 */
	@Prop() public _icon?: Stringified<KoliBriIconProp>;

	/**
	 * Deprecated: Hides the label and shows the description in a Tooltip instead.
	 * @deprecated use _hide-label
	 */
	@Prop() public _iconOnly?: boolean;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	@State() public state: States = {
		_allowMarkdown: false,
		_hideLabel: false,
		_icon: {},
		_label: '', // ⚠ required
	};

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

	@Watch('_icon')
	public validateIcon(value?: KoliBriIconProp): void {
		validateIcon(this, value);
	}

	/**
	 * @deprecated use _hide-label
	 */
	@Watch('_iconOnly')
	public validateIconOnly(value?: boolean): void {
		this.validateHideLabel(value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		validateLabelWithExpertSlot(this, value);
	}

	public componentWillLoad(): void {
		this.validateAllowMarkdown(this._allowMarkdown);
		this.validateHideLabel(this._hideLabel || this._iconOnly);
		this.validateIcon(this._icon);
		this.validateLabel(this._label);
	}
}
