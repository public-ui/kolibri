import React from 'react';
import { KolInputFile, KolForm } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputFileBasic: FC = () => (
	<KolForm className="grid gap-4">
		<KolInputFile
			_id="file"
			_name="file"
			_required
			_error={ERROR_MSG}
			_label="Datei hochladen"
			_icon={{
				left: {
					icon: 'codicon codicon-save',
				},
			}}
		/>
		<KolInputFile _id="file" _multiple _error={ERROR_MSG} _label="Datei hochladen (Multiple)" />
		<KolInputFile _disabled _id="file" _label="Datei hochladen (Disabled)" />
	</KolForm>
);
