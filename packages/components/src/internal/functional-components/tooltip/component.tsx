import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { TooltipAlignPropType } from '../../../schema';
import type { FunctionalComponentProps } from '../generic-types';
import { SpanFC } from '../span/component';
import type { TooltipApi } from './api';

type TooltipFCProps = Pick<FunctionalComponentProps<TooltipApi>, 'label'> & {
	badgeText?: string;
	id?: string;
	align?: TooltipAlignPropType;
	refFloating: (el?: HTMLDivElement) => void;
};

export const TooltipFC: FC<TooltipFCProps> = ({ label, badgeText, id, refFloating }) => {
	return (
		<div class="kol-tooltip__floating" hidden={label.length === 0} ref={refFloating}>
			<div class="kol-tooltip__arrow"  />
			<SpanFC class="kol-tooltip__content" id={id || undefined} badgeText={badgeText} label={label} />
		</div>
	);
};
