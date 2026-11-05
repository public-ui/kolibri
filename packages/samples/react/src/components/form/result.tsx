import { KolAlert, KolButton, KolDialog, KolForm, KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useRef, useState } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

const DEFAULT_VALUE = 'Max';

export const FormResult: FC = () => {
	const dialogRef = useRef<HTMLKolDialogElement>(null);
	const [value, setValue] = useState(DEFAULT_VALUE);
	const [submittedValue, setSubmittedValue] = useState<string | null>(null);

	/**
	 * Submitting the example value succeeds; any other value is treated as invalid to show the
	 * error variant of the result alert.
	 */
	const handleSubmit = () => {
		setSubmittedValue(value);
	};

	/**
	 * KolForm suppresses the native reset, so the dialog asks for confirmation before the field is
	 * restored to its default value.
	 */
	const handleReset = () => {
		void dialogRef.current?.showModal();
	};

	const resetToDefault = () => {
		setValue(DEFAULT_VALUE);
		setSubmittedValue(null);
		void dialogRef.current?.closeModal();
	};

	return (
		<>
			<SampleDescription>
				<p>
					This sample shows a form with a prefilled input field. Submitting the example value shows a success alert, submitting a changed value shows an error
					alert — both rendered between the input and the action buttons. Reset asks for confirmation in a dialog before the input is restored to its default
					value.
				</p>
			</SampleDescription>

			<SampleBlock id="form-result" className="grid gap-2">
				<KolForm
					className="w-full"
					_on={{
						onSubmit: handleSubmit,
						onReset: handleReset,
					}}
				>
					<div className="flex flex-col gap-2">
						<KolInputText id="first-name" _label="First name" _value={value} _on={{ onChange: (_, value) => setValue(String(value ?? '')) }} />
						{submittedValue !== null &&
							(submittedValue === DEFAULT_VALUE ? (
								<KolAlert _alert _label="Successfully saved" _type="success">
									The data has been saved.
								</KolAlert>
							) : (
								<KolAlert _alert _label="Saving failed" _type="error">
									The changed value could not be saved.
								</KolAlert>
							))}
						<div className="flex flex-wrap gap-2">
							<KolButton _label="Save" _type="submit" _variant="primary" />
							<KolButton _label="Reset" _type="reset" _variant="tertiary" />
						</div>
					</div>
				</KolForm>

				<KolDialog ref={dialogRef} _label="Reset input" _variant="card" _width="30%">
					<p className="mt-0">Do you really want to reset your changes?</p>
					<div className="flex flex-wrap gap-2">
						<KolButton _label="Yes, reset" _on={{ onClick: resetToDefault }} _variant="primary" />
						<KolButton _label="No" _on={{ onClick: () => void dialogRef.current?.closeModal() }} _variant="tertiary" />
					</div>
				</KolDialog>
			</SampleBlock>
		</>
	);
};
