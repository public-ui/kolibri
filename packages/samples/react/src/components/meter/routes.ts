import type { Routes } from '../../shares/types';
import { MeterBasic } from './basic';
import { MeterDynamic } from './dynamic';
import { MeterOptimum } from './optimum';
import { MeterOrientation } from './orientation';

export const METER_ROUTES: Routes = {
	meter: {
		basic: MeterBasic,
		dynamic: MeterDynamic,
		optimum: MeterOptimum,
		orientation: MeterOrientation,
	},
};
