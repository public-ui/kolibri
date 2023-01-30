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
	private tooltipElement?: HTMLKolBadgeElement;

	private alignTooltip = (): void => {
		// getBoundingClientRect is not defined in test suite
		if (process.env.NODE_ENV !== 'test') {
			if (this.previousSibling /* SSR instanceof HTMLElement */) {
				const clientRect = this.previousSibling.getBoundingClientRect();
				if (this.tooltipElement /* SSR instanceof HTMLElement */) {
					switch (this.state._align) {
						case 'top':
						case 'bottom':
							this.tooltipElement.style.left = `${clientRect.left + this.previousSibling.offsetWidth / 2 - this.tooltipElement.offsetWidth / 2}px`;
							break;
						case 'left':
						case 'right':
						default:
							this.tooltipElement.style.top = `${clientRect.top + clientRect.height / 2 - this.tooltipElement.offsetHeight / 2}px`;
					}
					switch (this.state._align) {
						case 'left':
							this.tooltipElement.style.left = `calc(${clientRect.left - this.tooltipElement.offsetWidth}px - 0.5em)`;
							break;
						case 'right':
							this.tooltipElement.style.left = `calc(${clientRect.right}px + 0.5em)`;
							break;
						case 'bottom':
							this.tooltipElement.style.top = `calc(${clientRect.bottom}px + 0.5em)`;
							break;
						case 'top':
						default:
							this.tooltipElement.style.top = `calc(${clientRect.top - this.tooltipElement.offsetHeight}px - 0.5em)`;
					}
				}
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

	private catchTooltipElement = (el?: HTMLKolBadgeElement): void => {
		this.tooltipElement = el;
		if (this.tooltipElement /* SSR instanceof HTMLElement */) {
			this.resyncListeners(this.tooltipElement);
		}
	};

	public render(): JSX.Element {
		smartSetTimeout(() => {
			this.alignTooltip();
			smartSetTimeout(this.alignTooltip, 750);
		}, 250);
		return (
			<Host ref={this.catchHostElement}>
				{this.state._label !== '' && (
					<kol-badge
						class={{
							'arrow-bottom': this.state._align === 'top',
							'arrow-left': this.state._align === 'right',
							'arrow-top': this.state._align === 'bottom',
							'arrow-right': this.state._align === 'left',
						}}
						id={this.state._id}
						ref={this.catchTooltipElement}
						_color={{
							backgroundColor: '#333',
							color: '#ddd',
						}}
						_label={this.state._label}
					></kol-badge>
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
