import { labelProp, showProp, variantSpinProp, type SpinVariantType } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps, StateAccess } from '../generic-types';
import type { SpinApi } from './api';
import { spinPropsConfig } from './api';

export class SpinController extends BaseController<SpinApi> implements ControllerInterface<SpinApi> {
	public constructor(stateAccess: StateAccess<SpinApi>) {
		super(stateAccess, spinPropsConfig);
	}

	public componentWillLoad(props: ResolvedInputProps<SpinApi>): void {
		const { show, label, variant } = props;
		this.watchShow(show);
		this.watchLabel(label);
		this.watchVariant(variant);
	}

	public watchShow(value?: boolean): void {
		showProp.apply(value, (v) => {
			const previousShow = this.getRenderProp('show');
			this.setRenderProp('show', v);
			// Emit done state only when the spinner toggles from visible to hidden,
			// so screen readers receive a completion announcement once.
			this.setState('showToggled', previousShow === true && v === false);
		});
	}

	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => {
			this.setRenderProp('label', v);
		});
	}

	public watchVariant(value?: SpinVariantType): void {
		variantSpinProp.apply(value, (v) => {
			this.setRenderProp('variant', v);
		});
	}
}
