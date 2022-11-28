import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@public-ui/core';
import { watchTooltipAlignment } from '../../types/button-link';
import { getDocument, nonce } from '../../utils/dev.utils';
import { watchString } from '../../utils/prop.validators';

export type TooltipAlignment = 'top' | 'right' | 'bottom' | 'left';

/**
 * API
 */
type RequiredProps = {
	label: string;
};
type OptionalProps = {
	align: TooltipAlignment;
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
	private tooltipElement?: HTMLKolBadgeElement;

	private alignTooltip = (): void => {
		const target = this.childElements[0];

		// getBoundingClientRect is not defined in test suite
		if (process.env.NODE_ENV !== 'test') {
			const clientRect = target.getBoundingClientRect();

			if (this.tooltipElement instanceof HTMLElement) {
				switch (this.state._align) {
					case 'top':
					case 'bottom':
						this.tooltipElement.style.left = `${clientRect.left + target.offsetWidth / 2 - this.tooltipElement.offsetWidth / 2}px`;
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
	};

	private showTooltip = (): void => {
		if (this.tooltipElement instanceof HTMLElement) {
			this.tooltipElement.style.setProperty('display', 'block');
			getDocument().body.addEventListener('keyup', this.hideTooltipByEscape);
			this.alignTooltip();
			this.tooltipElement.style.setProperty('visibility', 'visible');
			document.addEventListener('scroll', this.alignTooltip);
		}
	};

	private hideTooltip = (): void => {
		if (this.tooltipElement instanceof HTMLElement) {
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
		if (this.hostElement instanceof HTMLElement) {
			const previousSibling = this.hostElement.previousElementSibling;
			if (previousSibling instanceof HTMLElement) {
				previousSibling.removeEventListener('mouseover', this.showTooltip);
				previousSibling.addEventListener('mouseover', this.showTooltip);
				previousSibling.removeEventListener('focus', this.showTooltip);
				previousSibling.addEventListener('focus', this.showTooltip);
				previousSibling.removeEventListener('mouseout', this.hideTooltip);
				previousSibling.addEventListener('mouseout', this.hideTooltip);
				previousSibling.removeEventListener('blur', this.hideTooltip);
				previousSibling.addEventListener('blur', this.hideTooltip);
				this.childElements.push(previousSibling);
			}
		}
	};

	private catchTooltipElement = (element?: HTMLKolBadgeElement): void => {
		this.tooltipElement = element;
	};

	public render(): JSX.Element {
		const timeout = setTimeout(() => {
			clearTimeout(timeout);
			this.alignTooltip();
		}, 250);
		return (
			<Host
				ref={this.catchHostElement}
				style={{
					maxWidth: '300px',
				}}
			>
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
	@Prop() public _align?: TooltipAlignment = 'top';

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
	public validateAlign(value?: TooltipAlignment): void {
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
