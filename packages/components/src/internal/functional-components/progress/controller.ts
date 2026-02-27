import type { LabelProp, MaxProp, UnitProp, ValueProp, VariantProgressProp } from '../../props';
import { labelProp, maxProp, unitProp, valueProp, variantProgressProp, withValidPropValue } from '../../props';
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
		withValidPropValue<LabelProp>(labelProp, value, (v) => {
			this.setProp('label', v);
		});
	}

	public watchMax(value?: number): void {
		withValidPropValue<MaxProp>(maxProp, value, (v) => {
			this.setProp('max', v);
		});
	}

	public watchUnit(value?: string): void {
		withValidPropValue<UnitProp>(unitProp, value, (v) => {
			this.setProp('unit', v);
			this.setState('unit', v);
		});
	}

	public watchValue(value?: number): void {
		withValidPropValue<ValueProp>(valueProp, value, (v) => {
			this.setProp('value', v);
		});
	}

	public watchVariant(value?: string): void {
		withValidPropValue<VariantProgressProp>(variantProgressProp, value, (v) => {
			this.setProp('variant', v);
			this.setState('variant', v);
		});
	}

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
