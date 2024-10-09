import type { FormDefinition } from '../../_form-builder-example';

const registrationForm: FormDefinition = {
	fieldType: 'form',
	label: 'Registration',
	fields: [
		{
			fieldType: 'stack',
			orientation: 'horizontal',
			fields: [
				{ fieldType: 'input-text', name: 'firstname', label: 'First Name', required: true },
				{ fieldType: 'input-text', name: 'middlename', label: 'Middle Name', required: false },
				{ fieldType: 'input-text', name: 'lastname', label: 'Last Name', required: true },
			],
		},
		{
			fieldType: 'stack',
			orientation: 'horizontal',
			fields: [
				{ fieldType: 'input-date', name: 'birthdate', label: 'Birth Date', required: true },
				{ fieldType: 'native-select', name: 'gender', label: 'Gender', options: [{ value: 'Mr.', label: 'Mr.' }] },
			],
		},
		{ fieldType: 'stack', orientation: 'horizontal', fields: [{ fieldType: 'input-password', name: 'password', label: 'Password', required: true }] },
		{
			fieldType: 'accordion',
			label: 'Address',
			open: true,
			autoUnmounted: true,
			namespace: 'address',
			fields: [
				{ fieldType: 'input-text', name: 'street', label: 'Address Street', required: true },
				{ fieldType: 'input-text', name: 'street2', label: 'Address Street Line 2', required: false },
				{
					fieldType: 'stack',
					orientation: 'horizontal',
					namespace: 'test',
					fields: [
						{ fieldType: 'input-text', name: 'zip', label: 'Postal / Zip Code', required: 'true' },
						{ fieldType: 'input-text', name: 'city', label: 'City', required: 'true' },
					],
				},
				{ fieldType: 'input-text', name: 'state', label: 'State / Province', required: false },
				{ fieldType: 'input-text', name: 'county', label: 'Country', required: true },
			],
		},
		{
			fieldType: 'accordion',
			label: 'Communication',
			open: true,
			autoUnmounted: true,
			fields: [
				{
					fieldType: 'stack',
					orientation: 'horizontal',
					fields: [
						{ fieldType: 'input-email', name: 'communication.email', label: 'E-mail', required: true },
						{ fieldType: 'input-phone', name: 'communication.mobilenumber', label: 'Mobile Number', required: true },
					],
				},
				{
					fieldType: 'stack',
					orientation: 'horizontal',
					fields: [
						{ fieldType: 'input-phone', name: 'communication.phonenumber', label: 'Phone Number', required: true },
						{ fieldType: 'input-phone', name: 'communication.worknumber', label: 'Work Number', required: true },
					],
				},
			],
		},
		{
			fieldType: 'stack',
			orientation: 'horizontal',
			fields: [
				{ fieldType: 'input-file', name: 'file', label: 'File', required: true },
				{ fieldType: 'input-color', name: 'color', label: 'Color', required: true },
			],
		},
		{ fieldType: 'stack', orientation: 'horizontal', fields: [{ fieldType: 'input-range', name: 'range', label: 'Range', min: -4, max: 4, required: true }] },
		{ fieldType: 'stack', orientation: 'horizontal', fields: [{ fieldType: 'textarea', name: 'textarea', label: 'Textarea', rows: 5, required: true }] },
		{
			fieldType: 'stack',
			orientation: 'horizontal',
			fields: [
				{ fieldType: 'input-checkbox', name: 'check_1', label: 'Check 1', required: true },
				{ fieldType: 'input-checkbox', name: 'check_2', label: 'Check 2 (Number)', trueValue: 1, falseValue: 0, required: true },
				{ fieldType: 'input-checkbox', name: 'check_3', label: 'Check 3 (String)', trueValue: 'genehmigt', falseValue: 'nicht genehmigt', required: true },
			],
		},
		{
			fieldType: 'stack',
			orientation: 'vertical',
			fields: [
				{ fieldType: 'input-checkbox', name: 'subfield', label: 'Weitere Informationen', trueValue: {}, falseValue: null },
				{
					fieldType: 'conditional',
					name: 'subfield',
					fields: [
						{ fieldType: 'input-text', name: 'subfield.name', label: 'Subfield Name 1' },
						{ fieldType: 'input-text', name: 'subfield.nam2', label: 'Subfield Name 2' },
						{ fieldType: 'input-text', name: 'subfield.name3', label: 'Subfield Name 3' },
					],
				},
			],
		},
		{ fieldType: 'input-checkbox-array', name: 'my_checkboxes', label: 'Checkbox Array', emptyValue: null, options: ['Wert A', 'Wert B', 'Wert C'] },
		{
			fieldType: 'array-section',
			name: 'array-test',
			fields: [
				{
					fieldType: 'fieldset',
					label: 'Array Section',
					fields: [
						{
							fieldType: 'repeat-section',
							orientation: 'horizontal',
							fields: [
								{ fieldType: 'input-text', label: 'Array Item Field', name: 'text' },
								{ fieldType: 'button', action: 'formik-array-remove-item' },
							],
						},
						{ fieldType: 'button', action: 'formik-array-new-item' },
					],
				},
			],
		},
		{
			fieldType: 'array-section',
			name: 'array-test2',
			fields: [
				{
					fieldType: 'fieldset',
					label: 'Array Section',
					fields: [
						{
							fieldType: 'repeat-section',
							orientation: 'vertical',
							fields: [
								{
									fieldType: 'accordion',
									label: 'Array Item',
									fields: [
										{ fieldType: 'input-text', label: 'Array Item Field', name: 'text' },
										{
											fieldType: 'array-section',
											name: 'sub-array-test',
											fields: [
												{
													fieldType: 'fieldset',
													label: 'Sub Array Section',
													fields: [
														{
															fieldType: 'repeat-section',
															orientation: 'horizontal',
															fields: [
																{ fieldType: 'input-text', label: 'Array Item Field', name: 'sub-text' },
																{ fieldType: 'button', action: 'formik-array-remove-item' },
															],
														},
														{ fieldType: 'button', action: 'formik-array-new-item' },
													],
												},
											],
										},
										{
											fieldType: 'input-checkbox-array',
											name: 'my_checkboxes',
											label: 'Checkbox Array',
											emptyValue: null,
											options: ['Wert A', 'Wert B', 'Wert C'],
										},

										{ fieldType: 'button', action: 'formik-array-remove-item' },
									],
								},
							],
						},
						{ fieldType: 'button', action: 'formik-array-new-item' },
					],
				},
			],
		},
	],
};

export const fieldDefinitions = registrationForm;
