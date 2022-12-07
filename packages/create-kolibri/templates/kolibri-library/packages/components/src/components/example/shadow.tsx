import { Component, h, JSX, Prop } from '@stencil/core';
import { Props } from './schema';

@Component({
	tag: 'my-example',
	styleUrls: {
		default: '../style.sass',
	},
	shadow: true,
})
export class MyExample implements Props {
	public render(): JSX.Element {
		return <my-example-wc _label={this._label}></my-example-wc>;
	}

	/**
	 * Gibt den Text des Span an.
	 */
	@Prop() public _label!: string;
}
