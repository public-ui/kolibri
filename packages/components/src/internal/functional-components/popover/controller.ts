import { alignProp, showProp } from '../../props';
import { BaseController } from '../base-controller';
import type { ControllerInterface, GetStateFn, ResolvedInputProps, SetStateFn } from '../generic-types';
import type { PopoverApi } from './api';
import { popoverPropsConfig } from './api';

/**
 * PopoverController manages the state and logic for the popover functional component.
 *
 * Responsibilities:
 * - Normalize and validate incoming props (align, show)
 * - Manage visibility control through show prop (W3C standard)
 * - Provide render props for the functional component
 * - Handle ref setters for DOM elements (popoverElement, arrowElement)
 */
export class PopoverController extends BaseController<PopoverApi> implements ControllerInterface<PopoverApi> {
	/**
	 * Cached reference to the popover element
	 * Used for state updates and positioning calculations when align prop changes
	 */
	private popoverElement?: HTMLDivElement;

	public constructor(setState: SetStateFn<PopoverApi>, getState: GetStateFn<PopoverApi>) {
		super(popoverPropsConfig, setState, getState);
	}

	/**
	 * Initialize the controller with props during component load
	 */
	public componentWillLoad(props: ResolvedInputProps<PopoverApi>): void {
		const { align, show } = props;
		this.watchAlign(align);
		this.watchShow(show);
	}

	/**
	 * Watch and normalize the align prop
	 * Stores the normalized align value and triggers re-align if needed
	 */
	public watchAlign(value?: string): void {
		alignProp.apply(value, (v) => {
			this.setRenderProp('align', v);
			// If popover element is available, web component can trigger alignment logic
			// Note: actual alignment logic is handled in the web component
			// since it manages the floating-ui integration
			if (this.popoverElement) {
				// Alignment will be recalculated by the web component's observer
			}
		});
	}

	/**
	 * Watch and normalize the show prop
	 * Updates the render prop for the functional component
	 */
	public watchShow(value?: boolean): void {
		showProp.apply(value, (v) => {
			this.setRenderProp('show', v);
		});
	}

	/**
	 * Ref setter for the popover element (div with popover="auto")
	 * Caches the element for use in state updates and alignment calculations
	 */
	public setPopoverElementRef = (element?: HTMLDivElement): void => {
		this.popoverElement = element;
	};

	/**
	 * Ref setter for the arrow element (decorative directional indicator)
	 * TODO: Use for positioning calculations when floating-ui integration is needed
	 */
	public setArrowElementRef = (element?: HTMLDivElement): void => {
		// Arrow element reference for future positioning calculations
		void element;
	};
}
