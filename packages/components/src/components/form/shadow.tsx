import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { validateErrorList, watchBoolean, watchString } from '../../schema';

import { translate } from '../../i18n';

import { KolLinkWcTag } from '../../core/component-names';
import KolAlertFc from '../../functional-components/Alert';
import type { ErrorListPropType, FormAPI, FormStates, KoliBriFormCallbacks, Stringified } from '../../schema';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

/**
 * @slot - Inhalt der Form.
 */
@Component({
	tag: 'kol-form',
	styleUrls: {
		default: './style.scss',
	},
	shadow: true,
})
export class KolForm implements FormAPI {
	@Element() private readonly host?: HTMLKolTextareaElement;
	errorListBlock?: HTMLElement;
	errorListFirstLink?: HTMLElement;

	/* Hint: This method may not be used at all while events are handled in form/controller#propagateSubmitEventToForm */
	private readonly onSubmit = (event: Event) => {
		event.preventDefault();

		if (typeof this.state._on?.onSubmit === 'function') {
			this.state._on?.onSubmit(event as SubmitEvent);
		}
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.submit);
		}
	};

	private readonly onReset = (event: Event) => {
		event.preventDefault();
		if (typeof this.state._on?.onReset === 'function') {
			this.state._on?.onReset(event);
		}
		if (this.host) {
			dispatchDomEvent(this.host, KolEvent.reset);
		}
	};

	private readonly handleLinkClick = (selector: string) => {
		const targetElement = document.querySelector<HTMLElement>(selector);
		if (targetElement && typeof targetElement.focus === 'function') {
			targetElement.scrollIntoView({ behavior: 'smooth' });
			targetElement.focus();
		}
	};

	private renderErrorList(errorList?: ErrorListPropType[]): JSX.Element {
		return (
			<KolAlertFc
				class="kol-form__alert"
				ref={(el) => {
					this.errorListBlock = el;
				}}
				type="error"
				variant="card"
				label={translate('kol-error-list-message')}
			>
				<nav aria-label={translate('kol-error-list')}>
					<ul>
						{errorList?.map((error, index) => (
							<li key={index}>
								<KolLinkWcTag
									class="kol-form__link"
									_href=""
									_label={error.message}
									_on={{ onClick: typeof error.selector === 'string' ? () => this.handleLinkClick(String(error.selector)) : error.selector }}
									ref={(el) => {
										if (index === 0) {
											this.errorListFirstLink = el;
											this.scrollToErrorList();
										}
									}}
								/>
							</li>
						))}
					</ul>
				</nav>
			</KolAlertFc>
		);
	}

	private renderFormElement(): JSX.Element {
		return (
			<form class="kol-form" method="post" onSubmit={this.onSubmit} onReset={this.onReset} autoComplete="off" noValidate>
				{this.state._requiredText === true ? (
					<p>
						<div class="kol-form__mandatory-fields-hint">{translate('kol-form-description')}</div>
					</p>
				) : typeof this.state._requiredText === 'string' && this.state._requiredText.length > 0 ? (
					<p>
						<div class="kol-form__mandatory-fields-hint">{this.state._requiredText}</div>
					</p>
				) : null}
				<slot />
			</form>
		);
	}

	public render(): JSX.Element {
		const hasErrorList = Array.isArray(this._errorList) && this._errorList.length > 0;

		return (
			<Host>
				{hasErrorList && this.renderErrorList(this._errorList)}
				{this.renderFormElement()}
			</Host>
		);
	}

	private scrollToErrorList(): void {
		this.errorListBlock?.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
		setTimeout(() => {
			this.errorListFirstLink?.querySelector('a')?.focus();
		}, 250);
	}

	@Method()
	async focusErrorList(): Promise<void> {
		this.scrollToErrorList();
		return Promise.resolve();
	}

	/**
	 * Gibt die EventCallback-Funktionen für die Form-Events an.
	 */
	@Prop() public _on?: KoliBriFormCallbacks;

	/**
	 * Defines whether the mandatory-fields-hint should be shown. A string overrides the default text.
	 */
	@Prop() public _requiredText?: Stringified<boolean> = true;
	/**
	 * A list of error objects that each describe an issue encountered in the form.
	 * Each error object contains a message and a selector for identifying the form element related to the error.
	 */
	@Prop() public _errorList?: ErrorListPropType[];

	@State() public state: FormStates = {};

	@Watch('_on')
	public validateOn(value?: KoliBriFormCallbacks): void {
		if (typeof value === 'object' && value !== null) {
			this.state = {
				...this.state,
				_on: value,
			};
		}
	}

	@Watch('_requiredText')
	public validateRequiredText(value?: Stringified<boolean>): void {
		if (typeof value === 'boolean') {
			watchBoolean(this, '_requiredText', value);
		} else {
			watchString(this, '_requiredText', value);
		}
	}

	@Watch('_errorList')
	public validateErrorList(value?: ErrorListPropType[]): void {
		validateErrorList(this, value);
	}

	public componentWillLoad(): void {
		this.validateOn(this._on);
		this.validateRequiredText(this._requiredText);
		this.validateErrorList(this._errorList);
	}
}
