import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import type { TranslationKey } from '../../../i18n';
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
	const state = getMeterState(value, min, max, low, high, optimum);

	// State classification is only meaningful when low or high boundaries are defined
	const hasStateClassification = low !== undefined || high !== undefined;
	const stateLabel = hasStateClassification ? translate(`kol-meter-state-${state}` as TranslationKey) : '';

	const liveValueText = isPercentage
		? translate('kol-live-value', { placeholders: { value: String(liveMeterValue), unit } })
		: translate('kol-live-value-bounded', { placeholders: { value: String(liveMeterValue), max: String(max), unit } });
	const liveValueWithState = hasStateClassification ? `${liveValueText} – ${stateLabel}` : liveValueText;

	const staticValueText = isPercentage
		? translate('kol-live-value', { placeholders: { value: String(displayValue), unit } })
		: translate('kol-live-value-bounded', { placeholders: { value: String(value), max: String(max), unit } });
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

				<div
					role="meter"
					aria-label={label}
					aria-valuenow={value}
					aria-valuemin={min}
					aria-valuemax={max}
					aria-valuetext={staticValueWithState}
					class="kol-meter__bar-track"
				>
					<meter aria-hidden="true" high={high} low={low} max={max} min={min} optimum={optimum} value={value}></meter>
				</div>
				<span class="kol-meter__value-unit">
					<span class="kol-meter__value" style={{ 'min-width': charCount }}>
						{displayValue}
					</span>
					<span class="kol-meter__unit">{unit}</span>
				</span>
			</div>

			<span aria-live="polite" aria-relevant="additions text" class="visually-hidden">
				{liveValueWithState}
			</span>
		</div>
	);
};
