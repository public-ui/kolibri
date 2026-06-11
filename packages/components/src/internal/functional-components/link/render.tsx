import type { JSX } from '@stencil/core';
import { h } from '@stencil/core';

import { LinkFC } from './component';
import type { LinkController } from './controller';

/** Shared LinkFC prop-wiring for the kol-link and kol-link-button web components. */
export const renderLinkFC = (ctrl: LinkController, ariaCurrent: string, onAnchorClick: (event: MouseEvent | KeyboardEvent) => void): JSX.Element => (
	<LinkFC
		accessKey={ctrl.getRenderProp('accessKey')}
		ariaControls={ctrl.getRenderProp('ariaControls')}
		ariaCurrent={ariaCurrent}
		ariaCurrentValue={ctrl.getRenderProp('ariaCurrentValue')}
		ariaDescription={ctrl.getRenderProp('ariaDescription')}
		ariaExpanded={ctrl.getRenderProp('ariaExpanded')}
		ariaOwns={ctrl.getRenderProp('ariaOwns')}
		customClass={ctrl.getRenderProp('customClass')}
		disabled={ctrl.getRenderProp('disabled')}
		download={ctrl.getRenderProp('download')}
		hideLabel={ctrl.getRenderProp('hideLabel')}
		href={ctrl.getRenderProp('href')}
		icons={ctrl.getRenderProp('icons')}
		inline={ctrl.getRenderProp('inline')}
		label={ctrl.getRenderProp('label')}
		on={ctrl.getRenderProp('on')}
		role={ctrl.getRenderProp('role')}
		shortKey={ctrl.getRenderProp('shortKey')}
		tabIndex={ctrl.getRenderProp('tabIndex')}
		target={ctrl.getRenderProp('target')}
		tooltipAlign={ctrl.getRenderProp('tooltipAlign')}
		variant={ctrl.getRenderProp('variant')}
		onAnchorClick={onAnchorClick}
		tooltipId={ctrl.getTooltipId()}
		refTooltipFloating={ctrl.setTooltipRef}
		refAnchor={(el) => ctrl.setAnchorRef(el)}
	/>
);
