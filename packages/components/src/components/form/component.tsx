import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';
import { Events } from '../../enums/events';

import { Generic } from '@a11y-ui/core';
import { EventCallback } from '../../types/callbacks';
import { watchBoolean, watchString } from '../../utils/prop.validators';
import { Stringified } from '../../types/common';
import { translate } from '../../i18n';

export type KoliBriFormCallbacks = {
	[Events.onSubmit]?: EventCallback<Event>;
	[Events.onReset]?: EventCallback<Event>;
};

type RequiredProps = unknown;
type OptionalProps = {
	on: KoliBriFormCallbacks;
	requiredText: string | boolean;
};
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'kol-form',
	shadow: true,
})
export class KolForm implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	private readonly onSubmit = (event: Event) => {
		event.preventDefault();
		if (typeof this.state._on?.onSubmit === 'function') {
			this.state._on?.onSubmit(event as SubmitEvent);
		}
	};
	private readonly onReset = (event: Event) => {
		event.preventDefault();
		if (typeof this.state._on?.onReset === 'function') {
			this.state._on?.onReset(event);
		}
	};

	public render(): JSX.Element {
		return (
			<form method="post" onSubmit={this.onSubmit} onReset={this.onReset} autoComplete="off" noValidate>
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
	 * Gibt an, ob der Pflichtfeld-Hinweis eingeblendet werden soll. Ein String überschreibt den Standardtext.
	 */
	@Prop() public _requiredText?: Stringified<boolean> = true;

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

	public componentWillLoad(): void {
		this.validateOn(this._on);
		this.validateRequiredText(this._requiredText);
	}
}
