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
export class MyExample implements Generic.Element.ComponentApi<RequiredProps, OptionalProps, RequiredStates, OptionalStates> {
	public render(): JSX.Element {
		return (
			<div class="grid gap-2">
				<kol-kolibri
					style=\{{
						display: 'inline-block',
						width: '100px',
					}}
				></kol-kolibri>
				<span>{this.state._label}</span>
			</div>
		);
	}

	/**
	 * Gibt den Text des Span an.
	 */
	@Prop({ reflect: true }) public _label!: string;

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
