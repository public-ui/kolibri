import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextClearButton: FC = () => (
	<>
		<SampleDescription>
			<p>This sample demonstrates the clear button for search type input fields.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolInputText _label="Search" _type="search" _placeholder="Enter search term" />
			<KolInputText _label="Search (with value)" _type="search" _value="test" _placeholder="Enter search term" />
			<KolInputText _label="Search (disabled)" _type="search" _disabled _value="test" _placeholder="Disabled search" />
			<KolInputText _label="Text (no clear button)" _type="text" _value="test" _placeholder="Regular text input" />
		</div>
	</>
);
