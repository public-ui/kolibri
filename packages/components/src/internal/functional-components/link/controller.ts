import type { UnsubscribeFunction } from '../../../components/link/ariaCurrentService';
import { onLocationChange } from '../../../components/link/ariaCurrentService';
import { setEventTarget } from '../../../schema';
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
import type { ResolvedInputProps, StateAccess } from '../generic-types';
import { TooltipController } from '../tooltip/controller';
import type { LinkApi } from './api';
import { linkPropsConfig } from './api';

/**
 * Creates a closure-based StateAccess for LinkApi that stores `ariaCurrent`
 * without requiring a Stencil @State field. Suitable for controllers that are
 * composed inside array-rendering web components.
 *
 * @param forceRender - Optional callback invoked whenever `ariaCurrent` changes.
 *   Pass `() => this._tick++` (where `_tick` is a `@State` field) to trigger
 *   a Stencil re-render when the active location changes.
 */
export function createLinkStateAccess(forceRender?: () => void): StateAccess<LinkApi> {
	const store: Record<string, unknown> = { ariaCurrent: '' };
	return {
		setState: (key, value) => {
			store[key as string] = value;
			forceRender?.();
		},
		getState: (key) => store[key as string] as never,
	};
}

export class LinkController extends BaseController<LinkApi> {
	private readonly tooltipCtrl = new TooltipController({ setState: () => {}, getState: () => undefined as never });
	private anchorRef?: HTMLAnchorElement;
	private unsubscribeOnLocationChange?: UnsubscribeFunction;

	public readonly setTooltipRef = this.tooltipCtrl.setTooltipElementRef;

	/**
	 * Handles an anchor click: hides the tooltip, prevents default when disabled,
	 * and calls `on.onClick` when defined. Does not dispatch a KolEvent — that
	 * responsibility belongs to the enclosing web component if needed.
	 */
	public readonly handleAnchorClick = (event: MouseEvent | KeyboardEvent): void => {
		this.hideTooltip();
		if (this.getRenderProp('disabled')) {
			event.preventDefault();
			return;
		}
		const on = this.getRenderProp('on');
		if (typeof on.onClick === 'function') {
			setEventTarget(event, this.anchorRef as HTMLElement | undefined);
			on.onClick(event, this.getRenderProp('href'));
		}
	};

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

	/**
	 * Returns the current computed `aria-current` value for this link.
	 * Updated automatically by the `onLocationChange` subscription set up in `componentWillLoad`.
	 */
	public getAriaCurrent(): string {
		return this.getState('ariaCurrent');
	}

	private resolveTooltipLabel(): string {
		const label = this.getRenderProp('label');
		const href = this.getRenderProp('href');
		if (typeof label === 'string' && label.length > 0) return label;
		return href;
	}
}

/**
 * Initialises a `LinkController` from the external underscored `LinkProps` format.
 *
 * Calling this is equivalent to calling `ctrl.componentWillLoad()` with all available props
 * mapped from the underscore-prefixed external API to the camelCase internal controller API.
 * This includes subscribing to `onLocationChange` so `ariaCurrent` updates automatically.
 *
 * @param ctrl  - An already-constructed `LinkController`.
 * @param props - A partial `LinkProps` object (all `_`-prefixed). `_href` is required.
 */
export function initLinkControllerFromProps(ctrl: LinkController, props: { _href: string } & Partial<Record<string, unknown>>): void {
	ctrl.componentWillLoad({
		href: props['_href'],
		label: props['_label'] as string | false | undefined,
		icons: props['_icons'],
		target: props['_target'] as string | undefined,
		download: props['_download'] as string | undefined,
		on: props['_on'] as Record<string, unknown> | undefined,
		inline: props['_inline'] as boolean | undefined,
		disabled: props['_disabled'] as boolean | undefined,
		hideLabel: props['_hideLabel'] as boolean | undefined,
		role: props['_role'] as string | undefined,
		tabIndex: props['_tabIndex'] as number | undefined,
		accessKey: props['_accessKey'] as string | undefined,
		shortKey: props['_shortKey'] as string | undefined,
		tooltipAlign: props['_tooltipAlign'] as string | undefined,
		ariaControls: props['_ariaControls'] as string | undefined,
		ariaCurrentValue: props['_ariaCurrentValue'] as string | undefined,
		ariaDescription: props['_ariaDescription'] as string | undefined,
		ariaExpanded: props['_ariaExpanded'] as boolean | undefined,
		ariaOwns: props['_ariaOwns'] as string | undefined,
	});
}
