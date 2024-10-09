import { type CustomFieldRegistration } from '../../_form-builder-example/providers/CustomFieldProvider';
import { CustomAvailableTimesField, CustomDateValidationSpinner, CustomSummaryField } from '../../components';

export const customFieldRegistrations: CustomFieldRegistration = {
	'my-custom-field': { Component: CustomAvailableTimesField },
	'summary-field': { Component: CustomSummaryField },
	'field-date-validation-spinner': { Component: CustomDateValidationSpinner },
};
