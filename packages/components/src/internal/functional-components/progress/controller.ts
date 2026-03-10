import { clampedNumberValueProp, labelProp, maxProp, unitProp, variantProgressProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps, SetStateFn } from '../generic-types';
import type { ProgressApi } from './api';

export class ProgressController extends BaseController<ProgressApi> implements ControllerInterface<ProgressApi> {
	private interval?: ReturnType<typeof setInterval>;

	public constructor(setState: SetStateFn<ProgressApi>) {
		super(
			{
				label: '',
				max: 100,
				unit: '%',
				value: 0,
				variant: 'bar',
			},
			setState,
		);
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
		labelProp.apply(
			value,
			(v) => {
				this.setRenderProp('label', v);
			},
			this.getDefaultProp('label'),
		);
	}

	public watchMax(value?: number): void {
		maxProp.apply(
			value,
			(v) => {
				this.setRenderProp('max', v);
				this.watchValue(this.getRawProp('value'));
			},
			this.getDefaultProp('max'),
		);
	}

	public watchUnit(value?: string): void {
		unitProp.apply(
			value,
			(v) => {
				this.setRenderProp('unit', v);
			},
			this.getDefaultProp('unit'),
		);
	}

	public watchValue(value?: number): void {
		this.setRawProp('value', value);
		clampedNumberValueProp.apply(
			value,
			(v) => {
				this.setRenderProp('value', v);
			},
			{ min: 0, max: this.getRenderProp('max') },
			this.getDefaultProp('value'),
		);
	}

	public watchVariant(value?: string): void {
		variantProgressProp.apply(
			value,
			(v) => {
				this.setRenderProp('variant', v);
			},
			this.getDefaultProp('variant'),
		);
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
