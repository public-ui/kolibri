import { executeSnapshotTests } from '../../../../utils/testing';

import { KolSkeleton } from './component';

const KOL_SKELETON_TAG = 'kol-skeleton';

type SkeletonSnapshotProps = {
	_count: number;
	_name: string;
};

executeSnapshotTests<SkeletonSnapshotProps>(
	KOL_SKELETON_TAG,
	[KolSkeleton],
	[
		{ _count: 0, _name: 'Ada Lovelace' },
		{ _count: 5, _name: '  ' },
	],
);
