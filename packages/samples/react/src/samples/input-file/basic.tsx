import React from 'react';
import { KolInputFile } from '@public-ui/react';

import { FC } from 'react';

import { ERROR_MSG } from '../../shares/constants';

export const InputFileBasic: FC = () => (
	<div className="grid gap-4">
		<KolInputFile
			_id="file"
			_name="file"
			_required
			_error={ERROR_MSG}
			_icon={{
				left: {
					icon: 'codicon codicon-arrow-left',
				},
				right: {
					icon: 'codicon codicon-arrow-right',
				},
			}}
			_touched
		>
			Datei hochladen
		</KolInputFile>
		<KolInputFile _id="file" _multiple _error={ERROR_MSG}>
			Datei hochladen (Multiple)
		</KolInputFile>
		<KolInputFile _disabled _id="file">
			Datei hochladen (Disabled)
		</KolInputFile>
	</div>
);
