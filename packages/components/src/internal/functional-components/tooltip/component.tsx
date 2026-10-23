import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { TooltipAlignPropType } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import type { FunctionalComponentProps } from '../generic-types';
import { SpanFC } from '../span/component';
import type { TooltipApi } from './api';

type TooltipFCProps = Pick<FunctionalComponentProps<TooltipApi>, 'label'> & {
	badgeText?: string;
	id?: string;
	align?: TooltipAlignPropType;
	refFloating: (el?: HTMLDivElement) => void;
};

const tooltipBem = bem.forBlock('kol-tooltip');

export const TooltipFC: FC<TooltipFCProps> = ({ label, badgeText, id, refFloating }) => {
	return (
		<div class={tooltipBem('floating')} hidden={label.length === 0} ref={refFloating}>
			<div class={tooltipBem('arrow')} />
			<SpanFC class={tooltipBem('content')} badgeText={badgeText} id={id} label={label} />
		</div>
	);
};
