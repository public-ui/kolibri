import type { Routes } from '../../shares/types';
import { MeterBasic } from './basic';
import { MeterOptimum } from './optimum';
import { MeterOrientation } from './orientation';

export const METER_ROUTES: Routes = {
	meter: {
		basic: MeterBasic,
		optimum: MeterOptimum,
		orientation: MeterOrientation,
	},
};
