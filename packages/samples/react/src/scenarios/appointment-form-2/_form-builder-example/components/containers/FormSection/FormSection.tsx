import * as React from 'react';
import * as Yup from 'yup';
import type { FormikValues } from 'formik';
import { Formik } from 'formik';
import type { FieldDefinition } from '../../../types';
import { SectionSubmittedProvider, useFormBuilderService, useSchemaValidationService } from '../../../providers';
import FormikFieldContainer from './FormikFieldContainer';

export type FormSectionProps = {
	label: string;
	schema?: string;
	fields: FieldDefinition[];
};

export type InternalFormSectionProps = {
	onSubmitSucceeded?: (index?: number) => void;
	index?: number;
};

function FormSection(props: FormSectionProps & InternalFormSectionProps & { values: unknown }, ref: React.ForwardedRef<HTMLDivElement>) {
	const { values, schema, ...other } = props;
	const service = useFormBuilderService();
	const schemaService = useSchemaValidationService();

	let schemaDefinition = schema ? schemaService.getSchema(schema) : undefined;

	if (schemaDefinition) {
		schemaDefinition = Yup.object().shape(schemaDefinition);
	}

	return (
		<Formik
			initialValues={values as FormikValues}
			validationSchema={schemaDefinition}
			enableReinitialize
			onSubmit={(v) => {
				service.setValues(v);
			}}
		>
			<FormikFieldContainer ref={ref} {...other} />
		</Formik>
	);
}

const ForwardedFormSection = React.forwardRef(FormSection);

function FormSectionWrapper(props: FormSectionProps & InternalFormSectionProps, ref: React.ForwardedRef<HTMLDivElement>) {
	const service = useFormBuilderService();
	const [values, setValues] = React.useState(service.values);

	React.useLayoutEffect(() => {
		const observer = service.values$.subscribe((values) => {
			setValues(values);
		});

		return () => {
			observer.unsubscribe();
		};
	});

	return (
		<SectionSubmittedProvider sectionSubmitted={false}>
			<ForwardedFormSection ref={ref} values={values} {...props} />
		</SectionSubmittedProvider>
	);
}

export default React.forwardRef(FormSectionWrapper);
