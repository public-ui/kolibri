import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { getDocument } from '../../utils/dev.utils';
import { processEnv } from '../../utils/reuse';
import { Alignment, PropAlignment, validateAlignment } from '../../types/props';

type RequiredProps = unknown;
type OptionalProps = PropAlignment;

type RequiredStates = PropAlignment;
type OptionalStates = unknown;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

type API = Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-popover',
	styleUrls: {
		default: './style.css',
	},
	shadow: false,
})
export class KolPopover implements API {
	private previousSibling?: HTMLElement | null;
	private popoverElement?: HTMLDivElement;
	private arrowElement?: HTMLDivElement;

	private alignPopover = (cb?: () => void): void => {
		if (processEnv !== 'test') {
			if (this.previousSibling) {
				const target = this.previousSibling;
				if (this.popoverElement) {
					const popoverEl = this.popoverElement;
					const arrowEl = this.arrowElement;

					const middleware = [offset(arrowEl?.offsetHeight ?? 10), flip(), shift()];
					if (arrowEl) {
						middleware.push(arrow({ element: arrowEl }));
					}

					void computePosition(target, popoverEl, {
						placement: this.state._align,
						middleware: middleware,
					}).then(({ x, y, middlewareData, placement }) => {
						const oldPos = {
							left: popoverEl.style.left,
							top: popoverEl.style.top,
						};
						Object.assign(popoverEl.style, {
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
						if (oldPos.left !== popoverEl.style.left || oldPos.top !== popoverEl.style.top) {
							this.alignPopover(cb);
						} else if (typeof cb === 'function') {
							cb();
						}
					});
				}
			}
		}
	};

	private showPopover = (): void => {
		if (this.popoverElement) {
			this.popoverElement.style.setProperty('display', 'block');
			getDocument().body.addEventListener('keyup', this.hidePopoverByEscape);
			this.alignPopover(() => {
				if (this.popoverElement) {
					this.popoverElement.style.setProperty('visibility', 'visible');
					document.addEventListener('scroll', this.showPopover, { passive: true });
				}
			});
		}
	};

	private hidePopover = (): void => {
		if (this.popoverElement) {
			this.popoverElement.style.setProperty('display', 'none');
			this.popoverElement.style.setProperty('visibility', 'hidden');
			document.removeEventListener('scroll', this.showPopover);
		}
	};

	private hidePopoverByEscape = (event: KeyboardEvent): void => {
		if (event.key === 'Escape') {
			getDocument().body.removeEventListener('keyup', this.hidePopoverByEscape);
			this.hidePopover();
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
		if (el) {
			this.previousSibling = el.previousElementSibling as HTMLElement | null;
			if (this.previousSibling) {
				this.resyncListeners(this.previousSibling);
			}
		}
	};

	private catchPopoverElement = (el?: HTMLDivElement): void => {
		this.popoverElement = el;
		if (this.popoverElement) {
			this.resyncListeners(this.popoverElement);
		}
	};
	private catchArrowElement = (element?: HTMLDivElement): void => {
		this.arrowElement = element;
	};

	public render(): JSX.Element {
		return (
			<Host ref={this.catchHostElement}>
				<div id="floating" ref={this.catchPopoverElement}>
					<slot />
				</div>
			</Host>
		);
	}

	/**
	 * Setzt die Ausrichtung des Popovers in Relation zum Elternelement.
	 */
	@Prop() public _align?: Alignment = 'top';

	@State() public state: States = {
		_alignment: 'top',
	};

	@Watch('_alignment')
	public validateAlignment(value?: Alignment): void {
		validateAlignment(this, value);
	}

	private overFocusCount = 0;
	private overFocusTimeout?: ReturnType<typeof setTimeout>;

	private incrementOverFocusCount = (): void => {
		this.overFocusCount++;
		this.showOrHidePopover();
	};

	private decrementOverFocusCount = (): void => {
		this.overFocusCount--;
		this.showOrHidePopover();
	};

	private showOrHidePopover = (): void => {
		clearTimeout(this.overFocusTimeout);
		this.overFocusTimeout = setTimeout(() => {
			if (this.overFocusCount > 0) this.showPopover();
			else this.hidePopover();
		}, 250);
	};

	public componentWillLoad(): void {
		this.validateAlign(this._align);
	}

	/**
	 * @see: components/abbr/component.tsx (componentDidLoad)
	 */
	public disconnectedCallback(): void {
		if (this.previousSibling) {
			this.removeListeners(this.previousSibling);
		}
		if (this.popoverElement) {
			this.removeListeners(this.popoverElement);
		}
	}
}
