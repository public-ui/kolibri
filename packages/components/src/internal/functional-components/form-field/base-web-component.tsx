import type {
	FormFieldLabelInfoPopoverProps,
	InputTypeOnDefault,
	LabelWithExpertSlotPropType,
	MsgPropType,
	StencilUnknown,
	Stringified,
	TooltipAlignPropType,
} from '../../../schema';
import { buildBadgeTextString } from '../../../schema';
import { createRelatedUniqueId } from '../../../utils/dev.utils';
import { dispatchDomEvent, KolEvent } from '../../../utils/events';
import {
	ariaDetailsProp,
	disabledProp,
	hideLabelProp,
	hideMsgProp,
	hintProp,
	infoPopoverProp,
	inputCallbacksProp,
	labelWithExpertSlotProp,
	msgProp,
	nameProp,
	tooltipAlignProp,
	touchedProp,
} from '../../props';
import { BaseWebComponent } from '../base-web-component';
import type { FormAssociationType } from '../form-association/api';
import { FormAssociationBehavior } from '../form-association/behavior';
import { TooltipBehavior } from '../tooltip/behavior';
import type { FormFieldBaseApi } from './api';
import { getFormFieldAria } from './aria';
import { type FormFieldFCProps, isLabelShownAsTooltip } from './component';

type FormFieldExtras = Pick<FormFieldFCProps, 'counter' | 'maxLength' | 'readOnly' | 'renderNoLabel' | 'renderNoTooltip' | 'required'> & {
	/** Class of the field, e.g. `kol-input-color`, added to the `kol-form-field` root. */
	class: string;
	accessKey?: string;
	shortKey?: string;
	variant?: string[];
};

/**
 * Shared orchestrator implementation of the form fields: it applies the props every field has,
 * owns the form association and the label tooltip, and handles the events of the native control.
 *
 * The concrete element keeps what Stencil has to see in the component class itself (DD16):
 * `@Component`, `@Element`, `@State`, `@Method`, every `@Prop` with its `@Watch`, whose body calls
 * the matching `apply*` method, and the lifecycle methods.
 */
export abstract class BaseFormFieldWebComponent<Api extends FormFieldBaseApi> extends BaseWebComponent<Api> {
	/** The custom element; declared with `@Element()` by the concrete class. */
	protected abstract readonly host?: HTMLElement;

	/** Read at event time, like the native `disabled` state. */
	public abstract _disabled?: boolean;
	/** Read at event time, so a callback replaced after the last render is still called. */
	public abstract _on?: InputTypeOnDefault;
	/** Set to `true` once the focus leaves the field. */
	public abstract _touched?: boolean;

	protected formAssociation!: FormAssociationBehavior;

	private readonly tooltipBehavior = new TooltipBehavior(BaseWebComponent.stateLess);

	/**
	 * Whether the focus event of the current visit has been sent. It is reset only when the focus
	 * leaves the host of an enabled field; `inputHasFocus` is reset on every blur.
	 */
	private focusEventSent = false;

	/**
	 * `ResolvedProps<Api>` cannot be resolved for a generic `Api`, so `setRenderProp('label', …)` does
	 * not type-check here. The base props exist in every field API (`Api extends FormFieldBaseApi`),
	 * so this view on the same instance is typed with the base API instead.
	 */
	private get shared(): BaseFormFieldWebComponent<FormFieldBaseApi> {
		return this as unknown as BaseFormFieldWebComponent<FormFieldBaseApi>;
	}

	/**
	 * Creates the form association. Must be called from the concrete element's constructor (after
	 * `super()`): Stencil populates `@Element()` there, and the hidden form element depends on the
	 * name known at that point.
	 */
	protected initFormAssociation(type: FormAssociationType, name?: string): void {
		this.formAssociation = new FormAssociationBehavior(BaseWebComponent.stateLess, { host: this.host, type, name });
	}

	/** Call from `disconnectedCallback`. */
	protected destroyFormField(): void {
		this.tooltipBehavior.destroy();
	}

	// --- Prop application (the concrete element's watchers delegate here) ---

	protected applyAriaDetails(value?: string): void {
		ariaDetailsProp.apply(value, (v) => this.shared.setRenderProp('ariaDetails', v));
		this.formAssociation.watchAriaDetails(value);
	}

