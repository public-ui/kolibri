import * as React from 'react';
import type { FormDefinition, WizardDefinition } from '../../../types';
import { FormSection, WizardSection } from '../../containers';

export type FormBuilderProps = {
	name?: string;
	field: WizardDefinition | FormDefinition;
};

function FormBuilder(props: FormBuilderProps) {
	const { field } = props;

	if (field.fieldType === 'wizard') {
		return <WizardSection {...field} />;
	}

	return <FormSection {...field} />;
}

export default FormBuilder;
