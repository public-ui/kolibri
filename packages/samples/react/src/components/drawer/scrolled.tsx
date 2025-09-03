import type { AlignPropType } from '@public-ui/components';
import { KolButton, KolDrawer, KolInputCheckbox } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useRef, useState } from 'react';
import { SampleDescription } from '../SampleDescription';
import { DrawerRadioAlign } from './partials/align';

export const DrawerScrolled: FC = () => {
	const drawerElement = useRef<HTMLKolDrawerElement>(null);
	const [align, setAlign] = useState<AlignPropType>('bottom');
	const [useOverflowHandling, setUseOverflowHandling] = useState(true);

	return (
		<>
			<SampleDescription>
				<p>
					This sample demonstrates how KolDrawer handles content that exceeds the drawer dimensions and shows the correct way to handle overflow. Use the
					&#34;Enable Overflow Handling&#34; toggle to see the difference between problematic behavior (content exceeding drawer bounds) and the proper solution
					(overflow handling within the slot content).
				</p>
			</SampleDescription>

			<div className="flex flex-col gap-4 mb-4">
				<DrawerRadioAlign value={align} onChange={(_, value) => setAlign(value as AlignPropType)} />
				<KolInputCheckbox
					_label="Enable Overflow Handling (Recommended)"
					_checked={useOverflowHandling}
					_on={{ onChange: (_, value) => setUseOverflowHandling(!!value) }}
				/>
			</div>
			<div className="flex flex-wrap gap-4">
				<KolDrawer ref={drawerElement} _label="Scrollable Drawer" _align={align}>
					{useOverflowHandling ? (
						// ✅ Correct approach: Outer container with fixed dimensions and overflow handling
						<div
							style={{
								width: align === 'left' || align === 'right' ? '90vw' : undefined,
								height: align === 'top' || align === 'bottom' ? '90vh' : undefined,
								overflow: 'auto',
								padding: '0',
								border: '1px solid #999',
							}}
						>
							<div
								style={{
									width: align === 'left' || align === 'right' ? '150vw' : undefined,
									height: align === 'top' || align === 'bottom' ? '150vh' : undefined,
									background:
										'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
									backgroundSize: '20px 20px',
									backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
									border: '2px dashed #ccc',
									padding: '20px',
									display: 'flex',
									flexDirection: 'column',
									gap: '20px',
								}}
							>
								<p>✅ Content with proper overflow handling - scrollable within drawer bounds</p>
								<div>
									<h3>Large Content Area (Scrollable)</h3>
									<p>
										Container: {align === 'left' || align === 'right' ? '400px wide' : '90vw wide'} ×{' '}
										{align === 'top' || align === 'bottom' ? '90vh high' : '400px high'}
									</p>
									<p>
										Content: {align === 'left' || align === 'right' ? '150vw wide' : '400px wide'} ×{' '}
										{align === 'top' || align === 'bottom' ? '150vh high' : '400px high'}
									</p>
									<p>
										<strong>Overflow Handling:</strong> Enabled - Container has fixed size with overflow: auto
									</p>
									<p>
										Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
										diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
										dolor sit amet.
									</p>
									<p>
										With overflow handling enabled, this content scrolls properly within the drawer container. You can scroll horizontally/vertically to see all
										content.
									</p>
									<div style={{ marginTop: 'auto', paddingTop: '40px' }}>
										<KolButton _label="Close drawer" _on={{ onClick: () => drawerElement.current?.close() }} />
									</div>
								</div>
							</div>
						</div>
					) : (
						// ❌ Problematic approach: Content directly exceeds drawer bounds
						<div
							style={{
								width: align === 'left' || align === 'right' ? '150vw' : '400px',
								height: align === 'top' || align === 'bottom' ? '150vh' : '400px',
								background:
									'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)',
								backgroundSize: '20px 20px',
								backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
								border: '2px dashed #ccc',
								padding: '20px',
								display: 'flex',
								flexDirection: 'column',
								gap: '20px',
							}}
						>
							<p>❌ Content exceeding drawer bounds - problematic behavior</p>
							<div>
								<h3>Large Content Area</h3>
								<p>Width: {align === 'left' || align === 'right' ? '150vw (exceeds drawer width)' : '400px'}</p>
								<p>Height: {align === 'top' || align === 'bottom' ? '150vh (exceeds drawer height)' : '400px'}</p>
								<p>
									<strong>Overflow Handling:</strong> Disabled - Content extends beyond drawer boundaries
								</p>
								<p>
									Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed
									diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
									dolor sit amet.
								</p>
								<p>Without overflow handling, this content may extend beyond the drawer boundaries, causing layout issues.</p>
								<div style={{ marginTop: 'auto', paddingTop: '40px' }}>
									<KolButton _label="Close drawer" _on={{ onClick: () => drawerElement.current?.close() }} />
								</div>
							</div>
						</div>
					)}
				</KolDrawer>

				<KolButton _label="Open scrollable drawer" _on={{ onClick: () => drawerElement.current?.open() }} />
			</div>
		</>
	);
};
