import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Host, Listen, Method, Prop, Watch } from '@stencil/core';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type { SkeletonEmitters, SkeletonListeners, SkeletonMethods } from '../../internal/functional-components/skeleton/component';
import { SkeletonFC } from '../../internal/functional-components/skeleton/component';
import { SkeletonController } from '../../internal/functional-components/skeleton/controller';
import type { CountProp, CountPropType } from '../../internal/schema/props/count';
import type { NameProp, NamePropType } from '../../internal/schema/props/name';
import type { ShowProp, ShowPropType } from '../../internal/schema/props/show';

type Props = CountProp & NameProp & ShowProp;

@Component({
	tag: 'kol-skeleton',
	shadow: true,
})
export class KolSkeleton implements WebComponentInterface<Props, SkeletonEmitters, SkeletonMethods, SkeletonListeners> {
	private readonly controller = new SkeletonController();

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

	@Prop()
	public _show?: ShowPropType;

	@Watch('_show')
	public watchShow(value?: ShowPropType): void {
		this.controller.watchShow(value);
	}

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
		this.controller.toggle();
		return Promise.resolve();
	}

	@Listen('keydown', { target: 'window' })
	public onKeydown(event: KeyboardEvent): void {
		this.controller.onKeydown(event);
	}

	public componentWillLoad(): void {
		this.controller.componentWillLoad({
			count: this._count,
			label: 'Label',
			name: this._name,
			show: this._show,
		});
	}

	public render(): JSX.Element {
		const { count, label, name, show } = this.controller.getProps();
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
