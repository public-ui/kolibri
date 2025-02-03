import React, { forwardRef } from 'react';
import { KolInputFile } from '@public-ui/react';
import type { Components } from '@public-ui/components';

import { ERROR_MSG, HINT_MSG } from '../../../shares/constants';

export const InputFileCases = forwardRef<HTMLKolInputFileElement, Components.KolInputFile>(function InputFileCases(props, ref) {
	return (
		<div className="grid gap-4">
			<div className="black-background">
				<KolInputFile
					{...props}
					_label="Upload file (Black background test)"
					_icons={{
						left: {
							icon: 'codicon codicon-save',
						},
					}}
					_touched
				/>
			</div>
			<KolInputFile
				{...props}
				_required
				_hint={HINT_MSG}
				_msg={{ _type: 'error', _description: ERROR_MSG }}
				_label="Upload file (Black background test)"
				_icons={{
					left: {
						icon: 'codicon codicon-save',
					},
				}}
				_touched
			/>
			<KolInputFile {...props} _msg={{ _type: 'info', _description: 'Just a hint' }} _label="Upload file" />
			<KolInputFile {...props} _msg={{ _type: 'warning', _description: 'Small warning' }} _label="Upload file" />
			<KolInputFile {...props} _msg={{ _type: 'success', _description: 'Success message' }} _label="Upload file" />
			<KolInputFile {...props} ref={ref} _accessKey="h" _multiple _msg={{ _type: 'error', _description: ERROR_MSG }} _label="Upload file (Multiple)" />
			<KolInputFile {...props} _disabled _label="Upload file (Disabled)" />
			<KolInputFile {...props} _label="With access key" _accessKey="c" />
			<KolInputFile {...props} _label="With short key" _shortKey="s" />
		</div>
	);
});
