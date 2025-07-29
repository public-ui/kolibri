import { Component, h, Prop, State, Watch } from '@stencil/core';
import type { JSX } from '@stencil/core';
import type { NameProp, NamePropType } from './internal/functional-components/skeleton/schema/props/name';
import { SkeletonController } from './internal/functional-components/skeleton/controller';
import type { SkeletonState } from './internal/functional-components/skeleton/controller';
import { SkeletonFunctionalComponent } from './internal/functional-components/skeleton/component';

@Component({
	tag: 'kol-skeleton',
	shadow: true,
})
export class KolSkeleton implements NameProp, SkeletonState {
	private controller!: SkeletonController<KolSkeleton>;

	@Prop() public name?: NamePropType;

	@State() public nameState?: NamePropType;

	@Watch('name')
	protected watchName(value?: NamePropType): void {
		this.controller.watchName(value);
	}

	public componentWillLoad(): void {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		this.controller = new SkeletonController<KolSkeleton>(this as KolSkeleton);
		this.watchName(this.name);
	}

	public render(): JSX.Element {
		return <SkeletonFunctionalComponent nameState={this.nameState} />;
	}
}
