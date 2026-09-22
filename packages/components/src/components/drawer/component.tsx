import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { ResolvedButtonProps } from '../../internal/functional-components/button/resolve-props';
import { resolveCardCloseButtonProps } from '../../internal/functional-components/card/close-button';
import type { CardFCProps } from '../../internal/functional-components/card/component';
import type { DrawerApi } from '../../internal/functional-components/drawer/api';
import { drawerPropsConfig } from '../../internal/functional-components/drawer/api';
import { DrawerFC } from '../../internal/functional-components/drawer/component';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import { alignProp, drawerCallbacksProp, hasCloserProp, labelProp, levelProp, openProp } from '../../internal/props';
import type { AlignPropType, DrawerProps, HeadingLevel, KoliBriModalEventCallbacks, LabelPropType, OpenPropType } from '../../schema';
import { createUniqueId, nonce } from '../../utils/dev.utils';
import { createCtaRef } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import { lockScroll, unlockScroll } from '../../utils/scroll-lock';
import { handleCancelOverlay } from '../../utils/tooltip-open-tracking';

/**
 * The card is never a link, so its `_on` callbacks — which describe that link — have no target
 * here and its anchor ref is never called.
 */
const NOOP = (): void => {};

/**
 * @slot - The Content of drawer.
 */
