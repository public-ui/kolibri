import type { AlignPropType, InternalButtonProps, StencilUnknown } from '../../../schema';
import { setEventTarget } from '../../../schema';
import { nonce } from '../../../utils/dev.utils';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';
import { BaseWebComponent } from '../base-web-component';
import type { ButtonApi } from '../button/api';
import type { ResolvedButtonProps } from '../button/resolve-props';
import { resolveButtonProps } from '../button/resolve-props';
import type { FunctionalComponentProps } from '../generic-types';
import { TooltipBehavior } from '../tooltip/behavior';

/**
 * Everything `TabsFC` needs to render one embedded button: the resolved `ButtonFC` props and the
 * ref of the box around the button.
 */
export type TabsButton = {
	buttonProps: FunctionalComponentProps<ButtonApi>;
	/**
	 * The box stands where the predecessor's `kol-button-wc` element stood. It is the flex item of
	 * the tab list — the `.kol-button` block inside claims `width: 100%` and would take a whole row
	 * of its own otherwise — and the target of the `KolEvent` DOM events.
	 */
	refBox: (element?: HTMLDivElement) => void;
};

/**
 * One orchestrated button of `kol-tabs` — a tab or the create button.
 *
 * `ButtonFC` is stateless, but a tab button is not: its tooltip behavior, its event handlers and
 * its element refs have to live somewhere. The predecessor rendered a `kol-button-wc` per button,
 * which owned exactly that; this item is that orchestration, minus the wrapper element. It is a
 * plain object with closures, like `popover-button/item.ts`, so `kol-tabs` composes one per button.
 *
 * Two pieces of the wrapper are deliberately absent:
 * - **Form association.** Tab buttons are `type="button"` without `_name`, so the wrapper's
 *   `AssociatedInputController` had no form field to write the value into.
 * - **Submit/reset propagation.** Same reason: neither type is ever set.
 */
export type TabsButtonItem = {
	/**
	 * Resolves the button props for the current render pass. Call once per render: the selected tab
	 * changes the tab index, the variant and `aria-selected` of every tab.
	 *
	 * @param props - The button configuration, in the shape the predecessor handed `kol-button-wc`.
	 * @param flagHost - Element the theme-scoped `buttonVariantDefault` feature flag is resolved against.
	 */
	getButton(props: InternalButtonProps, flagHost?: HTMLElement): TabsButton;
	/** The rendered `<button>`, once it is in the DOM. */
	getButtonElement(): HTMLButtonElement | undefined;
	/** Re-registers the tooltip listeners. Call from `componentDidRender`. */
	syncListeners(): void;
	/** Tears down the tooltip behavior. */
	destroy(): void;
};

export const createTabsButtonItem = (): TabsButtonItem => {
	const tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
	const ariaDescriptionId = nonce();
	let resolved: ResolvedButtonProps | undefined;
	let value: StencilUnknown;
	let boxElement: HTMLDivElement | undefined;
	let buttonElement: HTMLButtonElement | undefined;

	// The events are dispatched on the box, not on the button: `KolEvent.click` and
	// `KolEvent.focus` share their type with the native events, so dispatching them on the button
	// would re-enter its own handlers.
	const dispatch = (event: KolEvent, detail?: unknown): void => {
		if (boxElement) {
			dispatchDomEvent(boxElement, event, detail);
		}
	};

	const handleClick = (event: MouseEvent): void => {
		event.stopPropagation();
		tooltipBehavior.hideTooltip();

		const onClick = resolved?.on.onClick;
		if (typeof onClick === 'function') {
			setEventTarget(event, buttonElement);
			onClick(event, value);
		}
		dispatch(KolEvent.click, value);
	};
	const handleMouseDown = (event: MouseEvent): void => {
		resolved?.on.onMouseDown?.(event);
		dispatch(KolEvent.mousedown);
	};
	const handleFocus = (event: FocusEvent): void => {
		resolved?.on.onFocus?.(event);
		dispatch(KolEvent.focus);
	};
	const handleBlur = (event: FocusEvent): void => {
		resolved?.on.onBlur?.(event);
		dispatch(KolEvent.blur);
	};

	const refBox = (element?: HTMLDivElement): void => {
		boxElement = element;
	};
	const refButton = (element?: HTMLButtonElement): void => {
		buttonElement = element;
	};

	return {
		getButton: (props: InternalButtonProps, flagHost?: HTMLElement): TabsButton => {
			resolved = resolveButtonProps(props, flagHost);
			value = props._value;

			tooltipBehavior.componentWillLoad({
				label: resolved.label,
				align: resolved.tooltipAlign as AlignPropType,
			});

			return {
				buttonProps: {
					...resolved,
					ariaDescriptionId,
					handleBlur,
					handleClick,
					handleFocus,
					handleMouseDown,
					refButton,
					refTooltip: tooltipBehavior.setTooltipElementRef,
				},
				refBox,
			};
		},
		getButtonElement: (): HTMLButtonElement | undefined => buttonElement,
		syncListeners: (): void => {
			if (buttonElement) {
				tooltipBehavior.syncListeners(undefined, buttonElement, true);
			}
		},
		destroy: (): void => {
			tooltipBehavior.destroy();
		},
	};
};
