import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import { translate } from '../../../i18n';

import type { FunctionalComponentProps } from '../generic-types';
import type { MeterApi } from './api';

type MeterState = 'optimum' | 'suboptimal' | 'critical';

function getMeterState(value: number, min: number, max: number, low: number | undefined, high: number | undefined, optimum: number | undefined): MeterState {
	const effectiveLow = low ?? min;
	const effectiveHigh = high ?? max;

	if (optimum === undefined) {
		const inMidRegion = value >= effectiveLow && value <= effectiveHigh;
		return inMidRegion ? 'optimum' : 'suboptimal';
	}

	const inLowRegion = value < effectiveLow;
	const inHighRegion = value > effectiveHigh;
	const inMidRegion = !inLowRegion && !inHighRegion;

	const optimumInLow = optimum < effectiveLow;
	const optimumInHigh = optimum > effectiveHigh;

	if (optimumInLow) {
		if (inLowRegion) return 'optimum';
		if (inMidRegion) return 'suboptimal';
		return 'critical';
	} else if (optimumInHigh) {
		if (inHighRegion) return 'optimum';
		if (inMidRegion) return 'suboptimal';
		return 'critical';
	} else {
		if (inMidRegion) return 'optimum';
		return 'suboptimal';
	}
}

type MeterFCProps = Omit<FunctionalComponentProps<MeterApi>, 'high' | 'low' | 'optimum'> & {
	high: number | undefined;
	low: number | undefined;
	optimum: number | undefined;
};

export const MeterFC: FC<MeterFCProps> = (props) => {
	const { high, label, low, liveValue, max, min, optimum, orientation, unit, value } = props;

	const isVertical = orientation === 'vertical';
	const isPercentage = unit === '%';
	const displayValue = isPercentage ? Math.round(((value - min) / (max - min)) * 100) : value;
	const liveMeterValue = isPercentage ? `${Math.round(((liveValue - min) / (max - min)) * 100)}` : liveValue;
	const valueColumnWidth = `${`${(isPercentage ? 100 : max) + 1}`.length}ch`;
	const fillPercentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
	const state = getMeterState(value, min, max, low, high, optimum);

	const liveValueText = isPercentage
		? translate('kol-live-value', { placeholders: { value: String(liveMeterValue), unit } })
		: translate('kol-live-value-bounded', { placeholders: { value: String(liveMeterValue), max: String(max), unit } });

	const fillClass = {
		'kol-meter__bar-fill': true,
		'kol-meter__bar-fill--optimum': state === 'optimum',
		'kol-meter__bar-fill--suboptimal': state === 'suboptimal',
		'kol-meter__bar-fill--critical': state === 'critical',
	};

	return (
		<div class={{ 'kol-meter': true, 'kol-meter--vertical': isVertical }}>
			<div aria-hidden="true" class="kol-meter__bar">
				<div class="kol-meter__bar-label">{label}</div>

				{isVertical ? (
					<div class="kol-meter__bar-track">
						<div class={fillClass} style={{ height: `calc((100% - 6px) * ${fillPercentage / 100})` }}></div>
					</div>
				) : (
					<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="12" overflow="visible">
						<rect
							class="kol-meter__bar-background"
							x="1"
							y="1"
							height="11"
							rx="5"
							fill="currentColor"
							stroke="currentColor"
							stroke-width="3"
							width="100%"
						></rect>
						<rect class="kol-meter__bar-border" x="1" y="1" height="11" rx="5" fill="currentColor" stroke="currentColor" stroke-width="1" width="100%"></rect>
						<rect
							class={fillClass}
							x="3"
							y="3"
							height="7"
							rx="3.5"
							fill="currentColor"
							stroke="currentColor"
							stroke-width="3"
							style={{ width: `calc(${fillPercentage}% - 4px)` }}
						></rect>
					</svg>
				)}

				<div class="kol-meter__bar-value" style={isVertical ? {} : { width: valueColumnWidth }}>
					{displayValue}
				</div>
				<div class="kol-meter__bar-unit">
					{'\u00A0'}
					{unit}
				</div>
			</div>

			<meter class="visually-hidden" high={high} low={low} max={max} min={min} optimum={optimum} value={value}></meter>
			<span aria-live="polite" aria-relevant="removals text" class="visually-hidden">
				{liveValueText}
			</span>
		</div>
	);
};
