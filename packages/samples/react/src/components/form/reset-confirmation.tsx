import { KolButton, KolDialog, KolForm, KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useRef, useState } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const FormResetConfirmation: FC = () => {
	const dialogRef = useRef<HTMLKolDialogElement>(null);
	const [firstName, setFirstName] = useState('');

	/**
	 * KolForm suppresses the native reset, so the dialog asks for confirmation before the fields
	 * are cleared.
	 */
	const handleReset = () => {
		void dialogRef.current?.showModal();
	};

	const discardChanges = () => {
		setFirstName('');
		void dialogRef.current?.closeModal();
	};

	return (
		<>
			<SampleDescription>
				<p>
					This sample shows a form whose reset is confirmed in a dialog. Confirming the dialog clears the input fields, dismissing it closes the dialog without
					discarding anything.
				</p>
			</SampleDescription>

			<SampleBlock id="form-reset-confirmation" className="grid gap-2">
				<KolForm
					className="w-full"
					_on={{
						onReset: handleReset,
					}}
				>
					<div className="flex flex-col gap-2">
						<KolInputText id="first-name" _label="First name" _value={firstName} _on={{ onChange: (_, value) => setFirstName(String(value ?? '')) }} />
						<div className="flex flex-wrap gap-2">
							<KolButton _label="Save" _type="submit" _variant="primary" />
							<KolButton _label="Cancel" _type="reset" _variant="tertiary" />
						</div>
					</div>
				</KolForm>

				<KolDialog ref={dialogRef} _label="Cancel editing" _variant="card" _width="30%">
					<p className="mt-0">Do you really want to discard your changes?</p>
					<KolButton _label="Yes, discard" _on={{ onClick: discardChanges }} _variant="primary" />
					<KolButton _label="No" _on={{ onClick: () => void dialogRef.current?.closeModal() }} _variant="tertiary" />
				</KolDialog>
			</SampleBlock>
		</>
	);
};
