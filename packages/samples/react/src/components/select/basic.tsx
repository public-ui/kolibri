import React, { FC } from 'react';
import { FormWrap } from '../FormWrap';
import { SelectVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';

export const SelectBasic: FC = () => (
	<>
		<SampleDescription>
			<p>KolSelect renders a select field. The sample shows KolSelect in a form context with all variations and states.</p>
		</SampleDescription>
		<FormWrap RefComponent={SelectVariants} />
	</>
);
