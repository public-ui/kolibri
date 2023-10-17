import React, { FC, ReactNode } from 'react';

import { KolForm, KolLinkGroup } from '@public-ui/react';

type Props = {
	submitted: boolean;
	children: ReactNode;
	onSubmit: (event: Event) => void;
};

export const FromComponent: FC<Props> = (props) => (
	<>
		{props.submitted === true && (
			<KolLinkGroup tabIndex={0} class="fehlerliste" data-removed-_label="Fehlerliste" _label="Fehlerliste" _level={3} _links={[]} />
		)}
		<KolForm
			className="block mb-2"
			_on={{
				onSubmit: props.onSubmit,
			}}
		>
			{props.children}
		</KolForm>
	</>
);
