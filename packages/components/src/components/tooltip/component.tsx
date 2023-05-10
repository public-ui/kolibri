import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { watchTooltipAlignment } from '../../types/button-link';
import { Alignment } from '../../types/props';
import { getDocument, nonce } from '../../utils/dev.utils';
import { watchString } from '../../utils/prop.validators';
import { processEnv } from '../../utils/reuse';

type RequiredProps = {
	id: string;
	label: string;
};
type OptionalProps = {
	align: Alignment;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps & OptionalProps;
type OptionalStates = unknown;
export type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-tooltip',
	styleUrls: {
		default: './style.css',
	},
	shadow: false,
})
export class KolTooltip implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	private previousSibling?: HTMLElement | null;
	private tooltipElement?: HTMLDivElement;
	private arrowElement?: HTMLDivElement;

	private alignTooltip = (cb?: () => void): void => {
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
				const oldPos = {
					left: tooltipEl.style.left,
					top: tooltipEl.style.top,
				};
				Object.assign(tooltipEl.style, {
					left: `${x}px`,
					top: `${y}px`,
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
				if (oldPos.left !== tooltipEl.style.left || oldPos.top !== tooltipEl.style.top) {
					this.alignTooltip(cb);
				} else if (typeof cb === 'function') {
					cb();
				}
			});
		}
	};

	private showTooltip = (): void => {
		if (this.tooltipElement /* SSR instanceof HTMLElement */) {
			this.tooltipElement.style.setProperty('display', 'block');
			getDocument().body.addEventListener('keyup', this.hideTooltipByEscape);
			this.alignTooltip(() => {
				if (this.tooltipElement /* SSR instanceof HTMLElement */) {
					this.tooltipElement.style.setProperty('visibility', 'visible');
					document.addEventListener('scroll', this.showTooltip);
				}
			});
		}
	};

	private hideTooltip = (): void => {
		if (this.tooltipElement /* SSR instanceof HTMLElement */) {
			this.tooltipElement.style.setProperty('display', 'none');
			this.tooltipElement.style.setProperty('visibility', 'hidden');
			document.removeEventListener('scroll', this.showTooltip);
		}
	};

	private hideTooltipByEscape = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			getDocument().body.removeEventListener('keyup', this.hideTooltipByEscape);
			this.hideTooltip();
		}
	};

	private addListeners = (el: Element): void => {
		el.addEventListener('mouseover', this.showTooltip);
		el.addEventListener('focus', this.showTooltip);
		el.addEventListener('mouseout', this.hideTooltip);
		el.addEventListener('blur', this.hideTooltip);
	};

	private removeListeners = (el: Element): void => {
		el.removeEventListener('mouseover', this.showTooltip);
		el.removeEventListener('focus', this.showTooltip);
		el.removeEventListener('mouseout', this.hideTooltip);
		el.removeEventListener('blur', this.hideTooltip);
	};

	private resyncListeners = (el: Element): void => {
		this.removeListeners(el);
		this.addListeners(el);
	};

	private catchHostElement = (el: HTMLElement | null): void => {
		if (el) {
			this.previousSibling = el.previousElementSibling as HTMLElement | null;
			if (this.previousSibling) this.resyncListeners(this.previousSibling);
		}
	};

	private catchTooltipElement = (el?: HTMLDivElement): void => {
		this.tooltipElement = el;
		if (this.tooltipElement) this.resyncListeners(this.tooltipElement);
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
	@Prop() public _align?: Alignment = 'top';

	/**
	 * Gibt die ID an, wenn z.B. Aria-Labelledby (Link) verwendet wird.
	 */
	@Prop() public _id!: string;

	/**
	 * Setzt den Text in dem Tooltip beim Fokussieren oder Maus-drüberfahren angezeigt wird.
	 */
	@Prop() public _label!: string;

	@State() public state: States = {
		_align: 'top',
		_id: nonce(),
		_label: '…', // ⚠ required
	};

	@Watch('_align')
	public validateAlign(value?: Alignment): void {
		watchTooltipAlignment(this, '_align', value);
	}

	@Watch('_id')
	public validateId(value?: string): void {
		watchString(this, '_id', value);
	}

	@Watch('_label')
	public validateLabel(value?: string): void {
		watchString(this, '_label', value);
	}

	public componentWillLoad(): void {
		this.validateAlign(this._align);
		this.validateId(this._id);
		this.validateLabel(this._label);
	}

	public connectedCallback(): void {
		if (this.previousSibling) this.resyncListeners(this.previousSibling);
		if (this.tooltipElement) this.resyncListeners(this.tooltipElement);
	}

	public disconnectedCallback(): void {
		if (this.previousSibling) this.removeListeners(this.previousSibling);
		if (this.tooltipElement) this.removeListeners(this.tooltipElement);
		setTimeout(this.hideTooltip);
	}
}
