import type { LabelProp, ShowProp, VariantSpinProp } from '../../props';
import { labelProp, showProp, variantSpinProp, withValidPropValue } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps } from '../generic-types';
import type { SpinApi } from './api';

export class SpinController extends BaseController<SpinApi> implements ControllerInterface<SpinApi> {
	public constructor(states: SpinApi['States']) {
		super(states, {
			label: '',
			show: false,
			variant: 'dot',
		});
	}

	public componentWillLoad(props: ResolvedInputProps<SpinApi>): void {
		const { label, show, variant } = props;
		this.watchShow(show);
		this.watchVariant(variant);
		this.watchLabel(label);
	}

	public watchShow(value?: boolean): void {
		const previousShow = this.getProps().show;
		withValidPropValue<ShowProp>(showProp, value, (v) => {
			this.setState('showToggled', previousShow === true && v === false);
			this.setProp('show', v);
		});
	}

	public watchLabel(value?: string): void {
		withValidPropValue<LabelProp>(labelProp, value, (v) => {
			this.setProp('label', v);
		});
	}

	public watchVariant(value?: string): void {
		withValidPropValue<VariantSpinProp>(variantSpinProp, value, (v) => {
			this.setProp('variant', v);
		});
	}
}
