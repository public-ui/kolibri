import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputTextPlaceholder: FC = () => (
	<>
		<SampleDescription>
			<p>This story demonstrates the placeholder feature of KolInputText.</p>
		</SampleDescription>

		<SampleBlock id="placeholder">
			<KolInputText _label="First name" _placeholder="Enter your first name" />
			<KolInputText _label="Email address" _placeholder="user@example.com" />
			<KolInputText _label="Phone number" _placeholder="+49 123 456789" _type="tel" />
			<KolInputText _label="Website" _placeholder="https://example.com" _type="url" />
			<KolInputText _label="Search" _placeholder="Search..." _type="search" />
		</SampleBlock>
	</>
);
