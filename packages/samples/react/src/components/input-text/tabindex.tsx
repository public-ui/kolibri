/* eslint-disable jsx-a11y/tabindex-no-positive */
import { KolInputText } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { SampleDescription } from '../SampleDescription';

export const InputTextTabindex: FC = () => (
	<div className="grid gap-4">
		<SampleDescription>
			<p></p>
		</SampleDescription>
		<KolInputText _label="First input" tabIndex={3} />
		<KolInputText _label="Second input" tabIndex={2} />
	</div>
);
