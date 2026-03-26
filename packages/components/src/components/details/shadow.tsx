import { Component, Element, h, type JSX, Method, Prop, State, Watch } from '@stencil/core';
import KolCollapsibleFc, { type CollapsibleProps } from '../../functional-components/Collapsible';
import type { DetailsAPI, DetailsCallbacksPropType, DetailsStates, DisabledPropType, FocusableElement, HeadingLevel, LabelPropType } from '../../schema';
import { validateDetailsCallbacks, validateDisabled, validateLabel, validateOpen } from '../../schema';
import { nonce } from '../../utils/dev.utils';
import { delegateFocus } from '../../utils/element-focus';
import { dispatchDomEvent, KolEvent } from '../../utils/events';
import { watchHeadingLevel } from '../heading/validation';

/**
 * The **Details** component allows additional information to be initially shown with a short introductory text,
 * which is only fully expanded after the user clicks on an arrow icon.
 *
 * By default, the **Details** component is displayed as a single-line layout element consisting of an arrow icon
 * followed by a short introductory text. The actual content is revealed below after clicking the header area. The arrow icon
 * changes its orientation from **_right_** to **_down_**.
 * The component can also be closed again to hide the content.
 *
 * @slot - The content displayed in the detail description.
 */
@Component({
	tag: 'kol-details',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolDetails implements DetailsAPI, FocusableElement {
	@Element() private readonly host?: HTMLKolDetailsElement;

	private readonly nonce = nonce();
	private buttonWcRef?: HTMLKolButtonWcElement;

	private readonly setButtonWcRef = (ref: HTMLKolButtonWcElement | null) => {
		this.buttonWcRef = ref || undefined;
	};

	/**
	 * Sets focus on the internal element.
	 */
	@Method()
	public async focus(): Promise<void> {
		return delegateFocus(this.host!, async () => this.buttonWcRef?.focus?.());
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
			if (this.host) {
				dispatchDomEvent(this.host, KolEvent.toggle, Boolean(this._open));
			}
			this.state._on?.onToggle?.(event, Boolean(this._open));
		}, 25);
	};

	public render(): JSX.Element {
		const { _open, _label, _disabled, _level } = this.state;

		const rootClass = 'kol-details';

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
				ref: this.setButtonWcRef,
				class: `${rootClass}__heading-button`,
				_icons: 'kolicon-chevron-right',
			},
			ContentProps: {
				class: `${rootClass}__content indented-text`,
				wrapperClass: `${rootClass}__wrapper`,
				animationClass: `${rootClass}__wrapper-animation`,
			},
		};

		return (
			<KolCollapsibleFc {...props}>
				<slot />
			</KolCollapsibleFc>
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
	 * Defines which H-level from 1-6 the heading has. 0 specifies no heading and is shown as bold text.
	 */
	@Prop() public _level?: HeadingLevel = 0;

	/**
	 * Defines the callback functions for details.
	 */
	@Prop() public _on?: DetailsCallbacksPropType<boolean>;

	/**
	 * Opens/expands the element when truthy, closes/collapses when falsy.
	 * @TODO: Change type back to `OpenPropType` after Stencil#4663 has been resolved.
	 */
	@Prop({ mutable: true, reflect: true }) public _open?: boolean = false;

	@State() public state: DetailsStates = {
		_label: '', // ⚠ required
		_level: 0,
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

	@Watch('_level')
	public validateLevel(value?: HeadingLevel): void {
		watchHeadingLevel(this, value);
	}

	@Watch('_on')
	public validateOn(on?: DetailsCallbacksPropType<boolean>) {
		validateDetailsCallbacks(this, on);
	}

	@Watch('_open')
	public validateOpen(value?: boolean): void {
		validateOpen(this, value);
	}

	public componentWillLoad(): void {
		this.validateDisabled(this._disabled);
		this.validateLabel(this._label);
		this.validateLevel(this._level);
		this.validateOn(this._on);
		this.validateOpen(this._open);
	}
}
