import type { JSX } from '@stencil/core';
import { Component, Element, h, Host, Method, Prop, State, Watch } from '@stencil/core';
import { validateErrorList, watchBoolean, watchString } from '../../schema';

import { translate } from '../../i18n';

import KolAlertFc from '../../functional-components/Alert';
import { BaseWebComponent } from '../../internal/functional-components/base-web-component';
import { ButtonController } from '../../internal/functional-components/button/controller';
import { LinkFC } from '../../internal/functional-components/link/component';
import { createLinkStateAccess, LinkController } from '../../internal/functional-components/link/controller';
import type { ErrorListPropType, FormAPI, FormStates, KolFocusOptions, KoliBriFormCallbacks, Stringified } from '../../schema';
import { dispatchDomEvent, KolEvent } from '../../utils/events';

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
export class KolForm implements FormAPI {
	@Element() private readonly host?: HTMLKolFormElement;
	errorListBlock?: HTMLElement;
	errorListFirstLink?: HTMLElement;
	scrollOptionsFallback: KolFocusOptions = {
		behavior: 'smooth',
		block: 'nearest',
	};
	private readonly translateErrorListMessage = translate('kol-error-list-message');
	private readonly translateErrorList = translate('kol-error-list');
	private readonly translateFormDescription = translate('kol-form-description');

	@State() private _tick = 0;
	private readonly forceRender = () => this._tick++;
	private errorLinkCtrls: LinkController[] = [];

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

	private readonly handleLinkClick = (selector: string, options?: KolFocusOptions) => {
		const targetElement = document.querySelector<HTMLElement>(selector);
		if (targetElement && typeof targetElement.focus === 'function') {
			targetElement.focus(options ? options : this.scrollOptionsFallback);
		}
	};

	private readonly setBlockElement = (el?: HTMLElement) => (this.errorListBlock = el);
	private readonly alertCloseButtonCtrl = new ButtonController(BaseWebComponent.stateLess);

	private syncErrorLinkControllers(errorList?: ErrorListPropType[]): void {
		this.errorLinkCtrls.forEach((c) => c.destroy());
		this.errorLinkCtrls = (errorList ?? []).map((error) => {
			const ctrl = new LinkController(createLinkStateAccess(this.forceRender));
			ctrl.componentWillLoad({
				href: '',
				label: error.message,
				on: { onClick: typeof error.selector === 'string' ? () => this.handleLinkClick(String(error.selector)) : error.selector },
			});
			return ctrl;
		});
	}

	private renderErrorList(errorList?: ErrorListPropType[]): JSX.Element {
		return (
			<KolAlertFc
				class="kol-form__alert"
				ref={this.setBlockElement}
				type="error"
				variant="card"
				label={this.translateErrorListMessage}
				closeButtonCtrl={this.alertCloseButtonCtrl}
			>
				<nav aria-label={this.translateErrorList}>
					<ul>
						{errorList?.map((_error, index) => {
							const ctrl = this.errorLinkCtrls[index];
							return (
								<li key={index}>
									{ctrl && (
										<LinkFC
											class="kol-form__link"
											accessKey={ctrl.getRenderProp('accessKey')}
											ariaControls={ctrl.getRenderProp('ariaControls')}
											ariaCurrent={ctrl.getAriaCurrent()}
											ariaCurrentValue={ctrl.getRenderProp('ariaCurrentValue')}
											ariaDescription={ctrl.getRenderProp('ariaDescription')}
											ariaExpanded={ctrl.getRenderProp('ariaExpanded')}
											ariaOwns={ctrl.getRenderProp('ariaOwns')}
											customClass={ctrl.getRenderProp('customClass')}
											disabled={ctrl.getRenderProp('disabled')}
											download={ctrl.getRenderProp('download')}
											hideLabel={ctrl.getRenderProp('hideLabel')}
											href={ctrl.getRenderProp('href')}
											icons={ctrl.getRenderProp('icons')}
											inline={ctrl.getRenderProp('inline')}
											label={ctrl.getRenderProp('label')}
											on={ctrl.getRenderProp('on')}
											role={ctrl.getRenderProp('role')}
											shortKey={ctrl.getRenderProp('shortKey')}
											tabIndex={ctrl.getRenderProp('tabIndex')}
											target={ctrl.getRenderProp('target')}
											tooltipAlign={ctrl.getRenderProp('tooltipAlign')}
											variant={ctrl.getRenderProp('variant')}
											onAnchorClick={ctrl.handleAnchorClick}
											tooltipId={ctrl.getTooltipId()}
											refTooltipFloating={ctrl.setTooltipRef}
											refAnchor={(el) => {
												ctrl.setAnchorRef(el);
												if (index === 0) this.errorListFirstLink = el ?? undefined;
											}}
										/>
									)}
								</li>
							);
						})}
					</ul>
				</nav>
			</KolAlertFc>
		);
	}

	private renderFormElement(): JSX.Element {
		return (
			<form class="kol-form" method="post" onSubmit={this.onSubmit} onReset={this.onReset} noValidate>
				{this.state._requiredText === true ? (
					<p>
						<div class="kol-form__mandatory-fields-hint">{this.translateFormDescription}</div>
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

	private scrollToErrorList(options?: KolFocusOptions): void {
		setTimeout(() => {
			this.errorListFirstLink?.focus(options ? options : this.scrollOptionsFallback);
		}, 250);
	}

	/**
	 * Scrolls to the error list and focuses the first link.
	 */
	@Method()
	async focusErrorList(options?: KolFocusOptions): Promise<void> {
		this.scrollToErrorList(options);
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
		this.syncErrorLinkControllers(value);
	}

	public componentWillLoad(): void {
		this.validateOn(this._on);
		this.validateRequiredText(this._requiredText);
		this.validateErrorList(this._errorList);
	}

	public disconnectedCallback(): void {
		this.errorLinkCtrls.forEach((c) => c.destroy());
		this.errorLinkCtrls = [];
	}
}
