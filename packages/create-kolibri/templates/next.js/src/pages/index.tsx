import { KolAlert, KolIcon, KolKolibri, KolLink } from '@public-ui/react';
import React from 'react';
import Head from 'next/head';

const Index = () => {
	return (
		<>
			<Head>
				<title>Seed-Projekt | KoliBri</title>
				<meta name="description" content="Webanwendung mit der KoliBri-Komponentenbibliothek." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="shortcut icon" type="image/x-icon" href="assets/favicon.ico" />
				<link rel="stylesheet" href="assets/bund/bund.css" />
				<link rel="stylesheet" href="assets/codicons/codicon.css" />
				<link rel="stylesheet" href="assets/noto-sans/noto-sans.css" />
				<link rel="stylesheet" href="assets/roboto/roboto.css" />
				<link rel="stylesheet" href="assets/fontawesome-free/v6/css/all.min.css" />
				<link rel="stylesheet" href="assets/icofont/icofont.min.css" />
				<link rel="stylesheet" href="main.css" />
				<meta name="robots" content="noindex" />
				<meta name="kolibri" content="dev-mode=true" />
				<link rel="manifest" href="manifest.json" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="application-name" content="PoC" />
				<meta name="apple-mobile-web-app-title" content="PoC" />
				<meta name="theme-color" content="#fff" />
				<meta name="background_color" content="#fff" />
				<meta name="msapplication-navbutton-color" content="#fff" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
				<meta name="msapplication-starturl" content="/kolibri/" />
				<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
				<link rel="icon" sizes="128x128" href="assets/logo.kolibri.png" />
				<link rel="apple-touch-icon" sizes="128x128" href="assets/logo.kolibri.png" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" type="image/x-icon" href="favicon.ico" />
			</Head>
			<div className="bmf container mx-auto my-10 max-w-800px">
				<header className="text-center">
					<div className="grid grid-cols-2 items-center">
						<div>
							<KolKolibri className="block m-auto w-40" _labeled={false}></KolKolibri>
						</div>
						<div>
							<img className="block m-auto h-25" src="assets/logo.nextjs.png" alt="Logo vom React Framework" />
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
		</>
	);
};

export default Index;
