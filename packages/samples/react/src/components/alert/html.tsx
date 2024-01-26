import React from 'react';
import { KolAlert } from '@public-ui/react';

import { FC } from 'react';

export const AlertHtml: FC = () => (
	<div>
		<KolAlert _heading="Ausgabe von HTML-Code im Alert" _type="info">
			{' '}
			<h2 className="mt-2 mb-3">Hier wird eine H2-Überschrift ausgegeben</h2>
			<div style={{ display: 'grid', gridAutoFlow: 'column', gap: '1rem' }}>
				<div>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem sed fugiat dolorum ratione et, ullam officia nobis nihil debitis, consectetur dicta
						accusantium. Vitae debitis, quibusdam vel recusandae deleniti placeat dolorem?
					</p>
				</div>
				<div>
					<h2>Text in einer rechten Spalte</h2>
					<p>
						Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod beatae officiis, velit nam dicta quae repellat perspiciatis explicabo illo. Possimus,
						molestiae deleniti! Exercitationem blanditiis ducimus similique tempora ratione consequuntur eaque!
					</p>
				</div>
			</div>
		</KolAlert>
	</div>
);
