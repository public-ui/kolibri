import { KolAlert, KolButton, KolCard, KolDialog, KolForm, KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useRef } from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const FormSubmit: FC = () => {
	const formRef = useRef<HTMLKolFormElement | null>(null);
	const dialogResetRef = useRef<HTMLKolDialogElement | null>(null);
	const inputRef = useRef<HTMLKolInputTextElement | null>(null);
	const alertDivRef = useRef<HTMLDivElement | null>(null);
	const alertRef = useRef<HTMLKolAlertElement | null>(null);
	const formEventHandlerSuccessReset = {
		onSubmit: () => SuccessHandler(),
		onReset: () => ResetHandler(),
	};
	const formEventHandlerError = {
		onSubmit: () => ErrorHandler(),
	};
	const formEventHandlerReset = {};

	function SuccessHandler() {
		if (alertDivRef.current) alertDivRef.current.hidden = false;
		if (alertRef.current) alertRef.current._alert = true;
		console.log('submitted:');
	}

	function ErrorHandler() {
		if (formRef.current) formRef.current._errorList = [{ message: 'Error in Input 1 (Field is empty)', selector: '#input1' }];
		formRef.current?.focusErrorList();
	}

	function ResetHandler() {
		dialogResetRef.current?.showModal();
		console.log('reset:');
	}

	return (
		<>
			<SampleDescription>
				<p>This example shows the different ways KolForm can react.</p>
			</SampleDescription>

			<SampleBlock id="form-submit-success" className="grid gap-2">
				<KolCard _label="Speichern erfolgreich / Zurücksetzen">
					<div ref={alertDivRef} hidden>
						<KolAlert ref={alertRef} _label="Speichern erfolgreich" _type="success"></KolAlert>
					</div>
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
										if (inputRef.current) inputRef.current._value = '';
										if (alertDivRef.current) alertDivRef.current.hidden = true;
										dialogResetRef.current?.close();
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

			<br />
			<SampleBlock id="form-submit-reset" className="grid gap-2">
				<KolCard _label="Zurücksetzen">
					<KolForm className="w-full" _on={formEventHandlerReset}>
						<KolInputText id="input1" _label="Input 1" />
						<br />
					</KolForm>
				</KolCard>
			</SampleBlock>
		</>
	);
};
