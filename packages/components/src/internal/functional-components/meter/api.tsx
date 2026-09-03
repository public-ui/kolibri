import type { HighProp, LabelProp, LowProp, MaxProp, MinProp, NumberValueProp, OptimumProp, OrientationProp, UnitProp } from '../../props';
import { labelProp, maxProp, minProp, numberValueProp, orientationProp, unitProp } from '../../props';
import type { ComponentApi, PropsConfigShape } from '../generic-types';

/**
 * Meter Props configuration for renderProps pipeline.
 *
 * Note: `high`, `low`, and `optimum` are intentionally omitted from this config.
 * These optional numeric props must remain nullable (undefined when not set),
 * but the renderProps pipeline enforces StrictFields (non-nullable).
 * Solution: these three props are managed separately in the web component's `meterData`
 * field, allowing them to be undefined while the renderProps
 * pipeline handles required props.
 *
 * See MeterApi.Props.Optional for the complete prop interface.
 */
export const meterPropsConfig = {
	optional: [minProp, orientationProp, unitProp],
	required: [labelProp, maxProp, numberValueProp],
} as const satisfies PropsConfigShape;

export interface MeterApi extends ComponentApi {
	Props: {
		Optional: HighProp & LowProp & MinProp & OptimumProp & OrientationProp & UnitProp;
		Required: LabelProp & MaxProp & NumberValueProp;
	};
}
