import { KolAlert, KolIcon, KolKolibri, KolLink } from '@public-ui/react';
import React from 'react';
import IMG_FRAMEWORK from '../../assets/logo.react.png';

export const AppComponent = (): JSX.Element => {
	return (
		<div className="bmf container mx-auto my-10 max-w-800px">
			<header className="text-center">
				<div className="grid grid-cols-2 items-center">
					<div>
						<KolKolibri className="block m-auto w-40" _labeled={false}></KolKolibri>
					</div>
					<div>
						<img className="block m-auto h-25" src={IMG_FRAMEWORK as string} alt="Logo vom React Framework" />
					</div>
				</div>
				<strong className="text-2xl">Willkommen zu KoliBri</strong>
			</header>
			<main className="grid md:grid-cols-2 gap-6 p-12">
				<KolAlert _type="success" _heading="Dokumentation" _variant="card" _level={2}>
					<KolLink _href="https://public-ui.github.io/" _fill _target="_blank">
						<KolIcon _ariaLabel="" _icon={'fa-sharp fa-solid fa-book'} /> Dokumentation öffnen
					</KolLink>
				</KolAlert>
				<KolAlert _type="info" _heading="Theming" _variant="card" _level={2}>
					<KolLink _href="https://public-ui.github.io/?path=/docs/designer--page" _fill _target="_blank">
						<KolIcon _ariaLabel="" _icon={'fa-solid fa-palette'} /> Theme-Designer öffnen
					</KolLink>
				</KolAlert>
				<KolAlert _type="warning" _heading="Mitwirken" _variant="card" _level={2}>
					<KolLink _href="https://github.com/public-ui/kolibri/" _fill _target="_blank">
						<KolIcon _ariaLabel="" _icon={'fa-brands fa-github'} /> Github öffnen
					</KolLink>
				</KolAlert>
				<KolAlert _type="error" _heading="Kontakt" _variant="card" _level={2}>
					<KolLink _href="mailto:kolibri@itzbund.de" _fill _target="_blank">
						<KolIcon _ariaLabel="" _icon={'fa-solid fa-envelope'} /> E-Mail schreiben
					</KolLink>
				</KolAlert>
			</main>
		</div>
	);
};
