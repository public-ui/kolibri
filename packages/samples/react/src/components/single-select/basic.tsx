import { KolSingleSelect } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { FormWrap } from '../FormWrap';
import { InputEventValueDemo } from '../InputEventValueDemo';
import { SampleDescription } from '../SampleDescription';
import { SingleSelectVariants } from './partials/variants';

export const SingleSelectBasic: FC = () => {
	return (
		<>
			<SampleDescription>
				<p>SingleSelect provides a select field for a single value, supported by a search field.</p>
			</SampleDescription>

			<InputEventValueDemo
				label="KolSingleSelect"
				renderInput={(handlers) => (
					<KolSingleSelect
						_label="Search option"
						_options={[
							{ label: 'One', value: 'one' },
							{ label: 'Two', value: 'two' },
						]}
						_on={handlers}
					/>
				)}
			/>
			<FormWrap RefComponent={SingleSelectVariants} showButtons={false} />
		</>
	);
};
