import type { KolFocusOptions } from '../../../schema';
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

	public focus(options?: KolFocusOptions): void {
		if (this.buttonRef) {
			const { afterFocus, preventScroll, focusVisible, ...scrollOptions } = options ?? {};
			const hasScrollOptions = Object.keys(scrollOptions).length > 0;
			const shouldPreventScroll = preventScroll ?? hasScrollOptions;
			const focusOptions =
				preventScroll !== undefined || focusVisible !== undefined || hasScrollOptions ? { preventScroll: shouldPreventScroll, focusVisible } : undefined;
			this.buttonRef.focus(focusOptions);
			if (hasScrollOptions && shouldPreventScroll) {
				this.buttonRef.scrollIntoView(scrollOptions);
			}
			const root = this.buttonRef.getRootNode();
			const hasFocus = root instanceof ShadowRoot ? root.activeElement === this.buttonRef : document.activeElement === this.buttonRef;
			if (hasFocus) {
				// afterFocus is invoked synchronously here – unlike setFocus() which uses
				// IntersectionObserver for smooth-scroll completion, this internal component
				// cannot await async scroll due to architectural boundary constraints.
				afterFocus?.();
			}
		}
	}

	public setButtonRef = (element?: HTMLButtonElement): void => {
		this.buttonRef = element;
	};
}
