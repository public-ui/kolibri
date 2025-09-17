import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { ClickButtonController } from '../../internal/functional-components/click-button/controller';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { SkeletonApi } from '../../internal/functional-components/skeleton/api';
import { SkeletonFC } from '../../internal/functional-components/skeleton/component';
import { SkeletonController } from '../../internal/functional-components/skeleton/controller';
import type { CountPropType } from '../../internal/schema/props/count';
import type { LabelPropType } from '../../internal/schema/props/label';
import type { NamePropType } from '../../internal/schema/props/name';
import type { ShowPropType } from '../../internal/schema/props/show';

@Component({
	tag: 'kol-skeleton',
	shadow: true,
})
export class KolSkeleton implements WebComponentInterface<SkeletonApi> {
	private readonly controller = new SkeletonController(this, new ClickButtonController(this));

	@Prop()
	public _count!: CountPropType;

	@Watch('_count')
	public watchCount(value?: CountPropType): void {
		this.controller.watchCount(value);
	}

	@Prop()
	public _name!: NamePropType;

	@Watch('_name')
	public watchName(value?: NamePropType): void {
		this.controller.watchName(value);
	}

	@State()
	public label: LabelPropType = 'Label';

	@State()
	public show: ShowPropType = true;

	@Method()
	public focusButton(): Promise<void> {
		this.controller.focusButton();
		return Promise.resolve();
	}

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent): void {
		if (event.key === 'Enter' || event.key === ' ') {
			this.controller.handleClick();
		}
	}

	@Event() public loaded!: EventEmitter<number>;

	@Method()
	public toggle(): Promise<void> {
		return this.controller.toggle();
	}

	@Listen('keydown', { target: 'window' })
	public onKeydown(event: KeyboardEvent): void {
		this.controller.onKeydown(event);
	}

	public componentWillLoad(): void {
		this.controller.componentWillLoad({
			count: this._count,
			name: this._name,
		});
	}

	public render(): JSX.Element {
		const { count, name } = this.controller.getProps();
		const { label, show } = this;
		return (
			<Host>
				<SkeletonFC
					count={count}
					label={label}
					name={name}
					handleClick={this.controller.handleClick}
					onLoaded={this.loaded}
					show={show}
					refButton={this.controller.setButtonRef}
				/>
			</Host>
		);
	}
}
