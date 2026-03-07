import { clampedNumberValueProp, labelProp, maxProp, unitProp, variantProgressProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps } from '../generic-types';
import type { ProgressApi } from './api';

export class ProgressController extends BaseController<ProgressApi> implements ControllerInterface<ProgressApi> {
	private interval?: ReturnType<typeof setInterval>;

	public constructor(states: ProgressApi['States']) {
		super(states, {
			label: '',
			max: 100,
			unit: '%',
			value: 0,
			variant: 'bar',
		});
	}

	public componentWillLoad(props: ResolvedInputProps<ProgressApi>): void {
		const { label, max, unit, value, variant } = props;
		this.watchLabel(label);
		this.watchMax(max);
		this.watchUnit(unit);
		this.watchValue(value);
		this.watchVariant(variant);

		this.setState('liveValue', this.getProps().value);
		this.startLiveValueInterval();
	}

	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => {
			this.setProp('label', v);
		});
	}

	public watchMax(value?: number): void {
		maxProp.apply(value, (v) => {
			this.setProp('max', v);
		});
		const currentValue = this.getProps().value;
		if (currentValue !== undefined) {
			this.watchValue(currentValue);
		}
	}

	public watchUnit(value?: string): void {
		unitProp.apply(value, (v) => {
			this.setProp('unit', v);
		});
	}

	public watchValue(value?: number): void {
		clampedNumberValueProp.apply(
			value,
			(v) => {
				this.setProp('value', v);
			},
			{ min: 0, max: this.getProps().max },
		);
	}

	public watchVariant(value?: string): void {
		variantProgressProp.apply(value, (v) => {
			this.setProp('variant', v);
		});
	}

	// a11y: says the value of the component every 5s
	private startLiveValueInterval(): void {
		this.interval = setInterval(() => {
			const { value } = this.getProps();
			if (this.component.liveValue !== value) {
				this.setState('liveValue', value);
			}
		}, 5000);
	}

	public destroy(): void {
		if (this.interval) {
			clearInterval(this.interval);
			this.interval = undefined;
		}
	}
}
