import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';

import type { FunctionalComponentProps } from '../../../../internals/src/controller/generic-types';
import type { TooltipApi } from '../../../../internals/src/controller/tooltip/api';
import { bem } from '../../../../internals/src/schema/bem-registry';
import type { TooltipAlignPropType } from '../../../../internals/src/schema/index';
import { SpanFC } from '../span/component';

type TooltipFCProps = Pick<FunctionalComponentProps<TooltipApi>, 'label'> & {
	badgeText?: string;
	id?: string;
	align?: TooltipAlignPropType;
	refFloating: (el?: HTMLDivElement) => void;
};

const tooltipBem = bem.forBlock('kol-tooltip');

export const TooltipFC: FC<TooltipFCProps> = ({ label, badgeText, id, refFloating }) => {
	return (
		<div class={tooltipBem('floating')} hidden={!label} ref={refFloating}>
			<div class={tooltipBem('arrow')} />
			<SpanFC class={tooltipBem('content')} badgeText={badgeText} id={id} label={label} />
		</div>
	);
};
