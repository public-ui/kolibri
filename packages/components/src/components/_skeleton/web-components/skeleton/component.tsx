import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Host, Prop, State, Watch } from '@stencil/core';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { SkeletonEmitters, SkeletonState } from '../../internal/functional-components/skeleton/component';
import { SkeletonFC } from '../../internal/functional-components/skeleton/component';
import { SkeletonController } from '../../internal/functional-components/skeleton/controller';
import type { LabelProp, LabelPropType } from '../../internal/schema/props/label';
import type { NameProp, NamePropType } from '../../internal/schema/props/name';
import { normalizeName, validateName } from '../../internal/schema/props/name';
import type { ShowProp, ShowPropType } from '../../internal/schema/props/show';
import { normalizeShow, validateShow } from '../../internal/schema/props/show';

type Props = LabelProp & NameProp & ShowProp;

type Interface = WebComponentInterface<Props, SkeletonState, SkeletonEmitters>;

@Component({
	tag: 'kol-skeleton',
	shadow: true,
})
export class KolSkeleton implements Interface {
	private controller = new SkeletonController<KolSkeleton>(this);

	@Prop()
	public _label!: LabelPropType;

	@State()
	public label: LabelPropType = '';

	@Watch('label')
	public watchLabel(value?: NamePropType): void {
		const normalized = normalizeName(value);
		if (validateName(normalized)) {
			this.controller.setState('label', normalized);
		}
	}

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

	@Prop()
	public _show?: ShowPropType;

	@State()
	public show: ShowPropType = false;

	@Watch('show')
	public watchShow(value?: ShowPropType): void {
		const normalized = normalizeShow(value);
		if (validateShow(normalized)) {
			this.controller.setState('show', normalized);
		}
	}

	@Event() public loaded!: EventEmitter<number>;

	public componentWillLoad(): void {
		this.watchLabel(this._label);
		this.watchName(this._name);
		this.watchShow(this._show);
	}

	public render(): JSX.Element {
		return (
			<Host>
				<SkeletonFC
					label={this.label}
					name={this.name}
					handleClick={this.controller.handleClick}
					onLoaded={this.loaded}
					show={this.show}
					refButton={this.controller.setButtonRef}
				/>
			</Host>
		);
	}
}
