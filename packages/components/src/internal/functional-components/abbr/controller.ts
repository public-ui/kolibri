import { labelProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps, StateAccess } from '../generic-types';
import type { AbbrApi } from './api';
import { abbrPropsConfig } from './api';

export class AbbrController extends BaseController<AbbrApi> implements ControllerInterface<AbbrApi> {
	public constructor(stateAccess: StateAccess<AbbrApi>) {
		super(stateAccess, abbrPropsConfig);
	}

	public componentWillLoad(props: ResolvedInputProps<AbbrApi>): void {
		this.watchLabel(props.label);
	}

	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => {
			this.setRenderProp('label', v);
		});
	}
}
