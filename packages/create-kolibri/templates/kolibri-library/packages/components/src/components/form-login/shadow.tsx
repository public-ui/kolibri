import { Component, h, JSX, Prop } from '@stencil/core';
import { Props } from './schema';

@Component({
	tag: '{{kebab name}}-form-login',
	styleUrls: {
		default: './style.css',
	},
	shadow: true,
})
export class {{capital name}}FormLogin implements Props {
	public render(): JSX.Element {
		return <{{kebab name}}-form-login-wc _heading={this._heading}></{{kebab name}}-form-login-wc>;
	}

	/**
	 * Gibt die Überschrift des Login-Formulars an.
	 */
	@Prop() public _heading!: string;
}
