import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { AlignPropType } from '@public-ui/components';
import { KolButton, KolDrawer } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

import { DrawerRadioAlign } from './partials/align';

export const DrawerBasic: FC = () => {
	const [searchParams] = useSearchParams();
	const defaultAlign = searchParams.get('align') as AlignPropType;
	const drawerElement = useRef<HTMLKolDrawerElement>(null);
	const drawerModalElement = useRef<HTMLKolDrawerElement>(null);
	const [align, setAlign] = useState<AlignPropType>(defaultAlign || 'left');
	useEffect(() => {
		if (defaultAlign) {
			drawerModalElement.current?.open();
		}
	}, [defaultAlign]);
	return (
		<>
			<SampleDescription>
				<p>
					KolDrawer shows a dialog attached to one of the sides of the viewport, when opened. This sample illustrates the four alignments and the modal- and
					non-modal modes.
				</p>
			</SampleDescription>

			<DrawerRadioAlign value={align} onChange={(_, value) => setAlign(value as AlignPropType)} />
			<div className="flex flex-wrap gap-4">
				<KolDrawer ref={drawerElement} _label="I am a drawer" _align={align} _on={{ onClose: () => console.log('Drawer onClose triggered!') }}>
					<div className={align === 'left' || align === 'right' ? 'drawer-content-vertical' : ''}>
						<p>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
							voluptua.
						</p>
						<KolButton _label="Close drawer" _on={{ onClick: () => drawerElement.current?.close() }} />
					</div>
				</KolDrawer>
				<KolButton _label="Open drawer" _on={{ onClick: () => drawerElement.current?.open() }} />
				<KolDrawer
					ref={drawerModalElement}
					_modal
					_align={align}
					_label="I am a Drawer Modal"
					_on={{ onClose: () => console.log('Drawer Modal onClose triggered!') }}
				>
					<div className={align === 'left' || align === 'right' ? 'drawer-content-vertical' : ''}>
						<p>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
							voluptua.
						</p>
						<KolButton _label="Close drawer modal" _on={{ onClick: () => drawerModalElement.current?.close() }} />
					</div>
				</KolDrawer>
				<KolButton _label="Open drawer as modal" _on={{ onClick: () => drawerModalElement.current?.open() }} />
			</div>
		</>
	);
};
