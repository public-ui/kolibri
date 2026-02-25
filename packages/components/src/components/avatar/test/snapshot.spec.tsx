import { KolAvatarTag } from '../../../core/component-names';
import { AvatarFC } from '../../../internal/functional-components/avatar/component';
import type { AvatarProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';
import { KolAvatar } from '../component';

executeSnapshotTests<AvatarProps>(
	KolAvatarTag,
	[KolAvatar],
	[
		{ _label: 'Erika Maria Mustermann', _src: undefined, _color: undefined },
		{ _label: 'Erika', _color: '#0000FF' },
		{ _label: 'Erika', _src: undefined, _color: undefined },
		{ _label: 'Erika', _src: '/image.webp', _color: undefined },
	],
);
