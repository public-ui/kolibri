import { Component, h, Host, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { OptionalProps, OptionalStates, RequiredProps, RequiredStates, States } from './schema';

/**
 * @internal
 */
@Component({
	tag: '{{kebab name}}-form-login-wc',
	shadow: false,
})
export class {{capital name}}FormLoginWc implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		return (
			<Host>
				<kol-heading _label="">{this.state._heading}</kol-heading>
				<kol-form
					_on=\{{
						onSubmit: console.log,
					}}
				>
					<div class="d-grid gap-4">
						<kol-input-text _id="username" _required>
							Benutzername
						</kol-input-text>
						<kol-input-password _id="password" _required>
							Passwort
						</kol-input-password>
						<div class="d-flex gap-2">
							<kol-button _label="Einloggen" _type="submit" _variant="primary"></kol-button>
							<kol-link-button _label="Passwort vergessen" _href="#/password-vergessen" _target="_blank" _variant="ghost"></kol-link-button>
						</div>
					</div>
				</kol-form>
			</Host>
		);
	}

	/**
	 * Gibt die Überschrift des Login-Formulars an.
	 */
	@Prop() public _heading!: string;

	@State() public state: States = {
		_heading: '',
	};

	@Watch('_heading')
	public validateHeading(value?: string): void {
		if (typeof value === 'string') {
			this.state._heading = value;
		}
	}

	public componentWillLoad(): void {
		this.validateHeading(this._heading);
	}
}
