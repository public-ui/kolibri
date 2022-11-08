import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';
import { Events } from '../../enums/events';

import { Generic } from '@public-ui/core';
import { EventCallback } from '../../types/callbacks';
import { watchBoolean, watchString } from '../../utils/prop.validators';
import { Stringified } from '../../types/common';

export type KoliBriFormCallbacks = {
	[Events.onSubmit]?: EventCallback<SubmitEvent>;
	[Events.onReset]?: EventCallback<Event>;
};

/**
 * API
 */
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
						<kol-indented-text>
							Formular-Felder, die mit einem Sternchen <span aria-hidden="true">(*)</span> gekennzeichnet sind, sind Pflichtangaben.
						</kol-indented-text>
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
	 * Gibt an, ob der Pflichtfeld-Hinweis eingeblendet werden soll.
	 */
	@Prop() public _requiredText?: Stringified<boolean> = true;

	/**
	 * @see: components/abbr/component.tsx (@State)
	 */
	@State() public state: States = {};

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_on')
	public validateOn(value?: KoliBriFormCallbacks): void {
		if (typeof value === 'object' && value !== null) {
			this.state = {
				...this.state,
				_on: value,
			};
		}
	}

	/**
	 * @see: components/abbr/component.tsx (@Watch)
	 */
	@Watch('_requiredText')
	public validateRequiredText(value?: Stringified<boolean>): void {
		if (typeof value === 'boolean') {
			watchBoolean(this, '_requiredText', value);
		} else {
			watchString(this, '_requiredText', value);
		}
	}

	/**
	 * @see: components/abbr/component.tsx (componentWillLoad)
	 */
	public componentWillLoad(): void {
		this.validateOn(this._on);
		this.validateRequiredText(this._requiredText);
	}
}
