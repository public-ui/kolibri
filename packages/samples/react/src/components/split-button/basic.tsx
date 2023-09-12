import React, { useState } from 'react';
import { KolSplitButton } from '@public-ui/react';

import { FC } from 'react';

export const SplitButtonBasic: FC = () => {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<div className="grid gap-4">
			<KolSplitButton _label="Nur der Pfeil öffnet" _onClick={console.log}>
				I am
				<br />a dwarf
			</KolSplitButton>
			<KolSplitButton _label="ohne label" _hide-label _icon="codicon codicon-git-pull-request">
				and
				<br />
				I&apos;m
				<br />
				digging
				<br />a hole
			</KolSplitButton>
			<KolSplitButton _label="kick me">
				diggy
				<br />
				diggy
				<br />
				hole
			</KolSplitButton>
			<KolSplitButton _label="schon offen" _show-dropdown={showDropdown}>
				diggy
				<br />
				diggy
				<br />
				hole
			</KolSplitButton>
			<KolSplitButton _label={`vorherigen ${showDropdown ? 'schließen' : 'öffnen'}`} _onClick={() => setShowDropdown(!showDropdown)}>
				diggy
				<br />
				diggy
				<br />
				hole
			</KolSplitButton>
		</div>
	);
};