	protected applyDisabled(value?: boolean): void {
		disabledProp.apply(value, (v) => this.shared.setRenderProp('disabled', v));
	}

	protected applyHideLabel(value?: boolean): void {
		hideLabelProp.apply(value, (v) => this.shared.setRenderProp('hideLabel', v));
	}

	protected applyHideMsg(value?: boolean): void {
		hideMsgProp.apply(value, (v) => this.shared.setRenderProp('hideMsg', v));
	}

	protected applyHint(value?: string): void {
		hintProp.apply(value, (v) => this.shared.setRenderProp('hint', v));
	}

	protected applyInfoPopover(value?: FormFieldLabelInfoPopoverProps): void {
		infoPopoverProp.apply(value, (v) => this.shared.setRenderProp('infoPopover', v));
	}

	/** `false` enables the expert slot, which the field renders for an empty label. */
	protected applyLabel(value?: LabelWithExpertSlotPropType): void {
		const label: unknown = value;
		labelWithExpertSlotProp.apply(label === false ? '' : value, (v) => this.shared.setRenderProp('label', v));
	}

	protected applyMsg(value?: Stringified<MsgPropType>): void {
		msgProp.apply(value, (v) => this.shared.setRenderProp('msg', v));
	}

	protected applyName(value?: string): void {
		nameProp.apply(value, (v) => this.shared.setRenderProp('name', v));
		this.formAssociation.watchName(value);
	}

	protected applyOn(value?: InputTypeOnDefault): void {
		inputCallbacksProp.apply(value, (v) => this.shared.setRenderProp('on', v));
	}

	protected applySyncValueBySelector(value?: string): void {
		this.formAssociation.watchSyncValueBySelector(value);
	}

	/** Form fields show the tooltip on top by default; the shared prop defaults to `'right'`. */
	protected applyTooltipAlign(value?: TooltipAlignPropType): void {
		tooltipAlignProp.apply(value ?? 'top', (v) => this.shared.setRenderProp('tooltipAlign', v));
	}

	protected applyTouched(value?: boolean): void {
		touchedProp.apply(value, (v) => this.shared.setRenderProp('touched', v));
	}

	// --- Event handling of the native control ---

	/**
	 * The element that receives the KoliBri events and frames the focus of the field: the nearest host
	 * with a shadow root, as resolved by the form association. It is the field itself, unless the field
	 * renders without a shadow root inside another component (`kol-select-wc` in `kol-pagination`).
	 */
	private get eventHost(): Element | undefined {
		return this.formAssociation?.host ?? this.host;
	}

	private emit(type: KolEvent, value?: unknown): void {
		if (this.eventHost) {
			dispatchDomEvent(this.eventHost as HTMLElement, type, value);
		}
	}

	/** Dispatches the KoliBri event before the `_on` callback is called. */
	protected readonly handleChange = (event: Event, value?: unknown): void => {
		event.stopPropagation();
		if (typeof value === 'undefined') {
			value = (event.target as HTMLInputElement).value;
		}
		this.emit(KolEvent.change, value);
		this._on?.onChange?.(event, value);
	};

	protected readonly handleInput = (event: Event, value?: unknown): void => {
		event.stopPropagation();
		if (typeof value === 'undefined') {
			value = (event.target as HTMLInputElement).value;
		}
		this.emit(KolEvent.input, value);
		this.formAssociation.setFormAssociatedValue(value as StencilUnknown);
		this._on?.onInput?.(event, value);
	};

	protected readonly handleClick = (event: Event): void => {
		this.emit(KolEvent.click);
		this._on?.onClick?.(event);
	};

	protected readonly handleFocus = (event: FocusEvent): void => {
		if (!this.focusEventSent) {
			this.emit(KolEvent.focus);
			this._on?.onFocus?.(event);
			this.focusEventSent = true;
		}
		this.shared.setState('inputHasFocus', true);
	};

	protected readonly handleBlur = (event: FocusEvent): void => {
		this.handleFocusLeave(event);
		this.shared.setState('inputHasFocus', false);
	};

