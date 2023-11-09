import React from 'react';
import { KolTree, KolTreeItem } from '@public-ui/react';

import { FC } from 'react';

export const TreeBasic: FC = () => (
	<KolTree>
		<KolTreeItem _label="Baum" _href="#/" _open>
			<KolTreeItem _label="Home" _href="#home" />
		</KolTreeItem>
	</KolTree>
);
