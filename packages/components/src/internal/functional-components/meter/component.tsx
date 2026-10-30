import type { FunctionalComponent as FC } from '@stencil/core';
import { h } from '@stencil/core';
import { translate } from '../../../i18n';

import { trimLabel } from '../../../schema';
import { bem } from '../../../schema/bem-registry';
import type { FunctionalComponentProps } from '../generic-types';
import { renderLabelWithLang } from '../span/component';
import type { MeterApi } from './api';

type MeterState = 'optimum' | 'suboptimal' | 'critical';

const meterBem = bem.forBlock('kol-meter');

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

	/** A missing value renders as “no value”: the native meter keeps its default, the display stays empty. */
	const hasValue = value !== undefined && value !== null;
	const isVertical = orientation === 'vertical';
	const isPercentage = unit === '%';
	// A degenerate range (min === max) has no progress, so the percentage is defined as 0 instead of NaN.
	const displayValue = !hasValue ? '' : isPercentage ? (max === min ? 0 : Math.round(((value - min) / (max - min)) * 100)) : value;
	const state = getMeterState(hasValue ? value : min, min, max, low, high, optimum);

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

	const staticValueText = !hasValue
		? ''
		: isPercentage
			? translate('kol-live-value', { placeholders: { value: String(displayValue), unit } })
			: translate('kol-live-value-bounded', { placeholders: { value: String(displayValue), max: String(max), unit } });
	const staticValueWithState = hasStateClassification ? `${staticValueText} – ${stateLabel}` : staticValueText;

	const charCount = max.toString().length > min.toString().length ? max.toString().length + 'ch' : min.toString().length + 'ch';

	return (
		<div class={meterBem({ vertical: isVertical })}>
			<div class={meterBem('bar')}>
				<div class={meterBem('bar-label')}>
					{renderLabelWithLang(label)}
					{hasStateClassification && (
						<span class={meterBem('bar-state', { [state]: true })}>
							{' – '}
							{stateLabel}
						</span>
					)}
				</div>

				<div class={meterBem('bar-track')}>
					<meter
						aria-label={trimLabel(label)}
						aria-valuetext={staticValueWithState || undefined}
						high={high}
						low={low}
						max={max}
						min={min}
						optimum={optimum}
						value={hasValue ? value : undefined}
					></meter>
				</div>
				<span class={meterBem('value-unit')}>
					<span class={meterBem('value')} style={{ 'min-width': charCount }}>
						{displayValue}
					</span>
					<span class={meterBem('unit')}>{unit}</span>
				</span>
			</div>
		</div>
	);
};
