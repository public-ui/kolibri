import { KolInputCheckbox } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputEventValueDemo } from '../InputEventValueDemo';
import { SampleDescription } from '../SampleDescription';
import { InputCheckboxVariants } from './partials/variants';

export const InputCheckboxBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolInputCheckbox renders a checkbox. The sample shows KolInputCheckbox in a form context with all variations and states.</p>
		</SampleDescription>
		<InputEventValueDemo label="KolInputCheckbox" renderInput={(handlers) => <KolInputCheckbox _label="Accept terms" _on={handlers} />} />
		<FormWrap RefComponent={InputCheckboxVariants} showButtons={false} />
	</>
);
