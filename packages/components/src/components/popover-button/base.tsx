import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';

import { PopoverButtonFC } from '../../internal/functional-components/popover-button/component';
import { PopoverController } from '../../internal/functional-components/popover/controller';
import { popoverAlignProp } from '../../internal/props';
import type { PopoverAlignPropType } from '../../schema';
import { createUniqueId } from '../../utils/dev.utils';
import { BaseButtonWebComponent } from '../button/base';

/**
 * Shared orchestrator implementation for the popover button elements: the public
 * `kol-popover-button` and the transitional `kol-popover-button-wc`.
 *
 * Extends the button orchestration (`BaseButtonWebComponent`) with the popover: the button's
 * click is reserved for toggling the popover, and the open state is derived from the native
 * popover `toggle` event so modifier and `aria-expanded` always match the real popover state.
 */
export abstract class BasePopoverButtonWebComponent extends BaseButtonWebComponent {
	private readonly popoverCtrl = new PopoverController();
	private popoverElement?: HTMLDivElement;

	/**
	 * The popover alignment lives outside the button render-prop store: the shared button base is
	 * typed over `ButtonApi`, which does not know this key. Seeded with the `_popoverAlign` default.
	 */
	private popoverAlign: PopoverAlignPropType = 'bottom';

	/**
	 * DOM id of the popover element, referenced by the button's aria-controls attribute. Public
	 * because the concrete elements expose it through their web component interface; it is not a
	 * `@State()` field since it never changes after creation.
	 */
	public readonly popoverId = createUniqueId('popover');

	/**
	 * The concrete element owns `popoverOpen` as a `@State()` field; this shared base is typed
	 * over the button API, whose state bucket does not carry it, so access goes through a cast.
	 */
	private getPopoverOpen(): boolean {
		return (this as unknown as { popoverOpen?: boolean }).popoverOpen === true;
	}

	private setPopoverOpen(open: boolean): void {
		(this as unknown as { popoverOpen: boolean }).popoverOpen = open;
	}

	private readonly togglePopover = (): void => {
		this.popoverCtrl.setShow(!this.getPopoverOpen());
	};

	private readonly handleToggle = (event: Event): void => {
		this.setPopoverOpen((event as ToggleEvent).newState === 'open');
	};

	protected readonly setButtonElementRef = (element?: HTMLButtonElement): void => {
		this.ctaRef(element);
		this.popoverCtrl.setTriggerElement(element);
	};

	protected readonly setPopoverElementRef = (element?: HTMLDivElement): void => {
		this.popoverElement = element;
		this.popoverCtrl.setPopoverElementRef(element);
	};

	// --- Lifecycle helpers (called from the concrete element's lifecycle methods) ---

	/**
	 * Seeds the render props. Call first in `componentWillLoad`, before the prop watchers run.
	 *
	 * The click callback is installed here and never replaced: the popover button exposes no
	 * `_on` prop, so the button click always toggles the popover (and only that).
	 */
	protected initPopoverButtonRenderProps(): void {
		this.initButtonRenderProps();
		this.applyOn({ onClick: this.togglePopover });
	}

	/** Call from `componentDidRender`. */
	protected syncPopoverToggleListener(): void {
		// addEventListener is idempotent for an identical listener, so per-render calls are safe.
		if (this.popoverElement) {
			this.popoverElement.addEventListener('toggle', this.handleToggle);
		}
	}

	/** Call from `disconnectedCallback`. */
	protected destroyPopover(): void {
		if (this.popoverElement) {
			this.popoverElement.removeEventListener('toggle', this.handleToggle);
			this.popoverElement = undefined;
		}
		this.popoverCtrl.destroy();
	}

	/**
	 * Shows the popover programmatically by calling the PopoverController.
	 *
	 * Refused while the button is disabled: the trigger is a `<button disabled>`, so no user
	 * interaction can open the popover, and the programmatic path must not be the one way around
	 * that. `closePopover()` stays unguarded — closing is always safe.
	 */
	protected openPopover(): void {
		if (this.getRenderProp('disabled') === true) {
			return;
		}
		this.popoverCtrl.setShow(true);
	}

	/**
	 * Hides the popover programmatically by calling the PopoverController.
	 */
	protected closePopover(): void {
		this.popoverCtrl.setShow(false);
	}

	// --- Prop application ---

	protected applyPopoverAlign(value?: PopoverAlignPropType): void {
		popoverAlignProp.apply(value, (v) => {
			this.popoverAlign = v;
			this.popoverCtrl.setAlign(v);
		});
	}

	// --- Render ---

	/** Renders `PopoverButtonFC` from the current render props and state. */
	protected renderPopoverButtonFC(): JSX.Element {
		return (
			<PopoverButtonFC
				accessKey={this.getRenderProp('accessKey')}
				ariaDescription={this.getRenderProp('ariaDescription')}
				ariaDescriptionId={this.getState('ariaDescriptionId')}
				ariaHasPopup={this.getRenderProp('ariaHasPopup')}
				ariaSelected={this.getRenderProp('ariaSelected')}
				customClass={this.getRenderProp('customClass')}
				disabled={this.getRenderProp('disabled')}
				handleBlur={this.handleBlur}
				handleClick={this.handleClick}
				handleFocus={this.handleFocus}
				handleMouseDown={this.handleMouseDown}
				hideLabel={this.getRenderProp('hideLabel')}
				icons={this.getRenderProp('icons')}
				id={this.getRenderProp('id')}
				inline={this.getRenderProp('inline')}
				label={this.getRenderProp('label')}
				name={this.getRenderProp('name')}
				on={this.getRenderProp('on')}
				popoverAlign={this.popoverAlign}
				popoverOpen={this.getPopoverOpen()}
				popoverId={this.popoverId}
				refButton={this.setButtonElementRef}
				refPopover={this.setPopoverElementRef}
				refTooltip={this.tooltipBehavior.setTooltipElementRef}
				role={this.getRenderProp('role')}
				shortKey={this.getRenderProp('shortKey')}
				tabIndex={this.getRenderProp('tabIndex')}
				tooltipAlign={this.getRenderProp('tooltipAlign')}
				type={this.getRenderProp('type')}
				variant={this.getRenderProp('variant')}
			/>
		);
	}
}
