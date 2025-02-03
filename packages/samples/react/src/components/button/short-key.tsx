import { KolButton } from '@public-ui/react';
import React from 'react';
import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';
import { useToasterService } from '../../hooks/useToasterService';

export const ButtonShortKey: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This sample shows KolButton with short key without functionality. The short key is purely visual. Its functionality needs to be developed separately.{' '}
				</p>
			</SampleDescription>

			<div className="flex flex-wrap gap-4">
				<KolButton _label="With S short key" _shortKey="S" _on={dummyEventHandler}></KolButton>
				<KolButton _label="Very small b" _shortKey="b" _on={dummyEventHandler}></KolButton>
				<KolButton _label="Short key does not appear in label" _shortKey="x" _on={dummyEventHandler}></KolButton>
				<KolButton _label="short key without label" _hideLabel _shortKey="k" _icons="codicon codicon-dashboard" _on={dummyEventHandler}></KolButton>
				<KolButton
					_label="with inline icons"
					_icons={{
						left: 'codicon codicon-dashboard',
						right: 'codicon codicon-dashboard',
					}}
					_shortKey="n"
					_on={dummyEventHandler}
				/>
			</div>
		</>
	);
};
