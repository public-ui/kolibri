import type { FC } from 'react';
import React from 'react';
import { createReactRenderElement, KolButton, KolButtonLink, KolLink, KolLinkButton, KolTableStateless } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import { getRoot } from '../../shares/react-roots';
import type { ButtonVariantPropType } from '@public-ui/components';
import type { KoliBriTableCell } from '@public-ui/components/src';
import type { KoliBriTableCellTextAlign } from '@public-ui/components/src/schema';

const getButtonHeaderCell = (variant: ButtonVariantPropType) => {
	const capitalizedVariant = variant.charAt(0).toUpperCase() + variant.slice(1);
	return {
		label: capitalizedVariant,
		key: variant,
		textAlign: 'left' as KoliBriTableCellTextAlign,
		render: (element: HTMLElement, cell: KoliBriTableCell) => {
			const commonProps = {
				_label: capitalizedVariant,
				_variant: variant,
				_icons: { right: 'codicon codicon-squirrel' },
			};
			getRoot(createReactRenderElement(element)).render(
				cell.label === 'button' ? <KolButton {...commonProps} /> : <KolLinkButton _href="#/back-page" {...commonProps} />,
			);
		},
	};
};

export const InteractiveChildElements: FC = () => (
	<>
		<SampleDescription>
			<p>
				This sample shows a KolTableStateless with different interactive child elements. It can be used to assure themes show these child elements correctly.
			</p>
		</SampleDescription>

		<KolTableStateless
			_label="Button styles"
			_headerCells={{
				horizontal: [
					[
						{ label: '', asTd: true, width: '20ex' },
						getButtonHeaderCell('primary'),
						getButtonHeaderCell('secondary'),
						getButtonHeaderCell('normal'),
						getButtonHeaderCell('danger'),
						getButtonHeaderCell('ghost'),
					],
				],
				vertical: [[{ label: 'Button' }, { label: 'Link-Button' }]],
			}}
			_data={[
				{
					primary: 'button',
					secondary: 'button',
					normal: 'button',
					danger: 'button',
					ghost: 'button',
				},
				{
					primary: 'link-button',
					secondary: 'link-button',
					normal: 'link-button',
					danger: 'link-button',
					ghost: 'link-button',
				},
			]}
			className="block"
		/>

		<KolTableStateless
			_label="Link styles"
			_headerCells={{
				horizontal: [
					[
						{ label: '', asTd: true, width: '20ex' },
						{
							key: 'regular',
							label: 'Regular',
							textAlign: 'left' as KoliBriTableCellTextAlign,
							render: (element: HTMLElement, cell: KoliBriTableCell) => {
								const commonProps = {
									_label: cell.label,
									_icons: { right: 'codicon codicon-squirrel' },
								};
								getRoot(createReactRenderElement(element)).render(
									cell.label === 'button-link' ? <KolButtonLink {...commonProps} /> : <KolLink _href="#/back-page" {...commonProps} />,
								);
							},
						},
					],
				],
				vertical: [[{ label: 'Link' }, { label: 'Button-Link' }]],
			}}
			_data={[
				{
					regular: 'link',
				},
				{
					regular: 'button-link',
				},
			]}
			className="block mt"
		/>
	</>
);
