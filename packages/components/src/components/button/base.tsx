import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';
import type { Generic } from 'adopted-style-sheets';
import { getFeatureFlag } from 'adopted-style-sheets';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { ButtonApi } from '../../internal/functional-components/button/api';
import { buttonPropsConfig } from '../../internal/functional-components/button/api';
import { ButtonFC } from '../../internal/functional-components/button/component';
import { TooltipBehavior } from '../../internal/functional-components/tooltip/behavior';
import {
	accessKeyProp,
	ariaControlsProp,
	ariaDescriptionProp,
	ariaExpandedProp,
	ariaHasPopupProp,
	ariaSelectedProp,
	buttonCallbacksProp,
	buttonTypeProp,
	customClassProp,
	disabledProp,
	hideLabelProp,
	idProp,
	inlineProp,
	labelWithExpertSlotProp,
	linkRoleProp,
	nameProp,
	shortKeyProp,
	spanIconsProp,
	tabIndexProp,
	tooltipAlignProp,
	variantProp,
} from '../../internal/props';
import type {
	AccessKeyPropType,
	AlternativeButtonLinkRolePropType,
	AriaDescriptionPropType,
	ButtonCallbacksPropType,
	ButtonProps,
	ButtonTypePropType,
	CustomClassPropType,
	IconsPropType,
	IdPropType,
	InlinePropType,
	LabelWithExpertSlotPropType,
	ShortKeyPropType,
	StencilUnknown,
	SyncValueBySelectorPropType,
	TooltipAlignPropType,
	VariantClassNamePropType,
} from '../../schema';
import { setEventTarget } from '../../schema';
import type { AriaHasPopupPropType } from '../../schema/props/aria-has-popup';
import { validateAccessAndShortKey } from '../../schema/validators/access-and-short-key';
import { createCtaRef } from '../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import { propagateResetEventToForm, propagateSubmitEventToForm } from '../form/controller';
import { AssociatedInputController } from '../input-adapter-leanup/associated.controller';

/**
 * Shared orchestrator implementation for every custom element that renders `ButtonFC`:
 * `kol-button`, the transitional `kol-button-wc`, `kol-button-link` and `kol-split-button`.
 *
 * The class carries everything that does not need a Stencil decorator — the composed
 * `TooltipBehavior`, the form-association adapter, the event handlers, one `apply*` method per
 * prop and the `ButtonFC` render call. The concrete element keeps what Stencil has to see in the
 * component class itself: `@Component`, `@Element`, `@State`, `@Method`, every `@Prop` with its
 * `@Watch` (whose body is a one-line call into the matching `apply*` method) and the lifecycle
 * methods, which delegate here (ARC42 § 9, design decision 16).
 *
 * This is not a layer between the web component and the functional component — it *is* the web
 * component's implementation, shared between the tag variants of one FC.
 */
export abstract class BaseButtonWebComponent extends BaseWebComponent<ButtonApi> {
	/** The custom element; declared with `@Element()` by the concrete class. */
	protected abstract readonly host?: HTMLElement;

	protected readonly ctaRef = createCtaRef<HTMLButtonElement>();

	// --- Composed behaviors ---

	protected readonly tooltipBehavior = new TooltipBehavior(this.stateAccess);

	/**
	 * `AssociatedInputController` predates the skeleton architecture: it expects a
	 * `Generic.Element.Component`, i.e. a mutable `state` bag plus underscored props. A skeleton web
	 * component has no such bag, so the controller receives this minimal adapter instead of the
	 * component itself. It carries exactly what the controller reads and writes: `state` (patched
	 * by `validateName`), `_name` and `_syncValueBySelector`.
	 */
	private readonly formAssociation: Generic.Element.Component & Pick<ButtonProps, '_name' | '_syncValueBySelector'> = { state: {} };

	private associatedController!: AssociatedInputController;

	/**
	 * The raw `_value`. It is neither rendered nor normalized (see `buttonPropsConfig`), but the
	 * click handler hands it to the consumer callback and the custom event, so the last applied
	 * value is kept here.
	 */
	private formValue?: StencilUnknown;

	/**
	 * Creates the form-association controller. Must be called from the concrete element's
	 * constructor (after `super()`), not from this base class's constructor: Stencil registers the
	 * host element at the start of the *component* class's constructor, so `this.host` is only
	 * populated once the base constructor has returned.
	 */
	protected initFormAssociation(): void {
		this.associatedController = new AssociatedInputController(this.formAssociation, 'button', this.host);
	}

	// --- Lifecycle helpers (called from the concrete element's lifecycle methods) ---

