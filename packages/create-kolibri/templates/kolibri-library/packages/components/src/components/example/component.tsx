import { Component, h, JSX, Prop, State, Watch } from '@stencil/core';

import { Generic } from '@public-ui/core';

/**
 * API
 */
type RequiredProps = {
	label: string;
};
type OptionalProps = unknown;
export type Props = Generic.Element.Members<RequiredProps, OptionalProps>;

type RequiredStates = RequiredProps;
type OptionalStates = OptionalProps;
type States = Generic.Element.Members<RequiredStates, OptionalStates>;

@Component({
	tag: 'my-example',
	styleUrls: {
		default: '../style.sass',
	},
	shadow: true,
})
export class Example implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		return <span>{this.state._label}</span>;
	}

	/**
	 * Gibt den Text des Span an.
	 */
	@Prop({ mutate: true, reflect: true }) public _label!: string;

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
