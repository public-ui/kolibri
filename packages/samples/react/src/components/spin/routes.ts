import type { Routes } from '../../shares/types';
import { SpinBasic } from './basic';
import { SpinCustom } from './custom';
import { SpinCycle } from './cycle';
import { SpinLabel } from './label';
import { SpinVariables } from './variables';

export const SPIN_ROUTES: Routes = {
	spin: {
		basic: SpinBasic,
		cycle: SpinCycle,
		custom: SpinCustom,
		label: SpinLabel,
		variables: SpinVariables,
	},
};
