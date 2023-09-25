import React, { forwardRef } from 'react';

import { KolInputFile } from '@public-ui/react';

import { Components } from '@public-ui/components';
import { ERROR_MSG } from '../../../shares/constants';

export const InputFileCases = forwardRef<HTMLKolInputFileElement, Components.KolInputFile>(function InputFileCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputFile
				{...props}
				_required
				_error={ERROR_MSG}
				_label="Datei hochladen"
				_icon={{
					left: {
						icon: 'codicon codicon-save',
					},
				}}
				_touched
			/>
			<KolInputFile {...props} ref={ref} _multiple _error={ERROR_MSG} _label="Datei hochladen (Multiple)" />
			<KolInputFile {...props} _disabled _label="Datei hochladen (Disabled)" />
		</div>
	);
});
