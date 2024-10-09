import { FieldArray, type FieldArrayRenderProps } from 'formik';
import * as React from 'react';
import FormikArrayHelperProvider from '../../../providers/FormikArrayHelperProvider';
import StackSection, { type StackSectionProps } from '../StackSection';
import { useCompleteFormikNameBuilder } from '../../../providers/FormikNamespaceProvider';

export type ArraySectionProps = StackSectionProps & {
	name: string;
};

function ArraySection({ name: initialNamespace, ...other }: ArraySectionProps) {
	const name = useCompleteFormikNameBuilder(initialNamespace);

	return (
		<FieldArray
			name={name}
			render={(helper: FieldArrayRenderProps) => {
				console.log('helper.name', helper.name);
				return (
					<FormikArrayHelperProvider helper={helper}>
						<StackSection namespace={initialNamespace} {...other} />
					</FormikArrayHelperProvider>
				);
			}}
		></FieldArray>
	);
}

export default React.forwardRef(ArraySection);
