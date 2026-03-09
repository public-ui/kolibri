import { iconsProp, labelProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedProps } from '../generic-types';
import type { IconApi } from './api';

export class IconController extends BaseController<IconApi> implements ControllerInterface<IconApi> {
	public constructor() {
		super({
			icons: 'kolicon-logo',
			label: '',
		});
	}

	public componentWillLoad(props: ResolvedProps<IconApi>): void {
		const { icons, label } = props;
		this.watchIcons(icons);
		this.watchLabel(label);
	}

	public watchIcons(value?: string): void {
		iconsProp.apply(
			value,
			(v) => {
				this.setRenderProp('icons', v);
			},
			this.getDefaultProp('icons'),
		);
	}

	public watchLabel(value?: string): void {
		labelProp.apply(
			value,
			(v) => {
				this.setRenderProp('label', v);
			},
			this.getDefaultProp('label'),
		);
	}
}
