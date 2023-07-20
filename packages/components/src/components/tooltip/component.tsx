import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { watchTooltipAlignment } from '../../types/button-link';
import { Align } from '../../types/props/align';
import { LabelPropType, validateLabel } from '../../types/props/label';
import { getDocument, nonce } from '../../utils/dev.utils';
import { hideOverlay, showOverlay } from '../../utils/overlay';
import { watchString } from '../../utils/prop.validators';
import { processEnv } from '../../utils/reuse';
import { KoliBriTooltipAPI, KoliBriTooltipStates } from './types';

@Component({
	tag: 'kol-tooltip',
	styleUrl: './style.css',
	shadow: false,
})
export class KolTooltip implements KoliBriTooltipAPI {
	private previousSibling?: HTMLElement | null;
	private tooltipElement?: HTMLDivElement;
	private arrowElement?: HTMLDivElement;
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
		el.addEventListener('mouseout', this.decrementOverFocusCount);
		el.addEventListener('blur', this.decrementOverFocusCount);
	};

	private removeListeners = (el: Element): void => {
		el.removeEventListener('mouseover', this.incrementOverFocusCount);
		el.removeEventListener('focus', this.incrementOverFocusCount);
		el.removeEventListener('mouseout', this.decrementOverFocusCount);
		el.removeEventListener('blur', this.decrementOverFocusCount);
	};

	private resyncListeners = (el: Element): void => {
		this.removeListeners(el);
		this.addListeners(el);
	};

	private catchHostElement = (el: HTMLElement | null): void => {
		if (el /* SSR instanceof HTMLElement */) {
			this.previousSibling = el.previousElementSibling as HTMLElement | null;
			if (this.previousSibling /* SSR instanceof HTMLElement */) {
				this.resyncListeners(this.previousSibling);
			}
		}
	};

	private catchTooltipElement = (el?: HTMLDivElement): void => {
		this.tooltipElement = el;
		if (this.tooltipElement /* SSR instanceof HTMLElement */) {
			this.resyncListeners(this.tooltipElement);
		}
	};
	private catchArrowElement = (element?: HTMLDivElement): void => {
		this.arrowElement = element;
	};

	public render(): JSX.Element {
		return (
			<Host ref={this.catchHostElement}>
				{this.state._label !== '' && (
					<div id="floating" ref={this.catchTooltipElement}>
						<div class="area" id="arrow" ref={this.catchArrowElement} />
						<kol-span-wc class="area" id={this.state._id} _label={this.state._label}></kol-span-wc>
					</div>
				)}
			</Host>
		);
	}

	/**
	 * Setzt die Ausrichtung des Tooltips in Relation zum Elternelement.
	 */
	@Prop() public _align?: Align = 'top';

	/**
	 * Gibt die interne ID des primären Elements in der Komponente an.
	 */
	@Prop() public _id!: string;

	/**
	 * Setzt die sichtbare oder semantische Beschriftung der Komponente (z.B. Aria-Label, Label, Headline, Caption, Summary usw.).
	 */
	@Prop() public _label!: LabelPropType;

	@State() public state: KoliBriTooltipStates = {
		_align: 'top',
		_id: nonce(),
		_label: '…', // ⚠ required
	};

	@Watch('_align')
	public validateAlign(value?: Align): void {
		watchTooltipAlignment(this, '_align', value);
	}

	@Watch('_id')
	public validateId(value?: string): void {
		watchString(this, '_id', value);
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

	/**
	 * @see: components/abbr/component.tsx (componentDidLoad)
	 */
	public disconnectedCallback(): void {
		if (this.previousSibling /* SSR instanceof HTMLElement */) {
			this.removeListeners(this.previousSibling);
		}
		if (this.tooltipElement /* SSR instanceof HTMLElement */) {
			this.removeListeners(this.tooltipElement);
		}
		if (this.cleanupAutoPositioning) {
			this.cleanupAutoPositioning();
		}
	}
}
