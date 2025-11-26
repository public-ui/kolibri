import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { KolLink, KolTabs } from '@public-ui/react-v19';

import { checkAppointmentAvailability } from './appointmentService';
import { AvailableAppointmentsForm } from './AvailableAppointmentsForm';
import { DistrictForm } from './DistrictForm';
import { PersonalInformationForm } from './PersonalInformationForm';
import { Summary } from './Summary';

import { SampleDescription } from '../../components/SampleDescription';

const validationSchema = z
	.object({
		district: z.string().min(1, 'Please select district.'),
		date: z.string().min(1, 'Please enter date.'),
		time: z.string(),
		salutation: z.string().min(1, 'Please select salutation.'),
		name: z.string().min(1, 'Please enter your first and last name.'),
		company: z.string(),
		email: z.string().min(1, 'Please enter your e-mail address.'),
		phone: z.string(),
	})
	.superRefine(async (data, ctx) => {
		// Conditional validation: company is required when salutation is 'Company'
		if (data.salutation === 'Company' && !data.company) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ['company'],
				message: 'Please specify company.',
			});
		}

		// Async validation: check time availability when date is set
		if (data.date && data.time) {
			const isAvailable = await checkAppointmentAvailability(data.time);
			if (!isAvailable) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					path: ['time'],
					message: 'Date unfortunately no longer available.',
				});
			}
		}
	});

export type FormValues = z.infer<typeof validationSchema>;
// export interface FormProps {}

export type FormFieldName = keyof FormValues & string;

enum FormSection {
	DISTRICT,
	AVAILABLE_APPOINTMENTS,
	PERSONAL_INFORMATION,
	SUMMARY,
}

const formSectionSequence = [FormSection.DISTRICT, FormSection.AVAILABLE_APPOINTMENTS, FormSection.PERSONAL_INFORMATION, FormSection.SUMMARY] as const;

const sectionFields: Record<FormSection, FormFieldName[]> = {
	[FormSection.DISTRICT]: ['district'],
	[FormSection.AVAILABLE_APPOINTMENTS]: ['date', 'time'],
	[FormSection.PERSONAL_INFORMATION]: ['salutation', 'company', 'name', 'email', 'phone'],
	[FormSection.SUMMARY]: [],
};

const initialValues: FormValues = {
	district: '',
	date: '',
	time: '',
	salutation: '',
	name: '',
	company: '',
	email: '',
	phone: '',
};

export function AppointmentForm() {
	const [activeFormSection, setActiveFormSection] = useState(FormSection.DISTRICT);
	const [selectedTab, setSelectedTab] = useState(activeFormSection);

	const formMethods = useForm<FormValues>({
		defaultValues: initialValues,
		mode: 'onTouched',
		reValidateMode: 'onChange',
		resolver: zodResolver(validationSchema),
		shouldFocusError: false,
	});

	useEffect(() => {
		setSelectedTab(activeFormSection);
	}, [activeFormSection]);

	const goToSection = (section: FormSection) => {
		setActiveFormSection(section);
		formMethods.clearErrors();
	};

	const getNextSection = (section: FormSection) => {
		const currentSectionIndex = formSectionSequence.indexOf(section);
		return formSectionSequence[currentSectionIndex + 1];
	};

	return (
		<FormProvider {...formMethods}>
			<SampleDescription>
				<p>
					The Appointment Form is a full form example featuring a large variety of KoliBri form components, React Hook Form and{' '}
					<KolLink _label="Zod" _href="https://github.com/colinhacks/zod" _target="blank" />.
				</p>
			</SampleDescription>

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
						goToSection(selectedTab);
					},
				}}
			>
				<div>
					<DistrictForm fieldsToValidate={sectionFields[FormSection.DISTRICT]} onComplete={() => goToSection(getNextSection(FormSection.DISTRICT))} />
				</div>
				<div>
					<AvailableAppointmentsForm
						fieldsToValidate={sectionFields[FormSection.AVAILABLE_APPOINTMENTS]}
						onComplete={() => goToSection(getNextSection(FormSection.AVAILABLE_APPOINTMENTS))}
					/>
				</div>
				<div>
					<PersonalInformationForm
						fieldsToValidate={sectionFields[FormSection.PERSONAL_INFORMATION]}
						onComplete={() => goToSection(getNextSection(FormSection.PERSONAL_INFORMATION))}
					/>
				</div>
				<div>
					<Summary />
				</div>
			</KolTabs>
		</FormProvider>
	);
}
