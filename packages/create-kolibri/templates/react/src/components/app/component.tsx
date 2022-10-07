import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { KolAlert, KolIcon, KolKolibri, KolLink } from '@public-ui/react';

/**
 * @Component = View / Rollen!#
 */
export const AppComponent = (): JSX.Element => {
	const location = useLocation();

	useEffect(() => {
		console.log(location);
	}, [location]);

	return (
		<div className="bmf container mx-auto my-10 max-w-800px">
			<header className="text-center">
				<KolKolibri
					className="block m-auto w-40"
					_labeled={false}
				></KolKolibri>
				<strong className="text-2xl">Willkommen zu KoliBri</strong>
			</header>
			<main className="grid md:grid-cols-2 gap-6 p-12">
				<KolAlert _type='success' _heading='Dokumentation' _variant='card' _level={1} >
					<KolLink _href='https://public-ui.github.io/' _fill _target='_blank'><KolIcon _ariaLabel='' _icon={"fa-sharp fa-solid fa-book"} /> Dokumentation öffnen</KolLink>
				</KolAlert>
				<KolAlert _type='info' _heading='Theming' _variant='card' _level={1} >
					<KolLink _href='https://public-ui.github.io/?path=/docs/designer--page' _fill _target='_blank'><KolIcon _ariaLabel='' _icon={"fa-solid fa-palette"} /> Theme-Designer öffnen</KolLink>
				</KolAlert>
				<KolAlert _type='warning' _heading='Mitwirken' _variant='card' _level={1} >
					<KolLink _href='https://github.com/public-ui/kolibri/' _fill _target='_blank'><KolIcon _ariaLabel='' _icon={"fa-brands fa-github"} /> Github öffnen</KolLink>
				</KolAlert>
				<KolAlert _type='error' _heading='Kontakt' _variant='card' _level={1} >
					<KolLink _href='mailto:kolibri@itzbund.de' _fill _target='_blank'><KolIcon _ariaLabel='' _icon={"fa-solid fa-envelope"} /> E-Mail schreiben</KolLink>
				</KolAlert>
			</main>
		</div>
	);
};
