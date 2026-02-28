import type { Routes } from '../../shares/types';
import { MeterBasic } from './basic';
import { MeterMinMax } from './min-max';
import { MeterOptimum } from './optimum';
import { MeterOrientation } from './orientation';
import { MeterRanges } from './ranges';
import { MeterUnit } from './unit';

export const METER_ROUTES: Routes = {
	meter: {
		basic: MeterBasic,
		unit: MeterUnit,
		'min-max': MeterMinMax,
		ranges: MeterRanges,
		optimum: MeterOptimum,
		orientation: MeterOrientation,
	},
};