	/**
	 * Sends the blur when the focus leaves the field; focus moving to another element inside the field,
	 * e.g. the smart button, is no blur of the field. `handleBlur` also resets `inputHasFocus`.
	 */
	protected handleFocusLeave(event: FocusEvent): void {
		if (this._disabled) {
			return;
		}
		const host = this.eventHost;
		const root = host?.shadowRoot || host;
		const isFocusInside = root?.contains(event.relatedTarget as Node) || host === event.relatedTarget;
		if (this.focusEventSent && !isFocusInside) {
			this._touched = true;
			this.emit(KolEvent.blur);
			this._on?.onBlur?.(event);
			this.focusEventSent = false;
		}
	}

	protected readonly handleKeyDown = (event: KeyboardEvent): void => {
		this.emit(KolEvent.keydown);
		this._on?.onKeyDown?.(event);
	};

	// --- Render ---

	/** `aria-invalid` and `aria-describedby` of the native control. */
	protected getAria(): ReturnType<typeof getFormFieldAria> {
		const shared = this.shared;
		return getFormFieldAria({
			id: shared.getState('id'),
			msg: shared.getRenderProp('msg'),
			hint: shared.getRenderProp('hint'),
			touched: shared.getRenderProp('touched'),
			hideMsg: shared.getRenderProp('hideMsg'),
		});
	}

	/** A touched message is announced as alert only while the control does not have the focus. */
	private showAsAlert(): boolean {
		return Boolean(this.shared.getRenderProp('touched')) && !this.shared.getState('inputHasFocus');
	}

	private readonly setInputRef = (el?: HTMLDivElement): void => {
		if (el && this.isTooltipShown()) {
			this.tooltipBehavior.initContext(el);
			this.tooltipBehavior.syncListeners(undefined, el, true);
		}
	};

	private readonly setTooltipRef = (el?: HTMLDivElement): void => {
		this.tooltipBehavior.setTooltipElementRef(el);
	};

	private isTooltipShown(): boolean {
		const shared = this.shared;
		return isLabelShownAsTooltip({ hideLabel: shared.getRenderProp('hideLabel'), label: shared.getRenderProp('label') });
	}

	/**
	 * Refs of the label tooltip for a field that renders it in its `FieldControlFC` instead of the
	 * form field shell, together with `renderNoTooltip` for `getFormFieldProps`.
	 */
	protected getLabelTooltipRefs(): { refInput: (el?: HTMLDivElement) => void; refTooltip: (el?: HTMLDivElement) => void } {
		return { refInput: this.setInputRef, refTooltip: this.setTooltipRef };
	}

	/**
	 * Props of the form field shell around the native control. Call once per render: it also hands
	 * label, alignment and badge to the label tooltip, or tears it down while the label is visible.
	 * With `renderNoTooltip` the shell does not connect the tooltip; see `getLabelTooltipRefs`.
	 */
	protected getFormFieldProps({
		class: classNames,
		accessKey,
		shortKey,
		variant,
		counter,
		maxLength,
		readOnly,
		renderNoLabel,
		renderNoTooltip,
		required,
	}: FormFieldExtras): FormFieldFCProps {
		const shared = this.shared;
		const id = shared.getState('id');
		const label = shared.getRenderProp('label');
		const tooltipAlign = shared.getRenderProp('tooltipAlign');

		if (this.isTooltipShown()) {
			this.tooltipBehavior.watchAlign(tooltipAlign);
			this.tooltipBehavior.watchBadgeText(buildBadgeTextString(accessKey, shortKey) || '');
			this.tooltipBehavior.watchId(createRelatedUniqueId(id, 'label'));
			this.tooltipBehavior.watchLabel(label);
		} else {
			this.tooltipBehavior.destroy();
		}

		return {
			id,
			disabled: shared.getRenderProp('disabled'),
			msg: shared.getRenderProp('msg'),
			hint: shared.getRenderProp('hint'),
			label,
			hideLabel: shared.getRenderProp('hideLabel'),
			hideMsg: shared.getRenderProp('hideMsg'),
			touched: shared.getRenderProp('touched'),
			showBadge: Boolean(accessKey) || Boolean(shortKey),
			required,
			readOnly,
			accessKey,
			shortKey,
			maxLength,
			counter,
			variant,
			class: classNames,
			tooltipAlign,
			alert: this.showAsAlert(),
			infoPopover: shared.getRenderProp('infoPopover'),
			renderNoLabel,
			renderNoTooltip,
			refInput: renderNoTooltip ? undefined : this.setInputRef,
			refTooltip: this.setTooltipRef,
		};
	}
}
