import type { JSX } from '@stencil/core';
import { Component, h, Prop, State, Watch } from '@stencil/core';
import { SkeletonFC, type SkeletonState } from './internal/functional-components/skeleton/component';
import { SkeletonController, type ComponentWatchers } from './internal/functional-components/skeleton/controller';
import { normalizeName, validateName } from './internal/functional-components/skeleton/schema/props/name';
import { normalizeShow, validateShow } from './internal/functional-components/skeleton/schema/props/show';
import type { NameProp, NamePropType } from './internal/functional-components/skeleton/schema/props/name';
import type { ShowProp, ShowPropType } from './internal/functional-components/skeleton/schema/props/show';

type SkeletonProps = NameProp & ShowProp;

@Component({
	tag: 'kol-skeleton',
	shadow: true,
})
export class Skeleton implements SkeletonProps, SkeletonState, ComponentWatchers<SkeletonProps> {
	private controller: SkeletonController<Skeleton> = new SkeletonController<Skeleton>(this);

	@Prop() public name?: NamePropType;
	@State() public nameState: NamePropType = '';
	@Watch('name')
	public watchName(value?: NamePropType): void {
		const normalized = normalizeName(value);
		if (validateName(normalized)) {
			this.controller.setState('nameState', normalized);
		}
	}

	@Prop() public show?: ShowPropType;
	@State() public showState: ShowPropType = false;
	@Watch('show')
	public watchShow(value?: ShowPropType): void {
		const normalized = normalizeShow(value);
		if (validateShow(normalized)) {
			this.controller.setState('showState', normalized);
		}
	}

	public componentWillLoad(): void {
		this.watchName(this.name);
		this.watchShow(this.show);
	}

	public render(): JSX.Element {
		return <SkeletonFC nameState={this.nameState} showState={this.showState} />;
	}
}
