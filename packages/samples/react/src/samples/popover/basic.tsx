import React from 'react';
import { KolButton, KolInputPassword, KolInputText, KolPopover } from '@public-ui/react';

import { FC } from 'react';

export const PopoverBasic: FC = () => {
	const [top, setTop] = React.useState(false);
	const [right, setRight] = React.useState(false);
	const [bottom, setBottom] = React.useState(false);
	const [left, setLeft] = React.useState(false);
	const [login, setLogin] = React.useState(false);

	return (
		<div className="grid gap-4 max-w-[400px] mx-auto pt-8">
			<KolButton _label="Oben" _icon="codicon codicon-arrow-up" _variant="primary" _on={{ onClick: () => setTop(!top) }}></KolButton>
			<KolPopover _show={top}>Ich bin oberhalb</KolPopover>
			<KolButton _label="Rechts" _icon="codicon codicon-arrow-right" _variant="danger" _on={{ onClick: () => setRight(!right) }}></KolButton>
			<KolPopover _alignment="right" _show={right}>
				Ich bin rechts
			</KolPopover>
			<KolButton _label="Unten" _icon="codicon codicon-arrow-down" _variant="secondary" _on={{ onClick: () => setBottom(!bottom) }}></KolButton>
			<KolPopover _alignment="bottom" _show={bottom}>
				Ich bin unterhalb
			</KolPopover>
			<KolButton _label="Links" _icon="codicon codicon-arrow-left" _variant="normal" _on={{ onClick: () => setLeft(!left) }}></KolButton>
			<KolPopover _alignment="left" _show={left}>
				Ich bin links
			</KolPopover>
			<KolButton _label="PR starten" _icon="codicon codicon-git-pull-request" _variant="normal" _on={{ onClick: () => setLogin(!login) }}></KolButton>
			<KolPopover _show={login}>
				<KolInputText>Benutzername</KolInputText>
				<KolInputPassword>Passwort</KolInputPassword>
			</KolPopover>
		</div>
	);
};
