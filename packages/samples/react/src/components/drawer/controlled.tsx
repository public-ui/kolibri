import type { FC } from 'react';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { AlignPropType } from '@public-ui/components';
import { KolDrawer, KolButton, KolInputRadio } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const DrawerControlled: FC = () => {
	const [searchParams] = useSearchParams();
	const defaultAlign = searchParams.get('align') as AlignPropType;
	const [open, setOpen] = useState(false);
	const [align, setAlign] = useState<AlignPropType>(defaultAlign || 'left');
	const options = ['left', 'top', 'right', 'bottom'].map((a) => ({ label: a, value: a }));
	return (
		<div>
			<SampleDescription>
				<p>
					This sample shows the KolDrawer controlled by the property <code>_open</code> instead of methods.
				</p>
			</SampleDescription>

			<div className="grid gap-4">
				<div className="container my-4 d-grid gap-4">
					<KolInputRadio
						_label="Drawer alignment"
						_value={align}
						_options={options}
						_orientation="horizontal"
						_on={{ onChange: (_, value) => setAlign(value as AlignPropType) }}
					/>
				</div>
			</div>
			<div className="flex flex-wrap gap-4">
				<KolDrawer _open={open} _align={align} _label="I'm a controlled drawer" _on={{ onClose: () => setOpen(false) }}>
					<div>
						<p>Lorem ipsum dolor sit amet,</p>
						<KolButton _label="Close drawer" _on={{ onClick: () => setOpen(false) }} />
					</div>
				</KolDrawer>
				<KolButton _label="Open drawer" _on={{ onClick: () => setOpen(true) }} />
			</div>
		</div>
	);
};
