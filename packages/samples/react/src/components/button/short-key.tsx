import { KolButton, KolHeading } from '@public-ui/react-v19';
import type { FC } from 'react';
import React from 'react';
import { useToasterService } from '../../hooks/useToasterService';
import { SampleDescription } from '../SampleDescription';

export const ButtonShortKey: FC = () => {
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<>
			<SampleDescription>
				<p>
					This story demonstrates buttons with short keys (visual keyboard shortcuts). The short key is displayed as a visual indicator within the button label,
					but it is purely visual and needs custom functionality implementation to make it interactive.
				</p>
			</SampleDescription>

			<div className="grid gap-8">
				<section className="grid gap-4">
					<KolHeading _level={2} _label="Buttons with Short Keys" />
					<div className="flex flex-wrap gap-4">
						<KolButton _label="With S short key" _shortKey="S" _on={dummyEventHandler} />
						<KolButton _label="Very small b" _shortKey="b" _on={dummyEventHandler} />
						<KolButton _label="Short key does not appear in label" _shortKey="x" _on={dummyEventHandler} />
					</div>
				</section>

				<section className="grid gap-4">
					<KolHeading _level={2} _label="Short Key with Hidden Label" />
					<div className="flex flex-wrap gap-4">
						<KolButton _label="short key without label" _hideLabel _shortKey="k" _icons="codicon codicon-dashboard" _on={dummyEventHandler} />
					</div>
				</section>

				<section className="grid gap-4">
					<KolHeading _level={2} _label="Short Key with Inline Icons" />
					<div className="flex flex-wrap gap-4">
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
				</section>
			</div>
		</>
	);
};
