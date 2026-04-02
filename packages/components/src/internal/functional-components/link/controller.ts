import type { UnsubscribeFunction } from '../../../components/link/ariaCurrentService';
import { onLocationChange } from '../../../components/link/ariaCurrentService';
import type { LinkOnCallbacksPropType } from '../../../schema';
import { setEventTarget } from '../../../schema';
import { setClick } from '../../../utils/element-click';
import { setFocus } from '../../../utils/element-focus';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';
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
	labelWithExpertSlotProp,
	linkOnProp,
	roleProp,
	shortKeyProp,
	spanIconsProp,
	tabIndexProp,
	targetProp,
	tooltipAlignProp,
	variantProp,
} from '../../props';
import { BaseController } from '../base-controller';
import { BaseWebComponent } from '../base-web-component';
import type { ControllerInterface, ResolvedInputProps, StateAccess } from '../generic-types';
import { TooltipController } from '../tooltip/controller';
import type { LinkApi } from './api';
import { linkPropsConfig } from './api';

export class LinkController extends BaseController<LinkApi> implements ControllerInterface<LinkApi> {
	private readonly tooltipCtrl = new TooltipController(BaseWebComponent.stateLess);
	private anchorRef?: HTMLAnchorElement;
	private host?: HTMLElement;
	private unsubscribeOnLocationChange?: UnsubscribeFunction;

	public constructor(stateAccess: StateAccess<LinkApi>) {
		super(stateAccess, linkPropsConfig);
	}

	public componentWillLoad(props: ResolvedInputProps<LinkApi>): void {
		const {
			href,
			accessKey,
			ariaControls,
			ariaCurrentValue,
			ariaDescription,
			ariaExpanded,
			ariaOwns,
			customClass,
			disabled,
			download,
			hideLabel,
			icons,
			inline,
			label,
			on,
			role,
			shortKey,
			tabIndex,
			target,
			tooltipAlign,
			variant,
		} = props;
		this.watchHref(href);
		this.watchAccessKey(accessKey);
		this.watchAriaControls(ariaControls);
		this.watchAriaCurrentValue(ariaCurrentValue);
		this.watchAriaDescription(ariaDescription);
		this.watchAriaExpanded(ariaExpanded);
		this.watchAriaOwns(ariaOwns);
		this.watchCustomClass(customClass);
		this.watchDisabled(disabled);
		this.watchDownload(download);
		this.watchHideLabel(hideLabel);
		this.watchIcons(icons);
		this.watchInline(inline);
		this.watchLabel(label);
		this.watchOn(on);
		this.watchRole(role);
		this.watchShortKey(shortKey);
		this.watchTabIndex(tabIndex);
		this.watchTarget(target);
		this.watchTooltipAlign(tooltipAlign);
		this.watchVariant(variant);

		let resolvedLabel = '';
		if (typeof label === 'string') {
			resolvedLabel = label;
		} else if (typeof href === 'string') {
			resolvedLabel = href;
		}
		this.tooltipCtrl.componentWillLoad({
			label: resolvedLabel,
			align: tooltipAlign,
		});

		this.unsubscribeOnLocationChange = onLocationChange((location) => {
			const currentHref = this.getRenderProp('href');
			const ariaCurrentVal = this.getRenderProp('ariaCurrentValue');
			this.setState('ariaCurrent', location === currentHref ? ariaCurrentVal : '');
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

	public watchLabel(value?: string): void {
		labelWithExpertSlotProp.apply(value, (v) => {
			this.setRenderProp('label', v);
			this.tooltipCtrl.watchLabel(v || this.getRenderProp('href'));
		});
	}

	public watchOn(value?: LinkOnCallbacksPropType): void {
		linkOnProp.apply(value, (v) => {
			this.setRenderProp('on', v);
		});
	}

	public watchRole(value?: string): void {
		roleProp.apply(value, (v) => {
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

	public handleClick = (event: Event): void => {
		this.tooltipCtrl.hideTooltip();
		const disabled = this.getRenderProp('disabled');
		const href = this.getRenderProp('href');
		const on = this.getRenderProp('on');

		if (disabled) {
			event.preventDefault();
		} else {
			if (typeof on?.onClick === 'function') {
				setEventTarget(event, this.anchorRef);
				on.onClick(event, href);
			}
			if (this.host) {
				dispatchDomEvent(this.host, KolEvent.click, href);
			}
		}
	};

	public setAnchorRef = (element?: HTMLAnchorElement): void => {
		this.anchorRef = element;
	};

	public focus(): Promise<void> {
		return this.anchorRef ? setFocus(this.anchorRef) : Promise.resolve();
	}

	public click(): Promise<void> {
		return this.anchorRef ? setClick(this.anchorRef) : Promise.resolve();
	}

	public setHostElement(host: HTMLElement): void {
		this.host = host;
	}

	public getTooltipId(): string {
		return this.tooltipCtrl.getRenderProp('id');
	}

	public setTooltipElementRef = (el?: HTMLElement): void => {
		this.tooltipCtrl.setTooltipElementRef(el);
	};

	public syncAnchorListeners(): void {
		if (this.anchorRef) {
			this.tooltipCtrl.syncListeners(undefined, this.anchorRef, true);
		}
	}

	public destroy(): void {
		if (this.unsubscribeOnLocationChange) {
			this.unsubscribeOnLocationChange();
			this.unsubscribeOnLocationChange = undefined;
		}
		this.tooltipCtrl.destroy();
	}
}
