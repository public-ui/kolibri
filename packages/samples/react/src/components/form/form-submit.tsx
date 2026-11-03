import { KolAlert, KolButton, KolCard, KolDialog, KolForm, KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useRef, useState } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const FormSubmit: FC = () => {
	const formRef = useRef<HTMLKolFormElement | null>(null);
	const dialogResetRef = useRef<HTMLKolDialogElement | null>(null);
	const inputRef = useRef<HTMLKolInputTextElement | null>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const formEventHandlerSuccessReset = {
		onSubmit: () => SuccessHandler(),
		onReset: () => ResetHandler(),
	};

	const formEventHandlerError = {
		onSubmit: () => ErrorHandler(),
	};

	function SuccessHandler() {
		setIsSubmitted(true);
	}

	function ErrorHandler() {
		if (formRef.current) formRef.current._errorList = [{ message: 'Error in Input 1 (Field is empty)', selector: '#input1' }];
		formRef.current?.focusErrorList();
	}

	function ResetHandler() {
		dialogResetRef.current?.showModal();
	}

	function ResetForm() {
		setIsSubmitted(false);
		if (inputRef.current) inputRef.current._value = '';
		dialogResetRef.current?.close();
	}

	return (
		<>
			<SampleDescription>
				<p>This example shows the different ways KolForm can react.</p>
			</SampleDescription>

			<SampleBlock id="form-submit-success" className="grid gap-2">
				<KolCard _label="Speichern erfolgreich / Zurücksetzen">
					{isSubmitted ? <KolAlert _alert _label="Speichern erfolgreich" _type="success" /> : ''}
					<KolForm className="w-full" _on={formEventHandlerSuccessReset}>
						<KolInputText ref={inputRef} id="input1" _label="Input 1" />
						<br />
						<KolButton _label="Speichern" _variant="primary" _type="submit" /> <></>
						<KolButton _label="Zurücksetzen" _variant="primary" _type="reset" />
						<KolDialog ref={dialogResetRef} _label="Wollen Sie wirklich das Formular zurücksetzen?" _variant="card" _width="300">
							<KolButton
								_label="Ja"
								_variant="primary"
								_on={{
									onClick: () => {
										ResetForm();
									},
								}}
							/>
							<KolButton _label="Nein" _on={{ onClick: () => dialogResetRef.current?.close() }} />
						</KolDialog>
					</KolForm>
				</KolCard>
			</SampleBlock>
			<br />
			<SampleBlock id="form-submit-error" className="grid gap-2">
				<KolCard _label="Speichern fehlerhaft">
					<KolForm className="w-full" _on={formEventHandlerError} ref={formRef}>
						<KolInputText
							id="input1"
							_label="Input 1"
							_readOnly
							_required
							_msg={{
								_description: 'Input error',
								_type: 'error',
							}}
						/>
						<br />
						<KolButton _label="Speichern Fehlerhaft" _variant="primary" _type="submit" />
					</KolForm>
				</KolCard>
			</SampleBlock>
		</>
	);
};
