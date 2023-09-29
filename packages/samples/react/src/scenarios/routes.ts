import { Routes } from '../shares/types';
import { TerminComponent } from './complex-form/component';
import { AppointmentForm } from './appointment-form/AppointmentForm';

export const SCENARIO_ROUTES: Routes = {
	scenarios: {
		'complex-form': TerminComponent,
		'appointment-form': AppointmentForm,
	},
};
