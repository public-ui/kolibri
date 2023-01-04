import { translate } from '@docusaurus/Translate';
import { Bundesanstalt } from '@public-ui/components';
import { KolKolibri, KolLink, KolLinkButton, KolLogo } from '@public-ui/react';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Layout from '@theme/Layout';
import React, { FunctionComponent } from 'react';
import KoliBri from '../components/KoliBri';

const HomepageHeader: FunctionComponent = () => (
	<header className="p-8 grid justify-center">
		<h1 className="text-white text-center">
			{translate({
				id: 'custom.title',
			})}
		</h1>
		<p className="text-white text-center text-xl">
			{translate({
				id: 'custom.subtitle',
			})}
		</p>
		<div className="grid sm:flex gap-2 items-center justify-center">
			<KolLinkButton
				_icon={{
					right: 'fa-solid fa-clock',
				}}
				_href="docs/get-started/erste-schritte"
				_label={translate({
					id: 'custom.get-started-button',
				})}
				_variant="primary"
			></KolLinkButton>
			<KolLinkButton
				_href="docs/willkommen"
				_label={translate({
					id: 'custom.documentation-button',
				})}
			></KolLinkButton>
		</div>
	</header>
);

export default function Homepage(): JSX.Element {
	return (
		<Layout
			title={translate({
				id: 'custom.subtitle',
			})}
			description={translate(
				{
					message: 'custom.meta.description',
				},
				{
					name: {
						id: 'KoliBri (Public-UI) ist eine barrierefreie Web Component-Bibliothek für webbasierten Projekte und Design Systeme.',
					},
				}
			)}
		>
			<HomepageHeader />
			<main>
				<div className="grid gap-2 md:w-6/12 m-auto mt-4 p-4">
					<div className="flex gap-4 justify-center">
						<KolLogo
							_org={Bundesanstalt['Informationstechnikzentrum Bund']}
							style={{
								display: 'block',
								width: '175px',
								marginTop: '1em',
							}}
						/>
						<KolKolibri
							_labeled={false}
							style={{
								display: 'block',
								width: '100px',
								marginBottom: '1em',
							}}
						/>
					</div>
					<h2 className="text-center">Barrierefreier Standard</h2>
					<p className="text-center">
						<strong>
							<KoliBri />
						</strong>{' '}
						steht für{' '}
						<strong>
							<u>Ko</u>mponenten-Bib<u>li</u>othek für die <u>B</u>ar<u>ri</u>erefreiheit
						</strong>{' '}
						und wurde vom{' '}
						<strong>
							<KolLink _href="https://itzbund.de" _label="Informationstechnikzentrum Bund" _target="itzbund"></KolLink>
						</strong>{' '}
						Open&nbsp;Source zur Wiederverwendung und Weiterentwicklung freigegeben.
					</p>
				</div>
				<HomepageFeatures />
			</main>
		</Layout>
	);
}
