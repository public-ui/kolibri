import {
	accessKeyProp,
	alignProp,
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
	iconsProp,
	idProp,
	inlineProp,
	labelWithExpertSlotProp,
	nameProp,
	shortKeyProp,
	tabIndexProp,
} from '../../props';
import { BaseController } from '../base-controller';
import { BaseWebComponent } from '../base-web-component';
import type { ControllerInterface, ResolvedInputProps, StateAccess } from '../generic-types';
import { TooltipController } from '../tooltip/controller';
import type { ButtonApi } from './api';
import { buttonPropsConfig } from './api';

export class ButtonController extends BaseController<ButtonApi> implements ControllerInterface<ButtonApi> {
	private buttonRef?: HTMLButtonElement;
	private readonly tooltipCtrl: TooltipController;
	private value?: unknown;

	public constructor(stateAccess: StateAccess<ButtonApi>) {
		super(stateAccess, buttonPropsConfig);
		this.tooltipCtrl = new TooltipController(BaseWebComponent.stateLess);
	}

	public componentWillLoad(props: ResolvedInputProps<ButtonApi>): void {
		const {
			accessKey,
			align,
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
			type,
			variant,
		} = props;

		this.watchAccessKey(accessKey);
		this.watchAlign(align);
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
		this.watchType(type);
		this.watchVariant(variant);

		// Initialize tooltip
		this.tooltipCtrl.componentWillLoad({
			label: typeof label === 'string' ? label : '',
			align: align || 'top',
		});
	}

	// Watchers - prototype methods
	public watchAccessKey(value?: string): void {
		accessKeyProp.apply(value, (v) => {
			this.setRenderProp('accessKey', v);
		});
	}

	public watchAlign(value?: string): void {
		alignProp.apply(value, (v) => {
			this.setRenderProp('align', v);
			this.tooltipCtrl.watchAlign(v);
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

	public watchIcons(value?: string): void {
		iconsProp.apply(value, (v) => {
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

	public watchRole(value?: string): void {
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

	public watchType(value?: string): void {
		buttonTypeProp.apply(value, (v) => {
			this.setRenderProp('type', v);
		});
	}

	public watchVariant(value?: string): void {
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
	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.buttonRef = element;
	};

	public setTooltipFloatingRef = (element?: HTMLElement): void => {
		this.tooltipCtrl.setTooltipElementRef(element);
	};

	// Public methods
	public focus(): void {
		this.buttonRef?.focus();
	}

	public click(): void {
		this.buttonRef?.click();
	}

	public getValue(): unknown {
		return this.value;
	}

	public setValue(value?: unknown): void {
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
