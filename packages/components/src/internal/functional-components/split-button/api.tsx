import type { ApiFromConfig, FunctionalComponentProps, PropsConfigShape } from '../generic-types';

import type { ButtonApi } from '../button/api';
import type { PopoverButtonApi } from '../popover-button/api';

/**
 * Props configuration for the split button component.
 *
 * Deliberately empty: every public prop of `kol-split-button` belongs to its primary button and is
 * normalized by the shared button orchestration, so the split button itself renders nothing from a
 * prop of its own — it only arranges two already resolved prop sets. The composition is therefore
 * carried by the `States` bucket below, the same way `BreadcrumbApi` carries its link items.
 */
export const splitButtonPropsConfig = {} as const satisfies PropsConfigShape;

export type SplitButtonApi = ApiFromConfig<
	typeof splitButtonPropsConfig,
	{
		Refs: {
			/**
			 * The box around the dropdown. It carries the consumer class the predecessor put on its
			 * `kol-popover-button-wc` element, and is the element the popover button's synthetic
			 * `KolEvent` DOM events are dispatched on.
			 */
			dropdown: HTMLDivElement;
		};
		States: {
			/** Fully resolved props for the primary `ButtonFC`. */
			buttonProps: FunctionalComponentProps<ButtonApi>;
			/**
			 * Extra classes on the box around the primary button — the raw variant name, or the
			 * custom class when `_variant="custom"`. Resolved by the web component because it is
			 * the raw prop value that ends up in the class list here, not the normalized variant
			 * array `ButtonFC` renders as `kol-button--<variant>`.
			 */
			buttonWrapperClass: string;
			/** Fully resolved props for the dropdown `PopoverButtonFC`, built by `createPopoverButtonItem`. */
			dropdownProps: FunctionalComponentProps<PopoverButtonApi>;
		};
	}
>;
