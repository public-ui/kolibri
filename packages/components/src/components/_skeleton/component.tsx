import type { JSX } from '@stencil/core';
import { Component, h, Prop, State, Watch } from '@stencil/core';
import { SkeletonFC } from './internal/functional-components/skeleton/component';
import type { SkeletonState } from './internal/functional-components/skeleton/controller';
import { SkeletonController, type SkeletonControllerWatchers } from './internal/functional-components/skeleton/controller';
import type { NameProp, NamePropType } from './internal/functional-components/skeleton/schema/props/name';
import type { ShowProp, ShowPropType } from './internal/functional-components/skeleton/schema/props/show';

type SkeletonProps = NameProp & ShowProp;

@Component({
	tag: 'kol-skeleton',
	shadow: true,
})
export class Skeleton implements SkeletonProps, SkeletonState {
	private controller: SkeletonControllerWatchers & SkeletonController<Skeleton> = new SkeletonController<Skeleton>(this);

	@Prop() public name?: NamePropType;
	@State() public nameState: NamePropType = '';
	@Watch('name')
	private watchName(value?: NamePropType): void {
		this.controller.watchName(value);
	}

	@Prop() public show?: ShowPropType;
	@State() public showState: ShowPropType = false;
	@Watch('show')
	private watchShow(value?: ShowPropType): void {
		this.controller.watchShow(value);
	}

	public componentWillLoad(): void {
		this.watchName(this.name);
		this.watchShow(this.show);
	}

	public render(): JSX.Element {
		return <SkeletonFC nameState={this.nameState} />;
	}
}
