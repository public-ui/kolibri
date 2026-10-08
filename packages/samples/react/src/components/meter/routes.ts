import type { Routes } from '../../shares/types';
import { MeterBasic } from './basic';
import { MeterClamped } from './clamped';
import { MeterDynamic } from './dynamic';
import { MeterOptimum } from './optimum';
import { MeterOrientation } from './orientation';

export const METER_ROUTES: Routes = {
	meter: {
		basic: MeterBasic,
		clamped: MeterClamped,
		dynamic: MeterDynamic,
		optimum: MeterOptimum,
		orientation: MeterOrientation,
	},
};
