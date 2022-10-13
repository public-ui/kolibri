import { KolAlert, KolIcon, KolKolibri, KolLink } from '@public-ui/solid';
import { Component } from 'solid-js';

import IMG_FRAMEWORK from '../../assets/logo.solid.png';

export const AppComponent: Component = () => {
	return (
		<div class="bmf container mx-auto my-10 max-w-800px">
			<header class="text-center">
				<div class="grid grid-cols-2 items-center">
					<div>
						<KolKolibri class="block m-auto w-40" _labeled={false}></KolKolibri>
					</div>
					<div>
						<img class="block m-auto h-20" src={IMG_FRAMEWORK as string} alt="Logo vom Solid Framework" />
					</div>
				</div>
				<strong class="text-2xl">Willkommen zu KoliBri</strong>
			</header>
			<main class="grid md:grid-cols-2 gap-6 p-12">
				<KolAlert _type="success" _heading="Dokumentation" _variant="card">
					<KolLink _href="https://public-ui.github.io/" _fill _target="_blank">
						<KolIcon _ariaLabel="" _icon="fa-sharp fa-solid fa-book" /> Dokumentation öffnen
					</KolLink>
				</KolAlert>
				<KolAlert _type="info" _heading="Theming" _variant="card">
					<KolLink _href="https://public-ui.github.io/?path=/docs/designer--page" _fill _target="_blank">
						<KolIcon _ariaLabel="" _icon="fa-solid fa-palette" /> Theme-Designer öffnen
					</KolLink>
				</KolAlert>
				<KolAlert _type="warning" _heading="Mitwirken" _variant="card">
					<KolLink _href="https://github.com/public-ui/kolibri/" _fill _target="_blank">
						<KolIcon _ariaLabel="" _icon="fa-brands fa-github" /> Github öffnen
					</KolLink>
				</KolAlert>
				<KolAlert _type="error" _heading="Kontakt" _variant="card">
					<KolLink _href="mailto:kolibri@itzbund.de" _fill _target="_blank">
						<KolIcon _ariaLabel="" _icon="fa-solid fa-envelope" /> E-Mail schreiben
					</KolLink>
				</KolAlert>
			</main>
		</div>
	);
};
