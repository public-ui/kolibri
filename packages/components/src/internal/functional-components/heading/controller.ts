import type { HeadingLevel, LabelWithExpertSlotProp, LevelProp, SecondaryHeadlineProp } from '../../props';
import { labelWithExpertSlotProp, levelProp, secondaryHeadlineProp, withValidPropValue } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps } from '../generic-types';
import type { HeadingApi } from './api';

export class HeadingController extends BaseController<HeadingApi> implements ControllerInterface<HeadingApi> {
	public constructor(states: HeadingApi['States'] = {}) {
		super(states, {
			label: '',
			level: 0 as HeadingLevel,
			secondaryHeadline: '',
		});
	}

	public componentWillLoad(props: ResolvedInputProps<HeadingApi>): void {
		const { label, level, secondaryHeadline } = props;
		this.watchLabel(label);
		this.watchLevel(level);
		this.watchSecondaryHeadline(secondaryHeadline);
	}

	public watchLabel(value?: string): void {
		withValidPropValue<LabelWithExpertSlotProp>(labelWithExpertSlotProp, value, (v) => {
			this.setProp('label', v);
		});
	}

	public watchLevel(value?: HeadingLevel): void {
		withValidPropValue<LevelProp>(levelProp, value, (v) => {
			this.setProp('level', v);
		});
	}

	public watchSecondaryHeadline(value?: string): void {
		withValidPropValue<SecondaryHeadlineProp>(secondaryHeadlineProp, value, (v) => {
			this.setProp('secondaryHeadline', v);
		});
	}
}
