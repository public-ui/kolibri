import { KolCardTag } from '../../../core/component-names';
import type { CardProps } from '../../../schema';
import { executeSnapshotTests } from '../../../utils/testing';
import { KolCardWc } from '../component';
import { KolCard } from '../shadow';

executeSnapshotTests<CardProps>(
	KolCardTag,
	[KolCard, KolCardWc],
	[
		{ _label: 'Überschrift' },

		{ _label: 'Überschrift', _level: 0 },
		{ _label: 'Überschrift', _level: 1 },
		{ _label: 'Überschrift', _level: 2 },
		{ _label: 'Überschrift', _level: 3 },
		{ _label: 'Überschrift', _level: 4 },
		{ _label: 'Überschrift', _level: 5 },
		{ _label: 'Überschrift', _level: 6 },

		{ _label: 'Überschrift', _level: 0, _hasCloser: false },
		{ _label: 'Überschrift', _level: 1, _hasCloser: false },
		{ _label: 'Überschrift', _level: 2, _hasCloser: false },
		{ _label: 'Überschrift', _level: 3, _hasCloser: false },
		{ _label: 'Überschrift', _level: 4, _hasCloser: false },
		{ _label: 'Überschrift', _level: 5, _hasCloser: false },
		{ _label: 'Überschrift', _level: 6, _hasCloser: false },

		{ _label: 'Überschrift', _level: 0, _hasCloser: true },
		{ _label: 'Überschrift', _level: 1, _hasCloser: true },
		{ _label: 'Überschrift', _level: 2, _hasCloser: true },
		{ _label: 'Überschrift', _level: 3, _hasCloser: true },
		{ _label: 'Überschrift', _level: 4, _hasCloser: true },
		{ _label: 'Überschrift', _level: 5, _hasCloser: true },
		{ _label: 'Überschrift', _level: 6, _hasCloser: true },

		{ _label: 'Überschrift', _href: '#/blank_link' },
		{ _label: 'Überschrift', _href: '#/blank_link', _target: '_blank' },
		{ _label: 'Überschrift', _href: '#/blank_link', _target: '_blank', _level: 2 },
	],
);
