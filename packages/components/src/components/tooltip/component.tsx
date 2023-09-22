import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { AlignPropType, validateAlign } from '../../types/props/align';
import { IdPropType, validateId } from '../../types/props/id';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { getDocument, nonce } from '../../utils/dev.utils';
import { hideOverlay, showOverlay } from '../../utils/overlay';
import { processEnv } from '../../utils/reuse';
import { API, States } from './types';

@Component({
	tag: 'kol-tooltip-wc',
	styleUrl: './style.css',
	shadow: false,
})
export class KolTooltip implements API {
	@Element() private host!: HTMLKolTooltipWcElement;

	private arrowElement?: HTMLDivElement;
	private previousSibling?: Element | null;
	private tooltipElement?: HTMLDivElement;

	private cleanupAutoPositioning?: () => void;

	private alignTooltip = (): void => {
		if (processEnv !== 'test' && this.previousSibling /* SSR instanceof HTMLElement */ && this.tooltipElement /* SSR instanceof HTMLElement */) {
			const target = this.previousSibling;
			const tooltipEl = this.tooltipElement;
			const arrowEl = this.arrowElement;

			const middleware = [offset(arrowEl?.offsetHeight ?? 10), flip(), shift()];
			if (arrowEl) {
				middleware.push(arrow({ element: arrowEl }));
			}

			void computePosition(target, tooltipEl, {
				placement: this.state._align,
				middleware: middleware,
			}).then(({ x, y, middlewareData, placement }) => {
				Object.assign(tooltipEl.style, {
					left: `${x}px`,
					top: `${y}px`,
					visibility: 'visible',
				});

				if (arrowEl) {
					if (middlewareData.arrow?.x) {
						Object.assign(arrowEl.style, {
							left: `${middlewareData.arrow.x}px`,
							top: placement === 'bottom' ? `${-arrowEl.offsetHeight / 2}px` : '',
							bottom: placement === 'top' ? `${-arrowEl.offsetHeight / 2}px` : '',
						});
					} else if (middlewareData.arrow?.y) {
						Object.assign(arrowEl.style, {
							left: placement === 'right' ? `${-arrowEl.offsetWidth / 2}px` : '',
							right: placement === 'left' ? `${-arrowEl.offsetWidth / 2}px` : '',
							top: `${middlewareData.arrow.y}px`,
						});
					}
				}
			});
		}
	};

	private showTooltip = (): void => {
		if (this.previousSibling && this.tooltipElement /* SSR instanceof HTMLElement */) {
			showOverlay(this.tooltipElement);
			this.tooltipElement.style.setProperty('display', 'block');
			getDocument().body.addEventListener('keyup', this.hideTooltipByEscape);

			const target = this.previousSibling;
			const tooltipEl = this.tooltipElement;
			this.cleanupAutoPositioning = autoUpdate(target, tooltipEl, this.alignTooltip);
		}
	};

	private hideTooltip = (): void => {
		if (this.tooltipElement /* SSR instanceof HTMLElement */) {
			hideOverlay(this.tooltipElement);
			this.tooltipElement.style.setProperty('display', 'none');
			this.tooltipElement.style.setProperty('visibility', 'hidden');
			if (this.cleanupAutoPositioning) {
				this.cleanupAutoPositioning();
				this.cleanupAutoPositioning = undefined;
			}
		}
	};

	private hideTooltipByEscape = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			getDocument().body.removeEventListener('keyup', this.hideTooltipByEscape);
			this.hideTooltip();
		}
	};

	private addListeners = (el: Element): void => {
		el.addEventListener('mouseover', this.incrementOverFocusCount);
		el.addEventListener('focus', this.incrementOverFocusCount);
		el.addEventListener('focusin', this.incrementOverFocusCount);
		el.addEventListener('mouseout', this.decrementOverFocusCount);
		el.addEventListener('blur', this.decrementOverFocusCount);
		el.addEventListener('focusout', this.decrementOverFocusCount);
	};

	private removeListeners = (el: Element): void => {
		el.removeEventListener('mouseover', this.incrementOverFocusCount);
		el.removeEventListener('focus', this.incrementOverFocusCount);
		el.removeEventListener('focusin', this.incrementOverFocusCount);
		el.removeEventListener('mouseout', this.decrementOverFocusCount);
		el.removeEventListener('blur', this.decrementOverFocusCount);
		el.addEventListener('focusout', this.decrementOverFocusCount);
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
			<Host>
				{this.state._label !== '' && (
					<div class="tooltip-floating" ref={this.catchTooltipElement}>
						<div class="tooltip-area tooltip-arrow" ref={this.catchArrowElement} />
						<kol-span-wc class="tooltip-area tooltip-content" id={this.state._id} _label={this.state._label}>
							<slot name="expert" slot="expert"></slot>
						</kol-span-wc>
					</div>
				)}
			</Host>
		);
	}

	/**
	 * Defines the alignment of the tooltip in relation to the parent element.
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

	@State() public state: States = {
		_align: 'top',
		_id: nonce(),
		_label: '…', // ⚠ required
	};

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
		validateLabel(this, value);
	}

	private overFocusCount = 0;
	private overFocusTimeout?: ReturnType<typeof setTimeout>;

	private incrementOverFocusCount = (): void => {
		this.overFocusCount++;
		this.showOrHideTooltip();
	};

	private decrementOverFocusCount = (): void => {
		this.overFocusCount--;
		this.showOrHideTooltip();
	};

	private showOrHideTooltip = (): void => {
		clearTimeout(this.overFocusTimeout);
		this.overFocusTimeout = setTimeout(() => {
			clearTimeout(this.overFocusTimeout);
			if (this.overFocusCount > 0) {
				this.showTooltip();
			} else {
				this.hideTooltip();
			}
		}, 250);
	};

	public componentWillLoad(): void {
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
		this.handleEventListeners();
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
