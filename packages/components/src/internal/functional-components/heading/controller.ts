import { labelWithExpertSlotProp, levelProp, secondaryHeadlineProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, GetStateFn, ResolvedInputProps, SetStateFn } from '../generic-types';
import type { HeadingApi } from './api';
import { headingPropsConfig } from './api';

export class HeadingController extends BaseController<HeadingApi> implements ControllerInterface<HeadingApi> {
	public constructor(setState: SetStateFn<HeadingApi>, getState: GetStateFn<HeadingApi>) {
		super(headingPropsConfig, setState, getState);
	}

	public componentWillLoad(props: ResolvedInputProps<HeadingApi>): void {
		const { label, level, secondaryHeadline } = props;
		this.watchLabel(label);
		this.watchLevel(level);
		this.watchSecondaryHeadline(secondaryHeadline);
	}

	public watchLabel(value?: string): void {
		labelWithExpertSlotProp.apply(value, (v) => {
			this.setRenderProp('label', v);
		});
	}

	public watchLevel(value?: number): void {
		levelProp.apply(value, (v) => {
			this.setRenderProp('level', v);
		});
	}

	public watchSecondaryHeadline(value?: string): void {
		secondaryHeadlineProp.apply(value, (v) => {
			this.setRenderProp('secondaryHeadline', v);
		});
	}
}
