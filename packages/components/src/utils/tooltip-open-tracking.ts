let openTooltips = 0;

export const tooltipOpened = () => {
	openTooltips++;
};

export const tooltipClosed = () => {
	openTooltips = Math.max(0, openTooltips - 1);
};

export const handleCancelOverlay = (event: Event): void => {
	if (openTooltips > 0) {
		event.preventDefault();
	}
};
