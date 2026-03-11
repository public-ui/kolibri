import { iconsProp, labelProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, GetStateFn, ResolvedProps, SetStateFn } from '../generic-types';
import type { IconApi } from './api';
import { iconPropsConfig } from './api';

export class IconController extends BaseController<IconApi> implements ControllerInterface<IconApi> {
	public constructor(setState: SetStateFn<IconApi>, getState: GetStateFn<IconApi>) {
		super(iconPropsConfig, setState, getState);
	}

	public componentWillLoad(props: ResolvedProps<IconApi>): void {
		const { icons, label } = props;
		this.watchIcons(icons);
		this.watchLabel(label);
	}

	public watchIcons(value?: string): void {
		iconsProp.apply(value, (v) => {
			this.setRenderProp('icons', v);
		});
	}

	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => {
			this.setRenderProp('label', v);
		});
	}
}
