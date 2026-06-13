import type { AlternativeButtonLinkRolePropType, ButtonCallbacksPropType, IconsPropType, StencilUnknown, TooltipAlignPropType } from '../../../schema';
import { setEventTarget } from '../../../schema';
import {
	accessKeyProp,
	alternativeButtonLinkRoleProp,
	ariaControlsProp,
	ariaDescriptionProp,
	ariaExpandedProp,
	ariaSelectedProp,
	buttonCallbacksProp,
	buttonInlineProp,
	buttonTooltipAlignProp,
	buttonTypeProp,
	buttonVariantProp,
	customClassProp,
	disabledProp,
	hideLabelProp,
	idProp,
	labelWithExpertSlotProp,
	nameProp,
	shortKeyProp,
	spanIconsProp,
	tabIndexProp,
	variantProp,
} from '../../props';
import type { ButtonType } from '../../props/button-type';
import type { ButtonVariant } from '../../props/button-variant';
import { BaseController } from '../base-controller';
import { BaseWebComponent } from '../base-web-component';
import type { ControllerInterface, PropsConfigShape, ResolvedInputProps, StateAccess } from '../generic-types';
import { TooltipController } from '../tooltip/controller';
import type { ButtonApi } from './api';
import { buttonLinkPropsConfig, buttonPropsConfig } from './api';

/**
 * Result of the controller-level click handling. The web component layer uses it
 * to decide about form propagation and DOM event dispatching, which require
 * access to the host element.
 */
export type ButtonClickHandlingResult = {
	value: StencilUnknown;
	formAction?: 'submit' | 'reset';
	shouldDispatchKolEvent: boolean;
};

export class ButtonController extends BaseController<ButtonApi> implements ControllerInterface<ButtonApi> {
	private readonly tooltipCtrl: TooltipController;
	private buttonRef?: HTMLButtonElement;
	private value?: StencilUnknown;

	public constructor(stateAccess: StateAccess<ButtonApi>, propsConfig: PropsConfigShape = buttonPropsConfig) {
		super(stateAccess, propsConfig);
		this.tooltipCtrl = new TooltipController(BaseWebComponent.stateLess);
	}

	public componentWillLoad(props: ResolvedInputProps<ButtonApi>): void {
		const {
			accessKey,
			ariaControls,
			ariaDescription,
			ariaExpanded,
			ariaSelected,
			customClass,
			disabled,
			hideLabel,
			icons,
			id,
			inline,
			label,
			name,
			on,
			role,
			shortKey,
			tabIndex,
			tooltipAlign,
			type,
			variant,
		} = props;

		this.watchAccessKey(accessKey);
		this.watchAriaControls(ariaControls);
		this.watchAriaDescription(ariaDescription);
		this.watchAriaExpanded(ariaExpanded);
		this.watchAriaSelected(ariaSelected);
		this.watchCustomClass(customClass);
		this.watchDisabled(disabled);
		this.watchHideLabel(hideLabel);
		this.watchIcons(icons);
		this.watchId(id);
		this.watchInline(inline);
		this.watchLabel(label);
		this.watchName(name);
		this.watchOn(on);
		this.watchRole(role);
		this.watchShortKey(shortKey);
		this.watchTabIndex(tabIndex);
		this.watchTooltipAlign(tooltipAlign);
		this.watchType(type);
		this.watchVariant(variant);

		// Initialize tooltip
		this.tooltipCtrl.componentWillLoad({
			label: typeof label === 'string' ? label : '',
			align: tooltipAlign || 'top',
		});
	}

	// Watchers - prototype methods
	public watchAccessKey(value?: string): void {
		accessKeyProp.apply(value, (v) => {
			this.setRenderProp('accessKey', v);
		});
	}

	public watchAriaControls(value?: string): void {
		ariaControlsProp.apply(value, (v) => {
			this.setRenderProp('ariaControls', v);
		});
	}

