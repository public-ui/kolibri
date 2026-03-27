import { highProp, labelProp, lowProp, maxProp, minProp, numberValueProp, optimumProp, orientationProp, unitProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, GetStateFn, ResolvedInputProps, SetStateFn } from '../generic-types';
import type { MeterApi } from './api';
import { meterPropsConfig } from './api';

type MeterData = {
	high: number | undefined;
	low: number | undefined;
	optimum: number | undefined;
};

export class MeterController extends BaseController<MeterApi> implements ControllerInterface<MeterApi> {
	private interval?: ReturnType<typeof setInterval>;
	private meterData: MeterData = { high: undefined, low: undefined, optimum: undefined };

	public constructor(setState: SetStateFn<MeterApi>, getState: GetStateFn<MeterApi>) {
		super(meterPropsConfig, setState, getState);
	}

	public componentWillLoad(props: ResolvedInputProps<MeterApi>): void {
		const { high, label, low, max, min, optimum, orientation, unit, value } = props;
		this.watchHigh(high);
		this.watchLabel(label);
		this.watchLow(low);
		this.watchMax(max);
		this.watchMin(min);
		this.watchOptimum(optimum);
		this.watchOrientation(orientation);
		this.watchUnit(unit);
		this.watchValue(value);

		this.setState('liveValue', this.getRenderProp('value'));
		this.startLiveValueInterval();
	}

	public destroy(): void {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = undefined;
		}
	}

	public getMeterData(): MeterData {
		return this.meterData;
	}

	public watchHigh(value?: number): void {
		if (value === undefined) {
			this.meterData.high = undefined;
		} else {
			highProp.apply(value, (v) => {
				this.meterData.high = v;
			});
		}
	}

	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => {
			this.setRenderProp('label', v);
		});
	}

	public watchLow(value?: number): void {
		if (value === undefined) {
			this.meterData.low = undefined;
		} else {
			lowProp.apply(value, (v) => {
				this.meterData.low = v;
			});
		}
	}

	public watchMax(value?: number): void {
		maxProp.apply(value, (v) => {
			this.setRenderProp('max', v);
		});
	}

	public watchMin(value?: number): void {
		minProp.apply(value, (v) => {
			this.setRenderProp('min', v);
		});
	}

	public watchOptimum(value?: number): void {
		if (value === undefined) {
			this.meterData.optimum = undefined;
		} else {
			optimumProp.apply(value, (v) => {
				this.meterData.optimum = v;
			});
		}
	}

	public watchOrientation(value?: string): void {
		orientationProp.apply(value, (v) => {
			this.setRenderProp('orientation', v);
		});
	}

	public watchUnit(value?: string): void {
		unitProp.apply(value, (v) => {
			this.setRenderProp('unit', v);
		});
	}

	public watchValue(value?: number): void {
		numberValueProp.apply(value, (v) => {
			this.setRenderProp('value', v);
		});
	}

	private startLiveValueInterval(): void {
		this.interval = setInterval(() => {
			const value = this.getRenderProp('value');
			if (this.getState('liveValue') !== value) {
				this.setState('liveValue', value);
			}
		}, 5000);
	}
}
