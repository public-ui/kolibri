import React from 'react';
import { type PropsWithChildren } from 'react';
import { useSearchParams } from 'react-router-dom';

export function SampleColumns({ children }: PropsWithChildren) {
	const [searchParams] = useSearchParams();
	const noColumns = searchParams.has('noColumns');

	return <div className={noColumns ? '' : 'grid md:grid-cols-2 gap-4'}>{children}</div>;
}
