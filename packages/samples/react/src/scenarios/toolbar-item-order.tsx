import React, { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import type { ToolbarItemsPropType } from '@public-ui/components';
import { KolHeading, KolToolbar } from '@public-ui/react-v19';

export const ToolbarItemOrder: FC = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitting2, setIsSubmitting2] = useState(false);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		if (isSubmitting) {
			timer = setTimeout(() => {
				setIsSubmitting(false);
			}, 2000);
		}
		return () => clearTimeout(timer);
	}, [isSubmitting]);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		if (isSubmitting2) {
			timer = setTimeout(() => {
				setIsSubmitting2(false);
			}, 2000);
		}
		return () => clearTimeout(timer);
	}, [isSubmitting2]);

	const handleSubmit = () => setIsSubmitting(true);
	const handleSubmit2 = () => setIsSubmitting2(true);

	const toolbarItems = useMemo(() => {
		const items: ToolbarItemsPropType = Array.from({ length: 5 }, (_item, index) => ({
			_label: `Button ${index + 1}`,
			_on: { onClick: handleSubmit },
			_icons: isSubmitting ? 'codicon codicon-loading codicon-modifier-spin' : void 0,
			_disabled: isSubmitting,
		}));
		return items;
	}, [isSubmitting]);

	const brokenToolbarItems = useMemo(() => {
		const items: ToolbarItemsPropType = Array.from({ length: 5 }, (_item, index) => ({
			_label: `Button ${index + 1}`,
			_on: { onClick: handleSubmit2 },
			_disabled: isSubmitting2,
			_icons: isSubmitting2 ? 'codicon codicon-loading codicon-modifier-spin' : void 0,
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
