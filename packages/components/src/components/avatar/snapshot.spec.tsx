import { KolAvatarTag } from '../../core/component-names';
import type { AvatarProps } from '../../schema';
import { executeSnapshotTests } from '../../utils/testing';
import { KolAvatar } from './component';

type AvatarSnapshotProps = AvatarProps & { style?: Record<string, string> };

executeSnapshotTests<AvatarSnapshotProps>(
	KolAvatarTag,
	[KolAvatar],
	[
		{ _label: 'Erika Maria Mustermann', _src: undefined, _color: undefined },
		{ _label: 'Erika', _color: '#0000FF' },
		{ _label: 'Erika', _src: undefined, _color: undefined },
		{ _label: 'Erika', _src: '/image.webp', _color: undefined },
		{ _label: 'Erika', style: { width: '48px', height: '48px' } },
		{ _label: 'Erika', style: { width: '50px', height: '90px' } },
	],
);
