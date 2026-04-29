import type { FC } from 'react';
import React from 'react';
import { FormWrap } from '../FormWrap';
import { SampleDescription } from '../SampleDescription';
import { SingleSelectVariants } from './partials/variants';

export const SingleSelectBasic: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>SingleSelect provides a select field for a single value, supported by a search field.</p>
			</SampleDescription>

			<FormWrap RefComponent={SingleSelectVariants} showButtons={false} />
		</>
	);
};
