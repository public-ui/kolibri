import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import { translate } from '../../../i18n';
import { trimLabel } from '../../../schema';
import { bem } from '../../../schema/bem-registry';

import type { ProgressVariantType } from '../../props';
import type { FunctionalComponentProps } from '../generic-types';
import { renderLabelWithLang } from '../span/component';
import type { ProgressApi } from './api';

const FULL_CIRCLE = 342;

const progressBem = bem.forBlock('kol-progress');

const CycleSvg: FC<{ max: number; value: number }> = ({ max, value }) => (
	<svg width="100" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
		<circle class={progressBem('cycle-background')} cx="60" cy="60" r="54.5" fill="currentColor" stroke="currentColor" stroke-width="8"></circle>
		<circle class={progressBem('cycle-whitespace')} cx="60" cy="60" r="59" fill="currentColor" stroke="currentColor" stroke-width="3"></circle>
		<circle class={progressBem('cycle-border')} cx="60" cy="60" r="59" fill="currentColor" stroke="currentColor" stroke-width="1"></circle>
		<circle class={progressBem('cycle-whitespace')} cx="60" cy="60" r="51" fill="currentColor" stroke="currentColor" stroke-width="1"></circle>
		<circle class={progressBem('cycle-border')} cx="60" cy="60" r="50" fill="currentColor" stroke="currentColor" stroke-width="1"></circle>
		<circle
			class={progressBem('cycle-progress')}
			fill="currentColor"
			stroke="currentColor"
			stroke-linecap="round"
			stroke-dasharray={`${Math.round((value / max) * FULL_CIRCLE)}px ${FULL_CIRCLE}px`}
			stroke-width="6"
			cx="60"
			cy="60"
			r="54.5"
		></circle>
	</svg>
);

const BarSvg: FC<{ max: number; value: number }> = ({ max, value }) => {
	const percentage = 100 * (value / max);
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="12" overflow="visible">
			<rect class={progressBem('bar-background')} x="1" y="1" height="11" rx="5" fill="currentColor" stroke="currentColor" stroke-width="3" width="100%"></rect>
			<rect class={progressBem('bar-border')} x="1" y="1" height="11" rx="5" fill="currentColor" stroke="currentColor" stroke-width="1" width="100%"></rect>
			<rect
				class={progressBem('bar-progress')}
				x="3"
				y="3"
				height="7"
				rx="3.5"
				fill="currentColor"
				stroke="currentColor"
				stroke-width="3"
				style={{ width: `calc(${percentage}% - 4px)` }}
			></rect>
		</svg>
	);
};

const createProgressSVG = (variant: ProgressVariantType, max: number, value: number) => {
	switch (variant) {
		case 'cycle':
			return <CycleSvg max={max} value={value} />;
		case 'bar':
			return <BarSvg max={max} value={value} />;
		default:
			throw new Error(`Progress variant ${variant as string} not implemented.`);
	}
};

export const ProgressFC: FC<FunctionalComponentProps<ProgressApi>> = (props) => {
	const { label, max, unit, value, variant, liveValue } = props;
	const isPercentage = unit === '%';
	const liveProgressValue = isPercentage ? `${Math.round((liveValue / max) * 100)}` : liveValue;
	const displayValue = isPercentage ? Math.round((value / max) * 100) : value;
	const valueColumnWidth = `${`${(isPercentage ? 100 : max) + 1}`.length}ch`;

	const liveValueText = isPercentage
		? translate('kol-live-value', { placeholders: { value: String(liveProgressValue), unit } })
		: translate('kol-live-value-bounded', { placeholders: { value: String(liveProgressValue), max: String(max), unit } });

	return (
		<div class={progressBem()}>
			<div aria-hidden="true" class={progressBem(variant === 'cycle' ? 'cycle' : 'bar')}>
				{variant === 'bar' && label && <div class={progressBem('bar-label')}>{renderLabelWithLang(label)}</div>}
				{createProgressSVG(variant, max, value)}
				{variant === 'cycle' && (
					<div class={progressBem('cycle-text')}>
						{label && <div class={progressBem('cycle-label')}>{renderLabelWithLang(label)}</div>}
						<div class={progressBem('cycle-value')}>{`${displayValue} ${unit}`}</div>
					</div>
				)}
				{variant === 'bar' && (
					<div class={progressBem('bar-value')} style={{ width: valueColumnWidth }}>
						{displayValue}
					</div>
				)}
				{variant === 'bar' && <div class={progressBem('bar-unit')}>{unit}</div>}
			</div>

			{/* https://css-tricks.com/html5-progress-element/ */}
			<progress aria-busy={value < max ? 'true' : 'false'} aria-label={trimLabel(label)} class="visually-hidden" max={max} value={value}></progress>
			<span aria-live="polite" aria-relevant="removals text" class="visually-hidden">
				{liveValueText}
			</span>
		</div>
	);
};
