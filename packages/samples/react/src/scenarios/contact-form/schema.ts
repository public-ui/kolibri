import type { Option } from '@public-ui/components';
import { z } from 'zod';

export const TOPIC_OPTIONS: Option<string>[] = [
	{ label: 'General inquiry', value: 'general' },
	{ label: 'Application status', value: 'application' },
	{ label: 'Complaint', value: 'complaint' },
	{ label: 'Feedback on our services', value: 'feedback' },
	{ label: 'Technical problem', value: 'technical' },
	{ label: 'Other', value: 'other' },
];

export const SALUTATION_OPTIONS: Option<string>[] = [
	{ label: 'None', value: 'none' },
	{ label: 'Ms.', value: 'ms' },
	{ label: 'Mr.', value: 'mr' },
];

export const CONTACT_METHOD_OPTIONS = [
	{ label: 'E-mail', value: 'email' },
	{ label: 'Phone call', value: 'phone' },
	{ label: 'Letter', value: 'post' },
];

export const MESSAGE_MAX_LENGTH = 2000;
export const ATTACHMENT_ACCEPT = '.pdf,.jpg,.jpeg,.png';
const ATTACHMENT_MAX_FILES = 3;
const ATTACHMENT_MAX_BYTES = 5 * 1024 * 1024;

/**
 * A cleared or untouched field may hold `null` or a non-string; the type error then shows the same message as an empty value.
 */
const required = (message: string) => z.string({ error: message }).trim().min(1, message);

export const contactFormSchema = z
	.object({
		topic: required('Please choose a topic.'),
		subject: required('Please enter a subject.').max(120, 'The subject must not exceed 120 characters.'),
		message: required('Please enter your message.').max(MESSAGE_MAX_LENGTH, `The message must not exceed ${MESSAGE_MAX_LENGTH} characters.`),
		attachments: z
			.custom<FileList | null>()
			.optional()
			.refine((files) => !files || files.length <= ATTACHMENT_MAX_FILES, `Please attach at most ${ATTACHMENT_MAX_FILES} files.`)
			.refine((files) => !files || Array.from(files).every((file) => file.size <= ATTACHMENT_MAX_BYTES), 'Each file must be smaller than 5 MB.'),
		salutation: z.string(),
		givenName: required('Please enter your first name.'),
		familyName: required('Please enter your last name.'),
		organization: z.string(),
		email: required('Please enter your e-mail address.').pipe(z.email('Please enter a valid e-mail address, for example name@example.com.')),
		contactMethod: required('Please choose how we should contact you.'),
		phone: z.string().trim(),
		callbackTime: z.string(),
		street: z.string().trim(),
		postalCode: z.string().trim(),
		city: z.string().trim(),
		country: z.string().trim(),
		privacy: z
			.boolean()
			.nullable()
			.refine((value) => value === true, 'Please agree to the processing of your data.'),
		sendCopy: z.boolean().nullable(),
	})
	.superRefine(
		(data, ctx) => {
			// Runs on raw input too (see `when`), so every value is read defensively.
			const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '');
			const phone = text(data.phone);
			if (data.contactMethod === 'phone' && !phone) {
				ctx.addIssue({ code: 'custom', path: ['phone'], message: 'Please enter a phone number so we can call you back.' });
			}
			if (phone && !/^\+?[0-9 ()/-]{6,}$/.test(phone)) {
				ctx.addIssue({ code: 'custom', path: ['phone'], message: 'Please enter a valid phone number, for example +49 30 1234567.' });
			}
			if (data.contactMethod === 'post') {
				if (!text(data.street)) {
					ctx.addIssue({ code: 'custom', path: ['street'], message: 'Please enter your street and house number.' });
				}
				if (!/^[0-9]{5}$/.test(text(data.postalCode))) {
					ctx.addIssue({ code: 'custom', path: ['postalCode'], message: 'Please enter a five-digit postal code.' });
				}
				if (!text(data.city)) {
					ctx.addIssue({ code: 'custom', path: ['city'], message: 'Please enter your city.' });
				}
				if (!text(data.country)) {
					ctx.addIssue({ code: 'custom', path: ['country'], message: 'Please enter your country.' });
				}
			}
		},
		// Conditional errors appear in the same round as all other errors instead of after the base fields are valid.
		{ when: () => true },
	);

export type ContactFormValues = z.input<typeof contactFormSchema>;

/**
 * Visual order of the fields; the error summary follows it, independent of the order in which the schema reports issues.
 */
export const FIELD_ORDER: (keyof ContactFormValues)[] = [
	'topic',
	'subject',
	'message',
	'attachments',
	'salutation',
	'givenName',
	'familyName',
	'organization',
	'email',
	'contactMethod',
	'phone',
	'callbackTime',
	'street',
	'postalCode',
	'city',
	'country',
	'privacy',
	'sendCopy',
];

export const CONTACT_FORM_DEFAULTS: ContactFormValues = {
	topic: '',
	subject: '',
	message: '',
	attachments: null,
	salutation: 'none',
	givenName: '',
	familyName: '',
	organization: '',
	email: '',
	contactMethod: 'email',
	phone: '',
	callbackTime: '',
	street: '',
	postalCode: '',
	city: '',
	country: 'Deutschland',
	privacy: false,
	sendCopy: false,
};
