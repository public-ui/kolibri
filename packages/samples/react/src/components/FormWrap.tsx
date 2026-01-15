import React from 'react';

import { KolButton, KolForm } from '@public-ui/react-v19';

export const FormWrap = <P,>({ RefComponent: Component, showButtons = true, ...props }: { RefComponent: any; showButtons?: boolean } & Partial<P>) => {
	return (
		<KolForm className="w-full">
			<div className="grid gap-4">
				<Component {...props} />
				{showButtons && (
					<div className="flex gap-4">
						<KolButton _label="Submit" _icons="kolicon-chevron-right" _type="submit" _variant="primary" />
						<KolButton
							_label="Bunte Icons"
							_icons={{
								left: { icon: 'kolicon-house', style: { color: '#cc006e' } },
								right: { icon: 'kolicon-kolibri', style: { color: '#b41b1b' } },
							}}
							_type="submit"
							_variant="secondary"
						/>
						<KolButton _label="Reset" _type="reset" _variant="tertiary" />
						<KolButton _label="Help" _variant="ghost" />
					</div>
				)}
			</div>
		</KolForm>
	);
};
