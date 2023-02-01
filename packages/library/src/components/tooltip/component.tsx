import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { watchTooltipAlignment } from '../../types/button-link';
import { Alignment } from '../../types/props/alignment';
import { getDocument, nonce } from '../../utils/dev.utils';
import { watchString } from '../../utils/prop.validators';
import { smartSetTimeout } from '../../utils/reuse';

/**
 * API
 */
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
		default: './style.sass',
	},
	shadow: false,
})
export class KolTooltip implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	private previousSibling?: HTMLElement | null;
	private tooltipElement?: HTMLDivElement;
	private arrowElement?: HTMLDivElement;

	private alignTooltip = (): void => {
		if (this.previousSibling /* SSR instanceof HTMLElement */) {
			const target = this.previousSibling;
			if (this.tooltipElement /* SSR instanceof HTMLElement */) {
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
		}
	};

	private showTooltip = (): void => {
		if (this.tooltipElement /* SSR instanceof HTMLElement */) {
			this.tooltipElement.style.setProperty('display', 'block');
			getDocument().body.addEventListener('keyup', this.hideTooltipByEscape);
			this.alignTooltip();
			this.tooltipElement.style.setProperty('visibility', 'visible');
			document.addEventListener('scroll', this.alignTooltip);
		}
	};

	private hideTooltip = (): void => {
		if (this.tooltipElement /* SSR instanceof HTMLElement */) {
			this.tooltipElement.style.setProperty('display', 'none');
			this.tooltipElement.style.setProperty('visibility', 'hidden');
			document.removeEventListener('scroll', this.alignTooltip);
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
		smartSetTimeout(() => {
			this.alignTooltip();
			smartSetTimeout(this.alignTooltip, 750);
		}, 250);
		return (
			<Host ref={this.catchHostElement}>
				{this.state._label !== '' && (
					<div id="floating" ref={this.catchTooltipElement}>
						<div id="arrow" ref={this.catchArrowElement} />
						<kol-badge
							id={this.state._id}
							_color={{
								backgroundColor: '#333',
								color: '#ddd',
							}}
							_label={this.state._label}
						></kol-badge>
					</div>
				)}
			</Host>
		);
	}

	/**
	 * Gibt an, ob der Tooltip oben, rechts, unten oder links angezeigt werden soll.
	 */
	@Prop() public _align?: Alignment = 'top';

	/**
	 * Gibt die ID an, wenn z.B. Aria-Labelledby (Link) verwendet wird.
	 */
	@Prop() public _id!: string;

	/**
	 * Das Label gibt an, welcher Text in dem Tooltip beim Fokussieren oder Maus-drüberfahren angezeigt wird.
	 */
	@Prop() public _label!: string;

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {
		_align: 'top',
		_id: nonce(),
		_label: '',
	};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_align')
	public validateAlign(value?: Alignment): void {
		watchTooltipAlignment(this, '_align', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_id')
	public validateId(value?: string): void {
		watchString(this, '_id', value);
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_label')
	public validateLabel(value?: string): void {
		watchString(this, '_label', value);
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

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
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
	}
}
