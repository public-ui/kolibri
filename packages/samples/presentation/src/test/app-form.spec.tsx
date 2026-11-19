/**
 * Testing an application component that uses KoliBri.
 *
 * The test exercises the real components and asserts on the result the user sees: the application's
 * own output in the light DOM and the data that reaches `onSubmit`. No KoliBri component is mocked.
 */

import { KolButton, KolForm, KolInputText } from '@public-ui/react-v19';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { screen } from 'shadow-dom-testing-library';
import { describe, expect, test, vi } from 'vitest';

const GreetingForm = ({ onSave }: { onSave: (name: string) => void }) => {
	const [name, setName] = useState('');
	const [saved, setSaved] = useState<string | null>(null);

	return (
		<>
			<KolForm
				_on={{
					onSubmit: () => {
						setSaved(name);
						onSave(name);
					},
				}}
			>
				<KolInputText _label="Name" _value={name} _on={{ onInput: (_event, value) => setName(value as string) }} />
				<KolButton _label="Save" _type="submit" />
			</KolForm>
			{saved !== null && <p role="status">Hello {saved}!</p>}
		</>
	);
};

describe('application form with KoliBri components', () => {
	test('shows the greeting after typing a name and submitting with the button', async () => {
		const user = userEvent.setup();
		const onSave = vi.fn();
		render(<GreetingForm onSave={onSave} />);

		await user.type(await screen.findByShadowRole('textbox', { name: 'Name' }), 'Ada');
		await user.click(await screen.findByShadowRole('button', { name: 'Save' }));

		expect(await screen.findByRole('status')).toHaveTextContent('Hello Ada!');
		expect(onSave).toHaveBeenCalledWith('Ada');
	});

	test('submits with Enter in the input', async () => {
		const user = userEvent.setup();
		const onSave = vi.fn();
		render(<GreetingForm onSave={onSave} />);

		await user.type(await screen.findByShadowRole('textbox', { name: 'Name' }), 'Grace{Enter}');

		expect(onSave).toHaveBeenCalledWith('Grace');
	});
});
