import * as React from 'react';
import { type FormikTouched, setNestedObjectValues, useFormikContext } from 'formik';
import { KolButton, KolForm, KolHeading } from '@public-ui/react';
import StackSection from '../StackSection';
import { type FormSectionProps } from './FormSection';
import FormDebug from '../../debug/FormDebug/FormDebug';
import FormErrorList from '../../debug/FormErrorList';
import { useSectionSubmitted } from '../../../providers/SectionSubmittedProvider';

type InternalFormSectionProps = {
	onSubmitSucceeded?: (index?: number) => void;
	index?: number;
};

function FormikFieldContainer(props: FormSectionProps & InternalFormSectionProps, ref: React.ForwardedRef<HTMLDivElement>) {
	const { label, fields, index, onSubmitSucceeded } = props;

	const formErrorListRef = React.useRef<{ focus: () => void }>(null);
	const form = useFormikContext();
	const { setSectionSubmitted } = useSectionSubmitted();

	return (
		<div ref={ref}>
			<KolHeading _level={2} _label={label}></KolHeading>
			<FormErrorList ref={formErrorListRef} />
			<KolForm
				_on={{
					onSubmit: async () => {
						setTimeout(async () => {
							setSectionSubmitted(true);
							const errors = await form.validateForm();

							if (Object.keys(errors).length) {
								form.setTouched(setNestedObjectValues<FormikTouched<unknown>>(errors, true));
								setTimeout(() => formErrorListRef.current?.focus(), 30);
								return;
							}

							await form.submitForm();

							onSubmitSucceeded?.(index);
						}, 10)
					},
				}}
			>
				<StackSection fields={fields} />
				<FormDebug />
				<KolButton _label="Weiter" _type="submit" className="mt-2" />
			</KolForm>
		</div>
	);
}

export default React.forwardRef(FormikFieldContainer);
