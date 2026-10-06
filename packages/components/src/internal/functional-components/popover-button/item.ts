import { getFeatureFlag } from 'adopted-style-sheets';

import type { AlignPropType, IconsPropType, InternalButtonProps, LabelWithExpertSlotPropType, PopoverButtonProps } from '../../../schema';
import { createUniqueId, nonce } from '../../../utils/dev.utils';
import { createCtaRef } from '../../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';
import {
	buttonTypeProp,
	disabledProp,
	hideLabelProp,
	inlineProp,
	labelProp,
	popoverAlignProp,
	spanIconsProp,
	tooltipAlignProp,
	variantProp,
} from '../../props';
import { BaseWebComponent } from '../base-web-component';
import { resolveButtonProps } from '../button/resolve-props';
import { PopoverBehavior } from '../popover/behavior';
import { buildDefaultPropsFromConfig } from '../props-from-config';
import { TooltipBehavior } from '../tooltip/behavior';
import { popoverButtonPropsConfig } from './api';
import type { PopoverButtonFCProps } from './component';

/**
 * One orchestrated popover button embedded in another component's shadow DOM: everything
 * `PopoverButtonFC` needs to render, plus the lifecycle hooks the surrounding web component has to
 * drive.
 *
 * It exists because `PopoverButtonFC` is stateless while the popover is not — the toggle
 * behavior, the open state, the tooltip behavior and three element refs have to live somewhere.
 * `BasePopoverButtonWebComponent` owns exactly that for the `kol-popover-button` elements, but a
 * component that embeds the popover button *next to* its own button (`kol-split-button`) needs a
 * second, independent set of them and cannot inherit it. The item is a plain object with closures,
 * like `breadcrumb/link-item.ts`, so the embedding component composes it instead of inheriting it.
 *
 * The open state is not kept here: it belongs to the embedding component as a reactive `@State()`
 * field, reached through the `getOpen`/`setOpen` accessors, so toggling re-renders the host.
 */
export type PopoverButtonItem = {
	/**
	 * Fully resolved props for `PopoverButtonFC`, with the current open state applied. With
	 * `popoverButtonProps`, the toggle button is resolved from them for this render pass, the way the
	 * popover button elements resolve their `@Prop`s; call once per render then.
	 */
	getFcProps(popoverButtonProps?: PopoverButtonProps): PopoverButtonFCProps;
	/** Closes the popover programmatically. */
	hide(): void;
	/** Applies a changed `disabled` value; call from the embedding component's watcher. */
	setDisabled(value?: boolean): void;
	/** Re-registers tooltip and toggle listeners. Call from `componentDidRender`. */
	syncListeners(): void;
	/** Tears down listeners, the popover behavior and the tooltip behavior. */
	destroy(): void;
};

export type PopoverButtonItemOptions = {
	/** Whether the toggle button starts disabled. */
	disabled?: boolean;
	/**
	 * Element the synthetic `KolEvent` DOM events are dispatched on, an ancestor of the button inside
	 * the embedding component's shadow DOM; they bubble out to the consumer from there. Defaults to
	 * the `.kol-popover-button` root.
	 */
	getEventTarget?: () => HTMLElement | undefined;
	/** Element the theme-scoped `buttonVariantDefault` feature flag is resolved against. */
	getFlagHost: () => HTMLElement | undefined;
	/** Reads the embedding component's reactive open state. */
	getOpen: () => boolean;
	/** Hides the label and renders it as a tooltip instead. */
	hideLabel?: boolean;
	/** Icon classnames of the toggle button. */
	icons?: IconsPropType;
	/** Visible or semantic label of the toggle button. */
	label?: LabelWithExpertSlotPropType;
	/** Where to show the popover preferably. */
	popoverAlign?: AlignPropType;
	/** Writes the embedding component's reactive open state. */
	setOpen: (open: boolean) => void;
};

