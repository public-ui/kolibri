import type { FocusFunctionOptions } from '../../../schema';
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

	public watchLabel(value?: string): void {
		labelProp.apply(value, (v) => {
			this.setRenderProp('label', v);
		});
	}

	public handleClick = (): void => {
		// eslint-disable-next-line no-console
		console.log(this, this.buttonRef, 'button clicked');
	};

	public focus(options?: FocusFunctionOptions): void {
		if (this.buttonRef) {
			const { afterFocus, ...scrollOptions } = options ?? {};
			const hasScrollOptions = Object.keys(scrollOptions).length > 0;
			this.buttonRef.focus(hasScrollOptions ? { preventScroll: true } : undefined);
			if (hasScrollOptions) {
				this.buttonRef.scrollIntoView(scrollOptions);
			}
			afterFocus?.();
		}
	}

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.buttonRef = element;
	};
}
