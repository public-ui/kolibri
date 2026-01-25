import { iconsProp, type IconsPropType } from '../../schema/props/icons';
import { labelProp, type LabelPropType } from '../../schema/props/label';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedProps } from '../generic-types';
import type { IconApi } from './api';

export class IconController extends BaseController<ResolvedProps<IconApi>, IconApi['States']> implements ControllerInterface<IconApi> {
	public constructor(states: IconApi['States'] = {}) {
		super(states, {
			icons: 'kolicon-logo',
			label: '',
		});
	}

	public componentWillLoad(props: ResolvedProps<IconApi>): void {
		const { icons, label } = props;
		this.watchIcons(icons);
		this.watchLabel(label);
	}

	public watchIcons(value?: IconsPropType): void {
		const normalized = iconsProp.normalize(value);
		if (iconsProp.validate(normalized)) {
			this.setProp('icons', normalized);
		}
	}

	public watchLabel(value?: LabelPropType): void {
		const normalized = labelProp.normalize(value);
		if (labelProp.validate(normalized)) {
			this.setProp('label', normalized);
		}
	}
}
