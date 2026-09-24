import { KolCardTag, KolCardWcTag } from '../../core/component-names';
import type { CardProps } from '../../schema';
import { executeSnapshotTests } from '../../utils/testing';
import { KolCard } from './component';
import { KolCardWc } from './wc';

executeSnapshotTests<CardProps>(
	KolCardTag,
	[KolCard],
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

/**
 * The transitional `kol-card-wc` renders the same `CardFC` into the light DOM. No component in
 * the library uses it any more; its markup stays pinned while the element itself does.
 */
executeSnapshotTests<CardProps>(
	KolCardWcTag,
	[KolCardWc],
	[{ _label: 'Überschrift' }, { _label: 'Überschrift', _level: 2, _hasCloser: true }, { _label: 'Überschrift', _href: '#/blank_link', _target: '_blank' }],
);
