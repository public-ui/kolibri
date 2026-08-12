import type { ToolbarItemsPropType } from '@public-ui/components';
import { KolHeading, KolToolbar } from '@public-ui/react-v19';
import type { FC } from 'react';
import React, { useMemo, useState } from 'react';

export const ToolbarItemOrder: FC = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitting2, setIsSubmitting2] = useState(false);

	const handleSubmit = () => {
		setIsSubmitting(true);
		setTimeout(() => {
			setIsSubmitting(false);
		}, 2000);
	};

	const handleSubmit2 = () => {
		setIsSubmitting2(true);
		setTimeout(() => {
			setIsSubmitting2(false);
		}, 2000);
	};

	const toolbarItems = useMemo(() => {
		const items: ToolbarItemsPropType = Array.from({ length: 5 }, (_item, index) => ({
			type: 'button',
			_label: `Button ${index + 1}`,
			_on: { onClick: handleSubmit },
			_icons: isSubmitting ? 'fa-solid fa-spinner fa-spin' : void 0,
			_disabled: isSubmitting,
		}));
		return items;
	}, [isSubmitting]);

	const brokenToolbarItems = useMemo(() => {
		const items: ToolbarItemsPropType = Array.from({ length: 5 }, (_item, index) => ({
			type: 'button',
			_label: `Button ${index + 1}`,
			_on: { onClick: handleSubmit2 },
			_disabled: isSubmitting2,
			_icons: isSubmitting2 ? 'fa-solid fa-spinner fa-spin' : void 0,
		}));
		return items;
	}, [isSubmitting2]);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
			<KolHeading _label="Disabled Toolbar Buttons Bug (solved)" />

			<KolHeading _label="icon vor disabled" _level={2} />
			<KolToolbar _label="KolToolbar A" _items={toolbarItems} />
			<KolHeading _label="disabled vor icon" _level={2} />
			<p>Klicke auf einen der {brokenToolbarItems.length - 1} ersten Buttons hatte zur Folge, dass die nachfolgenden Buttons kaputt gehen.</p>
			<KolToolbar _label="KolToolbar B" _items={brokenToolbarItems} />
		</div>
	);
};
