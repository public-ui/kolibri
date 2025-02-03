/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import type { AlignPropType, DrawerAPI, DrawerStates, KoliBriModalEventCallbacks, LabelPropType, OpenPropType } from '../../schema';
import { setState, validateAlign, validateLabel, validateOpen } from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import clsx from 'clsx';

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
	private dialogWrapperElement?: HTMLDivElement;

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	async open() {
		this.state = {
			...this.state,
			_open: true,
		};
		this.dialogElement?.showModal();
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	async close() {
		this.state = {
			...this.state,
			_open: false,
		};
		const wrapper = this.dialogWrapperElement;
		if (!wrapper) return;
		const computedStyle = window.getComputedStyle(wrapper);
		if (computedStyle.animationName === 'none') {
			this.handleCloseDialog();
		}
	}

	private getWrapperRef = (el: HTMLDivElement | undefined) => (this.dialogWrapperElement = el as HTMLDivElement);
	private renderDialogContent() {
		const align = this.state._align as string;
		return (
			<div
				ref={this.getWrapperRef}
				class={clsx(`kol-drawer__wrapper`, `kol-drawer__wrapper--${align}`, {
					'kol-drawer__wrapper--open': this.state._open,
					'kol-drawer__wrapper--is-closing': this.state._open === false,
				})}
				aria-label={this.state._label}
			>
				<div class="kol-drawer__content">
					<slot />
				</div>
			</div>
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
				<dialog class="kol-drawer__dialog" ref={this.getRef}>
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
	 * Defines the visible or semantic label of the component (e.g. aria-label, label, headline, caption, summary, etc.).
	 */
	@Prop() public _label!: LabelPropType;

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
			await this.open();
		} else {
			await this.close();
		}
	}

	@Watch('_on')
	public validateOn(value?: KoliBriModalEventCallbacks): void {
		if (typeof value === 'object' && value !== null) {
			const callbacks: KoliBriModalEventCallbacks = {};
			if (typeof value.onClose === 'function') {
				callbacks.onClose = value.onClose;
			}
			setState<KoliBriModalEventCallbacks>(this, '_on', callbacks);
		}
	}

	private handleCloseDialog() {
		this.dialogElement?.close();
		this._on?.onClose?.();
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.close);
		}
	}

	private handleClose() {
		void (async () => {
			await this.close();
			this.handleCloseDialog();
		})();
	}

	private handleAnimationEnd(e: Event): void {
		const animationEvent = e as AnimationEvent;
		if (animationEvent.animationName.includes('slideOut')) {
			this.handleCloseDialog();
		}
	}

	public componentDidLoad(): void {
		this.dialogElement?.addEventListener('animationend', this.handleAnimationEnd.bind(this));
		this.dialogElement?.addEventListener('close', this.handleClose.bind(this));
	}

	public disconnectedCallback(): void {
		this.dialogElement?.removeEventListener('animationend', this.handleAnimationEnd.bind(this));
		this.dialogElement?.removeEventListener('close', this.handleClose.bind(this));
	}

	public componentWillLoad() {
		this.validateLabel(this._label);
		this.validateOpen(this._open);
		this.validateAlign(this._align);
		this.validateOn(this._on);
	}
}
