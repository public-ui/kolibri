import type { Routes } from '../../shares/types';
import { ImageBasic } from './basic';
import { ImageEvents } from './events';

export const IMAGE_ROUTES: Routes = {
	image: {
		basic: ImageBasic,
		events: ImageEvents,
	},
};
