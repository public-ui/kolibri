import { autoUpdate } from '@floating-ui/dom';
import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import type { AlignPropType, BadgeTextPropType, IdPropType, LabelPropType, TooltipAPI, TooltipStates } from '../../schema';
import { getDocument, validateAlign, validateBadgeText, validateId, validateLabel } from '../../schema';

import { KolSpanFc } from '../../functional-components';
import { alignFloatingElements } from '../../utils/align-floating-elements';
import { hideOverlay, showOverlay } from '../../utils/overlay';
import { tooltipClosed, tooltipOpened } from '../../utils/tooltip-open-tracking';

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

	/**
	 * Prevents the tooltip from showing during the current interaction session.
	 * An "interaction session" (visit) is active while the user hovers over or focuses the trigger element.
	 *
	 * Behavior:
	 * - Set to true when hideTooltip() is called (e.g., via Escape key, click, or programmatically)
	 * - Remains true for the entire session, even if interaction type changes (e.g., from click to hover)
	 * - Reset to false when the session ends (user leaves the element completely)
	 * - Tooltip will show again on the next session unless manually hidden again
	 */
	private isHiddenForCurrentVisit = false;

	private cleanupAutoPositioning?: () => void;

	/**
	 * Checks if a new interaction session is starting (no prior hover or focus active).
	 */
	private isNewVisit(): boolean {
		return !this.hasMouseIn && !this.hasFocusIn;
	}

	/**
	 * Resets the hide flag when the interaction session ends.
	 */
	private resetHideFlag = (): void => {
		if (this.isNewVisit()) {
			this.isHiddenForCurrentVisit = false;
		}
	};

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
		if (this.isHiddenForCurrentVisit) {
			return;
		}
		if (this.previousSibling && this.tooltipElement /* SSR instanceof HTMLElement */) {
			showOverlay(this.tooltipElement);
			tooltipOpened();
			this.tooltipElement.classList.remove('hide');
			this.tooltipElement.classList.add('show');
			this.tooltipElement.style.setProperty('display', 'block');
			getDocument().addEventListener('keyup', this.hideTooltipByEscape, {
				once: true,
			});

			const target = this.previousSibling;
			const tooltipEl = this.tooltipElement;
			this.cleanupAutoPositioning = autoUpdate(target, tooltipEl, () => {
				void this.alignTooltip();
			});
		}
	};

	/**
	 * Hides the tooltip.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async hideTooltip() {
		this.isHiddenForCurrentVisit = true;

		if (this.tooltipElement /* SSR instanceof HTMLElement */) {
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

	private hideTooltipByEscape = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			void this.hideTooltip();
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

	private handleMouseleave = (event: Event): void => {
		this.hasMouseIn = this.tooltipElement?.contains((event as MouseEvent).relatedTarget as Node) ?? false;
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

	private handleFocusout = (): void => {
		this.hasFocusIn = false;
		this.resetHideFlag();
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
			<Host class="kol-tooltip">
				{this.state._label !== '' && (
					<div class="kol-tooltip__floating" ref={this.catchTooltipElement}>
						<div class="kol-tooltip__arrow" ref={this.catchArrowElement} />
						<KolSpanFc class="kol-tooltip__content" id={this.state._id} badgeText={this._badgeText} label={this.state._label} />
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
	 * @internal
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
				void this.hideTooltip();
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
		const nextSibling = this.host?.previousElementSibling ?? null;
		this.resyncListeners(this.previousSibling, nextSibling as Element, true);
		this.resyncListeners(this.tooltipElement, this.tooltipElement);
	}

	public connectedCallback(): void {
		this.previousSibling = this.host?.previousElementSibling ?? null;
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
