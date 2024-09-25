import { KolButton } from '@public-ui/react';
import React from 'react';
import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';
import { useToasterService } from '../../hooks/useToasterService';

export const ButtonAriaDescription: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>This sample shows KolButton with aria-description</p>
			</SampleDescription>

			<div className="flex flex-wrap gap-4">
				<KolButton _label="Button Text without area description" _on={dummyEventHandler}></KolButton>
				<KolButton _label="Button Text" _ariaDescription="Button Area Description" _on={dummyEventHandler}></KolButton>
			</div>
		</>
	);
};
