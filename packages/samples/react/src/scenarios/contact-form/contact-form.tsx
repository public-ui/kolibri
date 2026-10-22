import { zodResolver } from '@hookform/resolvers/zod';
import type { ErrorListPropType } from '@public-ui/components';
import {
	KolComboboxController,
	KolInputCheckboxController,
	KolInputDateController,
	KolInputEmailController,
	KolInputFileController,
	KolInputRadioController,
	KolInputTextController,
	KolSingleSelectController,
	KolTextareaController,
} from '@public-ui/react-hook-form-adapter';
import { KolAlert, KolButton, KolDialog, KolForm, KolHeading, KolLink, KolSpin } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useMemo, useRef, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { SampleDescription } from '../../components/SampleDescription';
import { COUNTRY_SUGGESTIONS } from '../../shares/country';
import type { ContactFormValues } from './schema';
import {
	ATTACHMENT_ACCEPT,
	CONTACT_FORM_DEFAULTS,
	CONTACT_METHOD_OPTIONS,
	contactFormSchema,
	FIELD_ORDER,
	MESSAGE_MAX_LENGTH,
	SALUTATION_OPTIONS,
	TOPIC_OPTIONS,
} from './schema';

const fieldId = (name: keyof ContactFormValues) => `field-${name}`;

const sendMessage = (values: ContactFormValues) =>
	new Promise<string>((resolve) => {
		setTimeout(() => resolve(`KF-${values.topic.toUpperCase()}-${Date.now().toString().slice(-6)}`), 1000);
	});

