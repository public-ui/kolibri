import type { DetailsAPI, DetailsStates, EventCallbacks, LabelPropType } from '@public-ui/schema';
import { propagateFocus, setState, validateLabel, validateOpen } from '@public-ui/schema';
import { Component, Element, Host, Prop, State, Watch, h } from '@stencil/core';

import { tryToDispatchKoliBriEvent } from '../../utils/events';
import { DetailsAnimationController } from './DetailsAnimationController';

import type { DisabledPropType } from '@public-ui/schema';
import { validateDisabled } from '@public-ui/schema';
import type { JSX } from '@stencil/core';
import { preventDefaultAndStopPropagation } from '../../utils/events';
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
export class KolDetails implements DetailsAPI {
	@Element() private readonly host?: HTMLKolDetailsElement;
	private detailsElement?: HTMLDetailsElement;
	private summaryElement?: HTMLElement;
	private contentElement?: HTMLElement;

	private readonly catchDetails = (ref?: HTMLElement) => {
		this.detailsElement = ref as HTMLDetailsElement;
	};

	private readonly catchSummary = (ref?: HTMLElement) => {
		this.summaryElement = ref;
		propagateFocus(this.host, this.summaryElement);
	};

	/**
	 * Handle disabled, because the toggle event is to late.
	 */
	private readonly preventToggleIfDisabled = (event: Event) => {
		if (this.state._disabled === true) {
			preventDefaultAndStopPropagation(event);
		}
	};

	public render(): JSX.Element {
		return (
			<Host>
				<details
					ref={this.catchDetails}
					class={{
						disabled: this.state._disabled === true,
						open: this.state._open === true,
					}}
					onToggle={this.handleToggle}
				>
					{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
					<summary
						ref={this.catchSummary}
						aria-disabled={this.state._disabled ? 'true' : undefined}
						onClick={this.preventToggleIfDisabled}
						onKeyPress={this.preventToggleIfDisabled}
						tabIndex={this.state._disabled ? -1 : undefined}
					>
						<KolIconTag _label="" _icons="codicon codicon-chevron-right" class={`icon ${this.state._open ? 'is-open' : ''}`} />
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
	 * Makes the element not focusable and ignore all events.
	 */
	@Prop() public _disabled?: boolean = false;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Defines the callback functions for details.
	 */
	@Prop() public _on?: EventCallbacks;

	/**
	 * If set (to true) opens/expands the element, closes if not set (or set to false).
	 * @TODO: Change type back to `OpenPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _open?: boolean = false;

	@State() public state: DetailsStates = {
		_label: '', // ⚠ required
		_on: {},
	};

	@Watch('_disabled')
	public validateDisabled(value?: DisabledPropType): void {
		validateDisabled(this, value);
	}

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

	public componentWillLoad(): void {
		this.validateDisabled(this._disabled);
		this.validateLabel(this._label);
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
