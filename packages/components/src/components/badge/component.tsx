import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import type { BadgeApi } from '../../internal/functional-components/badge/api';
import { badgePropsConfig } from '../../internal/functional-components/badge/api';
import { BadgeFC } from '../../internal/functional-components/badge/component';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { colorProp, labelWithExpertSlotProp, smartButtonProp, spanIconsProp } from '../../internal/props';
import type { BadgeProps, FocusableElement, InternalButtonProps, KolFocusOptions, KoliBriIconsProp, LabelPropType, PropColor, Stringified } from '../../schema';
import { featureHint, objectObjectHandler } from '../../schema';
import { createUniqueId } from '../../utils/dev.utils';
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
export class KolBadge extends BaseWebComponent<BadgeApi> implements BadgeProps, FocusableElement, WebComponentInterface<BadgeApi> {
	@Element() protected readonly host?: HTMLKolBadgeElement;

	protected readonly ctaRef = createCtaRef<HTMLKolButtonWcElement>();

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(badgePropsConfig);
		// A badge without `_smartButton` renders no button at all, so the seeded default must not
		// survive initialization — see `applySmartButton`.
		this.unsetRenderProp('smartButton');

		this.watchColor(this._color);
		this.watchIcons(this._icons);
		this.watchLabel(this._label);
		this.watchSmartButton(this._smartButton);
	}

	/**
	 * Applies `_smartButton`, which is the only prop that may end up unset rather than defaulted.
	 * The predecessor stored an unparseable value verbatim and its `typeof value === 'object'`
	 * check then rendered no button; clearing the render prop first reproduces that without a
	 * second code path.
	 */
	private applySmartButton(value?: Stringified<InternalButtonProps>): void {
		objectObjectHandler(value, () => {
			this.unsetRenderProp('smartButton');
			if (value !== undefined && value !== null) {
				smartButtonProp.apply(value, (v) => this.setRenderProp('smartButton', v));
			}
		});
	}

	// --- Public methods ---

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	// @ts-expect-error: options parameter will be implemented by the decorator.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public async focus(options?: KolFocusOptions): Promise<void> {}

	// --- Render ---

	public render(): JSX.Element {
		return (
			<Host>
				<BadgeFC
					color={this.getRenderProp('color')}
					icons={this.getRenderProp('icons')}
					label={this.getRenderProp('label')}
					labelId={this.labelId}
					refSmartButton={this.ctaRef}
					smartButton={this.getRenderProp('smartButton')}
				/>
			</Host>
		);
	}

	// --- @State ---

	@State() public labelId: string = createUniqueId('badge-label');

	// --- Props + Watchers ---

	/**
	 * Defines the backgroundColor and foregroundColor.
	 */
	@Prop() public _color?: Stringified<PropColor> = '#000';
	@Watch('_color')
	public watchColor(value?: Stringified<PropColor>): void {
		colorProp.apply(value, (v) => this.setRenderProp('color', v));
	}

	/**
	 * Defines the icon classnames.
	 */
	@Prop() public _icons?: Stringified<KoliBriIconsProp>;
	@Watch('_icons')
	public watchIcons(value?: Stringified<KoliBriIconsProp>): void {
		spanIconsProp.apply(value, (v) => this.setRenderProp('icons', v));
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;
	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		labelWithExpertSlotProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	/**
	 * Allows to add a button with an arbitrary action within the element (_hide-label only).
	 */
	@Prop() public _smartButton?: Stringified<InternalButtonProps>;
	@Watch('_smartButton')
	public watchSmartButton(value?: Stringified<InternalButtonProps>): void {
		this.applySmartButton(value);
	}
}
