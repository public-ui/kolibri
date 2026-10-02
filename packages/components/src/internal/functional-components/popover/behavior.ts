import { autoUpdate } from '@floating-ui/dom';
import { alignFloatingElements } from '../../../utils/align-floating-elements';
import { alignProp } from '../../props';
import { BaseBehavior } from '../base-behavior';
import type { BehaviorInterface, ResolvedInputProps, StateAccess } from '../generic-types';
import type { PopoverApi } from './api';
import { popoverPropsConfig } from './api';

/**
 * Shows and hides a native popover (`popover="auto"`) and keeps it aligned to its trigger element
 * while it is open.
 *
 * The open state is not kept here: the native popover reports it through its `toggle` event, which
 * the composing web component listens to, so a light dismiss (Escape, click outside) is reflected
 * as well.
 */
export class PopoverBehavior extends BaseBehavior<PopoverApi> implements BehaviorInterface<PopoverApi> {
	private show = false;
	private popoverElement?: HTMLDivElement;
	private arrowElement?: HTMLDivElement;
	private triggerElement?: HTMLElement;
	private cleanupAutoUpdate?: () => void;

	public constructor(stateAccess: StateAccess<PopoverApi>) {
		super(stateAccess, popoverPropsConfig);
	}

	public componentWillLoad(props: ResolvedInputProps<PopoverApi>): void {
		this.watchAlign(props.align);
	}

	public watchAlign(value?: string): void {
		alignProp.apply(value, (v) => {
			this.setRenderProp('align', v);
		});
	}

	/**
	 * Opens or closes the popover. A popover element that is not connected yet is toggled in the next
	 * animation frame, after the first render has attached it.
	 */
	public setShow(value: boolean): void {
		this.show = value;
		if (!this.popoverElement) {
			return;
		}

		if (this.popoverElement.isConnected) {
			this.toggleVisibility();
		} else {
			requestAnimationFrame(() => {
				this.toggleVisibility();
			});
		}
	}

	public setPopoverElementRef = (element?: HTMLDivElement): void => {
		this.popoverElement = element;
		this.arrowElement = element?.querySelector('.kol-popover__arrow') as HTMLDivElement | undefined;
	};

	public setTriggerElement = (element?: HTMLElement): void => {
		this.triggerElement = element;
	};

	public destroy(): void {
		this.cleanupAutoUpdate?.();
		this.cleanupAutoUpdate = undefined;
		this.popoverElement = undefined;
		this.arrowElement = undefined;
		this.triggerElement = undefined;
	}

	private toggleVisibility(): void {
		if (!this.popoverElement) {
			return;
		}
		const isOpen = this.popoverElement.matches(':popover-open');
		if (this.show) {
			if (!isOpen) {
				try {
					this.popoverElement.showPopover();
					this.setupAutoUpdate();
					void this.alignPopover();
				} catch {
					// Ignore DOMException if already open
				}
			}
		} else if (isOpen) {
			try {
				this.popoverElement.hidePopover();
				this.cleanupAutoUpdate?.();
				this.cleanupAutoUpdate = undefined;
			} catch {
				// Ignore DOMException if already closed
			}
		}
	}

	private alignPopover = async (): Promise<void> => {
		if (!this.popoverElement || !this.triggerElement) {
			return;
		}

		await alignFloatingElements({
			align: this.getRenderProp('align'),
			referenceElement: this.triggerElement,
			arrowElement: this.arrowElement,
			floatingElement: this.popoverElement,
		});
	};

	private setupAutoUpdate = (): void => {
		if (!this.popoverElement || !this.triggerElement || this.cleanupAutoUpdate) {
			return;
		}

		this.cleanupAutoUpdate = autoUpdate(this.triggerElement, this.popoverElement, () => {
			void this.alignPopover();
		});
	};
}
