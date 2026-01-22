// DrawerScrolled Class

import type { AlignPropType } from '@public-ui/components';
import { KolButton, KolDrawer } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useRef, useState } from 'react';
import { SampleDescription } from '../SampleDescription';
import { DrawerRadioAlign } from './partials/align';

export const DrawerBigContent: FC = () => {
	const drawerElement = useRef<HTMLKolDrawerElement>(null);
	const [align, setAlign] = useState<AlignPropType>('bottom');

	return (
		<>
			<SampleDescription>
				<p>This sample demonstrates how KolDrawer handles content that exceeds the drawer dimensions.</p>
			</SampleDescription>

			<div className="flex flex-col gap-4 mb-4">
				<DrawerRadioAlign value={align} onChange={(_, value) => setAlign(value as AlignPropType)} />
			</div>
			<div className="flex flex-wrap gap-4">
				<KolDrawer ref={drawerElement} _label="Scrollable Drawer" _align={align}>
					<div
						style={{
							width: align === 'left' || align === 'right' ? '20vw' : undefined,
							height: align === 'top' || align === 'bottom' ? '20vh' : undefined,
						}}
					>
						<h3>Large Content Area (Scrollable)</h3>
						<p>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
							voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
							amet.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
							voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
							amet.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
							voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
							amet.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
							voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
							amet.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
							voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
							amet.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
							voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
							amet.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
							voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
							amet.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
							voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
							amet.
						</p>
						<div style={{ marginTop: 'auto', paddingTop: '40px' }}>
							<KolButton _label="Close drawer" _on={{ onClick: () => drawerElement.current?.close() }} />
						</div>
					</div>
				</KolDrawer>

				<KolButton _label="Open scrollable drawer" _on={{ onClick: () => drawerElement.current?.open() }} />
			</div>
		</>
	);
};
