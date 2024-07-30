import type { AccessKeyPropType, HideLabelPropType, KoliBriIconsProp, LabelWithExpertSlotPropType, SpanAPI, SpanStates, Stringified } from '../../schema';
import { showExpertSlot, validateAccessKey, validateHideLabel, validateIcons, validateLabelWithExpertSlot, watchBoolean } from '../../schema';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';

import { md } from '../../utils/markdown';
import { InternalUnderlinedAccessKey } from './InternalUnderlinedAccessKey';

import type { JSX } from '@stencil/core';
import { KolIconTag } from '../../core/component-names';

/**
 * @internal
 */
@Component({
	tag: 'kol-span-wc',
	shadow: false,
})
export class KolSpanWc implements SpanAPI {
	public render(): JSX.Element {
		const hideExpertSlot = !showExpertSlot(this.state._label);
		return (
			<Host
				class={{
					'kol-span-wc': true,
					'hide-label': !!this.state._hideLabel,
				}}
			>
				{this.state._icons.top && (
					<KolIconTag class="icon top" style={this.state._icons.top.style} _label={this.state._icons.top.label ?? ''} _icons={this.state._icons.top.icon} />
				)}
				<span>
					{this.state._icons.left && (
						<KolIconTag
							class="icon left"
							style={this.state._icons.left.style}
							_label={this.state._icons.left.label ?? ''}
							_icons={this.state._icons.left.icon}
						/>
					)}
					{!this.state._hideLabel && hideExpertSlot ? (
						this.state._allowMarkdown && typeof this.state._label === 'string' && this.state._label.length > 0 ? (
							<span class="span-label md" innerHTML={md(this.state._label)} />
						) : (
							<span class="span-label">
								{this.state._accessKey != null && this.state._label.length > 0 ? (
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
					{this.state._icons.right && (
						<KolIconTag
							class="icon right"
							style={this.state._icons.right.style}
							_label={this.state._icons.right.label ?? ''}
							_icons={this.state._icons.right.icon}
						/>
					)}
				</span>
				{this.state._icons.bottom && (
					<KolIconTag
						class="icon bottom"
						style={this.state._icons.bottom.style}
						_label={this.state._icons.bottom.label ?? ''}
						_icons={this.state._icons.bottom.icon}
					/>
				)}
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
	@Prop() public _icons?: Stringified<KoliBriIconsProp> = {};

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.). Set to `false` to enable the expert slot.
	 */
	@Prop() public _label!: LabelWithExpertSlotPropType;

	@State() public state: SpanStates = {
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
		validateHideLabel(this, value, {
			defaultValue: false,
		});
	}

	@Watch('_icons')
	public validateIcons(value?: KoliBriIconsProp): void {
		validateIcons(this, value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelWithExpertSlotPropType): void {
		validateLabelWithExpertSlot(this, value, {
			required: true,
		});
	}

	public componentWillLoad(): void {
		this.validateAccessKey(this._accessKey);
		this.validateAllowMarkdown(this._allowMarkdown);
		this.validateHideLabel(this._hideLabel);
		this.validateIcons(this._icons);
		this.validateLabel(this._label);
	}
}