	public watchAriaDescription(value?: string): void {
		ariaDescriptionProp.apply(value, (v) => {
			this.setRenderProp('ariaDescription', v);
		});
	}

	public watchAriaExpanded(value?: boolean): void {
		ariaExpandedProp.apply(value, (v) => {
			this.setRenderProp('ariaExpanded', v);
		});
	}

	public watchAriaSelected(value?: boolean): void {
		ariaSelectedProp.apply(value, (v) => {
			this.setRenderProp('ariaSelected', v);
		});
	}

	public watchCustomClass(value?: string): void {
		customClassProp.apply(value, (v) => {
			this.setRenderProp('customClass', v);
		});
	}

	public watchDisabled(value?: boolean): void {
		disabledProp.apply(value, (v) => {
			this.setRenderProp('disabled', v);
		});
	}

	public watchHideLabel(value?: boolean): void {
		hideLabelProp.apply(value, (v) => {
			this.setRenderProp('hideLabel', v);
		});
	}

	public watchIcons(value?: IconsPropType): void {
		spanIconsProp.apply(value, (v) => {
			this.setRenderProp('icons', v);
		});
	}

	public watchId(value?: string): void {
		idProp.apply(value, (v) => {
			this.setRenderProp('id', v);
		});
	}

	public watchInline(value?: boolean): void {
		buttonInlineProp.apply(value, (v) => {
			this.setRenderProp('inline', v);
		});
	}

	public watchLabel(value?: string): void {
		labelWithExpertSlotProp.apply(value, (v) => {
			this.setRenderProp('label', v);
			this.tooltipCtrl.watchLabel(v);
		});
	}

	public watchName(value?: string): void {
		nameProp.apply(value, (v) => {
			this.setRenderProp('name', v);
		});
	}

	public watchOn(value?: ButtonCallbacksPropType<StencilUnknown>): void {
		buttonCallbacksProp.apply(value, (v) => {
			this.setRenderProp('on', v);
		});
	}

	public watchRole(value?: AlternativeButtonLinkRolePropType): void {
		alternativeButtonLinkRoleProp.apply(value, (v) => {
			this.setRenderProp('role', v);
		});
	}

	public watchShortKey(value?: string): void {
		shortKeyProp.apply(value, (v) => {
			this.setRenderProp('shortKey', v);
		});
	}

	public watchTabIndex(value?: number): void {
		tabIndexProp.apply(value, (v) => {
			this.setRenderProp('tabIndex', v);
		});
	}

	public watchTooltipAlign(value?: TooltipAlignPropType): void {
		buttonTooltipAlignProp.apply(value, (v) => {
			this.setRenderProp('tooltipAlign', v);
			this.tooltipCtrl.watchAlign(v);
		});
	}

	public watchType(value?: ButtonType): void {
		buttonTypeProp.apply(value, (v) => {
			this.setRenderProp('type', v);
		});
	}

	public watchVariant(value?: ButtonVariant): void {
		buttonVariantProp.apply(value, (v) => {
			this.setRenderProp('variant', v);
		});
	}

	// Event handlers - arrow properties
	public handleClick = (event: MouseEvent): ButtonClickHandlingResult => {
		event.stopPropagation();
		this.tooltipCtrl.hideTooltip();
		const value = this.value;

		if (this.getRenderProp('disabled')) {
			return { value, shouldDispatchKolEvent: false };
		}

		const type = this.getRenderProp('type');
		if (type === 'submit' || type === 'reset') {
			return { value, formAction: type, shouldDispatchKolEvent: true };
		}

		const on = this.getRenderProp('on');
		if (typeof on.onClick === 'function') {
			setEventTarget(event, this.buttonRef);
			on.onClick(event, value);
		}
		return { value, shouldDispatchKolEvent: true };
	};

	public handleMouseDown = (event: MouseEvent): void => {
		this.getRenderProp('on').onMouseDown?.(event);
	};

