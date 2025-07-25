import { Routes } from '../../shares/types';
import { ModalBasic } from './basic';
import { ModalVariants } from './variants';

export const MODAL_ROUTES: Routes = {
	modal: {
		basic: ModalBasic,
		variants: ModalVariants,
	},
};
