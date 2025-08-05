import type { JSX } from '@stencil/core';
import { Component, h, Host, Listen, Prop, State, Watch } from '@stencil/core';
import { ClickButtonFC } from '../../internal/functional-components/click-button/component';
import { ClickButtonController } from '../../internal/functional-components/click-button/controller';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { LabelProp, LabelPropType } from '../../internal/schema/props/label';

type Props = LabelProp;

@Component({
	tag: 'kol-click-button',
	shadow: true,
})
export class KolClickButton implements WebComponentInterface<Props> {
	private readonly controller = new ClickButtonController(this);

	@State()
	public eCount = 0;

	@Prop()
	public _label!: LabelPropType;

	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		this.controller.watchLabel(value);
	}

	public componentWillLoad(): void {
		this.controller.componentWillLoad({
			label: this._label,
		});
	}

	@Listen('keydown', { target: 'window' })
	public onKeydown(event: KeyboardEvent): void {
		this.controller.onKeydown(event);
	}

	public render(): JSX.Element {
		const { label } = this.controller.getProps();
		return (
			<Host>
				<ClickButtonFC eCount={this.eCount} handleClick={this.controller.handleClick} label={label} refButton={this.controller.setButtonRef} />
			</Host>
		);
	}
}
