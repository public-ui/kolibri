import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';

import { KolButton, KolCombobox, KolDialog, KolInputNumber, KolPopoverButton } from '@public-ui/react-v19';
import { useSearchParams } from 'react-router';
import { SampleDescription } from '../components/SampleDescription';

export const ZIndexScenario: FC = () => {
	const [searchParams] = useSearchParams();

	const showDialog = searchParams.get('show-dialog') as string;

	const cardRef = useRef<HTMLKolDialogElement>(null);

	const onOpenCardDialog = {
		onClick: () => cardRef.current?.openModal(),
	};

	useEffect(() => {
		if (showDialog === 'true') {
			cardRef.current?.openModal();
		}
	}, []);

	return (
		<>
			<SampleDescription>
				<p>This sample shows the combination of a few components overlaying content. Dialog, Popover, Tooltip</p>
			</SampleDescription>

			<div className="grid gap-8">
				<div>
					<KolButton _label="Open card dialog" _on={onOpenCardDialog} />
					<KolDialog ref={cardRef} _label="Card dialog" _variant="card" _width="30%">
						<KolPopoverButton _label="Help" _icons="kolicon-alert-info" _popoverAlign="right" _tooltipAlign="bottom" _hideLabel>
							<div className="w-sm p-2 border border-solid border-gray">
								<p>
									<u>Lorem ipsum dolor sit amet</u>, consectetur adipisicing elit. Aspernatur aut dolore dolores itaque praesentium reprehenderit sed
									voluptatum! Exercitationem ipsa magni maiores modi, placeat quas quos reprehenderit rerum sit veniam vitae.
								</p>
								<KolButton _hideLabel _icons="kolicon-check" _label="OK" _variant="primary" />
							</div>
						</KolPopoverButton>
						<KolCombobox _label="With string array in html" _suggestions="['Herr','Frau','Firma']" _value="Herr" _hideLabel />
						<KolInputNumber _label="Amount" />
					</KolDialog>
				</div>
			</div>
		</>
	);
};