export const createPopoverButtonItem = (options: PopoverButtonItemOptions): PopoverButtonItem => {
	const popoverBehavior = new PopoverBehavior(BaseWebComponent.stateLess);
	const tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
	const ctaRef = createCtaRef<HTMLButtonElement>();
	let popoverElement: HTMLDivElement | undefined;
	let rootElement: HTMLElement | undefined;

	const props = buildDefaultPropsFromConfig(popoverButtonPropsConfig);

	// An unset tabindex must not render as `tabindex="0"` — buttons are natively tabbable and the
	// attribute would pin them into the document tab order.
	delete props.tabIndex;

	const applyDisabled = (value?: boolean): void => {
		disabledProp.apply(value, (v) => {
			props.disabled = v;
		});
	};

	applyDisabled(options.disabled);
	hideLabelProp.apply(options.hideLabel, (v) => {
		props.hideLabel = v;
	});
	spanIconsProp.apply(options.icons, (v) => {
		props.icons = v;
	});
	// `inlineProp` defaults to `true`, `tooltipAlignProp` to `'right'` — both are shared with the
	// link. The popover button elements declare `false` and `'top'` as their `@Prop` defaults, so
	// the embedded button has to restate them; leaving them out renders a different button.
	inlineProp.apply(false, (v) => {
		props.inline = v;
	});
	tooltipAlignProp.apply('top', (v) => {
		props.tooltipAlign = v;
	});
	buttonTypeProp.apply('button', (v) => {
		props.type = v;
	});
	labelProp.apply(options.label, (v) => {
		props.label = v;
	});
	// An invalid `popoverAlign` is ignored, so the behavior loads with the default then.
	let popoverAlign = popoverAlignProp.getDefaultValue();
	popoverAlignProp.apply(options.popoverAlign, (v) => {
		popoverAlign = v;
	});
	props.popoverAlign = popoverAlign;
	popoverBehavior.componentWillLoad({ align: popoverAlign });
	variantProp.apply(getFeatureFlag('buttonVariantDefault', options.getFlagHost()) ?? 'normal', (v) => {
		props.variant = v;
	});

	props.ariaDescriptionId = nonce();
	props.popoverId = createUniqueId('popover');

	const dispatch = (event: KolEvent): void => {
		const target = options.getEventTarget ? options.getEventTarget() : rootElement;
		if (target) {
			dispatchDomEvent(target, event);
		}
	};

	const handleToggle = (event: Event): void => {
		options.setOpen((event as ToggleEvent).newState === 'open');
	};

	props.handleClick = (event: MouseEvent): void => {
		event.stopPropagation();
		tooltipBehavior.hideTooltip();
		popoverBehavior.setShow(!options.getOpen());
		dispatch(KolEvent.click);
	};
	props.handleMouseDown = (): void => dispatch(KolEvent.mousedown);
	props.handleFocus = (): void => dispatch(KolEvent.focus);
	props.handleBlur = (): void => dispatch(KolEvent.blur);

	props.refButton = (element?: HTMLButtonElement): void => {
		ctaRef(element);
		popoverBehavior.setTriggerElement(element);
	};
	props.refPopover = (element?: HTMLDivElement): void => {
		popoverElement = element;
		popoverBehavior.setPopoverElementRef(element);
	};
	props.refTooltip = tooltipBehavior.setTooltipElementRef;

	const refRoot = (element?: HTMLElement): void => {
		rootElement = element;
	};

	const loadTooltip = (): void => {
		tooltipBehavior.componentWillLoad({
			label: props.label as string,
			align: props.tooltipAlign as AlignPropType,
		});
	};

	/*
	 * The `@Prop` defaults of the popover button elements: they equal those of the button elements,
	 * except for the variant, which is `normal` instead of the `buttonVariantDefault` feature flag.
	 */
	const applyPopoverButtonProps = (popoverButtonProps: PopoverButtonProps): void => {
		const resolved = resolveButtonProps(
			{ ...popoverButtonProps, _on: undefined, _variant: popoverButtonProps._variant ?? 'normal' } as InternalButtonProps,
			options.getFlagHost(),
		);
		props.accessKey = resolved.accessKey;
		props.ariaDescription = resolved.ariaDescription;
		props.customClass = resolved.customClass;
		props.disabled = resolved.disabled;
		props.hideLabel = resolved.hideLabel;
		props.icons = resolved.icons;
		props.id = resolved.id;
		props.inline = resolved.inline;
		props.label = resolved.label;
		props.name = resolved.name;
		props.shortKey = resolved.shortKey;
		props.tabIndex = resolved.tabIndex;
		props.tooltipAlign = resolved.tooltipAlign;
		props.type = resolved.type;
		props.variant = resolved.variant;
		popoverAlignProp.apply(popoverButtonProps._popoverAlign ?? 'bottom', (v) => {
			props.popoverAlign = v;
			popoverBehavior.watchAlign(v);
		});
		loadTooltip();
	};

	loadTooltip();

	return {
		getFcProps: (popoverButtonProps?: PopoverButtonProps): PopoverButtonFCProps => {
			if (popoverButtonProps) {
				applyPopoverButtonProps(popoverButtonProps);
			}
			return { ...props, popoverOpen: options.getOpen(), ref: refRoot } as PopoverButtonFCProps;
		},
		hide: (): void => popoverBehavior.setShow(false),
		setDisabled: applyDisabled,
		syncListeners: (): void => {
			if (ctaRef.el) {
				tooltipBehavior.syncListeners(undefined, ctaRef.el, true);
			}
			// addEventListener is idempotent for an identical listener, so per-render calls are safe.
			popoverElement?.addEventListener('toggle', handleToggle);
		},
		destroy: (): void => {
			tooltipBehavior.destroy();
			if (popoverElement) {
				popoverElement.removeEventListener('toggle', handleToggle);
				popoverElement = undefined;
			}
			popoverBehavior.destroy();
		},
	};
};
