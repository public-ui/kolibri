import type { UnsubscribeFunction } from '../../../components/link/ariaCurrentService';
import { onLocationChange } from '../../../components/link/ariaCurrentService';
import {
	accessKeyProp,
	ariaControlsProp,
	ariaCurrentValueProp,
	ariaDescriptionProp,
	ariaExpandedProp,
	ariaOwnsProp,
	customClassProp,
	disabledProp,
	downloadProp,
	hideLabelProp,
	hrefProp,
	inlineProp,
	linkCallbacksProp,
	linkLabelProp,
	linkRoleProp,
	shortKeyProp,
	spanIconsProp,
	tabIndexProp,
	targetProp,
	tooltipAlignProp,
	variantProp,
} from '../../props';
import { BaseController } from '../base-controller';
import { BaseWebComponent } from '../base-web-component';
import type { ResolvedInputProps, StateAccess } from '../generic-types';
import { TooltipController } from '../tooltip/controller';
import type { LinkApi } from './api';
import { linkPropsConfig } from './api';

export class LinkController extends BaseController<LinkApi> {
	private readonly tooltipCtrl = new TooltipController(BaseWebComponent.stateLess);
	private anchorRef?: HTMLAnchorElement;
	private unsubscribeOnLocationChange?: UnsubscribeFunction;

	public readonly setTooltipRef = this.tooltipCtrl.setTooltipElementRef;

	public constructor(stateAccess: StateAccess<LinkApi>) {
		super(stateAccess, linkPropsConfig);
	}

	public componentWillLoad(props: ResolvedInputProps<LinkApi>): void {
		this.watchHref(props.href);
		this.watchAccessKey(props.accessKey);
		this.watchAriaControls(props.ariaControls);
		this.watchAriaCurrentValue(props.ariaCurrentValue);
		this.watchAriaDescription(props.ariaDescription);
		this.watchAriaExpanded(props.ariaExpanded);
		this.watchAriaOwns(props.ariaOwns);
		this.watchCustomClass(props.customClass);
		this.watchDisabled(props.disabled);
		this.watchDownload(props.download);
		this.watchHideLabel(props.hideLabel);
		this.watchIcons(props.icons);
		this.watchInline(props.inline);
		this.watchLabel(props.label);
		this.watchOn(props.on);
		this.watchRole(props.role);
		this.watchShortKey(props.shortKey);
		this.watchTabIndex(props.tabIndex);
		this.watchTarget(props.target);
		this.watchTooltipAlign(props.tooltipAlign);
		this.watchVariant(props.variant);

		this.tooltipCtrl.componentWillLoad({
			label: this.resolveTooltipLabel(),
			align: this.getRenderProp('tooltipAlign'),
		});

		this.unsubscribeOnLocationChange = onLocationChange((location) => {
			const href = this.getRenderProp('href');
			const ariaCurrentValue = this.getRenderProp('ariaCurrentValue');
			this.setState('ariaCurrent', location === href ? ariaCurrentValue : '');
		});
	}

	public watchHref(value?: string): void {
		hrefProp.apply(value, (v) => {
			this.setRenderProp('href', v);
		});
	}

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

	public watchAriaCurrentValue(value?: string): void {
		ariaCurrentValueProp.apply(value, (v) => {
			this.setRenderProp('ariaCurrentValue', v);
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

	public watchAriaOwns(value?: string): void {
		ariaOwnsProp.apply(value, (v) => {
			this.setRenderProp('ariaOwns', v);
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

	public watchDownload(value?: string): void {
		downloadProp.apply(value, (v) => {
			this.setRenderProp('download', v);
		});
	}

	public watchHideLabel(value?: boolean): void {
		hideLabelProp.apply(value, (v) => {
			this.setRenderProp('hideLabel', v);
		});
	}

	public watchIcons(value?: unknown): void {
		spanIconsProp.apply(value, (v) => {
			this.setRenderProp('icons', v);
		});
	}

	public watchInline(value?: boolean): void {
		inlineProp.apply(value, (v) => {
			this.setRenderProp('inline', v);
		});
	}

	public watchLabel(value?: string | false): void {
		linkLabelProp.apply(value, (v) => {
			this.setRenderProp('label', v);
			this.tooltipCtrl.watchLabel(typeof v === 'string' ? v : undefined);
		});
	}

	public watchOn(value?: unknown): void {
		linkCallbacksProp.apply(value, (v) => {
			this.setRenderProp('on', v);
		});
	}

	public watchRole(value?: string): void {
		linkRoleProp.apply(value, (v) => {
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

	public watchTarget(value?: string): void {
		targetProp.apply(value, (v) => {
			this.setRenderProp('target', v);
		});
	}

	public watchTooltipAlign(value?: string): void {
		tooltipAlignProp.apply(value, (v) => {
			this.setRenderProp('tooltipAlign', v);
			this.tooltipCtrl.watchAlign(v);
		});
	}

	public watchVariant(value?: string): void {
		variantProp.apply(value, (v) => {
			this.setRenderProp('variant', v);
		});
	}

	public hideTooltip(): void {
		this.tooltipCtrl.hideTooltip();
	}

	public getTooltipId(): string {
		return this.tooltipCtrl.getRenderProp('id');
	}

	public getAnchorRef(): HTMLAnchorElement | undefined {
		return this.anchorRef;
	}

	public setAnchorRef = (element?: HTMLAnchorElement): void => {
		const prev = this.anchorRef;
		this.anchorRef = element;
		this.tooltipCtrl.syncListeners(prev ?? null, element ?? null, true);
	};

	public focus(): void {
		this.anchorRef?.focus();
	}

	public click(): void {
		this.anchorRef?.click();
	}

	public destroy(): void {
		this.unsubscribeOnLocationChange?.();
		this.tooltipCtrl.destroy();
	}

	private resolveTooltipLabel(): string {
		const label = this.getRenderProp('label');
		const href = this.getRenderProp('href');
		if (typeof label === 'string' && label.length > 0) return label;
		return href;
	}
}
