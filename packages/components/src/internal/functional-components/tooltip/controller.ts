import { autoUpdate } from '@floating-ui/dom';
import type { AlignPropType } from '../../../schema';
import { getDocument } from '../../../schema';
import { alignFloatingElements } from '../../../utils/align-floating-elements';
import { nonce } from '../../../utils/dev.utils';
import { hideOverlay, showOverlay } from '../../../utils/overlay';
import { tooltipClosed, tooltipOpened } from '../../../utils/tooltip-open-tracking';

export class TooltipController {
	public readonly id: string;

	private align: AlignPropType = 'top';
	private tooltipElement?: HTMLDivElement;
	private arrowElement?: HTMLDivElement;
	private previousSibling?: Element | null;
	private parentElement?: Element | null;
	private cleanupAutoPositioning?: () => void;
	private hasFocusIn = false;
	private hasMouseIn = false;
	private isHiddenForCurrentVisit = false;
	private overFocusTimeout?: ReturnType<typeof setTimeout>;

	public constructor(id?: string) {
		this.id = id ?? `id-${nonce()}`;
	}

	public setAlign(value: AlignPropType): void {
		this.align = value;
		void this.alignTooltip();
	}

	public setContainerRef = (el?: HTMLDivElement | null): void => {
		if (!el) {
			this.destroy();
			return;
		}
		this.setPreviousSibling(el.previousElementSibling);
		this.parentElement = el.parentElement;
	};

	public setTooltipElementRef = (el?: HTMLDivElement): void => {
		this.tooltipElement = el;
		if (this.tooltipElement) {
			this.addTooltipListeners(this.tooltipElement);
		}
	};

	public setArrowElementRef = (el?: HTMLDivElement): void => {
		this.arrowElement = el;
	};

	private setPreviousSibling(element?: Element | null): void {
		if (this.previousSibling) {
			this.removeListeners(this.previousSibling);
		}
		this.previousSibling = element;
		if (this.previousSibling) {
			this.addListeners(this.previousSibling);
		}
	}

	public hideTooltip(): void {
		this.isHiddenForCurrentVisit = true;

		if (this.tooltipElement) {
			hideOverlay(this.tooltipElement);
			tooltipClosed();
			this.tooltipElement.classList.remove('show');
			this.tooltipElement.classList.add('hide');
			this.parentElement?.classList.remove('hastooltip');

			if (this.cleanupAutoPositioning) {
				this.cleanupAutoPositioning();
				this.cleanupAutoPositioning = undefined;
			}
		}
		getDocument().removeEventListener('keyup', this.hideTooltipByEscape);
	}

	private isNewVisit(): boolean {
		return !this.hasMouseIn && !this.hasFocusIn;
	}

	private resetHideFlag = (): void => {
		if (this.isNewVisit()) {
			this.isHiddenForCurrentVisit = false;
		}
	};

	private async alignTooltip(): Promise<void> {
		if (this.tooltipElement && this.previousSibling) {
			await alignFloatingElements({
				align: this.align,
				referenceElement: this.previousSibling,
				arrowElement: this.arrowElement,
				floatingElement: this.tooltipElement,
			});
		}
	}

	private showTooltip = (): void => {
		if (this.isHiddenForCurrentVisit) {
			return;
		}
		if (this.previousSibling && this.tooltipElement) {
			showOverlay(this.tooltipElement);
			tooltipOpened();
			this.tooltipElement.classList.remove('hide');
			this.tooltipElement.classList.add('show');
			this.tooltipElement.style.setProperty('display', 'block');
			this.parentElement?.classList.add('hastooltip');
			getDocument().addEventListener('keyup', this.hideTooltipByEscape, { once: true });

			const target = this.previousSibling;
			const tooltipEl = this.tooltipElement;
			this.cleanupAutoPositioning = autoUpdate(target, tooltipEl, () => {
				void this.alignTooltip();
			});
		}
	};

	private hideTooltipByEscape = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			this.hideTooltip();
		}
	};

	private showOrHideTooltip = (): void => {
		clearTimeout(this.overFocusTimeout);
		this.overFocusTimeout = setTimeout(() => {
			if (this.hasMouseIn || this.hasFocusIn) {
				this.showTooltip();
			} else {
				this.hideTooltip();
			}
		}, 300);
	};

	private handleMouseEnter = (): void => {
		const isNewVisit = this.isNewVisit();
		this.hasMouseIn = true;
		if (isNewVisit) {
			this.isHiddenForCurrentVisit = false;
		}
		this.showOrHideTooltip();
	};

	private handleMouseLeave = (): void => {
		this.hasMouseIn = false;
		this.resetHideFlag();
		this.showOrHideTooltip();
	};

	private handleFocusIn = (): void => {
		const isNewVisit = this.isNewVisit();
		this.hasFocusIn = true;
		if (isNewVisit) {
			this.isHiddenForCurrentVisit = false;
		}
		this.showOrHideTooltip();
	};

	private handleFocusOut = (): void => {
		this.hasFocusIn = false;
		this.resetHideFlag();
		this.showOrHideTooltip();
	};

	private addListeners(el: Element): void {
		el.addEventListener('mouseenter', this.handleMouseEnter);
		el.addEventListener('mouseleave', this.handleMouseLeave);
		el.addEventListener('focusin', this.handleFocusIn);
		el.addEventListener('focusout', this.handleFocusOut);
	}

	private removeListeners(el: Element): void {
		el.removeEventListener('mouseenter', this.handleMouseEnter);
		el.removeEventListener('mouseleave', this.handleMouseLeave);
		el.removeEventListener('focusin', this.handleFocusIn);
		el.removeEventListener('focusout', this.handleFocusOut);
	}

	private addTooltipListeners(el: Element): void {
		el.addEventListener('mouseenter', this.handleMouseEnter);
		el.addEventListener('mouseleave', this.handleMouseLeave);
	}

	public destroy(): void {
		if (this.previousSibling) {
			this.removeListeners(this.previousSibling);
		}
		if (this.tooltipElement) {
			this.tooltipElement.removeEventListener('mouseenter', this.handleMouseEnter);
			this.tooltipElement.removeEventListener('mouseleave', this.handleMouseLeave);
		}
		if (this.cleanupAutoPositioning) {
			this.cleanupAutoPositioning();
			this.cleanupAutoPositioning = undefined;
		}
		clearTimeout(this.overFocusTimeout);
		getDocument().removeEventListener('keyup', this.hideTooltipByEscape);
	}
}
