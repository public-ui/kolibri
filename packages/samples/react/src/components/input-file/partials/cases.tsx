import React, { forwardRef } from 'react';

import { KolInputFile } from '@public-ui/react';

import { ERROR_MSG } from '../../../shares/constants';

import type { Components } from '@public-ui/components';
export const InputFileCases = forwardRef<HTMLKolInputFileElement, Components.KolInputFile>(function InputFileCases(props, ref) {
	return (
		<div className="grid gap-4">
			<KolInputFile
				{...props}
				_required
				_msg={{ _type: 'error', _label: ERROR_MSG }}
				_label="Datei hochladen"
				_icons={{
					left: {
						icon: 'codicon codicon-save',
					},
				}}
				_touched
			/>
			<KolInputFile {...props} ref={ref} _accessKey="h" _multiple _msg={{ _type: 'error', _label: ERROR_MSG }} _label="Datei hochladen (Multiple)" />
			<KolInputFile {...props} _disabled _label="Datei hochladen (Disabled)" />
		</div>
	);
});
