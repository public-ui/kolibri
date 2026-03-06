import type { ColorPair } from '../../../schema';
import { colorProp, initialsProp, labelProp, srcProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps } from '../generic-types';
import type { AvatarApi } from './api';

export class AvatarController extends BaseController<AvatarApi> implements ControllerInterface<AvatarApi> {
	public constructor(states: AvatarApi['States']) {
		super(states, {
			color: { backgroundColor: '#d3d3d3', foregroundColor: '#3f3f3f' },
			label: '',
			src: '',
		});
	}

	public componentWillLoad(props: ResolvedInputProps<AvatarApi>): void {
		const { color, label, src } = props;
		this.watchColor(color);
		this.watchLabel(label);
		this.watchSrc(src);
	}

	public watchColor(value?: string | ColorPair): void {
		colorProp.apply(value, (v) => {
			this.setProp('color', v);
		});
	}

	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => {
			this.setProp('label', v);
		});
		initialsProp.apply(value, (v) => {
			this.setState('initials', v);
		});
	}

	public watchSrc(value?: string): void {
		srcProp.apply(value, (v) => {
			this.setProp('src', v);
		});
	}
}
