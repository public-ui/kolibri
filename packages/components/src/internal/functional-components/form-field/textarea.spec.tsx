import { h } from '@stencil/core';
import { renderFunctionalComponentToSpecPage } from '../../../utils/testing';
import { TextAreaFC } from './textarea';

const error = { _type: 'error' as const, _description: 'Error' };

describe('TextAreaFC', () => {
	it.each([
		['the default', {}],
		['states and a touched error', { disabled: true, required: true, readonly: true, touched: true, msg: error }],
		['a hidden label and descriptions', { hideLabel: true, label: 'Label', ariaDescribedBy: ['field-hint-nonce', 'field-character-limit-hint-nonce'] }],
		['native attributes', { rows: 5, placeholder: 'Placeholder', maxLength: 10, style: { resize: 'none' }, value: 'Value' }],
	])('renders %s', async (_, props) => {
		const page = await renderFunctionalComponentToSpecPage(() => (
			<div>
				<TextAreaFC id="field-nonce" {...props} />
			</div>
		));
		expect(page.root).toMatchSnapshot();
	});
});
