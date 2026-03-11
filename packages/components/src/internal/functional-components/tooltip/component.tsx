import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { FunctionalComponentProps } from '../generic-types';
import { SpanFC } from '../span/component';
import type { TooltipApi } from './api';

export const TooltipFC: FC<FunctionalComponentProps<TooltipApi>> = (props) => {
	const { badgeText, id, label, refArrowElement, refTooltipElement } = props;

	return (
		<div class="kol-tooltip">
			<div class="kol-tooltip__floating" hidden={label.length === 0} ref={refTooltipElement}>
				<div class="kol-tooltip__arrow" ref={refArrowElement} />
				<SpanFC class="kol-tooltip__content" id={id} badgeText={badgeText} label={label} />
			</div>
		</div>
	);
};
