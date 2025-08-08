import React, { useEffect, useState } from 'react';
import { KolSpin } from '@public-ui/react';
import type { FC } from 'react';
import { SampleDescription } from '../SampleDescription';

export const SpinLabel: FC = () => {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const id = setInterval(() => setShow((value) => !value), 3000);
		return () => clearInterval(id);
	}, []);

	return (
		<>
			<SampleDescription>
				<p>This sample shows KolSpin with a label.</p>
			</SampleDescription>

			<KolSpin _show={show} _label={show ? 'Loading data...' : 'Data loaded.'} />
		</>
	);
};
