import type { Routes } from '../../shares/types';
import { AlertBasic } from './basic';
import { AlertCardMsg } from './card-msg';

export const ALERT_ROUTES: Routes = {
	alert: {
		basic: AlertBasic,
		'card-msg': AlertCardMsg,
	},
};
