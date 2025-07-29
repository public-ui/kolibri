import { Component, Prop, State, Watch } from '@stencil/core';
import { SkeletonController } from './internal/functional-components/skeleton/controller';
import type { NameProp, NamePropType } from './internal/functional-components/skeleton/schema/props/name';

type Props = NameProp;

type State = {
	nameState: NamePropType;
};

@Component({
	tag: 'skeleton-component',
	styleUrl: 'component.css',
	scoped: true,
})
export class SkeletonComponent implements Props, State {
	private controller: SkeletonController<{
		nameState: NamePropType;
	}> = new SkeletonController(this);

	@Prop()
	public name: NamePropType = 'SkeletonComponent';

	@State()
	private stateName: NamePropType = undefined;

	@Watch('name')
	protected watchName(value: NamePropType) {
		this.controller.watchName(value);
	}
}
