import { Routes } from '../../shares/types';

import { AlertBasic } from './basic';

import { AlertCardMsg } from './card-msg';

import { AlertHtml } from './html';

export const ALERT_ROUTES: Routes = {
	alert: {
		basic: AlertBasic,
		'card-msg': AlertCardMsg,
		html: AlertHtml,
	},
};
