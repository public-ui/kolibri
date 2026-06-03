import type { KolFocusOptions } from '../../../schema';
import { setFocus } from '../../../utils/element-focus';
import { labelProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, ResolvedInputProps, StateAccess } from '../generic-types';
import type { ClickButtonApi } from './api';
import { clickButtonPropsConfig } from './api';

export class ClickButtonController extends BaseController<ClickButtonApi> implements ControllerInterface<ClickButtonApi> {
	private buttonRef?: HTMLButtonElement;

	public constructor(stateAccess: StateAccess<ClickButtonApi>) {
		super(stateAccess, clickButtonPropsConfig);
	}

	public componentWillLoad(props: ResolvedInputProps<ClickButtonApi>): void {
		const { label } = props;
		this.watchLabel(label);
	}

	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	public async focus(options?: KolFocusOptions): Promise<void> {
		return setFocus(this.buttonRef, options);
	}

	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => {
			this.setRenderProp('label', v);
		});
	}

	public handleClick = (): void => {
		// eslint-disable-next-line no-console
		console.log(this, this.buttonRef, 'button clicked');
	};

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.buttonRef = element;
	};
}
