import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { SkeletonApi } from '../../internal/functional-components/skeleton/api';
import { SkeletonFC } from '../../internal/functional-components/skeleton/component';
import { SkeletonController } from '../../internal/functional-components/skeleton/controller';
import type { CountPropType } from '../../internal/schema/props/count';
import type { LabelPropType } from '../../internal/schema/props/label';
import type { NamePropType } from '../../internal/schema/props/name';
import type { ShowPropType } from '../../internal/schema/props/show';
import { Log } from '../../../../schema';

@Component({
	tag: 'kol-skeleton',
	shadow: true,
})
export class KolSkeleton implements WebComponentInterface<SkeletonApi> {
	private readonly ctrl = new SkeletonController(this);

	@Method()
	public async kolFocus(): Promise<void> {
		this.ctrl.focus();
		return Promise.resolve();
	}

	@Method()
	public async kolToggle(): Promise<void> {
		this.ctrl.toggle();
		return Promise.resolve();
	}

	@Prop()
	public _count!: CountPropType;

	@Watch('_count')
	public watchCount(value?: CountPropType): void {
		this.ctrl.watchCount(value);
	}

	@Prop()
	public _name!: NamePropType;

	@Watch('_name')
	public watchName(value?: NamePropType): void {
		this.ctrl.watchName(value);
	}

	@Prop()
	public _label: LabelPropType = 'Label';

	@Watch('_label')
	public watchLabel(value?: LabelPropType): void {
		this.ctrl.watchLabel(value);
	}

	@State()
	public label: LabelPropType = 'Label';

	@State()
	public show: ShowPropType = true;

	@State()
	public count: CountPropType = 0;

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent): void {
		if (event.key === 'Enter' || event.key === ' ') {
			Log.debug('button pressed');
			this.ctrl.handleClick();
		}
	}

	@Event() public loaded!: EventEmitter<number>;

	@Listen('keydown', { target: 'window' })
	public onKeydown(event: KeyboardEvent): void {
		this.ctrl.onKeydown(event);
	}

	public componentWillLoad(): void {
		this.watchLabel(this._label);
		this.ctrl.componentWillLoad({
			count: this._count,
			name: this._name,
		});
	}

	public render(): JSX.Element {
		const { count, name } = this.ctrl.getProps();
		const { label, show } = this;
		return (
			<Host>
				<SkeletonFC
					count={count}
					label={label}
					name={name}
					handleClick={this.ctrl.handleClick}
					onLoaded={this.loaded}
					show={show}
					refButton={this.ctrl.setButtonRef}
				/>
			</Host>
		);
	}
}
