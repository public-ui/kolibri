import type { IconsPropType, StencilUnknown, TooltipAlignPropType } from '../../../schema';
import {
	accessKeyProp,
	alternativeButtonLinkRoleProp,
	ariaControlsProp,
	ariaDescriptionProp,
	ariaExpandedProp,
	ariaSelectedProp,
	buttonTypeProp,
	buttonVariantProp,
	customClassProp,
	disabledProp,
	hideLabelProp,
	idProp,
	inlineProp,
	labelWithExpertSlotProp,
	nameProp,
	shortKeyProp,
	spanIconsProp,
	tabIndexProp,
	tooltipAlignProp,
} from '../../props';
import type { AlternativeButtonLinkRole } from '../../props/alternative-button-link-role';
import type { ButtonType } from '../../props/button-type';
import type { ButtonVariant } from '../../props/button-variant';
import { BaseController } from '../base-controller';
import { BaseWebComponent } from '../base-web-component';
import type { ControllerInterface, ResolvedInputProps, StateAccess } from '../generic-types';
import { TooltipController } from '../tooltip/controller';
import type { ButtonApi } from './api';
import { buttonPropsConfig } from './api';

export class ButtonController extends BaseController<ButtonApi> implements ControllerInterface<ButtonApi> {
	private readonly tooltipCtrl: TooltipController;
	private value?: StencilUnknown;

	public constructor(stateAccess: StateAccess<ButtonApi>) {
		super(stateAccess, buttonPropsConfig);
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
		inlineProp.apply(value, (v) => {
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

	public watchRole(value?: AlternativeButtonLinkRole): void {
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
		tooltipAlignProp.apply(value, (v) => {
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
	public handleClick = (event: MouseEvent): void => {
		event.stopPropagation();
		this.tooltipCtrl.hideTooltip();
		// Callback will be handled by web component layer
	};

	// Ref setters - arrow properties
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

	public syncTooltipListeners(element?: HTMLButtonElement): void {
		if (element) {
			this.tooltipCtrl.syncListeners(undefined, element, true);
		}
	}

	public getTooltipId(): string {
		return this.tooltipCtrl.getRenderProp('id');
	}

	public destroy(): void {
		this.tooltipCtrl.destroy();
	}
}
