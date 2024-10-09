import * as React from 'react';
import FormBuilder from './_form-builder-example';
import { exampleSettings } from './examples';
import { SampleDescription } from '../../components/SampleDescription';
import { KolLink, KolSelect } from '@public-ui/react';

function Appointment() {
	const [currentExample, setCurrentExample] = React.useState(exampleSettings.Appointment);

	return (
		<>
			<SampleDescription>
				<p>
					The Appointment Form is a full form example featuring a large variety of KoliBri form components,{' '}
					<KolLink _label="Formik" _href="https://formik.org/" _target="blank" /> and{' '}
					<KolLink _label="Yup" _href="https://github.com/jquense/yup" _target="blank" />.
				</p>
			</SampleDescription>
			<div className="flex flex-col gap-8 w-full">
				<div>
					<KolSelect
						_label="Examples"
						_options={[
							{ value: 'Appointment', label: 'Appointment' },
							{ value: 'Registration', label: 'Registration' },
						]}
						_on={{
							onChange: (e: Event, values: unknown) => {
								if (e.target) {
									const [value] = values as string[];
									setCurrentExample(exampleSettings[value]);
								}
							},
						}}
					/>
				</div>
				<div>
					<FormBuilder settings={currentExample} />
				</div>
			</div>
		</>
	);
}

export default Appointment;
