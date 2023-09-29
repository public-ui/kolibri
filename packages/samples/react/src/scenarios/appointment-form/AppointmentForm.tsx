import React, { useState } from 'react';
import { KolHeading, KolTabs } from '@public-ui/react';
import { DistrictForm } from './DistrictForm';
import { Summary } from './Summary';
import { PersonalInformationForm } from './PersonalInformationForm';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
	district: Yup.string().required('Bitte Stadtteil wählen.'),
});

console.log(validationSchema.describe());

export interface FormProps {}
export interface FormValues {
	district: string;
	name: string;
}

export function AppointmentForm() {
	const [selectedTab, setSelectedTab] = useState(0);
	const initialValues: FormValues = {
		district: '',
		name: '',
	};

	const handleSubmit = (values: FormValues) => {
		console.log(`Form submitted:`, values);
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
				_selected={selectedTab}
				_on={{ onSelect: (_event, selectedTab) => setSelectedTab(selectedTab) }}
			>
				<div>
					<DistrictForm onSubmit={() => setSelectedTab(1)} />
				</div>
				<div>
					<KolHeading _level={2} _label="Wählen Sie einen Termin aus"></KolHeading>
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
