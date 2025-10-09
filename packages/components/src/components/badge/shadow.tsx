import type { BadgeAPI, BadgeStates, KoliBriIconsProp, LabelPropType, PropColor, SmartButtonProps, Stringified } from '../../schema';
import { featureHint, handleColorChange, objectObjectHandler, parseJson, setState, validateColor, validateIcons } from '../../schema';
import { Component, h, Prop, State, Watch, Method } from '@stencil/core';
import { KolSpanFc } from '../../functional-components';

import { nonce } from '../../utils/dev.utils';

import type { JSX } from '@stencil/core';
import { KolButtonWcTag } from '../../core/component-names';
import clsx from 'clsx';
featureHint(`[KolBadge] Optimierung des _color-Properties (rgba, rgb, hex usw.).`);

@Component({
	tag: 'kol-badge',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolBadge implements BadgeAPI {
	private bgColorStr = '#000';
	private colorStr = '#fff';
	private readonly id = nonce();
	private smartButtonEl?: HTMLKolButtonWcElement;

	private forwardSmartButtonRef(el: HTMLKolButtonWcElement | undefined, ref?: SmartButtonProps['ref']): void {
		if (!ref) return;
		if (typeof ref === 'function') {
			ref(el);
		} else {
			ref.current = el;
		}
	}

	private renderSmartButton(props: SmartButtonProps): JSX.Element {
		return (
			<KolButtonWcTag
				class="kol-badge__smart-button"
				_ariaControls={this.id}
				_customClass={props._customClass}
				_disabled={props._disabled}
				_hideLabel={true}
				_icons={props._icons}
				_id={props._id}
				_label={props._label}
				_on={props._on}
				_tooltipAlign={props._tooltipAlign}
				_buttonVariant={props._variant}
				ref={(el) => {
					this.smartButtonEl = el ?? undefined;
					this.forwardSmartButtonRef(el, props.ref);
				}}
			></KolButtonWcTag>
		);
	}

	@Method()
	public async kolFocus(): Promise<void> {
		const btn = this.smartButtonEl as (HTMLKolButtonWcElement & { kolFocus?: () => void | Promise<void> }) | undefined;
		if (btn?.kolFocus && typeof btn.kolFocus === 'function') {
			await btn.kolFocus();
			return;
		}
		btn?.focus();
	}

	public render(): JSX.Element {
		const hasSmartButton = typeof this.state._smartButton === 'object' && this.state._smartButton !== null;

		return (
			<span
				class={clsx('kol-badge', {
					'kol-badge--has-smart-button': typeof this.state._smartButton === 'object' && this.state._smartButton !== null,
				})}
				style={{
					backgroundColor: this.bgColorStr,
					color: this.colorStr,
				}}
			>
				<KolSpanFc class="kol-badge__label" id={hasSmartButton ? this.id : undefined} allowMarkdown icons={this.state._icons} label={this._label} />
				{hasSmartButton && this.renderSmartButton(this.state._smartButton as SmartButtonProps)}
			</span>
		);
	}

	/**
	 * Defines the backgroundColor and foregroundColor.
	 */
	@Prop() public _color?: Stringified<PropColor> = '#000';

	/**
	 * Defines the icon classnames (e.g. `_icons="fa-solid fa-user"`).
	 */
	@Prop() public _icons?: Stringified<KoliBriIconsProp>;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Allows to add a button with an arbitrary action within the element (_hide-label only).
	 */
	@Prop() public _smartButton?: Stringified<SmartButtonProps>;

	@State() public state: BadgeStates = {
		_color: {
			backgroundColor: '#000',
			foregroundColor: '#fff',
		},
		_icons: {},
	};

	private handleColorChange = (value: unknown) => {
		const colorPair = handleColorChange(value);
		this.bgColorStr = colorPair.backgroundColor;
		this.colorStr = colorPair.foregroundColor as string;
	};

	@Watch('_icons')
	public validateIcons(value?: KoliBriIconsProp): void {
		validateIcons(this, value);
	}

	@Watch('_color')
	public validateColor(value?: Stringified<PropColor>): void {
		validateColor(this, value, {
			defaultValue: '#000',
			hooks: {
				beforePatch: this.handleColorChange,
			},
		});
	}

	@Watch('_smartButton')
	public validateSmartButton(value?: SmartButtonProps | string): void {
		objectObjectHandler(value, () => {
			try {
				value = parseJson<SmartButtonProps>(value as string);
				// eslint-disable-next-line no-empty
			} catch (e) {
				// value behält den ursprünglichen Wert
			}
			setState(this, '_smartButton', value);
		});
	}

	public componentWillLoad(): void {
		this.validateIcons(this._icons);
		this.validateColor(this._color);
		this.validateSmartButton(this._smartButton);
	}
}
