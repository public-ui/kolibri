import { useFormikContext } from 'formik';
import React from 'react';

import { KolHeading } from '@public-ui/react';

import type { FormValues } from './AppointmentForm';

const ValueFallback = () => <i>Nicht angegeben</i>;
const ValueWithFallback = ({ value }: { value: string }) => (value ? value : <ValueFallback />);

export function Summary() {
	const { values } = useFormikContext<FormValues>();

	return (
		<>
			<KolHeading _level={2} _label="Zusammenfassung"></KolHeading>

			<dl>
				<dt>Stadtteil</dt>
				<dd>
					<ValueWithFallback value={values.district} />
				</dd>
				<dt>Termin</dt>
				<dd>{values.date && values.time ? `${values.date} ${values.time} Uhr` : <ValueFallback />}</dd>

				{values.salutation === 'Firma' ? (
					<>
						<dt>Firma</dt>
						<dd>
							<ValueWithFallback value={values.company} />
						</dd>
					</>
				) : (
					<>
						<dt>Anrede</dt>
						<dd>
							<ValueWithFallback value={values.salutation} />
						</dd>
					</>
				)}

				<dt>Name</dt>
				<dd>
					<ValueWithFallback value={values.name} />
				</dd>
				<dt>E-Mail</dt>
				<dd>
					<ValueWithFallback value={values.email} />
				</dd>
				<dt>Telefon</dt>
				<dd>
					<ValueWithFallback value={values.phone} />
				</dd>
			</dl>
		</>
	);
}
