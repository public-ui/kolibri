<script setup>
/**
 * Schritt 3 als Live-Demo direkt in der Folie - 1:1 aus demo/step-3-form.html
 * uebernommen: Karte + Formular, Fehlerliste mit Fokussprung, Erfolgs-Alert
 * und der Roentgenblick, der in den Shadow DOM hineinliest.
 */
import { onMounted, ref } from 'vue';
import { whenKoliBri } from './kolibri-ready.mjs';

const host = ref(null);

const MARKUP = `
<div class="s3demo">
  <kol-alert id="erfolg" hidden _type="success" _label="Anfrage eingegangen" _level="2">
    Wir melden uns innerhalb von zwei Werktagen.
  </kol-alert>
  <kol-card _label="Terminanfrage" _level="2">
    <kol-form id="f">
      <div class="s3demo__stack">
        <kol-input-text id="name" _label="Name" _required></kol-input-text>
        <kol-input-email id="mail" _label="E-Mail" _required
          _hint="Wir nutzen die Adresse nur für die Terminbestätigung."></kol-input-email>
        <kol-button id="send" _label="Absenden" _variant="primary" _type="submit"></kol-button>
      </div>
    </kol-form>
  </kol-card>
  <button class="s3demo__xray-btn" id="xray" type="button">Röntgenblick</button>
  <pre class="s3demo__xray" id="xray-out">Erst abschicken, dann auf „Röntgenblick" klicken …</pre>
</div>`;

onMounted(async () => {
	if (!(await whenKoliBri())) return; // Register fehlgeschlagen – Ursache steht in der Konsole
	const root = host.value;
	root.innerHTML = MARKUP;

	const form = root.querySelector('#f');
	const alert = root.querySelector('#erfolg');
	const wert = (el) => String(el._value ?? '').trim();

	// --- Die Regeln. Pro Feld eine Pruefung, mehr ist es nicht. ---
	const felder = [
		{
			el: root.querySelector('#name'),
			pruefen: (v) => (v === '' ? 'Bitte geben Sie Ihren Namen an.' : null),
		},
		{
			el: root.querySelector('#mail'),
			pruefen: (v) => {
				if (v === '') return 'Bitte geben Sie eine E-Mail-Adresse an.';
				if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Bitte geben Sie eine gültige E-Mail-Adresse an.';
				return null;
			},
		},
	];

	const fehlerSetzen = (el, text) => {
		el._msg = { _type: 'error', _description: text };
		el._touched = true;
	};
	const fehlerLoeschen = (el) => {
		el._msg = undefined;
		el._touched = false;
	};

	// Sobald ein Feld korrigiert ist, verschwindet seine Meldung wieder.
	felder.forEach(({ el, pruefen }) => {
		el._on = {
			onInput: (_event, value) => {
				if (pruefen(String(value ?? '').trim()) === null) fehlerLoeschen(el);
			},
		};
	});

	form._on = {
		onSubmit: () => {
			alert.hidden = true;
			const offen = [];

			for (const { el, pruefen } of felder) {
				const text = pruefen(wert(el));
				if (text) {
					fehlerSetzen(el, text);
					offen.push({ message: text, selector: '#' + el.id });
				} else {
					fehlerLoeschen(el);
				}
			}

			form._errorList = offen;

			if (offen.length > 0) {
				// Fokus in die Fehlerliste: wer mit der Tastatur arbeitet, landet dort,
				// wo steht, was zu tun ist - nicht irgendwo im Formular.
				setTimeout(() => form.focusErrorList?.(), 50);
				return;
			}

			// Alles sauber: bestaetigen und das Formular leeren.
			alert.hidden = false;
			felder.forEach(({ el }) => {
				el._value = '';
			});
			setTimeout(() => alert.scrollIntoView({ block: 'nearest' }), 50);
		},
	};

	// --- Buehnen-Werkzeug: liest aus dem Shadow DOM, was KoliBri erzeugt hat ---
	const xray = () => {
		const mailHost = root.querySelector('#mail');
		const input = mailHost?.shadowRoot?.querySelector('input');
		if (!input) return 'Komponente noch nicht bereit.';
		const ids = (input.getAttribute('aria-describedby') || '').split(' ').filter(Boolean);
		const lines = [
			`<input  type="${input.type}"`,
			`        required=${input.hasAttribute('required')}`,
			`        aria-invalid=${input.hasAttribute('aria-invalid') ? '"' + input.getAttribute('aria-invalid') + '"' : '(nicht gesetzt – Feld ist in Ordnung)'}`,
			`        aria-describedby="${ids.join(' ')}" />`,
			'',
			'Was der Screenreader daraus vorliest:',
		];
		for (const id of ids) {
			const el = mailHost.shadowRoot.getElementById(id);
			lines.push(`  ${id}`);
			lines.push(el ? `     → "${el.textContent.trim()}"` : '     → (noch kein Element – die ID ist reserviert, Screenreader überspringen sie)');
		}
		if (ids.length === 0) {
			lines.push('  (noch keine – erst das Formular abschicken, dann wird es interessant)');
		}
		const btn = root.querySelector('#send')?.shadowRoot?.querySelector('button');
		if (btn) {
			lines.push('', `Zielgröße des Buttons: min-height = ${getComputedStyle(btn).minHeight}  (WCAG 2.5.5 verlangt 44px)`);
		}
		return lines.join('\n');
	};

	root.querySelector('#xray').addEventListener('click', () => {
		root.querySelector('#xray-out').textContent = xray();
	});
});
</script>

<template>
	<div ref="host" class="step3demo-host"></div>
</template>
