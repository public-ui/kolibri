import type { EventEmitter, JSX } from '@stencil/core';
import { Component, Event, h, Host, Listen, Method, Prop, State, Watch } from '@stencil/core';
import { ClickButtonController } from '../../internal/functional-components/click-button/controller';
import type { WebComponentInterface } from '../../internal/functional-components/generic-types';
import type {
	SkeletonEmitters,
	SkeletonListeners,
	SkeletonMethods,
	SkeletonRenderProps,
	SkeletonRenderStates,
} from '../../internal/functional-components/skeleton/component';
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
export class KolSkeleton implements WebComponentInterface<SkeletonRenderProps, SkeletonRenderStates, SkeletonEmitters, SkeletonMethods, SkeletonListeners> {
	private readonly controller = new SkeletonController(this, new ClickButtonController(this), new ClickButtonController(this));

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

	@State()
	public eCount = 0;

	@Method()
	public focusButton(): Promise<void> {
		this.controller.focusPrimaryButton();
		return Promise.resolve();
	}

	@Listen('keydown')
	public handleKeyDown(event: KeyboardEvent): void {
		if (event.key === 'Enter' || event.key === ' ') {
			this.controller.handlePrimaryClick();
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
			name: this._name,
		});
	}

	public render(): JSX.Element {
		const { count, name } = this.controller.getProps();
		return (
			<Host>
				<SkeletonFC
					count={count}
					eCount={this.eCount}
					handlePrimaryClick={this.controller.handlePrimaryClick}
					handleSecondaryClick={this.controller.handleSecondaryClick}
					label={this.label}
					name={name}
					onLoaded={this.loaded}
					refPrimaryButton={this.controller.setPrimaryButtonRef}
					refSecondaryButton={this.controller.setSecondaryButtonRef}
					show={this.show}
				/>
			</Host>
		);
	}
}
