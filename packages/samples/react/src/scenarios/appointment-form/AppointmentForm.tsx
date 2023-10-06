import React, { useState } from 'react';
import { KolTabs } from '@public-ui/react';
import { DistrictForm } from './DistrictForm';
import { Summary } from './Summary';
import { PersonalInformationForm } from './PersonalInformationForm';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AvailableAppointmentsForm } from './AvailableAppointmentsForm';
import { Iso8601 } from '@public-ui/components';
import { checkAppointmentAvailability } from './appointmentService';

export interface FormProps {}
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
	name: Yup.string().required('Bitte Name eingeben.'),
	company: Yup.string().when('salutation', {
		is: (salutation: string) => salutation === 'Firma',
		then: (schema) => schema.required('Bitte Firmenname angeben.'),
	}),
	email: Yup.string().required('Bitte E-Mail-Adresse eingeben.'),
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

	const validationSchema = Yup.object().shape({
		...(activeFormSection === FormSection.DISTRICT ? districtSchema : {}),
		...(activeFormSection === FormSection.AVAILABLE_APPOINTMENTS ? availableAppointmentsSchema : {}),
		...(activeFormSection === FormSection.PERSONAL_INFORMATION ? personalInformationSchema : {}),
	});

	const handleSubmit = () => {
		const currentSectionIndex = formSectionSequence.indexOf(activeFormSection);
		const nextSection = formSectionSequence[currentSectionIndex + 1];
		if (nextSection) {
			setActiveFormSection(nextSection);
		}
	};

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
			<KolTabs
				_tabs={[
					{
						_label: '1. Einwohnermeldeamt wählen',
					},
					{
						_label: '2. Freie Termine',
					},
					{
						_label: '3. Persönliche Daten',
					},
					{
						_label: 'Zusammenfassung',
					},
				]}
				_label="Formular-Navigation"
				_selected={activeFormSection}
				_on={{ onSelect: (_event, selectedTab) => setActiveFormSection(selectedTab) }}
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
