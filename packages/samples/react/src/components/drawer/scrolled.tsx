import type { AlignPropType } from '@public-ui/components';
import { KolButton, KolDrawer, KolInputCheckbox } from '@public-ui/react-v19';
import type { CSSProperties, FC, ReactNode } from 'react';
import React, { useRef, useState } from 'react';
import { SampleDescription } from '../SampleDescription';
import { DrawerRadioAlign } from './partials/align';

type Dimensions = {
	height?: string;
	width?: string;
};

type DrawerHandle = {
	close: () => void;
	open: () => void;
};

const BACKGROUND_PATTERN =
	'linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%)';

const BASE_CONTENT_STYLE: CSSProperties = {
	background: BACKGROUND_PATTERN,
	backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
	backgroundSize: '20px 20px',
	border: '2px dashed #ccc',
	display: 'flex',
	flexDirection: 'column',
	gap: '20px',
	padding: '20px',
};

const OVERFLOW_CONTAINER_STYLE: CSSProperties = {
	border: '1px solid #999',
	overflow: 'auto',
	padding: 0,
};

const ACTIONS_STYLE: CSSProperties = {
	marginTop: 'auto',
	paddingTop: '40px',
};

const getContentDimensions = (align: AlignPropType): Dimensions => ({
	height: align === 'top' || align === 'bottom' ? '150vh' : '400px',
	width: align === 'left' || align === 'right' ? '150vw' : '400px',
});

const getContainerDimensions = (align: AlignPropType): Dimensions => ({
	height: align === 'top' || align === 'bottom' ? '90vh' : undefined,
	width: align === 'left' || align === 'right' ? '90vw' : undefined,
});

const formatDimensions = ({ width, height }: Dimensions): string => `${width ?? 'auto'} wide × ${height ?? 'auto'} high`;

type OverflowPanelProps = {
	children: ReactNode;
	heading: string;
	onClose: () => void;
	style: CSSProperties;
};

const OverflowPanel: FC<OverflowPanelProps> = ({ heading, onClose, style, children }) => (
	<div style={style}>
		<p>{heading}</p>
		<div>
			<h3>Large Content Area</h3>
			{children}
			<div style={ACTIONS_STYLE}>
				<KolButton _label="Close drawer" _on={{ onClick: onClose }} />
			</div>
		</div>
	</div>
);

type OverflowExampleProps = {
	align: AlignPropType;
	handled: boolean;
	onClose: () => void;
};

const OverflowExample: FC<OverflowExampleProps> = ({ align, handled, onClose }) => {
	const contentDimensions = getContentDimensions(align);
	const containerDimensions = getContainerDimensions(align);
	const contentStyle: CSSProperties = { ...BASE_CONTENT_STYLE, ...contentDimensions };

	const handledPanel = (
		<OverflowPanel heading="✅ Content with overflow handling" onClose={onClose} style={contentStyle}>
			<p>
				<strong>Container:</strong> {formatDimensions(containerDimensions)}
			</p>
			<p>
				<strong>Content:</strong> {formatDimensions(contentDimensions)}
			</p>
			<p>The wrapper limits the visible area and adds its own scrolling behaviour.</p>
			<p>This is the recommended way to display very large content inside a drawer.</p>
		</OverflowPanel>
	);

	if (handled) {
		return <div style={{ ...OVERFLOW_CONTAINER_STYLE, ...containerDimensions }}>{handledPanel}</div>;
	}

	return (
		<OverflowPanel heading="❌ Content without overflow handling" onClose={onClose} style={contentStyle}>
			<p>
				<strong>Content:</strong> {formatDimensions(contentDimensions)}
			</p>
			<p>The drawer tries to render this element at its full size, so it extends beyond the viewport.</p>
			<p>
				Add your own wrapper with <code>overflow: auto</code> to keep the layout under control.
			</p>
		</OverflowPanel>
	);
};

export const DrawerScrolled: FC = () => {
	const drawerElement = useRef<HTMLKolDrawerElement>(null);
	const [align, setAlign] = useState<AlignPropType>('bottom');
	const [isOverflowHandled, setOverflowHandled] = useState(true);

	const getDrawerHandle = (): DrawerHandle | null => {
		const element = drawerElement.current as Partial<DrawerHandle> | null;
		if (element && typeof element.close === 'function' && typeof element.open === 'function') {
			return element as DrawerHandle;
		}
		return null;
	};

	const closeDrawer = () => {
		getDrawerHandle()?.close();
	};

	const openDrawer = () => {
		getDrawerHandle()?.open();
	};

	return (
		<>
			<SampleDescription>
				<p>KolDrawer renders the provided slot content. When that content is larger than the drawer you should limit it with your own scrollable wrapper.</p>
				<p>Use the toggle to compare the recommended approach with content that breaks the layout because overflow is not handled.</p>
			</SampleDescription>

			<div className="flex flex-col gap-4 mb-4">
				<DrawerRadioAlign value={align} onChange={(_, value) => setAlign(value as AlignPropType)} />
				<KolInputCheckbox
					_label="Enable overflow handling (recommended)"
					_checked={isOverflowHandled}
					_on={{ onChange: (_, value) => setOverflowHandled(Boolean(value)) }}
				/>
			</div>
			<div className="flex flex-wrap gap-4">
				<KolDrawer ref={drawerElement} _label="Scrollable drawer" _align={align}>
					<OverflowExample align={align} handled={isOverflowHandled} onClose={closeDrawer} />
				</KolDrawer>

				<KolButton _label="Open scrollable drawer" _on={{ onClick: openDrawer }} />
			</div>
		</>
	);
};
