import { autoUpdate } from '@floating-ui/dom';
import { getDocument } from '../../../schema';
import { alignFloatingElements } from '../../../utils/align-floating-elements';
import { nonce } from '../../../utils/dev.utils';
import { hideOverlay, showOverlay } from '../../../utils/overlay';
import { tooltipClosed, tooltipOpened } from '../../../utils/tooltip-open-tracking';
import { alignProp, badgeTextProp, labelProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, GetStateFn, ResolvedInputProps, SetStateFn } from '../generic-types';
import type { TooltipApi } from './api';
import { tooltipPropsConfig } from './api';

export class TooltipController extends BaseController<TooltipApi> implements ControllerInterface<TooltipApi> {
	private tooltipElement?: HTMLDivElement;
	private arrowElement?: HTMLDivElement;
	private previousSibling?: Element | null;
	private parentElement?: Element | null;
	private cleanupAutoPositioning?: () => void;
	private hasFocusIn = false;
	private hasMouseIn = false;
	private isHiddenForCurrentVisit = false;
	private overFocusTimeout?: ReturnType<typeof setTimeout>;

	public constructor(setState: SetStateFn<TooltipApi>, getState: GetStateFn<TooltipApi>) {
		super(tooltipPropsConfig, setState, getState);
		setState('id', `id-${nonce()}`);
	}

	public componentWillLoad(props: ResolvedInputProps<TooltipApi> & { id?: string }): void {
		const { label, align, badgeText, id } = props;
		this.watchLabel(label);
		this.watchAlign(align);
		this.watchBadgeText(badgeText);
		this.watchId(id);
	}

	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => {
			this.setRenderProp('label', v);
		});
	}

	public watchAlign(value?: string): void {
		alignProp.apply(value, (v) => {
			this.setRenderProp('align', v);
		});
	}

	public watchBadgeText(value?: string): void {
		badgeTextProp.apply(value, (v) => {
			this.setRenderProp('badgeText', v);
		});
	}

	public watchId(value?: string): void {
		if (value !== undefined && value.length > 0) {
			this.setState('id', value);
		}
	}

	public setTooltipElementRef = (element?: HTMLDivElement): void => {
		this.tooltipElement = element;
		if (this.tooltipElement) {
			this.addTooltipListeners(this.tooltipElement);
		}
	};

	public setArrowElementRef = (element?: HTMLDivElement): void => {
		this.arrowElement = element;
	};

	public setPreviousSibling(element?: Element | null): void {
		if (this.previousSibling) {
			this.removeListeners(this.previousSibling);
		}
		this.previousSibling = element;
		if (this.previousSibling) {
			this.addListeners(this.previousSibling);
		}
	}

	public setParentElement(element?: Element | null): void {
		this.parentElement = element;
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
				align: this.getRenderProp('align'),
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

	public showOrHideTooltip = (): void => {
		clearTimeout(this.overFocusTimeout);
		this.overFocusTimeout = setTimeout(() => {
			if (this.hasMouseIn || this.hasFocusIn) {
				this.showTooltip();
			} else {
				this.hideTooltip();
			}
		}, 300);
	};

	public handleMouseEnter = (): void => {
		const isNewVisit = this.isNewVisit();
		this.hasMouseIn = true;
		if (isNewVisit) {
			this.isHiddenForCurrentVisit = false;
		}
		this.showOrHideTooltip();
	};

	public handleMouseLeave = (): void => {
		this.hasMouseIn = false;
		this.resetHideFlag();
		this.showOrHideTooltip();
	};

	public handleFocusIn = (): void => {
		const isNewVisit = this.isNewVisit();
		this.hasFocusIn = true;
		if (isNewVisit) {
			this.isHiddenForCurrentVisit = false;
		}
		this.showOrHideTooltip();
	};

	public handleFocusOut = (): void => {
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
		el.addEventListener('focusin', this.handleFocusIn);
		el.addEventListener('focusout', this.handleFocusOut);
	}

	public destroy(): void {
		if (this.previousSibling) {
			this.removeListeners(this.previousSibling);
		}
		if (this.tooltipElement) {
			this.removeListeners(this.tooltipElement);
		}
		if (this.cleanupAutoPositioning) {
			this.cleanupAutoPositioning();
		}
		clearTimeout(this.overFocusTimeout);
	}
}
