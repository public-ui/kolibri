export class PopoverController {
	private show: boolean = false;
	private popoverElement?: HTMLDivElement;

	public setShow(value: boolean): void {
		this.show = value;
		if (!this.popoverElement) {
			return;
		}

		const toggleVisibility = (): void => {
			if (!this.popoverElement) {
				return;
			}
			const isOpen = this.popoverElement.matches(':popover-open');
			if (this.show) {
				if (!isOpen) {
					try {
						this.popoverElement.showPopover();
					} catch {
						// Ignore DOMException if already open
					}
				}
			} else {
				if (isOpen) {
					try {
						this.popoverElement.hidePopover();
					} catch {
						// Ignore DOMException if already closed
					}
				}
			}
		};

		if (this.popoverElement.isConnected) {
			toggleVisibility();
		} else {
			requestAnimationFrame(() => {
				toggleVisibility();
			});
		}
	}

	public setPopoverElementRef = (element?: HTMLDivElement): void => {
		this.popoverElement = element;
	};

	public destroy(): void {
		// Minimal cleanup
		this.popoverElement = undefined;
	}
}
