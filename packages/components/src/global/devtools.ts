import {
	getColorContrastAnalysis,
	getDevMode,
	getDocument,
	getExperimentalMode,
	koliBriA11yColorContrast,
	koliBriQuerySelector,
	koliBriQuerySelectorAll,
	koliBriQuerySelectorColors,
	KoliBriUtils,
	Log,
	parseJson,
	stringifyJson,
} from '@public-ui/schema';
import { getKoliBri, initKoliBri, renderDevAdvice } from '../utils/dev.utils';

function prototypeKoliBri<T>(name: string, cb: T) {
	try {
		Object.defineProperty(getKoliBri(), name, {
			get: function () {
				return cb;
			},
		});
	} catch (e) {
		Log.debug(`KoliBri property ${name} is already bind.`);
	}
}

const metaModeLog = (name: string, active: boolean) => Log.debug(`${name} ${active ? '' : 'not '}activated`);

export const initialize = (): void => {
	initKoliBri();
	if (getDevMode()) {
		renderDevAdvice();

		prototypeKoliBri('a11yColorContrast', koliBriA11yColorContrast);
		prototypeKoliBri('querySelector', koliBriQuerySelector);
		prototypeKoliBri('querySelectorAll', koliBriQuerySelectorAll);
		prototypeKoliBri('querySelectorColors', koliBriQuerySelectorColors);
		prototypeKoliBri('utils', function () {
			return KoliBriUtils;
		});
		prototypeKoliBri('parseJson', parseJson);
		prototypeKoliBri('stringifyJson', stringifyJson);

		const body = getDocument().body;

		const div = getDocument().createElement('svg');
		div.setAttribute('aria-label', 'KoliBri-DevTools');
		div.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		div.setAttribute('role', 'toolbar');
		div.setAttribute('style', 'position: fixed;color: black;font-size: 200%;bottom: 0.25rem;right: 0.25rem;');
		div.innerHTML = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="50"
  height="50"
  viewBox="0 0 600 600"
>
  <path d="M353 322L213 304V434L353 322Z" fill="#047" />
  <path d="M209 564V304L149 434L209 564Z" fill="#047" />
  <path d="M357 316L417 250L361 210L275 244L357 316Z" fill="#047" />
  <path d="M353 318L35 36L213 300L353 318Z" fill="#047" />
  <path d="M329 218L237 92L250 222L272 241L329 218Z" fill="#047" />
  <path d="M391 286L565 272L421 252L391 286Z" fill="#047" />
</svg>`;

		getDocument().body.appendChild(div);

		metaModeLog('Development mode', getDevMode());
		metaModeLog('Experimental mode', getExperimentalMode());
		metaModeLog('Color contrast analysis', getColorContrastAnalysis());

		if (getColorContrastAnalysis()) {
			const timeout = setTimeout(() => {
				clearTimeout(timeout);
				setInterval(() => {
					KoliBriUtils.queryHtmlElementColors(getDocument().createElement('div'), koliBriA11yColorContrast(body), false, false);
				}, 10000);
			}, 2500);
		}

		// setTimeout(() => {
		//   const kolButton = koliBriQuerySelector<HTMLButtonElement>(document, '[_label="Aktion ausführen"]');
		//   if (kolButton) {
		//     const button = koliBriQuerySelector<HTMLButtonElement>(kolButton?.shadowRoot as ShadowRoot, 'button');
		//     if (button) {
		//       kolButton.style.backgroundColor = '#988';
		//       button.style.backgroundColor = 'inherit';
		//       button.style.color = '#988';
		//       const kolButtonColors = koliBriQuerySelectorColors('[_label="Aktion ausführen"]');
		//       console.log(
		//         koliBriQuerySelectorColors('button', {
		//           ...kolButtonColors,
		//         })
		//       );
		//     }
		//   }
		// }, 2500);
	}
};
