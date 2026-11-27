import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { ResolvedButtonProps } from '../../internal/functional-components/button/resolve-props';
import type { CardApi } from '../../internal/functional-components/card/api';
import { cardPropsConfig } from '../../internal/functional-components/card/api';
import { resolveCardCloseButtonProps } from '../../internal/functional-components/card/close-button';
import { CardFC } from '../../internal/functional-components/card/component';
import type { PropsConfigShape, WebComponentInterface } from '../../internal/functional-components/generic-types';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import { cardCallbacksProp, hasCloserProp, hrefProp, imageProp, labelLangSegmentsProp, levelProp, linkTargetProp } from '../../internal/props';
import type {
	ClickableElement,
	FocusableElement,
	HasCloserPropType,
	HeadingLevel,
	HrefPropType,
	ImagePropType,
	KolFocusOptions,
	KoliBriCardEventCallbacks,
	LabelLangSegmentsPropType,
	LinkTargetPropType,
} from '../../schema';
import { createUniqueId } from '../../utils/dev.utils';
import { createCtaRef, delegateClick, delegateFocus } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

/**
 * The **Card** component is ideal for visually highlighting individual sections of your website. It allows you to structure your content very easily.
 *
 * The **Card** component consists of a **_title area_** and a **_content area_**.
 *
 * The **title area** is displayed in a larger font. The **content area** is visually separated from the title area by a horizontal dividing line and is rendered in the default font.
 *
 * @slot - Allows arbitrary HTML to be inserted into the content area of the card.
 */
@Component({
	tag: 'kol-card',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolCard extends BaseWebComponent<CardApi> implements ClickableElement, FocusableElement, WebComponentInterface<CardApi> {
	@Element()
	protected readonly host?: HTMLKolCardElement;

	@State()
	public ariaDescriptionId: string = createUniqueId('aria-description');

	@State()
	public headingId: string = createUniqueId('card-heading');

	private readonly ctaRef = createCtaRef<HTMLAnchorElement>();
	private readonly closeButtonRef = createCtaRef<HTMLButtonElement>();

	/** Drives the close button's tooltip — it renders with `hideLabel`, so its label lives there. */
	private readonly tooltipBehavior = new TooltipBehavior(this.stateAccess);

	/** Resolved once in `componentWillLoad`: the close button's configuration never changes. */
	private closeButtonProps!: ResolvedButtonProps;

	protected readonly propsConfig: PropsConfigShape = cardPropsConfig;

	/**
	 * Defines whether the element can be closed.
	 */
	@Prop()
	public _hasCloser?: HasCloserPropType = false;

	@Watch('_hasCloser')
	public watchHasCloser(value?: HasCloserPropType): void {
		hasCloserProp.apply(value, (v) => this.setRenderProp('hasCloser', v));
	}

	/**
	 * Defines the target URI of the link.
	 */
	@Prop()
	public _href?: HrefPropType = undefined;

	@Watch('_href')
	public watchHref(value?: HrefPropType): void {
		hrefProp.apply(value, (v) => this.setRenderProp('href', v), this.isRequired('href'));
	}

	/**
	 * Sets the image URI and alt text for the card image.
	 */
	@Prop()
	public _image?: ImagePropType = undefined;

	@Watch('_image')
	public watchImage(value?: ImagePropType): void {
		imageProp.apply(value, (v) => this.setRenderProp('image', v));
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop()
	public _label!: LabelLangSegmentsPropType;

	@Watch('_label')
	public watchLabel(value?: LabelLangSegmentsPropType): void {
		labelLangSegmentsProp.apply(value, (v) => this.setRenderProp('label', v), this.isRequired('label'));
	}

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop()
	public _level?: HeadingLevel = 0;

	@Watch('_level')
	public watchLevel(value?: HeadingLevel): void {
		levelProp.apply(value, (v) => this.setRenderProp('level', v));
	}

	/**
	 * Defines the event callback functions for the component.
	 */
	@Prop()
	public _on?: KoliBriCardEventCallbacks = undefined;

	@Watch('_on')
	public watchOn(value?: KoliBriCardEventCallbacks): void {
		cardCallbacksProp.apply(value, (v) => this.setRenderProp('on', v));
	}

	/**
	 * Defines where to open the link.
	 */
	@Prop()
	public _target?: LinkTargetPropType = undefined;

	@Watch('_target')
	public watchTarget(value?: LinkTargetPropType): void {
		linkTargetProp.apply(value, (v) => this.setRenderProp('target', v));
	}

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	@delegateFocus('ctaRef')
	public focus(options?: KolFocusOptions): Promise<void> {
		// The focus decorator owns the implementation and forwards `options` to `setFocus`; this body only declares the public signature.
		void options;
		return Promise.resolve();
	}

	/**
	 * Clicks the primary interactive element inside this component.
	 */
	@Method()
	@delegateClick('ctaRef')
	public click(): Promise<void> {
		return Promise.resolve();
	}

	public componentWillLoad(): void {
		this.closeButtonProps = resolveCardCloseButtonProps(this.host);
		this.tooltipBehavior.componentWillLoad({
			label: this.closeButtonProps.label,
			align: this.closeButtonProps.tooltipAlign,
		});

		this.watchHasCloser(this._hasCloser);
		this.watchHref(this._href);
		this.watchImage(this._image);
		this.watchLabel(this._label);
		this.watchLevel(this._level);
		this.watchOn(this._on);
		this.watchTarget(this._target);
	}

	public componentDidRender(): void {
		if (this.closeButtonRef.el) {
			this.tooltipBehavior.syncListeners(undefined, this.closeButtonRef.el, true);
		}
	}

	public disconnectedCallback(): void {
		this.tooltipBehavior.destroy();
	}

	private readonly handleClose = (): void => {
		this.tooltipBehavior.hideTooltip();
		this.getRenderProp('on').onClose?.(new Event('Close'));
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.close);
		}
	};

	private readonly handleFocus = (event: FocusEvent): void => {
		this.getRenderProp('on').onFocus?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.focus);
		}
	};

	private readonly handleBlur = (event: FocusEvent): void => {
		this.getRenderProp('on').onBlur?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.blur);
		}
	};

	public render(): JSX.Element {
		return (
			<Host>
				<CardFC
					ariaDescriptionId={this.getState('ariaDescriptionId')}
					closeButtonProps={this.closeButtonProps}
					handleBlur={this.handleBlur}
					handleClose={this.handleClose}
					handleFocus={this.handleFocus}
					hasCloser={this.getRenderProp('hasCloser')}
					headingId={this.getState('headingId')}
					href={this.getRenderProp('href')}
					image={this.getRenderProp('image')}
					label={this.getRenderProp('label')}
					level={this.getRenderProp('level')}
					on={this.getRenderProp('on')}
					refCloseButton={this.closeButtonRef}
					refCta={this.ctaRef}
					refTooltip={this.tooltipBehavior.setTooltipElementRef}
					target={this.getRenderProp('target')}
				>
					<slot />
				</CardFC>
			</Host>
		);
	}
}
