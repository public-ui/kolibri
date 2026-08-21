import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleBlock } from '../SampleBlock';
import { SampleDescription } from '../SampleDescription';

export const InputTextPlaceholder: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			<p>This story demonstrates the placeholder feature of KolInputText.</p>
		</SampleDescription>

		<SampleBlock id="first-name">
			<KolInputText _label="First name" _placeholder="Enter your first name" />
		</SampleBlock>
		<SampleBlock id="email">
			<KolInputText _label="Email address" _placeholder="user@example.com" />
		</SampleBlock>
		<SampleBlock id="tel">
			<KolInputText _label="Phone number" _placeholder="+49 123 456789" _type="tel" />
		</SampleBlock>
		<SampleBlock id="url">
			<KolInputText _label="Website" _placeholder="https://example.com" _type="url" />
		</SampleBlock>
		<SampleBlock id="search">
			<KolInputText _label="Search" _placeholder="Search..." _type="search" />
		</SampleBlock>
	</div>
);
