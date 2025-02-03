import { Formik } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import * as Yup from 'yup';

import { KolLink, KolTabs } from '@public-ui/react';

import { checkAppointmentAvailability } from './appointmentService';
import { AvailableAppointmentsForm } from './AvailableAppointmentsForm';
import { DistrictForm } from './DistrictForm';
import { PersonalInformationForm } from './PersonalInformationForm';
import { Summary } from './Summary';

import type { FormikHelpers, FormikProps } from 'formik';
import type { Iso8601 } from '@public-ui/components';
import { SampleDescription } from '../../components/SampleDescription';
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
	district: Yup.string().required('Please select district.'),
};
const personalInformationSchema = {
	salutation: Yup.string().required('Please select salutation.'),
	name: Yup.string().required('Please enter your first and last name.'),
	company: Yup.string().when('salutation', {
		is: (salutation: string) => salutation === 'Company',
		then: (schema) => schema.required('Please specify company.'),
	}),
	email: Yup.string().required('Please enter your e-mail address.'),
};
const availableAppointmentsSchema = {
	date: Yup.string().required('Please enter date.'),
	time: Yup.string().when('date', {
		is: (date: string) => Boolean(date), // only validate time when date is already set
		then: (schema) => schema.test('checkTimeAvailability', 'Date unfortunately no longer available.', checkAppointmentAvailability),
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
		<>
			<SampleDescription>
				<p>
					The Appointment Form is a full form example featuring a large variety of KoliBri form components,{' '}
					<KolLink _label="Formik" _href="https://formik.org/" _target="blank" /> and{' '}
					<KolLink _label="Yup" _href="https://github.com/jquense/yup" _target="blank" />.
				</p>
			</SampleDescription>

			<Formik<FormValues> innerRef={formikRef} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
				<KolTabs
					className="w-full"
					_tabs={[
						{
							_label: '1. Choose registration office',
						},
						{
							_label: '2. Available dates',
							_disabled: activeFormSection < FormSection.AVAILABLE_APPOINTMENTS,
						},
						{
							_label: '3. Personal data',
							_disabled: activeFormSection < FormSection.PERSONAL_INFORMATION,
						},
						{
							_label: 'Summary',
							_disabled: activeFormSection < FormSection.SUMMARY,
						},
					]}
					_label="Form navigation"
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
		</>
	);
}
