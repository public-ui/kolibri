import * as React from 'react';

import type { Components } from '@public-ui/components';
import { KolButton } from '@public-ui/react-v19';
import { useToasterService } from '../../../hooks/useToasterService';
import type { ButtonSampleProps } from './type';

import './tooltip.scss';

const KolTooltip = 'kol-tooltip-wc' as unknown as React.FC<Components.KolTooltipWc>;

export const ButtonCases: React.FC<ButtonSampleProps> = (props) => {
	const { children, ...other } = props;
	const { dummyClickEventHandler } = useToasterService();

	const dummyEventHandler = {
		onClick: dummyClickEventHandler,
	};

	return (
		<div className="flex flex-wrap gap-4">
			<KolButton _icons="codicon codicon-home" _label="Primary" _variant="primary" _on={dummyEventHandler} {...other}>
				{children}
			</KolButton>
			{other._hideLabel && <KolTooltip _label="Primary" />}
			<KolButton _icons="codicon codicon-heart" _label="Secondary" _variant="secondary" _on={dummyEventHandler} {...other}>
				{children}
			</KolButton>
			{other._hideLabel && <KolTooltip _label="Tertiary" />}
			<KolButton _icons="codicon codicon-hubot" _label="Tertiary" _variant="tertiary" _on={dummyEventHandler} {...other}>
				{children}
			</KolButton>
			{other._hideLabel && <KolTooltip _label="Normal" />}
			<KolButton _icons="codicon codicon-hubot" _label="Normal" _variant="normal" _on={dummyEventHandler} {...other}>
				{children}
			</KolButton>
			{other._hideLabel && <KolTooltip _label="Danger" />}
			<KolButton _icons="codicon codicon-trash" _label="Danger" _variant="danger" _on={dummyEventHandler} {...other}>
				{children}
			</KolButton>
			{other._hideLabel && <KolTooltip _label="Ghost" />}
			<KolButton _icons="codicon codicon-reactions" _label="Ghost" _variant="ghost" _on={dummyEventHandler} {...other}>
				{children}
			</KolButton>
			{other._hideLabel && <KolTooltip _label="Link" />}
		</div>
	);
};
