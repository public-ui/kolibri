import { getFeatureFlag } from 'adopted-style-sheets';

import type { AlignPropType, IconsPropType, LabelWithExpertSlotPropType } from '../../../schema';
import { createUniqueId, nonce } from '../../../utils/dev.utils';
import { createCtaRef } from '../../../utils/element-interaction';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';
import {
	buttonTypeProp,
	disabledProp,
	hideLabelProp,
	inlineProp,
	labelWithExpertSlotProp,
	popoverAlignProp,
	spanIconsProp,
	tooltipAlignProp,
	variantProp,
} from '../../props';
import { BaseWebComponent } from '../base-web-component';
import type { FunctionalComponentProps } from '../generic-types';
import { PopoverController } from '../popover/controller';
import { buildDefaultPropsFromConfig } from '../props-from-config';
import { TooltipBehavior } from '../tooltip/behavior';
import type { PopoverButtonApi } from './api';
import { popoverButtonPropsConfig } from './api';

/**
 * One orchestrated popover button embedded in another component's shadow DOM: everything
 * `PopoverButtonFC` needs to render, plus the lifecycle hooks the surrounding web component has to
 * drive.
 *
 * It exists because `PopoverButtonFC` is stateless while the popover is not — the toggle
 * controller, the open state, the tooltip behavior and three element refs have to live somewhere.
 * `BasePopoverButtonWebComponent` owns exactly that for the `kol-popover-button` elements, but a
 * component that embeds the popover button *next to* its own button (`kol-split-button`) needs a
 * second, independent set of them and cannot inherit it. The item is a plain object with closures,
 * like `breadcrumb/link-item.ts`, so the embedding component composes it instead of inheriting it.
 *
 * The open state is not kept here: it belongs to the embedding component as a reactive `@State()`
 * field, reached through the `getOpen`/`setOpen` accessors, so toggling re-renders the host.
 */
export type PopoverButtonItem = {
	/** Fully resolved props for `PopoverButtonFC`, with the current open state applied. */
	getFcProps(): FunctionalComponentProps<PopoverButtonApi>;
	/** Closes the popover programmatically. */
	hide(): void;
	/** Applies a changed `disabled` value; call from the embedding component's watcher. */
	setDisabled(value?: boolean): void;
	/** Re-registers tooltip and toggle listeners. Call from `componentDidRender`. */
	syncListeners(): void;
	/** Tears down listeners, the popover controller and the tooltip behavior. */
	destroy(): void;
};

export type PopoverButtonItemOptions = {
	/** Whether the toggle button starts disabled. */
	disabled?: boolean;
	/**
	 * Element the synthetic `KolEvent` DOM events are dispatched on. The predecessor dispatched
	 * them on the `kol-popover-button-wc` host, i.e. an ancestor of the button inside the
	 * embedding component's shadow DOM — they bubble out to the consumer from there.
	 */
	getEventTarget: () => HTMLElement | undefined;
	/** Element the theme-scoped `buttonVariantDefault` feature flag is resolved against. */
	getFlagHost: () => HTMLElement | undefined;
	/** Reads the embedding component's reactive open state. */
	getOpen: () => boolean;
	/** Hides the label and renders it as a tooltip instead. */
	hideLabel?: boolean;
	/** Icon classnames of the toggle button. */
	icons?: IconsPropType;
	/** Visible or semantic label of the toggle button. */
	label: LabelWithExpertSlotPropType;
	/** Where to show the popover preferably. */
	popoverAlign?: AlignPropType;
	/** Writes the embedding component's reactive open state. */
	setOpen: (open: boolean) => void;
};

export const createPopoverButtonItem = (options: PopoverButtonItemOptions): PopoverButtonItem => {
	const popoverCtrl = new PopoverController();
	const tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
	const ctaRef = createCtaRef<HTMLButtonElement>();
	let popoverElement: HTMLDivElement | undefined;

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
	labelWithExpertSlotProp.apply(options.label, (v) => {
		props.label = v;
	});
	popoverAlignProp.apply(options.popoverAlign, (v) => {
		props.popoverAlign = v;
		popoverCtrl.setAlign(v);
	});
	variantProp.apply(getFeatureFlag('buttonVariantDefault', options.getFlagHost()) ?? 'normal', (v) => {
		props.variant = v;
	});

	props.ariaDescriptionId = nonce();
	props.popoverId = createUniqueId('popover');

	const dispatch = (event: KolEvent): void => {
		const target = options.getEventTarget();
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
		popoverCtrl.setShow(!options.getOpen());
		dispatch(KolEvent.click);
	};
	props.handleMouseDown = (): void => dispatch(KolEvent.mousedown);
	props.handleFocus = (): void => dispatch(KolEvent.focus);
	props.handleBlur = (): void => dispatch(KolEvent.blur);

	props.refButton = (element?: HTMLButtonElement): void => {
		ctaRef(element);
		popoverCtrl.setTriggerElement(element);
	};
	props.refPopover = (element?: HTMLDivElement): void => {
		popoverElement = element;
		popoverCtrl.setPopoverElementRef(element);
	};
	props.refTooltip = tooltipBehavior.setTooltipElementRef;

	tooltipBehavior.componentWillLoad({
		label: props.label as string,
		align: props.tooltipAlign as AlignPropType,
	});

	return {
		getFcProps: (): FunctionalComponentProps<PopoverButtonApi> => ({ ...props, popoverOpen: options.getOpen() }) as FunctionalComponentProps<PopoverButtonApi>,
		hide: (): void => popoverCtrl.setShow(false),
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
			popoverCtrl.destroy();
		},
	};
};