	/**
	 * Seeds the render props. Call first in `componentWillLoad`, before the prop watchers run.
	 */
	protected initButtonRenderProps(): void {
		this.initRenderProps(buttonPropsConfig);
		// Seed `tabIndex` as unset before any watcher runs: an unset tabindex must not render as
		// `tabindex="0"` — buttons are natively tabbable and the attribute would pin them into the
		// document tab order. `applyTabIndex` does the same for elements that expose `_tabIndex`,
		// but a `shadow: false` element can abort mid-initialization under SSR (`@Element()` is not
		// populated in its constructor, `AssociatedInputController` then throws on
		// `attachInternals(undefined)` and Stencil swallows the error but renders anyway). Without
		// this line the props config default `0` would survive such an abort.
		this.unsetRenderProp('tabIndex');
	}

	/**
	 * Hands the resolved label and alignment to the tooltip behavior. Call last in
	 * `componentWillLoad`, after every prop watcher has run.
	 */
	protected initTooltipBehavior(): void {
		this.tooltipBehavior.componentWillLoad({
			label: this.getRenderProp('label'),
			align: this.getRenderProp('tooltipAlign'),
		});
	}

	/** Call from `componentDidRender`. */
	protected syncTooltipListeners(): void {
		if (this.ctaRef.el) {
			this.tooltipBehavior.syncListeners(undefined, this.ctaRef.el, true);
		}
	}

	/** Call from `disconnectedCallback`. */
	protected destroyTooltipBehavior(): void {
		this.tooltipBehavior.destroy();
	}

	// --- Event handling ---

