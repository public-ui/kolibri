import { autoUpdate } from '@floating-ui/dom';
import type { AlignPropType } from '../../../schema';
import { alignFloatingElements } from '../../../utils/align-floating-elements';

export class PopoverController {
	private show: boolean = false;
	private popoverElement?: HTMLDivElement;
	private arrowElement?: HTMLDivElement;
	private triggerElement?: HTMLElement;
	private align: AlignPropType = 'bottom';
	private cleanupAutoUpdate?: () => void;

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
						this.setupAutoUpdate();
						void this.alignPopover();
					} catch {
						// Ignore DOMException if already open
					}
				}
			} else {
				if (isOpen) {
					try {
						this.popoverElement.hidePopover();
						this.cleanupAutoUpdate?.();
						this.cleanupAutoUpdate = undefined;
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
		this.arrowElement = element?.querySelector('.kol-popover__arrow') as HTMLDivElement | undefined;
	};

	public setTriggerElement = (element?: HTMLElement): void => {
		this.triggerElement = element;
	};

	public setAlign = (align: AlignPropType): void => {
		this.align = align;
	};

	private alignPopover = async (): Promise<void> => {
		if (!this.popoverElement || !this.triggerElement) {
			return;
		}

		await alignFloatingElements({
			align: this.align,
			referenceElement: this.triggerElement,
			arrowElement: this.arrowElement,
			floatingElement: this.popoverElement,
		});
	};

	private setupAutoUpdate = (): void => {
		if (!this.popoverElement || !this.triggerElement || this.cleanupAutoUpdate) {
			return;
		}

		this.cleanupAutoUpdate = autoUpdate(this.triggerElement, this.popoverElement, () => {
			void this.alignPopover();
		});
	};

	public destroy(): void {
		this.cleanupAutoUpdate?.();
		this.cleanupAutoUpdate = undefined;
		this.popoverElement = undefined;
		this.arrowElement = undefined;
		this.triggerElement = undefined;
	}
}
