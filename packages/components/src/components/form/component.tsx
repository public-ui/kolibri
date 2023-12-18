import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';

import { translate } from '../../i18n';
import { Stringified } from '../../types/common';
import { watchBoolean, watchString } from '../../utils/prop.validators';
import { API, KoliBriFormCallbacks, States } from './types';

/**
 * @slot - Inhalt der Form.
 */
@Component({
	tag: 'kol-form',
	shadow: true,
})
export class KolForm implements API {
	private readonly onSubmit = (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
		if (typeof this.state._on?.onSubmit === 'function') {
			this.state._on?.onSubmit(event as SubmitEvent);
		}
	};
	private readonly onReset = (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
		if (typeof this.state._on?.onReset === 'function') {
			this.state._on?.onReset(event);
		}
	};

	private readonly handleLinkClick = (event: Event) => {
		const href = (event.target as HTMLAnchorElement | undefined)?.href;
		if (href) {
			const hrefUrl = new URL(href);

			const targetElement = document.querySelector<HTMLElement>(hrefUrl.hash);
			if (targetElement && typeof targetElement.focus === 'function') {
				targetElement.focus();
			}
		}
	};

	public render(): JSX.Element {
		return (
			<form method="post" onSubmit={this.onSubmit} onReset={this.onReset} autoComplete="off" noValidate>
				{this._errors && (
					<kol-alert _type="error">
						Bitte korrigieren Sie folgende Fehler:
						<nav aria-label="Fehlerliste">
							<ul>
								{Object.entries(this._errors).map(([field, error]) => (
									<li key={field}>
										<kol-link _href={`#field-${field}`} _label={error} _on={{ onClick: this.handleLinkClick }} />
									</li>
								))}
							</ul>
						</nav>
					</kol-alert>
				)}
				{this.state._requiredText === true ? (
					<p>
						<kol-indented-text>{translate('kol-form-description')}</kol-indented-text>
					</p>
				) : typeof this.state._requiredText === 'string' && this.state._requiredText.length > 0 ? (
					<p>
						<kol-indented-text>{this.state._requiredText}</kol-indented-text>
					</p>
				) : null}
				<slot />
			</form>
		);
	}

	/**
	 * Gibt die EventCallback-Funktionen für die Form-Events an.
	 */
	@Prop() public _on?: KoliBriFormCallbacks;

	/**
	 * Defines whether the mandatory-fields-hint should be shown. A string overrides the default text.
	 */
	@Prop() public _requiredText?: Stringified<boolean> = true;

	@Prop() public _errors?: Record<string, string>;

	@State() public state: States = {};

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

	@Watch('_errors')
	public validateErrors(value?: Record<string, string>): void {
		if (typeof value === 'object' && value !== null) {
			this.state = {
				...this.state,
				_errors: value,
			};
		}
	}
	public componentWillLoad(): void {
		this.validateOn(this._on);
		this.validateRequiredText(this._requiredText);
		this.validateErrors(this._errors);
	}
}