	protected readonly handleClick = (event: MouseEvent): void => {
		event.stopPropagation();
		this.tooltipBehavior.hideTooltip();

		const type = this.getRenderProp('type');
		if (type === 'submit') {
			propagateSubmitEventToForm({ form: this.host, ref: this.ctaRef.el });
		} else if (type === 'reset') {
			propagateResetEventToForm({ form: this.host, ref: this.ctaRef.el });
		} else {
			// TODO: Static form handling
			this.associatedController.setFormAssociatedValue(this.formValue);

			const onClick = this.getRenderProp('on').onClick;
			if (typeof onClick === 'function') {
				setEventTarget(event, this.ctaRef.el);
				onClick(event, this.formValue);
			}
		}

		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.click, this.formValue);
		}
	};

	protected readonly handleMouseDown = (event: MouseEvent): void => {
		this.getRenderProp('on').onMouseDown?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.mousedown);
		}
	};

	protected readonly handleFocus = (event: FocusEvent): void => {
		this.getRenderProp('on').onFocus?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.focus);
		}
	};

	protected readonly handleBlur = (event: FocusEvent): void => {
		this.getRenderProp('on').onBlur?.(event);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.blur);
		}
	};

	// --- Prop application (one per prop; the concrete element's watchers delegate here) ---

	protected applyAccessKey(value?: AccessKeyPropType, shortKey?: ShortKeyPropType): void {
		accessKeyProp.apply(value, (v) => this.setRenderProp('accessKey', v));
		validateAccessAndShortKey(value, shortKey);
	}

	protected applyAriaControls(value?: string): void {
		ariaControlsProp.apply(value, (v) => this.setRenderProp('ariaControls', v));
	}

	protected applyAriaDescription(value?: AriaDescriptionPropType): void {
		ariaDescriptionProp.apply(value, (v) => this.setRenderProp('ariaDescription', v));
	}

	protected applyAriaExpanded(value?: boolean): void {
		ariaExpandedProp.apply(value, (v) => this.setRenderProp('ariaExpanded', v));
	}

	protected applyAriaHasPopup(value?: AriaHasPopupPropType): void {
		ariaHasPopupProp.apply(value, (v) => this.setRenderProp('ariaHasPopup', v));
	}

	protected applyAriaSelected(value?: boolean): void {
		ariaSelectedProp.apply(value, (v) => this.setRenderProp('ariaSelected', v));
	}

	protected applyCustomClass(value?: CustomClassPropType): void {
		customClassProp.apply(value, (v) => this.setRenderProp('customClass', v));
	}

	protected applyDisabled(value?: boolean): void {
		disabledProp.apply(value, (v) => this.setRenderProp('disabled', v));
	}

	protected applyHideLabel(value?: boolean): void {
		hideLabelProp.apply(value, (v) => this.setRenderProp('hideLabel', v));
	}

	protected applyIcons(value?: IconsPropType): void {
		spanIconsProp.apply(value, (v) => this.setRenderProp('icons', v));
	}

	protected applyId(value?: IdPropType): void {
		idProp.apply(value, (v) => this.setRenderProp('id', v));
	}

	protected applyInline(value?: InlinePropType): void {
		inlineProp.apply(value, (v) => this.setRenderProp('inline', v));
	}

	protected applyLabel(value?: LabelWithExpertSlotPropType): void {
		labelWithExpertSlotProp.apply(value, (v) => {
			this.setRenderProp('label', v);
			this.tooltipBehavior.watchLabel(v);
		});
	}

	protected applyName(value?: string): void {
		nameProp.apply(value, (v) => this.setRenderProp('name', v));
		this.formAssociation._name = value;
		this.associatedController.validateName(value);
	}

	protected applyOn(value?: ButtonCallbacksPropType<StencilUnknown>): void {
		buttonCallbacksProp.apply(value, (v) => this.setRenderProp('on', v));
	}

	protected applyRole(value?: AlternativeButtonLinkRolePropType): void {
		linkRoleProp.apply(value, (v) => this.setRenderProp('role', v));
	}

	protected applyShortKey(value?: ShortKeyPropType, accessKey?: AccessKeyPropType): void {
		shortKeyProp.apply(value, (v) => this.setRenderProp('shortKey', v));
		validateAccessAndShortKey(accessKey, value);
	}

	protected applySyncValueBySelector(value?: SyncValueBySelectorPropType): void {
		this.formAssociation._syncValueBySelector = value;
		this.associatedController.validateSyncValueBySelector(value);
	}

	protected applyTabIndex(value?: number): void {
		// The props config seeds `tabIndex` with its default `0`, but an unset tabindex must not
		// render as `tabindex="0"` — buttons are natively tabbable and the attribute would pin them
		// into the document tab order. Unsetting the prop has to restore that state, so the else
		// branch is not optional: without it a reset would keep the previous number.
		if (typeof value === 'number') {
			tabIndexProp.apply(value, (v) => this.setRenderProp('tabIndex', v));
		} else {
			this.unsetRenderProp('tabIndex');
		}
	}

	protected applyTooltipAlign(value?: TooltipAlignPropType): void {
		tooltipAlignProp.apply(value, (v) => {
			this.setRenderProp('tooltipAlign', v);
			this.tooltipBehavior.watchAlign(v);
		});
	}

	protected applyType(value?: ButtonTypePropType): void {
		buttonTypeProp.apply(value, (v) => this.setRenderProp('type', v));
	}

	protected applyValue(value?: StencilUnknown): void {
		this.formValue = value;
		this.associatedController.setFormAssociatedValue(value);
	}

	protected applyVariant(value?: VariantClassNamePropType): void {
		// Resolved here rather than as a `@Prop` default: a field initializer runs in the
		// constructor, where `@Element()` is not yet populated for a `shadow: false` element under
		// SSR, so the theme-scoped feature flag would silently be ignored there. Keeping it a
		// fallback also leaves the public API unchanged. The rendered default is `normal` either way.
		variantProp.apply(value ?? getFeatureFlag('buttonVariantDefault', this.host) ?? 'normal', (v) => this.setRenderProp('variant', v));
	}

	// --- Render ---

	/** Renders `ButtonFC` from the current render props and state. */
	protected renderButtonFC(): JSX.Element {
		return (
			<ButtonFC
				accessKey={this.getRenderProp('accessKey')}
				ariaControls={this.getRenderProp('ariaControls')}
				ariaDescription={this.getRenderProp('ariaDescription')}
				ariaDescriptionId={this.getState('ariaDescriptionId')}
				ariaExpanded={this.getRenderProp('ariaExpanded')}
				ariaHasPopup={this.getRenderProp('ariaHasPopup')}
				ariaSelected={this.getRenderProp('ariaSelected')}
				customClass={this.getRenderProp('customClass')}
				disabled={this.getRenderProp('disabled')}
				handleBlur={this.handleBlur}
				handleClick={this.handleClick}
				handleFocus={this.handleFocus}
				handleMouseDown={this.handleMouseDown}
				hideLabel={this.getRenderProp('hideLabel')}
				icons={this.getRenderProp('icons')}
				id={this.getRenderProp('id')}
				inline={this.getRenderProp('inline')}
				label={this.getRenderProp('label')}
				name={this.getRenderProp('name')}
				on={this.getRenderProp('on')}
				refButton={this.ctaRef}
				refTooltip={this.tooltipBehavior.setTooltipElementRef}
				role={this.getRenderProp('role')}
				shortKey={this.getRenderProp('shortKey')}
				tabIndex={this.getRenderProp('tabIndex')}
				tooltipAlign={this.getRenderProp('tooltipAlign')}
				type={this.getRenderProp('type')}
				variant={this.getRenderProp('variant')}
			/>
		);
	}
}
