import { BaseWebComponent } from '../base-web-component';
import { TooltipBehavior } from '../tooltip/behavior';

/** Refs of one selection input and of the tooltip that names it, for one render pass. */
export type SelectionTooltipRefs = {
	refInput: (element?: HTMLInputElement) => void;
	refTooltip: (element?: HTMLElement) => void;
};

/** The tooltip of one selection input of the table, which shows the name of the input, since the input has no visible label. */
export type SelectionTooltipItem = {
	/** Call once per render pass with the current name of the input. */
	getRefs(label: string): SelectionTooltipRefs;
	/** Re-registers the listeners on the input. Call from `componentDidRender`. */
	syncListeners(): void;
	destroy(): void;
};

export const createSelectionTooltipItem = (): SelectionTooltipItem => {
	const tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);
	let inputElement: HTMLInputElement | undefined;

	const refs: SelectionTooltipRefs = {
		refInput: (element) => {
			inputElement = element;
		},
		refTooltip: tooltipBehavior.setTooltipElementRef,
	};

	return {
		getRefs: (label) => {
			tooltipBehavior.componentWillLoad({ label });
			return refs;
		},
		syncListeners: () => {
			if (inputElement) {
				tooltipBehavior.syncListeners(undefined, inputElement, true);
			}
		},
		destroy: () => {
			tooltipBehavior.destroy();
		},
	};
};
