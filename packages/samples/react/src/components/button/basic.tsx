import type { FC } from 'react';
import React from 'react';
import { ButtonVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const ButtonBasic: FC = () => (
	<>
		<SampleDescription>
			<p>Hier sind anklickbare und nicht anklickbare Buttons. Es gibt außerdem Buttons mit Label und ohne Label.</p>
		</SampleDescription>

		<ButtonVariants />
	</>
);
