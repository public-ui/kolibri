import { KolInputNumber } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';

import { FormWrap } from '../FormWrap';
import { InputEventValueDemo } from '../InputEventValueDemo';
import { SampleDescription } from '../SampleDescription';
import { InputNumberVariants } from './partials/variants';

export const InputNumberBasic: FC = () => (
	<>
		<SampleDescription>
			<p>
				KolInputNumber encompasses basic functionalities, utilizing the min, max, and step attributes to restrict the range of input values. Despite these
				constraints, it allows free input that can ignore the defined minimum and maximum values, as well as step sizes. The component intentionally does not
				emphasize validation rules, supporting examples without form validation, and refrains from additional validation through native HTML element validation.
			</p>
		</SampleDescription>
		<InputEventValueDemo label="KolInputNumber" renderInput={(handlers) => <KolInputNumber _label="Amount" _on={handlers} />} />

		<FormWrap RefComponent={InputNumberVariants} showButtons={false} />
	</>
);