	public handleFocus = (event: FocusEvent): void => {
		this.getRenderProp('on').onFocus?.(event);
	};

	public handleBlur = (event: FocusEvent): void => {
		this.getRenderProp('on').onBlur?.(event);
	};

	// Ref setters - arrow properties
	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.tooltipCtrl.syncListeners(this.buttonRef ?? null, element ?? null, true);
		this.buttonRef = element;
	};

	public setTooltipFloatingRef = (element?: HTMLElement): void => {
		this.tooltipCtrl.setTooltipElementRef(element);
	};

	// Public methods
	public getValue(): StencilUnknown {
		return this.value;
	}

	public setValue(value?: StencilUnknown): void {
		this.value = value;
	}

	/**
	 * Applies a full set of (already clean-named) button props and synchronises the
	 * value in one call. Intended for components that embed a button and re-feed it
	 * on every render — the readable, value-aware counterpart of the lifecycle-named
	 * `componentWillLoad`. Validation still runs through the per-prop watchers.
	 */
	public applyProps(props: ResolvedInputProps<ButtonApi> & { value?: StencilUnknown }): void {
		this.componentWillLoad(props);
		this.setValue(props.value);
	}

	public getTooltipId(): string {
		return this.tooltipCtrl.getRenderProp('id');
	}

	public destroy(): void {
		this.tooltipCtrl.destroy();
	}
}

/**
 * Controller for kol-button-link: reuses the complete button behavior, but uses
 * the button-link props config (no customClass/id/tabIndex) and accepts a
 * free-form variant class name instead of the ButtonVariant enum.
 */
export class ButtonLinkController extends ButtonController {
	public constructor(stateAccess: StateAccess<ButtonApi>) {
		super(stateAccess, buttonLinkPropsConfig);
	}

	public override watchVariant(value?: string): void {
		variantProp.apply(value, (v) => {
			// The empty string is the prop default and maps to the 'normal' presentation.
			this.setRenderProp('variant', (v === '' ? 'normal' : v) as ButtonVariant);
		});
	}
}

/**
 * Initializes a `ButtonController` from public underscore-prefixed button props.
 * Counterpart of `initLinkControllerFromProps` for components that embed buttons
 * (toolbar items, pagination, table actions, ...).
 *
 * @param ctrl  - An already-constructed `ButtonController`.
 * @param props - A partial public button props object (all `_`-prefixed).
 */
export function initButtonControllerFromProps(ctrl: ButtonController, props: Partial<Record<string, unknown>>): void {
	ctrl.componentWillLoad({
		accessKey: props['_accessKey'] as string | undefined,
		ariaControls: props['_ariaControls'] as string | undefined,
		ariaDescription: props['_ariaDescription'] as string | undefined,
		ariaExpanded: props['_ariaExpanded'] as boolean | undefined,
		ariaSelected: props['_ariaSelected'] as boolean | undefined,
		customClass: props['_customClass'] as string | undefined,
		disabled: props['_disabled'] as boolean | undefined,
		hideLabel: props['_hideLabel'] as boolean | undefined,
		icons: props['_icons'] as IconsPropType | undefined,
		id: props['_id'] as string | undefined,
		inline: props['_inline'] as boolean | undefined,
		label: props['_label'] as string,
		name: props['_name'] as string | undefined,
		on: props['_on'] as ButtonCallbacksPropType<StencilUnknown> | undefined,
		role: props['_role'] as AlternativeButtonLinkRolePropType | undefined,
		shortKey: props['_shortKey'] as string | undefined,
		tabIndex: props['_tabIndex'] as number | undefined,
		tooltipAlign: props['_tooltipAlign'] as TooltipAlignPropType | undefined,
		type: props['_type'] as ButtonType | undefined,
		variant: props['_variant'] as ButtonVariant | undefined,
	});
	ctrl.setValue(props['_value'] as StencilUnknown);
}
