import { clampedNumberValueProp, labelProp, maxProp, unitProp, variantProgressProp } from '../../props';
import type { ProgressVariantType } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps, StateAccess } from '../generic-types';
import type { ProgressApi } from './api';
import { progressPropsConfig } from './api';

export class ProgressController extends BaseController<ProgressApi> implements ControllerInterface<ProgressApi> {
	private interval?: ReturnType<typeof setInterval>;

	public constructor(stateAccess: StateAccess<ProgressApi>) {
		super(stateAccess, progressPropsConfig);
	}

	public componentWillLoad(props: ResolvedInputProps<ProgressApi>): void {
		const { label, max, unit, value, variant } = props;
		this.watchLabel(label);
		this.watchMax(max);
		this.watchUnit(unit);
		this.watchValue(value);
		this.watchVariant(variant);

		this.setState('liveValue', this.getRenderProp('value'));
		this.startLiveValueInterval();
	}

	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => {
			this.setRenderProp('label', v);
		});
	}

	public watchMax(value?: number): void {
		maxProp.apply(value, (v) => {
			this.setRenderProp('max', v);
			this.watchValue(this.getRawProp('value'));
		});
	}

	public watchUnit(value?: string): void {
		unitProp.apply(value, (v) => {
			this.setRenderProp('unit', v);
		});
	}

	public watchValue(value?: number): void {
		this.setRawProp('value', value);
		clampedNumberValueProp.apply(
			value,
			(v) => {
				this.setRenderProp('value', v);
			},
			{ min: 0, max: this.getRenderProp('max') },
		);
	}

	public watchVariant(value?: ProgressVariantType): void {
		variantProgressProp.apply(value, (v) => {
			this.setRenderProp('variant', v);
		});
	}

	// a11y: says the value of the component every 5s
	private startLiveValueInterval(): void {
		this.interval = setInterval(() => {
			const value = this.getRenderProp('value');
			this.setState('liveValue', value);
		}, 5000);
	}

	public destroy(): void {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = undefined;
		}
	}
}
