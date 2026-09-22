import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';

import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import type { FormApi } from '../../internal/functional-components/form/api';
import { formPropsConfig } from '../../internal/functional-components/form/api';
import { FormFC } from '../../internal/functional-components/form/component';
import type { FormErrorLinkItem } from '../../internal/functional-components/form/error-link-item';
import { createFormErrorLinkItem } from '../../internal/functional-components/form/error-link-item';
import { FormErrorListFC } from '../../internal/functional-components/form/error-list';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { errorListProp, formCallbacksProp, requiredTextProp } from '../../internal/props';
import type { ErrorListPropType, FormProps, KolFocusOptions, KoliBriFormCallbacks, Stringified } from '../../schema';
import { createUniqueId, nonce } from '../../utils/dev.utils';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

/**
 * Scroll options used when a caller does not pass any — the error list is reached by scrolling
 * the focused link into view, not by jumping to it.
 */
const SCROLL_OPTIONS_FALLBACK: KolFocusOptions = {
	behavior: 'smooth',
	block: 'nearest',
};

/**
 * Delay before the first error-list link is focused. The list is rendered in the same pass that
 * sets the errors, so the focus has to wait for the browser to lay it out.
 */
const FOCUS_ERROR_LIST_DELAY = 250;

/**
 * The **Form** component is used to wrap all input fields, correctly position the required-fields hint text, and forward the `submit` and `reset` events.
 *
 * @slot - The content of the form.
 */
@Component({
	tag: 'kol-form',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolForm extends BaseWebComponent<FormApi> implements FormProps, WebComponentInterface<FormApi> {
	@Element() private readonly host?: HTMLKolFormElement;

	/**
	 * Ids of the error-list alert. Plain fields rather than `@State()`: both are created once per
	 * instance and never change, so nothing would re-render on them.
	 */
	private readonly alertHeadingId = createUniqueId('alert-heading');
	private readonly closerAriaDescriptionId = nonce();

	// --- Lifecycle ---

	public componentWillLoad(): void {
		this.initRenderProps(formPropsConfig);
		this.watchErrorList(this._errorList);
		this.watchOn(this._on);
		this.watchRequiredText(this._requiredText);
	}

	// --- Event handling ---

	/**
	 * Bound to the form element's `submit`. Not every submit reaches it: a button inside the form
	 * routes through `form/controller#propagateSubmitEventToForm`, which invokes `_on.onSubmit`
	 * itself.
	 */
	private readonly handleSubmit = (event: Event): void => {
		event.preventDefault();

		const onSubmit = this.getRenderProp('on').onSubmit;
		if (typeof onSubmit === 'function') {
			onSubmit(event as SubmitEvent);
		}
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.submit);
		}
	};

	private readonly handleReset = (event: Event): void => {
		event.preventDefault();

		const onReset = this.getRenderProp('on').onReset;
		if (typeof onReset === 'function') {
			onReset(event);
		}
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.reset);
		}
	};

	/** Focuses the form control an error entry points at, identified by a CSS selector. */
	private readonly focusErrorTarget = (selector: string, options?: KolFocusOptions): void => {
		const targetElement = document.querySelector<HTMLElement>(selector);
		if (targetElement && typeof targetElement.focus === 'function') {
			targetElement.focus(options ?? SCROLL_OPTIONS_FALLBACK);
		}
	};

	// --- Public methods ---

	/**
	 * Scrolls to the error list and focuses the first link.
	 */
	@Method()
	// eslint-disable-next-line @typescript-eslint/require-await
	public async focusErrorList(options?: KolFocusOptions): Promise<void> {
		setTimeout(() => {
			this.errorLinkItems[0]?.focus(options ?? SCROLL_OPTIONS_FALLBACK);
		}, FOCUS_ERROR_LIST_DELAY);
	}

	// --- Render ---

	public render(): JSX.Element {
		return (
			<Host>
				{this.errorLinkItems.length > 0 && (
					<FormErrorListFC alertHeadingId={this.alertHeadingId} closerAriaDescriptionId={this.closerAriaDescriptionId} errorLinkItems={this.errorLinkItems} />
				)}
				<FormFC
					errorList={this.getRenderProp('errorList')}
					errorLinkItems={this.errorLinkItems}
					handleReset={this.handleReset}
					handleSubmit={this.handleSubmit}
					on={this.getRenderProp('on')}
					requiredText={this.getRenderProp('requiredText')}
				/>
			</Host>
		);
	}

	// --- @State ---

	@State() public errorLinkItems: FormErrorLinkItem[] = [];

	// --- Props + Watchers ---

	/**
	 * A list of error objects that each describe an issue encountered in the form.
	 * Each error object contains a message and a selector for identifying the form element related to the error.
	 */
	@Prop() public _errorList?: ErrorListPropType[];
	@Watch('_errorList')
	public watchErrorList(value?: ErrorListPropType[]): void {
		errorListProp.apply(value, (errorList) => {
			this.setRenderProp('errorList', errorList);
			this.errorLinkItems = errorList.map((error) => createFormErrorLinkItem(error, this.focusErrorTarget));
		});
	}

	/**
	 * Gibt die EventCallback-Funktionen für die Form-Events an.
	 */
	@Prop() public _on?: KoliBriFormCallbacks;
	@Watch('_on')
	public watchOn(value?: KoliBriFormCallbacks): void {
		formCallbacksProp.apply(value, (on) => this.setRenderProp('on', on));
	}

	/**
	 * Defines whether the mandatory-fields-hint should be shown. A string overrides the default text.
	 */
	@Prop() public _requiredText?: Stringified<boolean> = true;
	@Watch('_requiredText')
	public watchRequiredText(value?: Stringified<boolean>): void {
		requiredTextProp.apply(value, (requiredText) => this.setRenderProp('requiredText', requiredText));
	}
}
