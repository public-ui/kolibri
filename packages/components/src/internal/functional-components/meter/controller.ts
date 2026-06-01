import { clampedNumberValueProp, highProp, labelProp, lowProp, maxProp, minProp, optimumProp, orientationProp, unitProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps, StateAccess } from '../generic-types';
import type { MeterApi } from './api';
import { meterPropsConfig } from './api';

const LIVE_VALUE_DEBOUNCE_MS = 300;

type MeterData = {
	high: number | undefined;
	low: number | undefined;
	optimum: number | undefined;
};

export class MeterController extends BaseController<MeterApi> implements ControllerInterface<MeterApi> {
	private liveValueTimeout?: ReturnType<typeof setTimeout>;
	private meterData: MeterData = { high: undefined, low: undefined, optimum: undefined };

	public constructor(stateAccess: StateAccess<MeterApi>) {
		super(stateAccess, meterPropsConfig);
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

		// Set liveValue synchronously on initial load – no announcement needed, debounce not desired.
		clearTimeout(this.liveValueTimeout);
		this.liveValueTimeout = undefined;
		this.setState('liveValue', this.getRenderProp('value'));
	}

	public destroy(): void {
		clearTimeout(this.liveValueTimeout);
		this.liveValueTimeout = undefined;
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
			this.watchValue(this.getRawProp('value'));
		});
	}

	public watchMin(value?: number): void {
		minProp.apply(value, (v) => {
			this.setRenderProp('min', v);
			this.watchValue(this.getRawProp('value'));
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
		this.setRawProp('value', value);
		clampedNumberValueProp.apply(
			value,
			(v) => {
				this.setRenderProp('value', v);
				this.scheduleLiveValueUpdate(v);
			},
			{ min: this.getRenderProp('min'), max: this.getRenderProp('max') },
		);
	}

	private scheduleLiveValueUpdate(value: number): void {
		clearTimeout(this.liveValueTimeout);
		this.liveValueTimeout = setTimeout(() => {
			this.setState('liveValue', value);
			this.liveValueTimeout = undefined;
		}, LIVE_VALUE_DEBOUNCE_MS);
	}
}
