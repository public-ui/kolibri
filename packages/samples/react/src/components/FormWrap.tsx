import React from 'react';

import { KolButton, KolForm } from '@public-ui/react';

export const FormWrap = <P,>({ RefComponent: Component, ...props }: { RefComponent: any } & Partial<P>) => {
	return (
		<KolForm>
			<div className="grid gap-4">
				<Component {...props} />
				<div className="flex gap-4">
					<KolButton _label="Submit" _icons="codicon codicon-arrow-right" _type="submit" _variant="primary" />
					<KolButton
						_label="Bunte Icons"
						_icons={{
							left: { icon: 'codicon codicon-heart-filled', style: { color: '#cc006e' } },
							right: { icon: 'codicon codicon-squirrel', style: { color: '#b41b1b' } },
						}}
						_type="submit"
						_variant="secondary"
					/>
					<KolButton _label="Reset" _type="reset" _variant="tertiary" />
					<KolButton _label="Help" _type="button" _variant="ghost" />
				</div>
			</div>
		</KolForm>
	);
};
