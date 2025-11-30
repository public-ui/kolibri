import type { FC } from 'react';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { AlignPropType } from '@public-ui/components';
import { KolButton, KolDrawer } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

import { DrawerRadioAlign } from './partials/align';

export const DrawerControlled: FC = () => {
	const [searchParams] = useSearchParams();
	const defaultAlign = searchParams.get('align') as AlignPropType;
	const [open, setOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [align, setAlign] = useState<AlignPropType>(defaultAlign || 'left');
	return (
		<div>
			<SampleDescription>
				<p>
					This sample shows the KolDrawer controlled by the property <code>_open</code> instead of methods.
				</p>
			</SampleDescription>

			<DrawerRadioAlign value={align} onChange={(_, value) => setAlign(value as AlignPropType)} />
			<div className="flex flex-wrap gap-4">
				<KolDrawer _open={open} _align={align} _label="I'm a controlled drawer" _on={{ onClose: () => setOpen(false) }}>
					<div>
						<p>Lorem ipsum dolor sit amet,</p>
						<KolButton _label="Close drawer" _on={{ onClick: () => setOpen(false) }} />
					</div>
				</KolDrawer>
				<KolButton _label="Open drawer" _on={{ onClick: () => setOpen(true) }} />
				<KolDrawer _open={modalOpen} _modal _align={align} _label="I'm a controlled modal drawer" _on={{ onClose: () => setModalOpen(false) }}>
					<div>
						<p>Lorem ipsum dolor sit amet,</p>
						<KolButton _label="Close drawer" _on={{ onClick: () => setModalOpen(false) }} />
					</div>
				</KolDrawer>
				<KolButton _label="Open drawer as modal" _on={{ onClick: () => setModalOpen(true) }} />
			</div>
		</div>
	);
};