@Component({
	tag: 'kol-drawer',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolDrawer extends BaseWebComponent<DrawerApi> implements DrawerProps, WebComponentInterface<DrawerApi> {
	@Element() private readonly host?: HTMLKolDrawerElement;

	private readonly dialogRef = createCtaRef<HTMLDialogElement>();
	private readonly wrapperRef = createCtaRef<HTMLDivElement>();
	private readonly cardCloseButtonRef = createCtaRef<HTMLButtonElement>();

	/** Drives the card close button's tooltip — it renders with `hideLabel`, so its label lives there. */
	private readonly cardCloseTooltipBehavior = new TooltipBehavior(this.stateAccess);

	/** Resolved once in `componentWillLoad`: the close button's configuration never changes. */
	private cardCloseButtonProps!: ResolvedButtonProps;

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(drawerPropsConfig);

		this.cardCloseButtonProps = resolveCardCloseButtonProps(this.host);
		this.cardCloseTooltipBehavior.componentWillLoad({
			label: this.cardCloseButtonProps.label,
			align: this.cardCloseButtonProps.tooltipAlign,
		});

		this.watchAlign(this._align);
		this.watchHasCloser(this._hasCloser);
		this.watchLabel(this._label);
		this.watchLevel(this._level);
		this.watchOn(this._on);
		this.watchOpen(this._open);
	}

	/** The `<dialog>` only exists after the first render, so an initially open drawer opens here. */
	public componentDidLoad(): void {
		this.openOrCloseBasedOnState();
	}

	public componentDidRender(): void {
		if (this.cardCloseButtonRef.el) {
			this.cardCloseTooltipBehavior.syncListeners(undefined, this.cardCloseButtonRef.el, true);
		}
	}

	public disconnectedCallback(): void {
		unlockScroll(this);
		this.cardCloseTooltipBehavior.destroy();
	}

	// --- Public methods ---

	/**
	 * Opens the drawer. Pass true to open as a modal drawer.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async show(modal: boolean = false): Promise<void> {
		this.showDrawer(modal);
	}

	/**
	 * Opens the drawer as a modal.
	 */
	@Method()
	public async showModal(): Promise<void> {
		await this.show(true);
	}

	/**
	 * Opens the drawer.
	 * @deprecated Use show() or showModal() instead.
	 */
	@Method()
	public async open(): Promise<void> {
		await this.show(false);
	}

	/**
	 * Closes the drawer.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async close(): Promise<void> {
		this.closeDrawer();
	}

	// --- Drawer control ---

	/*
	 * The optional chaining on the native methods is a workaround for HTMLDialogElement not being
	 * implemented in jsdom, which would otherwise fail the Jest tests.
	 */

	private showDrawer(modal: boolean): void {
		const dialog = this.dialogRef.el;
		if (dialog?.open) {
			return;
		}

		this.setState('modal', modal);
		this.setState('expanded', true);
		if (modal) {
			dialog?.showModal?.();
			if (dialog) {
				lockScroll(this);
			}
		} else {
			dialog?.show?.();
		}

		this.getRenderProp('on').onToggle?.(true);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.toggle);
		}
	}

	/**
	 * Starts the close: the wrapper picks up `--is-closing` and plays the theme's slide-out
	 * animation, and {@link handleAnimationEnd} closes the `<dialog>` once it has finished. A theme
	 * without that animation has nothing to wait for and closes right away.
	 */
	private closeDrawer(): void {
		this.setState('expanded', false);

		const wrapper = this.wrapperRef.el;
		if (!wrapper) {
			return;
		}
		if (window.getComputedStyle(wrapper).animationName === 'none') {
			this.dialogRef.el?.close?.();
		}
	}

	private openOrCloseBasedOnState(): void {
		if (this.getState('expanded')) {
			this.showDrawer(this.getState('modal'));
		} else {
			this.closeDrawer();
		}
	}

	// --- Event handling ---

	private readonly handleAnimationEnd = (event: AnimationEvent): void => {
		if (event.animationName.includes('slideOut')) {
			this.dialogRef.el?.close?.();
		}
	};

	private readonly handleCancel = (event: Event): void => {
		handleCancelOverlay(event);
		if (event.defaultPrevented) return;

		this.getRenderProp('on').onCancel?.(event);
		if (event.defaultPrevented) return;

		if (this.host && !dispatchDomEvent(this.host, KolEvent.cancel)) {
			event.preventDefault();
		}
	};

	private readonly handleClose = (event: Event): void => {
		// Ignore close events that bubble up from slotted content (e.g. KolAlert).
		// Only react when the dialog element itself is the event origin.
		if (event.target !== this.dialogRef.el) {
			return;
		}

		unlockScroll(this);
		this.closeDrawer();

		const on = this.getRenderProp('on');
		on.onClose?.();
		on.onToggle?.(false);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.close);
			dispatchDomEvent(this.host, KolEvent.toggle);
		}
	};

	/** The card's close button starts the close; the `<dialog>` then fires its own close event. */
	private readonly handleCardClose = (): void => {
		this.cardCloseTooltipBehavior.hideTooltip();
		this.closeDrawer();
	};

	// --- Render ---

	private buildCardProps(): CardFCProps {
		return {
			ariaDescriptionId: this.getState('ariaDescriptionId'),
			closeButtonProps: this.cardCloseButtonProps,
			handleBlur: NOOP,
			handleClose: this.handleCardClose,
			handleFocus: NOOP,
			hasCloser: this.getRenderProp('hasCloser'),
			headingId: this.getState('headingId'),
			href: '',
			label: this.getRenderProp('label'),
			level: this.getRenderProp('level'),
			on: {},
			refCloseButton: this.cardCloseButtonRef,
			refCta: NOOP,
			refTooltip: this.cardCloseTooltipBehavior.setTooltipElementRef,
			target: '',
		};
	}

	/**
	 * The block class stays on the host: everything the drawer renders is an element of it
	 * (`kol-drawer__dialog`, `kol-drawer__wrapper`, `kol-drawer__content`), so no node inside the
	 * shadow root carries the bare block name.
	 */
	public render(): JSX.Element {
		return (
			<Host class="kol-drawer">
				<DrawerFC
					align={this.getRenderProp('align')}
					ariaDescriptionId={this.getState('ariaDescriptionId')}
					cardProps={this.buildCardProps()}
					handleAnimationEnd={this.handleAnimationEnd}
					handleCancel={this.handleCancel}
					handleClose={this.handleClose}
					hasCloser={this.getRenderProp('hasCloser')}
					headingId={this.getState('headingId')}
					label={this.getRenderProp('label')}
					level={this.getRenderProp('level')}
					modal={this.getState('modal')}
					on={this.getRenderProp('on')}
					expanded={this.getState('expanded')}
					refDialog={this.dialogRef}
					refWrapper={this.wrapperRef}
				>
					<slot />
				</DrawerFC>
			</Host>
		);
	}

	// --- @State ---

	@State() public ariaDescriptionId: string = nonce();

	@State() public headingId: string = createUniqueId('drawer-heading');

	@State() public modal: boolean = true;

	/** Named `expanded` because the deprecated `open()` method occupies the member name `open`. */
	@State() public expanded: boolean = false;

	// --- Props + Watchers ---

	/**
	 * Defines the visual orientation of the component.
	 */
	@Prop() public _align?: AlignPropType;
	@Watch('_align')
	public watchAlign(value?: AlignPropType): void {
		alignProp.apply(value, (v) => this.setRenderProp('align', v));
	}

	/**
	 * Defines whether the element can be closed.
	 * @TODO: Change type back to `HasCloserPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hasCloser?: boolean = false;
	@Watch('_hasCloser')
	public watchHasCloser(value?: boolean): void {
		hasCloserProp.apply(value, (v) => this.setRenderProp('hasCloser', v));
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;
	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		labelProp.apply(value, (v) => this.setRenderProp('label', v));
	}

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 0;
	@Watch('_level')
	public watchLevel(value?: HeadingLevel): void {
		levelProp.apply(value, (v) => this.setRenderProp('level', v));
	}

	/**
	 * Specifies the EventCallback function to be called when the drawer is closing.
	 */
	@Prop() public _on?: KoliBriModalEventCallbacks;
	@Watch('_on')
	public watchOn(value?: KoliBriModalEventCallbacks): void {
		drawerCallbacksProp.apply(value, (v) => this.setRenderProp('on', v));
	}

	/**
	 * Opens/expands the element when truthy, closes/collapses when falsy.
	 */
	@Prop() public _open?: OpenPropType;
	@Watch('_open')
	public watchOpen(value?: OpenPropType): void {
		openProp.apply(value, (v) => {
			this.setState('expanded', v);
			// Before the first render there is no dialog to drive — `componentDidLoad` does it.
			if (this.dialogRef.el) {
				this.openOrCloseBasedOnState();
			}
		});
	}
}
