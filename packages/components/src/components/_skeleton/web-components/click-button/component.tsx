import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, Watch } from '@stencil/core';
import type { ClickButtonEmitters, ClickButtonRenderProps } from '../../internal/functional-components/click-button/component';
import { ClickButtonFC } from '../../internal/functional-components/click-button/component';
import { ClickButtonController } from '../../internal/functional-components/click-button/controller';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { type LabelProp, type LabelPropType } from '../../internal/schema/props/label';

type Props = LabelProp;

@Component({
	tag: 'kol-click-button',
	shadow: true,
})
export class KolClickButton implements WebComponentInterface<ClickButtonRenderProps, Props, ClickButtonEmitters> {
	private controller = new ClickButtonController<KolClickButton>(this);

	@Prop()
	public _label!: LabelPropType;

	public label: LabelPropType = '';

	@Watch('label')
	public watchLabel(value?: LabelPropType): void {
		this.controller.watchLabel(value);
	}

	public componentWillLoad(): void {
		this.controller.componentWillLoad({
			label: this._label,
		});
	}

	public render(): JSX.Element {
		return (
			<Host>
				<ClickButtonFC label={this.label} refButton={this.controller.setButtonRef} handleClick={this.controller.handleClick} />
			</Host>
		);
	}
}
