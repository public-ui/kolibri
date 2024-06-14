import type { FC } from 'react';
import React from 'react';
import { FormWrap } from '../FormWrap';
import { SingleSelectVariants } from './partials/variants';
import { SampleDescription } from '../SampleDescription';
export const SingleSelectBasic: FC = () => (
	<>
		<SampleDescription></SampleDescription>
		<>
			<FormWrap RefComponent={SingleSelectVariants} />
		</>
	</>
);
