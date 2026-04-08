import { autoUpdate } from '@floating-ui/dom';
import { getDocument } from '../../../schema';
import { alignFloatingElements } from '../../../utils/align-floating-elements';
import { hideOverlay, showOverlay } from '../../../utils/overlay';
import { tooltipClosed, tooltipOpened } from '../../../utils/tooltip-open-tracking';
import { alignProp, badgeTextProp, idProp, labelProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps, StateAccess } from '../generic-types';
import type { TooltipApi } from './api';
import { tooltipPropsConfig } from './api';

export class TooltipController extends BaseController<TooltipApi> implements ControllerInterface<TooltipApi> {
	private previousSibling?: HTMLElement;
	private tooltipElement?: HTMLElement;

	private hasFocusIn = false;
	private hasMouseIn = false;
	private isHiddenForCurrentVisit = false;
	private overFocusTimeout?: ReturnType<typeof setTimeout>;
	private cleanupAutoPositioning?: () => void;

	public constructor(stateAccess: StateAccess<TooltipApi>) {
		super(stateAccess, tooltipPropsConfig);
	}

	public componentWillLoad(props: ResolvedInputProps<TooltipApi>): void {
		this.watchLabel(props.label);
		this.watchAlign(props.align);
		this.watchBadgeText(props.badgeText);
		this.watchId(props.id);
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
		idProp.apply(value, (v) => {
			this.setRenderProp('id', v);
		});
	}

	public initContext(previousSibling: HTMLElement | undefined): void {
		this.previousSibling = previousSibling;
	}

	public syncListeners(last?: HTMLElement | null, next?: HTMLElement | null, replacePreviousSibling = false): void {
		if (last) {
			this.removeListeners(last);
		}
		if (next) {
			if (replacePreviousSibling) {
				this.previousSibling = next;
			}
			this.addListeners(next);
		}
	}

	public handleEventListeners(host: HTMLElement): void {
		const nextSibling = host.previousElementSibling as HTMLElement | null;
		this.syncListeners(this.previousSibling, nextSibling, true);
	}

	public hideTooltip(): void {
		this.isHiddenForCurrentVisit = true;

		if (this.tooltipElement) {
			hideOverlay(this.tooltipElement);
			tooltipClosed();
			this.tooltipElement.classList.remove('show');
			this.tooltipElement.classList.add('hide');

			if (this.cleanupAutoPositioning) {
				this.cleanupAutoPositioning();
				this.cleanupAutoPositioning = undefined;
			}
		}
		getDocument().removeEventListener('keyup', this.hideTooltipByEscape);
	}

	public setTooltipElementRef = (el?: HTMLElement): void => {
		this.tooltipElement = el;
		if (this.tooltipElement) {
			this.addListeners(this.tooltipElement);
		}
	};

	public destroy(): void {
		clearTimeout(this.overFocusTimeout);

		if (this.previousSibling) {
			this.removeListeners(this.previousSibling);
			this.previousSibling = undefined;
		}
		if (this.tooltipElement) {
			this.removeListeners(this.tooltipElement);
		}
		if (this.cleanupAutoPositioning) {
			this.cleanupAutoPositioning();
			this.cleanupAutoPositioning = undefined;
		}
		getDocument().removeEventListener('keyup', this.hideTooltipByEscape);
	}

	private isNewVisit(): boolean {
		return !this.hasMouseIn && !this.hasFocusIn;
	}

	private resetHideFlag(): void {
		if (this.isNewVisit()) {
			this.isHiddenForCurrentVisit = false;
		}
	}

	private async alignTooltip(): Promise<void> {
		if (this.tooltipElement && this.previousSibling) {
			await alignFloatingElements({
				align: this.getRenderProp('align'),
				arrowElement: this.tooltipElement.querySelector('.kol-tooltip__arrow') as HTMLElement,
				floatingElement: this.tooltipElement,
				referenceElement: this.previousSibling,
			});
		}
	}

	private showTooltip(): void {
		if (this.isHiddenForCurrentVisit) {
			return;
		}
		if (this.previousSibling && this.tooltipElement) {
			showOverlay(this.tooltipElement);
			tooltipOpened();
			this.tooltipElement.classList.remove('hide');
			this.tooltipElement.classList.add('show');
			this.tooltipElement.style.setProperty('display', 'block');
			getDocument().addEventListener('keyup', this.hideTooltipByEscape, { once: true });

			const target = this.previousSibling;
			const tooltipEl = this.tooltipElement;
			this.cleanupAutoPositioning = autoUpdate(target, tooltipEl, () => {
				void this.alignTooltip();
			});
		}
	}

	private showOrHideTooltip(): void {
		clearTimeout(this.overFocusTimeout);
		this.overFocusTimeout = setTimeout(() => {
			if (this.hasMouseIn || this.hasFocusIn) {
				this.showTooltip();
			} else {
				this.hideTooltip();
			}
		}, 300);
	}

	private hideTooltipByEscape = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			this.hideTooltip();
		}
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

	private addListeners(el: HTMLElement): void {
		el.addEventListener('mouseover', this.handleMouseEnter);
		el.addEventListener('mouseout', this.handleMouseLeave);
		el.addEventListener('focusin', this.handleFocusIn);
		el.addEventListener('focusout', this.handleFocusOut);
	}

	private removeListeners(el: HTMLElement): void {
		el.removeEventListener('mouseover', this.handleMouseEnter);
		el.removeEventListener('mouseout', this.handleMouseLeave);
		el.removeEventListener('focusin', this.handleFocusIn);
		el.removeEventListener('focusout', this.handleFocusOut);
	}
}
