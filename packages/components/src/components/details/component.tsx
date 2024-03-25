import { Component, Element, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { LabelPropType, validateLabel } from '../../types/props/label';
import { validateOpen } from '../../types/props/open';
import { tryToDispatchKoliBriEvent } from '../../utils/events';
import { setState } from '../../utils/prop.validators';
import DetailsAnimationController from './DetailsAnimationController';
import { API, EventCallbacks, States } from './types';
import { propagateFocus } from '../../utils/reuse';
import { KolIconTag, KolIndentedTextTag } from '../../core/component-names';

/**
 * @slot - Der Inhalt, der in der Detailbeschreibung angezeigt wird.
 */
@Component({
	tag: 'kol-details',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolDetails implements API {
	@Element() private readonly host?: HTMLKolDetailsElement;
	private detailsElement?: HTMLDetailsElement;
	private summaryElement?: HTMLElement;
	private contentElement?: HTMLElement;

	private readonly catchRef = (ref?: HTMLElement) => {
		this.summaryElement = ref;
		propagateFocus(this.host, this.summaryElement);
	};

	public render(): JSX.Element {
		return (
			<Host class="kol-details">
				<details
					ref={(el) => {
						this.detailsElement = el as HTMLDetailsElement;
					}}
					onToggle={this.handleToggle}
				>
					<summary ref={this.catchRef}>
						{this.state._open ? (
							<KolIconTag _label="" _icons="codicon codicon-chevron-down" />
						) : (
							<KolIconTag _label="" _icons="codicon codicon-chevron-right" />
						)}
						<span>{this.state._label}</span>
					</summary>
					<div aria-hidden={this.state._open === false ? 'true' : undefined} class="content" ref={(element) => (this.contentElement = element)}>
						<KolIndentedTextTag>
							<slot />
						</KolIndentedTextTag>
					</div>
				</details>
			</Host>
		);
	}

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label?: LabelPropType;

	/**
	 * Defines the callback functions for details.
	 */
	@Prop() public _on?: EventCallbacks;

	/**
	 * If set (to true) opens/expands the element, closes if not set (or set to false).
	 * @TODO: Change type back to `OpenPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _open?: boolean = false;

	/**
	 * Deprecated: Gibt die Zusammenfassung der Detailbeschreibung an.
	 * @deprecated Use _label.
	 */
	@Prop() public _summary?: string;

	@State() public state: States = {
		_label: '…', // ⚠ required
		_on: {},
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	@Watch('_on')
	public validateOn(on?: EventCallbacks) {
		if (typeof on === 'object' && on !== null && typeof on.onToggle === 'function') {
			setState<EventCallbacks>(this, '_on', on);
		}
	}

	@Watch('_open')
	public validateOpen(value?: boolean): void {
		validateOpen(this, value);
	}

	@Watch('_summary')
	public validateSummary(value?: string): void {
		this.validateLabel(value);
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label || this._summary);
		this.validateOn(this._on);
		this.validateOpen(this._open);
	}

	public componentDidLoad() {
		if (this.detailsElement && this.summaryElement && this.contentElement) {
			const animationController = new DetailsAnimationController(this.detailsElement, this.summaryElement, this.contentElement);
			if (this.state._open) {
				animationController.open();
			}
		}
	}

	private toggleTimeout?: ReturnType<typeof setTimeout>;

	private handleToggle = (event: Event) => {
		clearTimeout(this.toggleTimeout);
		this.toggleTimeout = setTimeout(() => {
			const open = Boolean(this.detailsElement?.open);
			if (open !== this.state._open) {
				// Update state
				this._open = Boolean(this.detailsElement?.open);

				// Event handling
				tryToDispatchKoliBriEvent('toggle', this.host, this._open);

				// Callback
				if (typeof this.state._on?.onToggle === 'function') {
					this.state._on?.onToggle(event, this._open);
				}
			}
		}, 25);
	};
}
