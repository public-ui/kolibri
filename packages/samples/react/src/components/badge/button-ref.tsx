import type { FC } from 'react';
import React from 'react';

import { KolBadge, KolButton } from '@public-ui/react-v19';
import { SampleDescription } from '../SampleDescription';

type KolButtonEl = HTMLKolButtonWcElement;
type KolBadgeEl = HTMLKolBadgeElement & { kolFocus?: () => void | Promise<void> };

const createBadgeProps = (label: string, btnRef?: React.Ref<KolButtonEl>) => ({
	_label: label,
	_smartButton: {
		_icons: 'codicon codicon-close',
		_label: `Remove ${label}`,
		_on: { onClick: () => alert('clicked') },
		ref: btnRef,
	},
});

export const BadgeSmartRef: FC = () => {
	const badgeRef = React.useRef<KolBadgeEl | null>(null);
	const smartBtnRef = React.useRef<KolButtonEl | null>(null);

	const focusViaKolFocus = async () => {
		const badge = badgeRef.current;
		if (!badge) return;
		await badge.kolFocus?.();
	};

	const focusSmartButton = () => {
		smartBtnRef.current?.focus();
	};

	return (
		<>
			<SampleDescription>
				<p>
					This sample shows a <code>KolBadge</code> with an optional <code>smartButton</code>. You can move focus either by calling <code>kolFocus()</code> on
					the badge, or—thanks to the new API—by passing a <code>ref</code> on <code>_smartButton</code> and focusing the button directly.
				</p>
			</SampleDescription>

			<div className="flex flex-wrap gap-2">
				<KolBadge ref={badgeRef} _color="#06539e" {...createBadgeProps('blue', smartBtnRef)} />
			</div>

			<div className="flex gap-2 mt-4">
				<KolButton _label="Focus via kolFocus()" _variant="primary" _on={{ onClick: focusViaKolFocus }} />
				<KolButton _label="Focus smartButton (ref)" _variant="primary" _on={{ onClick: focusSmartButton }} />
			</div>
		</>
	);
};
