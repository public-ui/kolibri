import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { JSXBase } from '@stencil/core/internal';
import clsx from '../../../utils/clsx';
import type { FunctionalComponentProps } from '../generic-types';
import { SpanFC } from '../span/component';
import type { TooltipApi } from './api';

export type TooltipFCProps = FunctionalComponentProps<TooltipApi> &
	JSXBase.HTMLAttributes<HTMLDivElement> & {
		id?: string;
		containerRef?: (el?: HTMLDivElement) => void;
		tooltipRef?: (el?: HTMLDivElement) => void;
		arrowRef?: (el?: HTMLDivElement) => void;
	};

export const TooltipFC: FC<TooltipFCProps> = (props) => {
	const { badgeText, id, label, containerRef, tooltipRef, arrowRef, class: classNames, ...htmlAttributes } = props;

	return (
		<div {...htmlAttributes} class={clsx('kol-tooltip', classNames)} ref={containerRef}>
			<div class="kol-tooltip__floating" hidden={!label} ref={tooltipRef}>
				<div class="kol-tooltip__arrow" ref={arrowRef} />
				<SpanFC class="kol-tooltip__content" id={id} badgeText={badgeText} label={label} />
			</div>
		</div>
	);
};
