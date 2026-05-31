import type { Routes } from '../../shares/types';
import { ComboboxBasic } from './basic';
import { ComboboxHtml } from './html';
import { ComboboxLazyLoaded } from './lazy-loaded';
import { ComboboxTypedEvents } from './typed-events';

export const COMBOBOX_ROUTES: Routes = {
	combobox: {
		basic: ComboboxBasic,
		html: ComboboxHtml,
		'lazy-loaded': ComboboxLazyLoaded,
		'typed-events': ComboboxTypedEvents,
	},
};
