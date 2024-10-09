import * as React from 'react';
import { useFormikContext } from 'formik';
import type { FieldDefinition } from '../../../types';
import StackSection from '../StackSection';

export type ConditionalSectionProps = {
	name: string;
	conditionalValue?: unknown;
	namespace?: string;
	fields: FieldDefinition[];
};

function ConditionalSection<T extends Record<string, unknown>>(props: ConditionalSectionProps, ref: React.ForwardedRef<HTMLDivElement>) {
	const { name, namespace, conditionalValue, fields } = props;
	const form = useFormikContext<T>();

	if (!form.values[name]) {
		return null;
	}

	if (!conditionalValue) {
		return <StackSection ref={ref} namespace={namespace} fields={fields} />;
	}

	if (conditionalValue && form.values[name] === conditionalValue) {
		return <StackSection ref={ref} namespace={namespace} fields={fields} />;
	}

	return null;
}

export default React.forwardRef(ConditionalSection);