export const ContactForm: FC = () => {
	const formRef = useRef<HTMLKolFormElement>(null);
	const dialogRef = useRef<HTMLKolDialogElement>(null);
	const [referenceNumber, setReferenceNumber] = useState<string | null>(null);

	const {
		control,
		formState: { errors, isSubmitted, isSubmitting },
		handleSubmit,
		reset,
	} = useForm<ContactFormValues>({
		defaultValues: CONTACT_FORM_DEFAULTS,
		mode: 'onTouched',
		resolver: zodResolver(contactFormSchema),
	});

	const contactMethod = useWatch({ control, name: 'contactMethod' });
	const earliestCallback = useMemo(() => new Date(), []);

	const errorList: ErrorListPropType[] = isSubmitted
		? FIELD_ORDER.filter((name) => errors[name]?.message).map((name) => ({
				message: String(errors[name]?.message),
				selector: `#${fieldId(name)}`,
			}))
		: [];

	const onValid = async (values: ContactFormValues) => {
		setReferenceNumber(await sendMessage(values));
		reset(CONTACT_FORM_DEFAULTS);
	};

	const onInvalid = () => {
		void formRef.current?.focusErrorList();
	};

	const discardEntries = () => {
		reset(CONTACT_FORM_DEFAULTS);
		void dialogRef.current?.close();
	};

	return (
		<section className="w-full max-w-3xl mx-auto p-6 grid gap-6">
			<SampleDescription>
				<p>
					A complete contact form built from KoliBri components with React Hook Form and Zod: conditional fields, file upload, error summary, confirmation
					dialog and success message.
				</p>
			</SampleDescription>

			<KolHeading _level={1} _label="Contact us" />
			<p>
				Write to us and we will get back to you within three working days. For urgent matters, please call{' '}
				<KolLink _href="tel:+49301234567" _label="+49 30 1234567" />.
			</p>

			{referenceNumber && (
				<KolAlert _type="success" _label="Thank you, your message has been sent" _level={2} _variant="card" _alert>
					Your reference number is {referenceNumber}. We will get back to you within three working days.
				</KolAlert>
			)}

			<KolForm
				ref={formRef}
				_errorList={errorList}
				_on={{
					onSubmit: () => {
						if (isSubmitting) {
							return;
						}
						setReferenceNumber(null);
						void handleSubmit(onValid, onInvalid)();
					},
				}}
			>
				<div className="grid gap-4">
					<KolHeading _level={2} _label="Your request" />
					<KolSingleSelectController
						control={control}
						name="topic"
						id={fieldId('topic')}
						_label="Topic"
						_options={TOPIC_OPTIONS}
						_placeholder="Please choose"
						_required
					/>
					<KolInputTextController control={control} name="subject" id={fieldId('subject')} _label="Subject" _maxLength={120} _required />
					<KolTextareaController
						control={control}
						name="message"
						id={fieldId('message')}
						_label="Message"
						_rows={6}
						_maxLength={MESSAGE_MAX_LENGTH}
						_hasCounter
						_required
					/>
					<KolInputFileController
						control={control}
						name="attachments"
						id={fieldId('attachments')}
						_label="Attachments"
						_hint="Up to 3 files (PDF, JPG or PNG), each smaller than 5 MB."
						_accept={ATTACHMENT_ACCEPT}
						_multiple
					/>

					<KolHeading _level={2} _label="Your contact details" />
					<KolInputRadioController
						control={control}
						name="salutation"
						id={fieldId('salutation')}
						_label="Salutation"
						_options={SALUTATION_OPTIONS}
						_orientation="horizontal"
					/>
					<KolInputTextController control={control} name="givenName" id={fieldId('givenName')} _label="First name" _autoComplete="given-name" _required />
					<KolInputTextController control={control} name="familyName" id={fieldId('familyName')} _label="Last name" _autoComplete="family-name" _required />
					<KolInputTextController control={control} name="organization" id={fieldId('organization')} _label="Organization" _autoComplete="organization" />
					<KolInputEmailController control={control} name="email" id={fieldId('email')} _label="E-mail address" _autoComplete="email" _required />
					<KolInputRadioController
						control={control}
						name="contactMethod"
						id={fieldId('contactMethod')}
						_label="How should we contact you?"
						_options={CONTACT_METHOD_OPTIONS}
						_orientation="horizontal"
						_required
					/>

					{contactMethod === 'phone' && (
						<>
							<KolInputTextController
								control={control}
								name="phone"
								id={fieldId('phone')}
								_type="tel"
								_label="Phone number"
								_hint="For example +49 30 1234567"
								_autoComplete="tel"
								_required
							/>
							<KolInputDateController
								control={control}
								name="callbackTime"
								id={fieldId('callbackTime')}
								_type="datetime-local"
								_label="Preferred callback time"
								_hint="We call between 8 am and 6 pm on working days."
								_min={earliestCallback}
							/>
						</>
					)}

					{contactMethod === 'post' && (
						<>
							<KolHeading _level={3} _label="Postal address" />
							<KolInputTextController
								control={control}
								name="street"
								id={fieldId('street')}
								_label="Street and house number"
								_autoComplete="street-address"
								_required
							/>
							<KolInputTextController
								control={control}
								name="postalCode"
								id={fieldId('postalCode')}
								_label="Postal code"
								_autoComplete="postal-code"
								_maxLength={5}
								_required
							/>
							<KolInputTextController control={control} name="city" id={fieldId('city')} _label="City" _autoComplete="address-level2" _required />
							<KolComboboxController control={control} name="country" id={fieldId('country')} _label="Country" _suggestions={COUNTRY_SUGGESTIONS} _required />
						</>
					)}

					<KolHeading _level={2} _label="Privacy" />
					<p>
						We use your data only to answer your request. You can withdraw your consent at any time. Details are given in our{' '}
						<KolLink _href="#/scenarios/contact-form" _label="privacy policy" />.
					</p>
					<KolInputCheckboxController
						control={control}
						name="privacy"
						id={fieldId('privacy')}
						_label="I agree that my data will be processed to answer my request."
						_required
					/>
					<KolInputCheckboxController control={control} name="sendCopy" id={fieldId('sendCopy')} _label="Send me a copy of my message" _variant="switch" />

					<div className="flex flex-wrap gap-4 items-center">
						<KolButton _label="Send message" _type="submit" _variant="primary" />
						<KolButton _label="Discard entries" _type="button" _on={{ onClick: () => void dialogRef.current?.showModal() }} />
						<KolSpin _show={isSubmitting} _label="Your message is being sent." />
					</div>
				</div>
			</KolForm>

			<KolDialog ref={dialogRef} _label="Discard entries?" _variant="card">
				<p>All entries in the form will be deleted. This cannot be undone.</p>
				<div className="flex flex-wrap gap-4">
					<KolButton _label="Discard entries" _variant="danger" _on={{ onClick: discardEntries }} />
					<KolButton _label="Keep editing" _on={{ onClick: () => void dialogRef.current?.close() }} />
				</div>
			</KolDialog>
		</section>
	);
};
