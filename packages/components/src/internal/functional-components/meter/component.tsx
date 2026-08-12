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
	const { high, label, low, max, min, optimum, orientation, unit, value } = props;

	const isVertical = orientation === 'vertical';
	const isPercentage = unit === '%';
	const displayValue = isPercentage ? Math.round(((value - min) / (max - min)) * 100) : value;
	const state = getMeterState(value, min, max, low, high, optimum);

	// State classification is only meaningful when low or high boundaries are defined
	const hasStateClassification = low !== undefined || high !== undefined;
	let stateLabel = '';
	if (hasStateClassification) {
		if (state === 'critical') {
			stateLabel = translate('kol-meter-state-critical');
		} else if (state === 'optimum') {
			stateLabel = translate('kol-meter-state-optimum');
		} else {
			stateLabel = translate('kol-meter-state-suboptimal');
		}
	}

	const staticValueText = isPercentage
		? translate('kol-live-value', { placeholders: { value: String(displayValue), unit } })
		: translate('kol-live-value-bounded', { placeholders: { value: String(displayValue), max: String(max), unit } });
	const staticValueWithState = hasStateClassification ? `${staticValueText} – ${stateLabel}` : staticValueText;

	const charCount = max.toString().length > min.toString().length ? max.toString().length + 'ch' : min.toString().length + 'ch';

	return (
		<div class={{ 'kol-meter': true, 'kol-meter--vertical': isVertical }}>
			<div class="kol-meter__bar">
				<div class="kol-meter__bar-label">
					{label}
					{hasStateClassification && (
						<span class={`kol-meter__bar-state kol-meter__bar-state--${state}`}>
							{' – '}
							{stateLabel}
						</span>
					)}
				</div>

				<div class="kol-meter__bar-track">
					<meter aria-label={label} aria-valuetext={staticValueWithState} high={high} low={low} max={max} min={min} optimum={optimum} value={value}></meter>
				</div>
				<span class="kol-meter__value-unit">
					<span class="kol-meter__value" style={{ 'min-width': charCount }}>
						{displayValue}
					</span>
					<span class="kol-meter__unit">{unit}</span>
				</span>
			</div>
		</div>
	);
};
