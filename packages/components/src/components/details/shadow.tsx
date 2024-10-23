import type { DetailsAPI, DetailsStates, DisabledPropType, EventCallbacks, FocusableElement, LabelPropType } from '../../schema';
import { setState, validateDisabled, validateLabel, validateOpen } from '../../schema';
import type { JSX } from '@stencil/core';
import { Component, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import KolCollapsibleFc, { type CollapsibleProps } from '../../functional-components/Collapsible';
import { nonce } from '../../utils/dev.utils';

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
export class KolDetails implements DetailsAPI, FocusableElement {
	private readonly nonce = nonce();
	private buttonWcRef?: HTMLKolButtonWcElement;

	private readonly catchRef = (ref?: HTMLKolButtonWcElement) => {
		this.buttonWcRef = ref;
	};

	/**
	 * @deprecated Use kolFocus instead.
	 */
	@Method()
	public async focus() {
		await this.kolFocus();
	}

	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async kolFocus() {
		this.buttonWcRef?.focus();
	}

	private toggleTimeout?: ReturnType<typeof setTimeout>;

	private handleOnClick = (event: MouseEvent) => {
		this._open = !this._open;

		/**
		 * Der Timeout wird benötigt, damit das Event
		 * vom Button- auf das Accordion-Event wechselt.
		 * So ist es dem Anwendenden möglich das _open-
		 * Attribute abzufragen.
		 */

		clearTimeout(this.toggleTimeout);

		this.toggleTimeout = setTimeout(() => {
			//this.state._on?.onClick?.(event, this._open === true);

			// tryToDispatchKoliBriEvent('toggle', this.host, this._open);

			this.state._on?.onToggle?.(event, Boolean(this._open));
		}, 25);
	};

	public render(): JSX.Element {
		const { _open, _label, _disabled } = this.state;
		const _level = 1;

		const rootClass = 'details';

		const props: CollapsibleProps = {
			id: this.nonce,
			label: _label,
			open: _open,
			disabled: _disabled,
			level: _level,
			onClick: this.handleOnClick,
			class: rootClass,
			HeadingProps: { class: `${rootClass}__heading` },
			HeadingButtonProps: {
				ref: this.catchRef,
				class: `${rootClass}__heading-button`,
				_icons: 'codicon codicon-chevron-right',
			},
			ContentProps: {
				class: `${rootClass}__content indented-text`,
				wrapperClass: `${rootClass}__wrapper`,
				animationClass: `${rootClass}__wrapper-animation`,
			},
		};

		return (
			<Host class="kol-details">
				<KolCollapsibleFc {...props}>
					<slot />
				</KolCollapsibleFc>
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
}
