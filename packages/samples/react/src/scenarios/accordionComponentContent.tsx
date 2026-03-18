import React from 'react';

import { KolAccordion, KolCombobox, KolTableStateful } from '@public-ui/react-v19';
import { SampleDescription } from '../components/SampleDescription';

import type { FC } from 'react';

const DATA = [{ left: 'Left Example', center: 'Center Example', right: 'Right Example' }];

export const AccordionComponentContent: FC = () => (
	<>
		<SampleDescription>
			<p>KolAccordion can have other KoliBri components as content. Some are shown here.</p>
		</SampleDescription>

		<div className="grid gap-4">
			<KolAccordion _label="With Combobox" _open>
				<KolCombobox _label="Combobox in Accordion" _suggestions="['Herr','Frau','Firma']" />
			</KolAccordion>
			<KolAccordion _label="With Table" _open>
				<KolTableStateful
					_label="Table for demonstration purposes with different text align properties"
					_headers={{
						horizontal: [
							[
								{ label: 'left', key: 'left', textAlign: 'left', width: 300 },
								{
									label: 'center',
									key: 'center',
									textAlign: 'center',
									width: 300,
								},
								{ label: 'right', key: 'right', textAlign: 'right', width: 300 },
							],
						],
					}}
					_data={DATA}
				/>
			</KolAccordion>
		</div>
	</>
);
