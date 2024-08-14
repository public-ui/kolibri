import React from 'react';

import { KolAlert } from '@public-ui/react';
import { SampleDescription } from '../SampleDescription';
import type { FC } from 'react';

export const AlertHtml: FC = () => (
	<>
		<SampleDescription>
			<p>This sample shows how KolAlert can be used with arbitrary HTML as slot content.</p>
		</SampleDescription>

		<div>
			<KolAlert _label="Output of HTML code in the alert" _type="info">
				<h2 className="mt-2 mb-3">An H2 heading is output here</h2>
				<div className="grid gap-4 sm:grid-cols-2">
					<div>
						<h3>Text in a left-hand column</h3>
						<p>
							Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem sed fugiat dolorum ratione et, ullam officia nobis nihil debitis, consectetur
							dicta accusantium. Vitae debitis, quibusdam vel recusandae deleniti placeat dolorem?
						</p>
					</div>
					<div>
						<h3>Text in einer rechten Spalte</h3>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod beatae officiis, velit nam dicta quae repellat perspiciatis explicabo illo.
							Possimus, molestiae deleniti! Exercitationem blanditiis ducimus similique tempora ratione consequuntur eaque!
						</p>
					</div>
				</div>
			</KolAlert>
		</div>
	</>
);
