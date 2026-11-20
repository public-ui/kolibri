import { getSharedState } from '../core/shared-state';

const shared = getSharedState('tooltips', () => ({ open: 0 }));

export const tooltipOpened = () => {
	shared.open++;
};

export const tooltipClosed = () => {
	shared.open = Math.max(0, shared.open - 1);
};

export const handleCancelOverlay = (event: Event): void => {
	if (shared.open > 0) {
		event.preventDefault();
	}
};

export const isTooltipOpen = (): boolean => shared.open > 0;
