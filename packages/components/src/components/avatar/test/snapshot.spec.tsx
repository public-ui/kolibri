import { KolAvatar } from '../shadow';
import { KolAvatarWc } from '../component';
import type { AvatarProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';
import { KolAvatarTag } from '../../../core/component-names';

executeSnapshotTests<AvatarProps>(
	KolAvatarTag,
	[KolAvatar, KolAvatarWc],
	[
		{ _label: 'Erika Maria Mustermann', _src: undefined },
		{ _label: 'Erika', _src: undefined },
		{ _label: 'Erika', _src: '/image.webp' },
	],
);
