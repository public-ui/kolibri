import React, { useEffect, useState, useRef } from 'react';
import { KolTabs } from '@public-ui/react';
import { DistrictForm } from './DistrictForm';
import { Summary } from './Summary';
import { PersonalInformationForm } from './PersonalInformationForm';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';
import { AvailableAppointmentsForm } from './AvailableAppointmentsForm';
import { Iso8601 } from '@public-ui/components';
import { checkAppointmentAvailability } from './appointmentService';

// export interface FormProps {}
export interface FormValues {
	district: string;
	date: Iso8601;
	time: Iso8601;
	salutation: string;
	name: string;
	company: string;
	email: string;
	phone: string;
}

enum FormSection {
	DISTRICT,
	AVAILABLE_APPOINTMENTS,
	PERSONAL_INFORMATION,
	SUMMARY,
}

const formSectionSequence = [FormSection.DISTRICT, FormSection.AVAILABLE_APPOINTMENTS, FormSection.PERSONAL_INFORMATION, FormSection.SUMMARY] as const;

const initialValues: FormValues = {
	district: '',
	date: '' as Iso8601,
	time: '' as Iso8601,
	salutation: '',
	name: '',
	company: '',
	email: '',
	phone: '',
};

const districtSchema = {
	district: Yup.string().required('Bitte Stadtteil wählen.'),
};
const personalInformationSchema = {
	salutation: Yup.string().required('Bitte Anrede auswählen.'),
	name: Yup.string().required('Bitte Vor- und Zuname eingeben.'),
	company: Yup.string().when('salutation', {
		is: (salutation: string) => salutation === 'Firma',
		then: (schema) => schema.required('Bitte Firma angeben.'),
	}),
	email: Yup.string().required('Bitte E-Mail eingeben.'),
};
const availableAppointmentsSchema = {
	date: Yup.string().required('Bitte Datum eingeben.'),
	time: Yup.string().when('date', {
		is: (date: string) => Boolean(date), // only validate time when date is already set
		then: (schema) => schema.test('checkTimeAvailability', 'Termin leider nicht mehr verfügbar.', checkAppointmentAvailability),
	}),
};

export function AppointmentForm() {
	const [activeFormSection, setActiveFormSection] = useState(FormSection.DISTRICT);
	const [selectedTab, setSelectedTab] = useState(activeFormSection);
	const formikRef = useRef<FormikProps<FormValues>>(null);

	const validationSchema = Yup.object().shape({
		...(activeFormSection === FormSection.DISTRICT ? districtSchema : {}),
		...(activeFormSection === FormSection.AVAILABLE_APPOINTMENTS ? availableAppointmentsSchema : {}),
		...(activeFormSection === FormSection.PERSONAL_INFORMATION ? personalInformationSchema : {}),
	});

	useEffect(() => {
		setSelectedTab(activeFormSection);
	}, [activeFormSection]);

	const handleSubmit = async (_values: FormValues, formik: FormikHelpers<FormValues>) => {
		const currentSectionIndex = formSectionSequence.indexOf(activeFormSection);
		const nextSection = formSectionSequence[currentSectionIndex + 1];
		if (nextSection !== undefined) {
			await formik.setTouched({});
			setActiveFormSection(nextSection);
		}
	};

	return (
		<Formik<FormValues> innerRef={formikRef} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
			<KolTabs
				_tabs={[
					{
						_label: '1. Einwohnermeldeamt wählen',
					},
					{
						_label: '2. Freie Termine',
						_disabled: activeFormSection < FormSection.AVAILABLE_APPOINTMENTS,
					},
					{
						_label: '3. Persönliche Daten',
						_disabled: activeFormSection < FormSection.PERSONAL_INFORMATION,
					},
					{
						_label: 'Zusammenfassung',
						_disabled: activeFormSection < FormSection.SUMMARY,
					},
				]}
				_label="Formular-Navigation"
				_selected={selectedTab}
				_on={{
					onSelect: (_event, selectedTab) => {
						setActiveFormSection(selectedTab);
						formikRef.current?.setErrors({});
					},
				}}
			>
				<div>
					<DistrictForm />
				</div>
				<div>
					<AvailableAppointmentsForm />
				</div>
				<div>
					<PersonalInformationForm />
				</div>
				<div>
					<Summary />
				</div>
			</KolTabs>
		</Formik>
	);
}
