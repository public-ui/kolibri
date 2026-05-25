import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { KolCardWcTag } from '../../core/component-names';
import type {
	AlignPropType,
	DrawerAPI,
	DrawerStates,
	HasCloserPropType,
	HeadingLevel,
	KoliBriModalEventCallbacks,
	LabelPropType,
	OpenPropType,
} from '../../schema';
import { setState, validateAlign, validateHasCloser, validateLabel, validateOpen } from '../../schema';
import clsx from '../../utils/clsx';
import { createUniqueId } from '../../utils/dev.utils';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import { handleCancelOverlay } from '../../utils/tooltip-open-tracking';
import { watchHeadingLevel } from '../heading/validation';

/**
 * @slot - The Content of drawer.
 */
@Component({
	tag: 'kol-drawer',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolDrawer implements DrawerAPI {
	@Element() private readonly host?: HTMLKolDetailsElement;
	private dialogElement?: HTMLDialogElement;
	private dialogWrapperElement?: HTMLKolCardWcElement;
	private readonly cardHeadingId = createUniqueId('drawer-heading');

	@State() private isModal: boolean = true;

	/**
	 * Opens the drawer. Pass true to open as a modal drawer.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async show(modal: boolean = false): Promise<void> {
		if (this.dialogElement?.open) {
			return;
		}
		this.isModal = modal;
		this.state = {
			...this.state,
			_open: true,
		};
		if (modal) {
			this.dialogElement?.showModal?.();
		} else {
			this.dialogElement?.show?.();
		}
		this._on?.onToggle?.(true);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.toggle);
		}
	}

	/**
	 * Opens the drawer as a modal.
	 */
	@Method()
	public showModal(): Promise<void> {
		return this.show(true);
	}

	/**
	 * Opens the drawer.
	 * @deprecated Use show() or showModal() instead.
	 */
	@Method()
	public open(): Promise<void> {
		return this.show(false);
	}

	/**
	 * Closes the drawer.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async close(): Promise<void> {
		this.state = {
			...this.state,
			_open: false,
		};
		const wrapper = this.dialogWrapperElement;
		if (!wrapper) {
			return;
		}
		if (window.getComputedStyle(wrapper).animationName === 'none') {
			this.dialogElement?.close?.();
		}
	}

	private readonly _cardOn = { onClose: () => void this.close() };

	private getWrapperRef = (el: HTMLKolCardWcElement | undefined) => (this.dialogWrapperElement = el as HTMLKolCardWcElement);
	private renderDialogContent() {
		const align = this.state._align as string;
		return (
			<KolCardWcTag
				ref={this.getWrapperRef}
				class={clsx(`kol-drawer__wrapper`, `kol-drawer__wrapper--${align}`, {
					'kol-drawer__wrapper--open': this.state._open,
					'kol-drawer__wrapper--is-closing': this.state._open === false,
				})}
				_hasCloser={this.state._hasCloser}
				_headingId={this.cardHeadingId}
				_label={this.state._label}
				_level={this._level}
				_on={this._cardOn}
			>
				<div class="kol-drawer__content">
					<slot />
				</div>
			</KolCardWcTag>
		);
	}

	private getRef = (el: HTMLDialogElement | undefined) => {
		this.dialogElement = el as HTMLDialogElement;
		setTimeout(() => {
			void this.openOrCloseBasedOnState(); // handle initial state as soon as element is ready
		});
	};
	public render(): JSX.Element {
		return (
			<Host class="kol-drawer">
				<dialog
					aria-labelledby={this.cardHeadingId}
					aria-modal={this.isModal ? 'true' : 'false'}
					class="kol-drawer__dialog"
					onCancel={this.handleCancelEvent}
					ref={this.getRef}
				>
					{this.renderDialogContent()}
				</dialog>
			</Host>
		);
	}

	/**
	 * Opens/expands the element when truthy, closes/collapses when falsy.
	 */
	@Prop() public _open?: OpenPropType;

	/**
	 * Defines the visual orientation of the component.
	 */
	@Prop() public _align?: AlignPropType;

	/**
	 * Defines whether the element can be closed.
	 * @TODO: Change type back to `HasCloserPropType` after Stencil#4663 has been resolved.
	 */
	@Prop() public _hasCloser?: boolean = false;

	/**
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

	/**
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 0;

	/**
	 * Specifies the EventCallback function to be called when the drawer is closing.
	 */
	@Prop() public _on?: KoliBriModalEventCallbacks;

	@State() public state: DrawerStates = {
		_label: '', // ⚠ required
		_open: false,
		_align: 'left',
	};

	@Watch('_label')
	public validateLabel(value?: LabelPropType): void {
		validateLabel(this, value, {
			required: true,
		});
	}

	@Watch('_align')
	public validateAlign(value?: AlignPropType): void {
		validateAlign(this, value);
	}

	@Watch('_hasCloser')
	public validateHasCloser(value?: HasCloserPropType): void {
		validateHasCloser(this, value);
	}

	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	@Watch('_open')
	public validateOpen(value?: OpenPropType) {
		if (typeof value === 'boolean') {
			validateOpen(this, value);

			if (this.dialogElement) {
				// handle property changes but not the initial validateOpen call
				void this.openOrCloseBasedOnState();
			}
		}
	}

	private async openOrCloseBasedOnState() {
		if (this.state._open) {
			await this.show(this.isModal);
		} else {
			await this.close();
		}
	}

	@Watch('_on')
	public validateOn(value?: KoliBriModalEventCallbacks): void {
		if (typeof value === 'object' && value !== null) {
			const callbacks: KoliBriModalEventCallbacks = {};
			if (typeof value.onCancel === 'function') {
				callbacks.onCancel = value.onCancel;
			}
			if (typeof value.onClose === 'function') {
				callbacks.onClose = value.onClose;
			}
			if (typeof value.onToggle === 'function') {
				callbacks.onToggle = value.onToggle;
			}
			setState<KoliBriModalEventCallbacks>(this, '_on', callbacks);
		}
	}

	private handleCancelEvent = (event: Event): void => {
		handleCancelOverlay(event);
		if (event.defaultPrevented) return;

		this.state._on?.onCancel?.(event);
		if (event.defaultPrevented) return;

		if (this.host && !dispatchDomEvent(this.host, KolEvent.cancel)) {
			event.preventDefault();
		}
	};

	private handleCloseDialog() {
		this._on?.onClose?.();
		this._on?.onToggle?.(false);
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.close);
			dispatchDomEvent(this.host, KolEvent.toggle);
		}
	}

	private readonly handleClose = () => {
		void (async () => {
			await this.close();
			this.handleCloseDialog();
		})();
	};

	private readonly handleAnimationEnd = (e: Event): void => {
		const animationEvent = e as AnimationEvent;
		if (animationEvent.animationName.includes('slideOut')) {
			this.dialogElement?.close?.();
		}
	};

	public componentDidLoad(): void {
		this.dialogElement?.addEventListener('animationend', this.handleAnimationEnd);
		this.dialogElement?.addEventListener('close', this.handleClose);
	}

	public disconnectedCallback(): void {
		this.dialogElement?.removeEventListener('animationend', this.handleAnimationEnd);
		this.dialogElement?.removeEventListener('close', this.handleClose);
	}

	public componentWillLoad() {
		this.validateAlign(this._align);
		this.validateHasCloser(this._hasCloser);
		this.validateLabel(this._label);
		this.validateOpen(this._open);
		this.validateLevel(this._level);
		this.validateOn(this._on);
	}
}
