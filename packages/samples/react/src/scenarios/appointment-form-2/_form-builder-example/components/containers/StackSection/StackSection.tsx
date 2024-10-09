import * as React from 'react';
import type { FieldDefinition } from '../../../types';
import { SectionBuilder } from '../../builders';
import FormikNamespaceProvider from '../../../providers/FormikNamespaceProvider';

export type StackSectionProps = {
	orientation?: 'vertical' | 'horizontal';
	fields: FieldDefinition[];
};

function StackSection(props: StackSectionProps, ref: React.ForwardedRef<HTMLDivElement>) {
	if (props.orientation === 'horizontal') {
		return (
			<div className="flex flex-row gap-4" ref={ref}>
				<SectionBuilder fields={props.fields} />
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-4" ref={ref}>
			<SectionBuilder fields={props.fields} />
		</div>
	);
}

const StackSectionRef = React.forwardRef(StackSection);

function StackSectionWrapper(props: StackSectionProps & { namespace?: string }, ref: React.ForwardedRef<HTMLDivElement>) {
	const { namespace, ...other } = props;

	const stack = <StackSectionRef ref={ref} {...other} />;

	if (!namespace) {
		return stack;
	}

	return <FormikNamespaceProvider namespace={namespace}>{stack}</FormikNamespaceProvider>;
}

export default React.forwardRef(StackSectionWrapper);
