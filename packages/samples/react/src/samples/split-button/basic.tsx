import React, { useState } from 'react';
import { KolSplitButton } from '@public-ui/react';

import { FC } from 'react';

export const SplitButtonBasic: FC = () => {
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<div className="grid gap-4">
			<KolSplitButton _label="Nur der Pfeil öffnet" _onClick={console.log}>
				<div slot="popover">
					I am
					<br />a dwarf
				</div>
			</KolSplitButton>
			<KolSplitButton _label="ohne label" _hide-label _icon="codicon codicon-git-pull-request">
				<div slot="popover">
					and
					<br />
					I&apos;m
					<br />
					digging
					<br />a hole
				</div>
			</KolSplitButton>
			<KolSplitButton _label="kick me">
				<div slot="popover">
					diggy
					<br />
					diggy
					<br />
					hole
				</div>
			</KolSplitButton>
			<KolSplitButton _label="schon offen" _show-dropdown={showDropdown}>
				<div slot="popover">
					diggy
					<br />
					diggy
					<br />
					hole
				</div>
			</KolSplitButton>
			<KolSplitButton _label={`vorherigen ${showDropdown ? 'schließen' : 'öffnen'}`} _onClick={() => setShowDropdown(!showDropdown)}>
				<div slot="popover">
					diggy
					<br />
					diggy
					<br />
					hole
				</div>
			</KolSplitButton>
		</div>
	);
};
