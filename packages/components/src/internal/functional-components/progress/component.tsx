import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import { translate } from '../../../i18n';

import type { ProgressVariantType } from '../../props';
import type { FunctionalComponentProps } from '../generic-types';
import type { ProgressApi } from './api';

const FULL_CIRCLE = 342;

const CycleSvg: FC<{ max: number; value: number }> = ({ max, value }) => (
	<svg width="100" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
		<circle class="kol-progress__cycle-background" cx="60" cy="60" r="54.5" fill="currentColor" stroke="currentColor" stroke-width="8"></circle>
		<circle class="kol-progress__cycle-whitespace" cx="60" cy="60" r="59" fill="currentColor" stroke="currentColor" stroke-width="3"></circle>
		<circle class="kol-progress__cycle-border" cx="60" cy="60" r="59" fill="currentColor" stroke="currentColor" stroke-width="1"></circle>
		<circle class="kol-progress__cycle-whitespace" cx="60" cy="60" r="51" fill="currentColor" stroke="currentColor" stroke-width="1"></circle>
		<circle class="kol-progress__cycle-border" cx="60" cy="60" r="50" fill="currentColor" stroke="currentColor" stroke-width="1"></circle>
		<circle
			class="kol-progress__cycle-progress"
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
			<rect class="kol-progress__bar-background" x="1" y="1" height="11" rx="5" fill="currentColor" stroke="currentColor" stroke-width="3" width="100%"></rect>
			<rect class="kol-progress__bar-border" x="1" y="1" height="11" rx="5" fill="currentColor" stroke="currentColor" stroke-width="1" width="100%"></rect>
			<rect
				class="kol-progress__bar-progress"
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
		<div class="kol-progress">
			<div
				aria-hidden="true"
				class={{
					'kol-progress__cycle': variant === 'cycle',
					'kol-progress__bar': variant === 'bar',
				}}
			>
				{variant === 'bar' && label && <div class="kol-progress__bar-label">{label}</div>}
				{createProgressSVG(variant, max, value)}
				{variant === 'cycle' && (
					<div class="kol-progress__cycle-text">
						{label && <div class="kol-progress__cycle-label">{label}</div>}
						<div class="kol-progress__cycle-value">{`${displayValue} ${unit}`}</div>
					</div>
				)}
				{variant === 'bar' && (
					<div class="kol-progress__bar-value" style={{ width: valueColumnWidth }}>
						{displayValue}
					</div>
				)}
				{variant === 'bar' && <div class="kol-progress__bar-unit">{unit}</div>}
			</div>

			{/* https://css-tricks.com/html5-progress-element/ */}
			<progress class="visually-hidden" aria-busy={value < max ? 'true' : 'false'} max={max} value={value}></progress>
			<span aria-live="polite" aria-relevant="removals text" class="visually-hidden">
				{liveValueText}
			</span>
		</div>
	);
};
