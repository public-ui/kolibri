import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import type { AlignPropType } from '@public-ui/components';
import { KolButton, KolDrawer, KolInputCheckbox } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

import { DrawerRadioAlign } from './partials/align';
export const DrawerBasic: FC = () => {
	const [searchParams] = useSearchParams();
	const defaultAlign = searchParams.get('align') as AlignPropType;
	const defaultCloser = searchParams.get('closer') === 'true';
	type DrawerHandle = {
		close: () => void;
		open: () => void;
	};
	const isDrawerHandle = (element: unknown): element is DrawerHandle => {
		return typeof (element as DrawerHandle)?.open === 'function' && typeof (element as DrawerHandle)?.close === 'function';
	};
	const drawerElement = useRef<unknown>(null);

	const [align, setAlign] = useState<AlignPropType>(defaultAlign || 'left');
	const [hasCloser, setHasCloser] = useState<boolean>(defaultCloser);

	useEffect(() => {
		if (defaultAlign) {
			if (isDrawerHandle(drawerElement.current)) {
				drawerElement.current.open();
			}
		}
	}, [defaultAlign]);
	return (
		<>
			<SampleDescription>
				<p>KolDrawer shows a dialog attached to one of the sides of the viewport, when opened. This sample illustrates the four alignments.</p>
			</SampleDescription>

			<DrawerRadioAlign value={align} onChange={(_, value) => setAlign(value as AlignPropType)} />

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
					ref={(element) => (drawerElement.current = element)}
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
						<KolButton
							_label="Close drawer"
							_on={{
								onClick: () => {
									if (isDrawerHandle(drawerElement.current)) {
										drawerElement.current.close();
									}
								},
							}}
						/>
					</div>
				</KolDrawer>
				<KolButton
					_label="Open drawer"
					_on={{
						onClick: () => {
							if (isDrawerHandle(drawerElement.current)) {
								drawerElement.current.open();
							}
						},
					}}
				/>
			</div>
		</>
	);
};
