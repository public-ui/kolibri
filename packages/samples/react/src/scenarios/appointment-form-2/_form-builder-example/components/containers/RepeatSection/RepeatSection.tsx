import * as React from 'react';
import { useFormikArrayHelper } from '../../../providers/FormikArrayHelperProvider';
import StackSection, { type StackSectionProps } from '../StackSection';
import FormikArrayIndexProvider from '../../../providers/FormikArrayIndexProvider';
import { useField } from 'formik';

export type RepeatSectionProps = StackSectionProps;

function RepeatSection(props: RepeatSectionProps, ref: React.ForwardedRef<HTMLDivElement>) {
	const helper = useFormikArrayHelper();
	const [field] = useField(helper?.name || '');

	if (!helper) {
		return null;
	}

	const values = field.value;
	console.log('values: ', values);

	if (!Array.isArray(values) || !values.length) {
		return null;
	}

	return values.map((_, index: number) => (
		<FormikArrayIndexProvider key={index} index={index}>
			<StackSection ref={ref} namespace={index.toString()} {...props} />
		</FormikArrayIndexProvider>
	));
}

export default React.forwardRef(RepeatSection);
