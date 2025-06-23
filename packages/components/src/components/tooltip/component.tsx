import { autoUpdate } from '@floating-ui/dom';
import type { AlignPropType, BadgeTextPropType, IdPropType, LabelPropType, TooltipAPI, TooltipStates } from '../../schema';
import { getDocument, validateBadgeText, validateAlign, validateId, validateLabel } from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';

import { alignFloatingElements } from '../../utils/align-floating-elements';
import { hideOverlay, showOverlay } from '../../utils/overlay';
import { KolSpanWcTag } from '../../core/component-names';

/**
 * @internal
 */
@Component({
	tag: 'kol-tooltip-wc',
	shadow: false,
})
export class KolTooltipWc implements TooltipAPI {
	@Element() private host!: HTMLKolTooltipWcElement;

	private arrowElement?: HTMLDivElement;
	private previousSibling?: Element | null;
	private tooltipElement?: HTMLDivElement;
	private hasFocusIn = false;
	private hasMouseIn = false;

	private cleanupAutoPositioning?: () => void;

	private async alignTooltip(): Promise<void> {
		if (this.tooltipElement && this.previousSibling) {
			await alignFloatingElements({
				align: this._align,
				referenceElement: this.previousSibling,
				arrowElement: this.arrowElement,
				floatingElement: this.tooltipElement,
			});
		}
	}

	private showTooltip = (): void => {
		if (this.previousSibling && this.tooltipElement /* SSR instanceof HTMLElement */) {
			showOverlay(this.tooltipElement);
			this.tooltipElement.style.removeProperty('animation-direction');
			this.tooltipElement.style.setProperty('opacity', '0');
			this.tooltipElement.style.setProperty('display', 'block');
			getDocument().addEventListener('keyup', this.hideTooltipByEscape);

			const target = this.previousSibling;
			const tooltipEl = this.tooltipElement;
			this.cleanupAutoPositioning = autoUpdate(target, tooltipEl, () => {
				void this.alignTooltip();
			});
		}
	};

	private hideTooltip = (): void => {
		if (this.tooltipElement /* SSR instanceof HTMLElement */) {
			hideOverlay(this.tooltipElement);
			this.tooltipElement.style.setProperty('opacity', '1');
			this.tooltipElement.style.setProperty('animation-direction', 'reverse');
			this.tooltipElement.addEventListener('animationend', this.handleHideAnimationEnd, {
				once: true,
			});

			if (this.cleanupAutoPositioning) {
				this.cleanupAutoPositioning();
				this.cleanupAutoPositioning = undefined;
			}
		}
		getDocument().removeEventListener('keyup', this.hideTooltipByEscape);
	};

	private handleHideAnimationEnd = (): void => {
		if (this.tooltipElement /* SSR instanceof HTMLElement */) {
			this.tooltipElement.style.setProperty('display', 'none');
			this.tooltipElement.style.setProperty('opacity', '0');
			this.tooltipElement.style.removeProperty('animation-direction');
		}
	};

	private hideTooltipByEscape = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			this.hideTooltip();
		}
	};

	private handleMouseEnter = (): void => {
		this.hasMouseIn = true;
		this.showOrHideTooltip();
	};

	private handleMouseleave = (): void => {
		this.hasMouseIn = false;
		this.showOrHideTooltip();
	};

	private handleFocusIn = (): void => {
		this.hasFocusIn = true;
		this.showOrHideTooltip();
	};

	private handleFocusout = (): void => {
		this.hasFocusIn = false;
		this.showOrHideTooltip();
	};

	private addListeners = (el: Element): void => {
		el.addEventListener('mouseenter', this.handleMouseEnter);
		el.addEventListener('mouseleave', this.handleMouseleave);
		el.addEventListener('focusin', this.handleFocusIn);
		el.addEventListener('focusout', this.handleFocusout);
	};

	private removeListeners = (el: Element): void => {
		el.removeEventListener('mouseenter', this.handleMouseEnter);
		el.removeEventListener('mouseleave', this.handleMouseleave);
		el.removeEventListener('focusin', this.handleFocusIn);
		el.removeEventListener('focusout', this.handleFocusout);
	};

	private resyncListeners = (last?: Element | null, next?: Element | null, replacePreviousSibling = false): void => {
		if (last) {
			this.removeListeners(last);
		}
		if (next) {
			/**
			 * This makes the next element to the last element for the next resync cycle.
			 */
			if (replacePreviousSibling) {
				this.previousSibling = next;
			}
			this.addListeners(next);
		}
	};

	private catchTooltipElement = (el?: HTMLDivElement): void => {
		this.tooltipElement = el;
	};
	private catchArrowElement = (element?: HTMLDivElement): void => {
		this.arrowElement = element;
	};

	public render(): JSX.Element {
		return (
			<Host class="kol-tooltip-wc">
				{this.state._label !== '' && (
					<div class="tooltip-floating" ref={this.catchTooltipElement}>
						<div class="tooltip-area tooltip-arrow" ref={this.catchArrowElement} />
						<KolSpanWcTag class="tooltip-area tooltip-content" id={this.state._id} _badgeText={this._badgeText} _label={this.state._label}></KolSpanWcTag>
					</div>
				)}
			</Host>
		);
	}

	/**
	 * Defines the elements badge text.
	 */
	@Prop() public _badgeText?: BadgeTextPropType;

	/**
	 * Defines the alignment of the tooltip, popover or tabs in relation to the element.
	 */
	@Prop() public _align?: AlignPropType = 'top';

	/**
	 * Defines the internal ID of the primary component element.
	 */
	@Prop() public _id?: IdPropType;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	@State() public state: TooltipStates = {
		_align: 'top',
		_label: '', // ⚠ required
	};

	@Watch('_badgeText')
	public validateBadgeText(value?: BadgeTextPropType): void {
		validateBadgeText(this, value);
	}

	@Watch('_align')
	public validateAlign(value?: AlignPropType): void {
		validateAlign(this, value);
	}

	@Watch('_id')
	public validateId(value?: IdPropType): void {
		validateId(this, value);
	}

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	private overFocusTimeout?: ReturnType<typeof setTimeout>;

	private showOrHideTooltip = (): void => {
		clearTimeout(this.overFocusTimeout);
		this.overFocusTimeout = setTimeout(() => {
			if (this.hasMouseIn || this.hasFocusIn) {
				this.showTooltip();
			} else {
				this.hideTooltip();
			}
			// Timing Guidelines for Exposing Hidden Content: https://www.nngroup.com/articles/timing-exposing-content/
		}, 300);
	};

	public componentWillLoad(): void {
		this.validateBadgeText(this._badgeText);
		this.validateAlign(this._align);
		this.validateId(this._id);
		this.validateLabel(this._label);
	}

	private handleEventListeners(): void {
		this.resyncListeners(this.previousSibling, this.host?.previousElementSibling, true);
		this.resyncListeners(this.tooltipElement, this.tooltipElement);
	}

	public connectedCallback(): void {
		this.previousSibling = this.host?.previousElementSibling;
	}

	public componentDidRender(): void {
		this.handleEventListeners();
	}

	/**
	 * @see: components/abbr/component.tsx (componentDidLoad)
	 */
	public disconnectedCallback(): void {
		if (this.previousSibling /* SSR instanceof HTMLElement */) {
			this.removeListeners(this.previousSibling);
			this.previousSibling = undefined;
		}
		if (this.tooltipElement /* SSR instanceof HTMLElement */) {
			this.removeListeners(this.tooltipElement);
		}
		if (this.cleanupAutoPositioning) {
			this.cleanupAutoPositioning();
		}
	}
}
