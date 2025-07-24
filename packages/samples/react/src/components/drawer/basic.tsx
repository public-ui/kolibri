import type { FC } from 'react';
import React, { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { AlignPropType } from '@public-ui/components';
import { KolDrawer, KolButton, KolInputCheckbox, KolInputRadio } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';

export const DrawerBasic: FC = () => {
	const [searchParams] = useSearchParams();
	const defaultAlign = searchParams.get('align') as AlignPropType;
	const defaultCloser = searchParams.get('closer') === 'true';
	const drawerElement = useRef<HTMLKolDrawerElement>(null);

	const [align, setAlign] = useState<AlignPropType>(defaultAlign || 'left');
	const [hasCloser, setHasCloser] = useState<boolean>(defaultCloser);

	useEffect(() => {
		if (defaultAlign) {
			drawerElement.current?.open();
		}
	}, [defaultAlign]);
	const options = ['left', 'top', 'right', 'bottom'].map((a) => ({ label: a, value: a }));
	return (
		<>
			<SampleDescription>
				<p>KolDrawer shows a dialog attached to one of the sides of the viewport, when opened. This sample illustrates the four alignments.</p>
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

			<KolInputCheckbox
				_label="Drawer has closer"
				className="mb-4"
				_checked={hasCloser}
				_on={{
					onInput: (_, value) => {
						setHasCloser((value as null | boolean) === true);
					},
				}}
			/>

			<div className="flex flex-wrap gap-4">
				<KolDrawer
					ref={drawerElement}
					_label="I am a drawer"
					_align={align}
					_hasCloser={hasCloser}
					_on={{ onClose: () => console.log('Drawer onClose triggered!') }}
				>
					<div className={align === 'left' || align === 'right' ? 'drawer-content-vertical' : ''}>
						<p className="mt-0">
							Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
							voluptua.
						</p>
						<KolButton _label="Close drawer" _on={{ onClick: () => drawerElement.current?.close() }} />
					</div>
				</KolDrawer>
				<KolButton _label="Open drawer" _on={{ onClick: () => drawerElement.current?.open() }} />
			</div>
		</>
	);
};
