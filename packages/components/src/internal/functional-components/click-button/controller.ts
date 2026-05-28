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
			const { afterFocus, preventScroll, ...scrollOptions } = options ?? {};
			const hasScrollOptions = Object.keys(scrollOptions).length > 0;
			const shouldPreventScroll = preventScroll ?? (hasScrollOptions ? true : false);
			const focusOptions: FocusOptions | undefined =
				preventScroll !== undefined || hasScrollOptions
					? { preventScroll: shouldPreventScroll }
					: undefined;
			this.buttonRef.focus(focusOptions);
			if (hasScrollOptions) {
				this.buttonRef.scrollIntoView(scrollOptions);
			}
			// afterFocus is invoked synchronously here – unlike setFocus() which uses
			// IntersectionObserver for smooth-scroll completion, this internal component
			// cannot await async scroll due to architectural boundary constraints.
			afterFocus?.();
		}
	}

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.buttonRef = element;
	};
}
