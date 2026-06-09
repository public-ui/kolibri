import { translate } from '../../../i18n';
import type { SpinVariantType } from '../../props';
import { labelProp, showProp, variantSpinProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps, StateAccess } from '../generic-types';
import type { SpinApi } from './api';
import { spinPropsConfig } from './api';

export class SpinController extends BaseController<SpinApi> implements ControllerInterface<SpinApi> {
	private readonly translateActionRunning: string = translate('kol-action-running');
	private readonly translateActionDone: string = translate('kol-action-done');

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

	public handleGetTranslateActionRunning = (): string => {
		return this.translateActionRunning;
	};

	public handleGetTranslateActionDone = (): string => {
		return this.translateActionDone;
	};
}
