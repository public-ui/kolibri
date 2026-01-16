import type { ButtonProps, ButtonVariantPropType, KoliBriTableCell, KoliBriTableHeaderCell } from '@public-ui/components';
import { createReactRenderElement, KolButton, KolButtonLink, KolLink, KolLinkButton, KolTableStateless } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { getRoot } from '../../shares/react-roots';
import { SampleDescription } from '../SampleDescription';

function KolButtonWrapper({ _on, ...other }: ButtonProps) {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return <KolButton {...other} _on={dummyEventHandler} />;
}

const getButtonHeaderCell = (variant: ButtonVariantPropType): KoliBriTableHeaderCell => {
	const variantLabel = `${variant}`;
	const capitalizedVariant = variantLabel.charAt(0).toUpperCase() + variantLabel.slice(1);
	return {
		label: capitalizedVariant,
		key: variantLabel,
		textAlign: 'left',
		width: 160,
		render: (element: HTMLElement, cell: KoliBriTableCell) => {
			const { label } = cell as { label: string };
			const commonProps = {
				_label: capitalizedVariant,
				_variant: variant,
				_icons: { right: 'kolicon-kolibri' },
			};
			getRoot(createReactRenderElement(element)).render(
				label === 'button' ? <KolButtonWrapper {...commonProps} /> : <KolLinkButton _href="#/back-page" {...commonProps} />,
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

		<section className="w-full flex flex-col">
			<KolTableStateless
				_label="Button styles"
				_headerCells={{
					horizontal: [
						[
							getButtonHeaderCell('primary'),
							getButtonHeaderCell('secondary'),
							getButtonHeaderCell('normal'),
							getButtonHeaderCell('danger'),
							getButtonHeaderCell('ghost'),
						],
					],
					vertical: [
						[
							{ label: 'Button', width: 120 },
							{ label: 'Link-Button', width: 120 },
						],
					],
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
							{
								key: 'regular',
								label: 'Regular',
								textAlign: 'left',
								width: 180,
								render: (element: HTMLElement, cell: KoliBriTableCell) => {
									const { label } = cell as { label: string };
									const commonProps = {
										_label: label,
										_icons: { right: 'kolicon-kolibri' },
									};
									getRoot(createReactRenderElement(element)).render(
										label === 'button-link' ? <KolButtonLink {...commonProps} /> : <KolLink _href="#/back-page" {...commonProps} />,
									);
								},
							},
						],
					],
					vertical: [
						[
							{ label: 'Link', width: 140 },
							{ label: 'Button-Link', width: 140 },
						],
					],
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
		</section>
	</>
);
