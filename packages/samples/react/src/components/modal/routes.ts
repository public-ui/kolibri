import { Routes } from '../../shares/types';
import { ModalBasic } from './basic';
import { ModalBlank } from './blank';
import { ModalWithCard } from './with-card';

export const MODAL_ROUTES: Routes = {
	modal: {
		basic: ModalBasic,
		blank: ModalBlank,
		'with-card': ModalWithCard,
	},
};
