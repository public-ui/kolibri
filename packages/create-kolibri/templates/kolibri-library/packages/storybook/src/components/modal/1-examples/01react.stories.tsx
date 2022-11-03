import React from 'react';
import { KolButton, KolCard, KolDetails, KolModal } from '@public-ui/react';
import { ComponentMeta } from '@storybook/react';
import { BikBitvTest, STORY_CONFIG } from '../../bik-bitv-test';

export default {
	...STORY_CONFIG,
	title: 'React/Modal/Beispiele',
	component: KolModal,
} as ComponentMeta<typeof KolModal>;

export const Erweitert = () => {
	setTimeout(() => {
		function onOpenModal(modal: string) {
			return (event: Event) => {
				document.querySelector(modal)._activeElement = event.target;
			};
		}
		function onCloseModal(modal: string) {
			return () => {
				document.querySelector(modal)._activeElement = null;
			};
		}
		document.querySelector('#button-1')._on = {
			onClick: onOpenModal('#modal-1'),
		};
		document.querySelector('#button-2')._on = {
			onClick: onOpenModal('#modal-2'),
		};
		document.querySelector('#modal-1-cancel')._on = {
			onClick: onCloseModal('#modal-1'),
		};
		document.querySelector('#modal-2-cancel')._on = {
			onClick: onCloseModal('#modal-2'),
		};
	}, 0);
	return (
		<BikBitvTest _heading="Modal">
			<p>
				Die Modal-Komponente implementiert die Überlagerungsfunktion (Overlay's). Sie ist so realisiert, dass das Modal unabhängig von dem Überlagerungsinhalt
				ist. Es kann also nicht nur ein Dialog sondern auch jedes beliebige andere HTML als Überlagerungsinhalt verwendet werden.
			</p>
			<KolDetails _summary="Hinweise zur Barrierefreiheit">
				<p>
					Beim Öffnen eines Modals, muss der Entwickler:in das aktive Element übergeben, zu dem nach dem Schließen des Modals automatisch der Fokus gesetzt
					werden soll.
				</p>
				<p>
					Des Weiteren gibt es immer nur maximal ein aktives Modal, welches alle selektierbaren Elemente deaktiviert außer die innerhalb des eigenen Modals.
					Hierbei ist zu beachten, dass KoliBri nur Elemente deaktiviert die sich im Browser-Seitenbereich befinden. Das Fokussieren den Browser-Menü's ist
					weiterhin möglich.
				</p>
				<p>
					Zusätzlich stellt die Komponente sicher, dass die Darstellung beliebiger Inhalte bei beliebiger Zoomstufe barrierefrei bleibt. Hierzu wird ein
					vertikaler Scroll-Balken bei bedarf verwendet.
				</p>
			</KolDetails>
			<KolButton id="button-1" style={{ display: 'inline-block', marginTop: '1rem', marginRight: '1rem' }} _label="Modal mit Schließen öffnen"></KolButton>
			<KolButton id="button-2" style={{ display: 'inline-block', marginTop: '1rem' }} _label="Modal ohne Schließen öffnen"></KolButton>
			<KolModal id="modal-1" _ariaLabel="Willkommen bei KoliBri" _width="80%">
				<KolCard
					_headline="Willkommen bei KoliBri"
					_has-footer
					style={{
						backgroundColor: 'white',
						padding: '.5rem',
						display: 'block',
						borderRadius: 'var(--kolibri-border-radius)',
					}}
				>
					<div slot="content" className="py-1">
						"Open Source ist gar nicht so offen wie alle meinen." - Bill Gates
					</div>
					<div slot="footer" className="py-1">
						<KolButton id="modal-1-cancel" _label="Schließen"></KolButton>
					</div>
				</KolCard>
			</KolModal>
			<KolModal id="modal-2" _ariaLabel="Vorgang löschen" _width="400px">
				<KolCard
					_headline="Vorgang löschen"
					_has-footer
					style={{
						backgroundColor: 'white',
						padding: '.5rem',
						display: 'block',
						borderRadius: 'var(--kolibri-border-radius)',
					}}
				>
					<div slot="content" className="py-1">
						"Wir denken, gerade weil Open Source Entwickler anhand ihrer Beiträge bewertet werden können, widmen sie der Qualität viel mehr Aufmerksamkeit." -
						Peter Quinn
					</div>
					<div slot="footer" className="py-1">
						<KolButton id="modal-2-cancel" _label="Schließen"></KolButton>
					</div>
				</KolCard>
			</KolModal>
		</BikBitvTest>
	);
};
