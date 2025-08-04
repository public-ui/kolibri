import React, { useRef } from 'react';
import type { FC } from 'react';

import { KolButton, KolSkeleton } from '@public-ui/react';
import { SampleDescription } from '../components/SampleDescription';

export const Skeleton: FC = () => {
	const skeletonRef = useRef<HTMLKolSkeletonElement>(null);

	return (
		<>
			<SampleDescription>
				<p>KolSkeleton can be toggled to display loading placeholders.</p>
			</SampleDescription>

			<KolButton _label="Toggle" onClick={() => skeletonRef.current?.toggle()} />
			<KolSkeleton _count={3} _name="Example" ref={skeletonRef} />
		</>
	);
};
