import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';

import { BaseWebComponent } from '../base-web-component';
import { ButtonFC } from './component';
import type { ButtonClickHandlingResult } from './controller';
import { ButtonController } from './controller';

export type RenderButtonFCOptions = {
	/** Additional classes for the BEM root node (e.g. 'kol-toolbar__item'). */
	class?: string;
	/** Optional test id forwarded onto the BEM root node. */
	dataTestId?: string;
	/** Optional hidden attribute forwarded onto the BEM root node. */
	hidden?: boolean;
	/** Optional aria-current forwarded onto the inner button element. */
	ariaCurrent?: string;
	/**
	 * Invoked after the controller handled the click (callbacks, tooltip, disabled
	 * guard). Embedding components use it for host concerns such as form
	 * propagation or dispatching their own events.
	 */
	onClick?: (event: MouseEvent, result: ButtonClickHandlingResult) => void;
	/** Receives the inner button element in addition to the controller's tooltip wiring. */
	refButton?: (el?: HTMLButtonElement) => void;
};

/**
 * Shared ButtonFC prop-wiring for components that embed a button driven by a
 * {@link ButtonController} (the counterpart of `renderLinkFC` for links).
 */
export const renderButtonFC = (ctrl: ButtonController, options: RenderButtonFCOptions = {}): JSX.Element => (
	<ButtonFC
		class={options.class}
		data-testid={options.dataTestId}
		hidden={options.hidden}
		ariaCurrent={options.ariaCurrent}
		accessKey={ctrl.getRenderProp('accessKey')}
		ariaControls={ctrl.getRenderProp('ariaControls')}
		ariaDescription={ctrl.getRenderProp('ariaDescription')}
		ariaExpanded={ctrl.getRenderProp('ariaExpanded')}
		ariaSelected={ctrl.getRenderProp('ariaSelected')}
		customClass={ctrl.getRenderProp('customClass')}
		disabled={ctrl.getRenderProp('disabled')}
		hideLabel={ctrl.getRenderProp('hideLabel')}
		icons={ctrl.getRenderProp('icons')}
		id={ctrl.getRenderProp('id')}
		inline={ctrl.getRenderProp('inline')}
		label={ctrl.getRenderProp('label')}
		name={ctrl.getRenderProp('name')}
		on={ctrl.getRenderProp('on')}
		role={ctrl.getRenderProp('role')}
		shortKey={ctrl.getRenderProp('shortKey')}
		tabIndex={ctrl.getRenderProp('tabIndex')}
		tooltipAlign={ctrl.getRenderProp('tooltipAlign')}
		type={ctrl.getRenderProp('type')}
		variant={ctrl.getRenderProp('variant')}
		handleClick={(event) => {
			const result = ctrl.handleClick(event);
			options.onClick?.(event, result);
		}}
		handleMouseDown={ctrl.handleMouseDown}
		handleFocus={ctrl.handleFocus}
		handleBlur={ctrl.handleBlur}
		refButton={(el) => {
			ctrl.setButtonRef(el);
			options.refButton?.(el);
		}}
		refTooltipFloating={ctrl.setTooltipFloatingRef}
		tooltipId={ctrl.getTooltipId()}
	/>
);

/**
 * Module-level cache of button controllers for FunctionalComponent-embedded
 * buttons that cannot own a controller themselves (pure FCs with no instance).
 * Keyed by a caller-provided stable id so the controller — and therefore its
 * tooltip listener identity — survives re-renders.
 */
const embeddedButtonControllers = new Map<string, ButtonController>();

export function getEmbeddedButtonController(key: string): ButtonController {
	let ctrl = embeddedButtonControllers.get(key);
	if (!ctrl) {
		ctrl = new ButtonController(BaseWebComponent.stateLess);
		embeddedButtonControllers.set(key, ctrl);
	}
	return ctrl;
}
