import { KolAvatarTag } from '../../../core/component-names';
import type { AvatarProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';
import { KolAvatarWc } from '../component';
import { KolAvatar } from '../shadow';

executeSnapshotTests<AvatarProps>(
	KolAvatarTag,
	[KolAvatar, KolAvatarWc],
	[
		{ _label: 'Erika Maria Mustermann', _src: undefined },
		{ _label: 'Erika', _color: '#0000FF' },
		{ _label: 'Erika', _src: undefined },
		{ _label: 'Erika', _src: '/image.webp' },
	],
);
