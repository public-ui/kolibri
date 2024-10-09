import { FormBuilderSettingsType } from '../_form-builder-example';
import appointmentSettings from './appointment';
import registionSettings from './registration';

export const exampleSettings: Record<string, FormBuilderSettingsType<{}>> = {
	Appointment: appointmentSettings,
	Registration: registionSettings,
};
