import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { watchTooltipAlignment } from '../../types/button-link';
import { Alignment } from '../../types/props/alignment';
import { getDocument, nonce } from '../../utils/dev.utils';
import { watchString } from '../../utils/prop.validators';

/**
 * API
 */
type RequiredProps = {
	label: string;
};
type OptionalProps = {
	align: Alignment;
	id: string;
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
	// - eslint-disable-next-line @stencil/own-props-must-be-private
	public hydrated = false; // TODO: Why?!

	private hostElement?: HTMLElement | null = null;
	private readonly childElements: HTMLElement[] = [];
	private tooltipElement?: HTMLDivElement;
	private arrowElement?: HTMLDivElement;

	private alignTooltip = (): void => {
		const target = this.childElements[0];

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

	private catchHostElement = (element: HTMLElement | null): void => {
		this.hostElement = element;
		if (this.hostElement /* SSR instanceof HTMLElement */) {
			const previousSibling = this.hostElement.previousElementSibling;
			if (previousSibling /* SSR instanceof HTMLElement */) {
				previousSibling.removeEventListener('mouseover', this.showTooltip);
				previousSibling.addEventListener('mouseover', this.showTooltip);
				previousSibling.removeEventListener('focus', this.showTooltip);
				previousSibling.addEventListener('focus', this.showTooltip);
				previousSibling.removeEventListener('mouseout', this.hideTooltip);
				previousSibling.addEventListener('mouseout', this.hideTooltip);
				previousSibling.removeEventListener('blur', this.hideTooltip);
				previousSibling.addEventListener('blur', this.hideTooltip);
				this.childElements.push(previousSibling as HTMLElement);
			}
		}
	};

	private catchTooltipElement = (element?: HTMLDivElement): void => {
		this.tooltipElement = element;
	};
	private catchArrowElement = (element?: HTMLDivElement): void => {
		this.arrowElement = element;
	};

	public render(): JSX.Element {
		const timeout = setTimeout(() => {
			clearTimeout(timeout);
			this.alignTooltip();
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
	@Prop() public _id?: string;

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

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateAlign(this._align);
		this.validateId(this._id);
		this.validateLabel(this._label);
		this.hydrated = true;
	}
}
