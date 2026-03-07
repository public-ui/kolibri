import { executeSnapshotTests } from '../../../../utils/testing';

import { KolSkeleton } from './component';

const KOL_SKELETON_TAG = 'kol-skeleton';

type SkeletonSnapshotProps = {
	_name: string;
};

executeSnapshotTests<SkeletonSnapshotProps>(
	KOL_SKELETON_TAG,
	[KolSkeleton],
	[
		{ _name: 'Ada Lovelace' },
		{ _name: '  ' },
	],
);
