import { KolInputPassword } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputEventValueDemo } from '../InputEventValueDemo';
import { SampleDescription } from '../SampleDescription';
import { InputPasswordVariants } from './partials/variants';

export const InputPasswordBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputPassword renders a password input field. The sample shows KolInputPassword in a form context with all variations and states.</p>
		</SampleDescription>

		<InputEventValueDemo label="KolInputPassword" renderInput={(handlers) => <KolInputPassword _label="Password" _on={handlers} />} />

		<FormWrap RefComponent={InputPasswordVariants} showButtons={false} />
	</>
);
