import type { JSX } from '@stencil/core';
import { Component, h, Host, Prop, State, Watch } from '@stencil/core';
import type { ClickButtonEmitters, ClickButtonState } from '../../internal/functional-components/click-button/component';
import { ClickButtonFC } from '../../internal/functional-components/click-button/component';
import { ClickButtonController } from '../../internal/functional-components/click-button/controller';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import { normalizeLabel, validateLabel, type LabelProp, type LabelPropType } from '../../internal/schema/props/label';

type Props = LabelProp;

type Interface = WebComponentInterface<Props, ClickButtonState, ClickButtonEmitters>;

@Component({
	tag: 'kol-click-button',
	shadow: true,
})
export class KolClickButton implements Interface {
	private controller = new ClickButtonController<KolClickButton>(this);

	@Prop()
	public _label!: LabelPropType;

	@State()
	public label: LabelPropType = '';

	@Watch('label')
	public watchLabel(value?: LabelPropType): void {
		const normalized = normalizeLabel(value);
		if (validateLabel(normalized)) {
			this.controller.setState('label', normalized);
		}
	}

	public componentWillLoad(): void {}

	public render(): JSX.Element {
		return (
			<Host>
				<ClickButtonFC label={this.label} refButton={this.controller.setButtonRef} handleClick={this.controller.handleClick} />
			</Host>
		);
	}
}
