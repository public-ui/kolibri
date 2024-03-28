import { executeTests } from 'stencil-awesome-test';

import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';

import { getTextareaHtml } from './html.mock';

import type { TextareaProps } from '@public-ui/schema';
import type { SpecPage } from '@stencil/core/testing';
import { KolTextarea } from '../component';

executeTests<TextareaProps>(
	'Textarea',
	async (props): Promise<SpecPage> => {
		const page = await newSpecPage({
			components: [KolTextarea],
			template: () => <kol-textarea {...props} />,
		});
		return page;
	},
	{
		_label: ['Texteingabe'],
		_disabled: [true, false],
		_rows: ['5'],
		_msg: [{ _type: 'error', _description: 'Es ist ein Fehler aufgetreten' }],
		_value: ['Kleiner Text im Eingabefeld'],
		_placeholder: ['Hier steht ein Platzhaltertext'],
		_hint: ['Hinweis'],
		_touched: [true, false],
	},
	getTextareaHtml,
	{
		execMode: 'default', // ready
	},
);
