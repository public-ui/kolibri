import * as React from 'react';
import { KolAccordion } from '@public-ui/react';
import { useFormikContext } from 'formik';

function FormDebug() {
	const { values } = useFormikContext();

	return (
		<KolAccordion _label="From Data Debug" _open>
			<div>
				<pre>{JSON.stringify(values, null, 2)}</pre>
			</div>
		</KolAccordion>
	);
}

export default FormDebug;
