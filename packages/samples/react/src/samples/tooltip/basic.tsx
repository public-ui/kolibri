import React from 'react';
import { KolButton } from '@public-ui/react';

import { FC } from 'react';

export const TooltipBasic: FC = () => {
	const catchFocusButton = (el) => {
		const timeout = setTimeout(() => {
			clearTimeout(timeout);
			if (el instanceof HTMLElement) {
				el?.focus();
			}
		}, 1000);
	};

	return (
		<div className="d-flex flex-warp gap-2">
			<KolButton _label="Oben" _icon="codicon codicon-arrow-up" _icon-only="" _tooltip-align="top" _variant="primary"></KolButton>
			<KolButton _label="Unten" _icon="codicon codicon-arrow-down" _icon-only="" _tooltip-align="bottom" _variant="secondary"></KolButton>
			<KolButton _label="Links" _icon="codicon codicon-arrow-left" _icon-only="" _tooltip-align="left" _variant="normal"></KolButton>
			<KolButton ref={catchFocusButton} _label="Rechts" _icon="codicon codicon-arrow-right" _icon-only="" _tooltip-align="right" _variant="danger"></KolButton>
			<KolButton
				_label="Ich bin ein langer Text im Tooltip. Ich bin ein langer Text im Tooltip. Ich bin ein langer Text im Tooltip. Ich bin ein langer Text im Tooltip."
				_icon="codicon codicon-home"
				_icon-only=""
				_variant="ghost"
			></KolButton>{' '}
			<KolButton _label="Disabled" _icon="codicon codicon-trash" _icon-only="" _disabled></KolButton>
		</div>
	);
};
