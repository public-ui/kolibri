import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@a11y-ui/core';
import { OptionalProps, OptionalStates, RequiredProps, RequiredStates, States } from './schema';

/**
 * @internal
 */
@Component({
	tag: 'my-example-wc',
	shadow: false,
})
export class MyExampleWc implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		return <span>{this.state._label}</span>;
	}

	/**
	 * Gibt den Text des Span an.
	 */
	@Prop() public _label!: string;

	@State() public state: States = {
		_label: '',
	};

	@Watch('_label')
	public validateLabel(value?: string): void {
		if (typeof value === 'string') {
			this.state._label = value;
		}
	}

	public componentWillLoad(): void {
		this.validateLabel(this._label);
	}
}
