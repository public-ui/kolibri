import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import { SpanFC } from '../../internal/functional-components/span/component';
import type {
	BadgeAPI,
	BadgeStates,
	FocusableElement,
	InternalButtonProps,
	KolFocusOptions,
	KoliBriIconsProp,
	LabelPropType,
	PropColor,
	Stringified,
} from '../../schema';
import { featureHint, handleColorChange, objectObjectHandler, parseJson, setState, validateColor, validateIcons } from '../../schema';

import { createUniqueId } from '../../utils/dev.utils';

import type { JSX } from '@stencil/core';
import { KolButtonWcTag } from '../../core/component-names';
import clsx from '../../utils/clsx';
import { createCtaRef, delegateFocus } from '../../utils/element-interaction';
featureHint(`[KolBadge] Optimierung des _color-Properties (rgba, rgb, hex usw.).`);

/**
 * The **Badge** component allows you to visually highlight specific information.
 * In addition to specifying the background color and automatically calculating the text color, it also supports adding an icon and/or a different font style.
 *
 * @slot expert - Custom label content, e.g. for rich text or icons. https://public-ui.github.io/docs/concepts/expert-slot
 */
@Component({
	tag: 'kol-badge',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolBadge implements BadgeAPI, FocusableElement {
	@Element() protected readonly host?: HTMLKolBadgeElement;
	private bgColorStr = '#000';
	private colorStr = '#fff';
	private readonly id = createUniqueId('badge-label');
	protected readonly ctaRef = createCtaRef<HTMLKolButtonWcElement>();

	private renderSmartButton(props: InternalButtonProps): JSX.Element {
		return (
			<KolButtonWcTag
				ref={this.ctaRef}
				class="kol-badge__smart-button"
				_ariaControls={this.id}
				_ariaDescription={props._ariaDescription}
				_variant={props._variant}
				_customClass={props._customClass}
				_disabled={props._disabled}
				_hideLabel={true}
				_icons={props._icons}
				_id={props._id}
				_label={props._label}
				_on={props._on}
				_tooltipAlign={props._tooltipAlign}
			/>
		);
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

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
				<SpanFC class="kol-badge__label" id={hasSmartButton ? this.id : undefined} allowMarkdown icons={this.state._icons} label={this._label} />
				{hasSmartButton && this.renderSmartButton(this.state._smartButton as InternalButtonProps)}
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
	@Prop() public _smartButton?: Stringified<InternalButtonProps>;

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
		this.colorStr = colorPair.foregroundColor;
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
	public validateSmartButton(value?: InternalButtonProps | string): void {
		objectObjectHandler(value, () => {
			try {
				value = parseJson<InternalButtonProps>(value as string);
			} catch {
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
