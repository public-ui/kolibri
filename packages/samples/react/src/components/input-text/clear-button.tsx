import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputTextClearButton: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			<p>This sample demonstrates the clear button for search type input fields.</p>
		</SampleDescription>

		<SampleBlock id="search-empty">
			<KolInputText _label="Search" _type="search" _placeholder="Enter search term" />
		</SampleBlock>
		<SampleBlock id="search-value">
			<KolInputText _label="Search (with value)" _type="search" _value="test" _placeholder="Enter search term" />
		</SampleBlock>
		<SampleBlock id="search-disabled">
			<KolInputText _label="Search (disabled)" _type="search" _disabled _value="test" _placeholder="Disabled search" />
		</SampleBlock>
		<SampleBlock id="text-no-clear-button">
			<KolInputText _label="Text (no clear button)" _type="text" _value="test" _placeholder="Regular text input" />
		</SampleBlock>
	</div>
);
