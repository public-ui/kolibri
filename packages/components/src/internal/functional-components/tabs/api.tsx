import type { KolFocusOptions } from '../../../schema';
import { alignProp, hasCreateButtonProp, labelWithExpertSlotProp, selectedProp, tabBehaviorProp, tabsCallbacksProp, tabsProp } from '../../props';
import type { ApiFromConfig, PropsConfigShape } from '../generic-types';
import type { TabsButton } from './button-item';

/**
 * Props configuration for the tabs component.
 *
 * Notes on prop choices:
 * - `labelWithExpertSlotProp` (not `labelProp`): the predecessor's `validateLabel` accepted any
 *   string; `labelProp` would reject one-character labels, a validation regression.
 * - `selectedProp` only checks the type. Clamping into the tab list and skipping disabled tabs
 *   needs both `_selected` and `_tabs`, so the web component resolves it after applying either.
 * - `tabsCallbacksProp` and `tabBehaviorProp` are not rendered — the web component reads them in
 *   its event handlers.
 */
export const tabsPropsConfig = {
	required: [labelWithExpertSlotProp, tabsProp],
	optional: [alignProp, hasCreateButtonProp, selectedProp, tabBehaviorProp, tabsCallbacksProp],
} as const satisfies PropsConfigShape;

export type TabsApi = ApiFromConfig<
	typeof tabsPropsConfig,
	{
		Callbacks: {
			/** Blur handler of the tab list; resets the keyboard focus position. */
			blur: () => void;
			/** Keydown handler of the tab list: arrow keys move between tabs, Enter and Space activate. */
			keyDown: (event: KeyboardEvent) => void;
		};
		Methods: {
			click: () => void;
			focus: (options?: KolFocusOptions) => void;
		};
		Refs: {
			/**
			 * The tab panel container. The panels are created imperatively by the web component,
			 * because every panel projects a light-DOM child through a named slot.
			 */
			content: HTMLDivElement;
			/** The BEM root, used to look up a tab button by id when moving the focus. */
			root: HTMLDivElement;
		};
		States: {
			/** The create button; rendered only when `hasCreateButton` is set. */
			createButton: TabsButton;
			/** One entry per tab, resolved per render pass against the selected tab. */
			tabButtons: TabsButton[];
		};
	}
>;
