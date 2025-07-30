import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Prop, State, Watch } from '@stencil/core';
import type { WebComponentInterface } from './internal/functional-components/generic-types';
import type { SkeletonEmitters, SkeletonState } from './internal/functional-components/skeleton/component';
import { SkeletonFC } from './internal/functional-components/skeleton/component';
import { SkeletonController } from './internal/functional-components/skeleton/controller';
import { ClickButtonFC } from './internal/functional-components/click-button/component';
import type { NameProp, NamePropType } from './internal/functional-components/skeleton/schema/props/name';
import { normalizeName, validateName } from './internal/functional-components/skeleton/schema/props/name';
import type { ShowProp, ShowPropType } from './internal/functional-components/skeleton/schema/props/show';
import { normalizeShow, validateShow } from './internal/functional-components/skeleton/schema/props/show';

type Props = NameProp & ShowProp;

type Interface = WebComponentInterface<Props, SkeletonState, SkeletonEmitters>;

@Component({
	tag: 'kol-skeleton',
	shadow: true,
})
export class KolSkeleton implements Interface {
	private controller = new SkeletonController<KolSkeleton>(this);

	@Prop()
	public _name!: NamePropType;

	@State()
	public name: NamePropType = '';

	@Watch('name')
	public watchName(value?: NamePropType): void {
		const normalized = normalizeName(value);
		if (validateName(normalized)) {
			this.controller.setState('name', normalized);
		}
	}

	@Prop() public _show?: ShowPropType;

	@State() public show: ShowPropType = false;

	@Watch('show')
	public watchShow(value?: ShowPropType): void {
		const normalized = normalizeShow(value);
		if (validateShow(normalized)) {
			this.controller.setState('show', normalized);
		}
	}

	@Event() public onLoaded!: EventEmitter<number>;

	public componentWillLoad(): void {
		this.watchName(this._name);
		this.watchShow(this._show);
	}

	public render(): JSX.Element {
		return (
			<div>
				<ClickButtonFC refButton={this.controller.clickController.setButtonRef} handleClick={this.controller.clickController.handleClick} />
				<SkeletonFC name={this.name} show={this.show} refSpan={this.controller.setSpanRef} onLoaded={this.onLoaded} />
			</div>
		);
	}
}
