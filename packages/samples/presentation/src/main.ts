import 'uno.css'; // https://github.com/antfu/unocss
/* Font CSS of the foreign icon fonts and fonts. They are peer dependencies of the theme packages:
   importing their CSS once at document level is the whole integration (see BREAKING_CHANGES.v5.md). */
import '@fontsource/fira-sans/400.css';
import '@fontsource/fira-sans/500.css';
import '@fontsource/fira-sans/600.css';
import '@fontsource/fira-sans/700.css';
import '@fontsource/noto-sans/400.css';
import '@fontsource/noto-sans/700.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@vscode/codicons/dist/codicon.css';
/* Font CSS of the icon fonts that ship with the KoliBri packages themselves. They are importable
   through the packages' `./assets/*` exports – copying asset folders is not needed (see
   BREAKING_CHANGES.v5.md). The app renders samples of every theme, so it declares them all. */
import '@public-ui/components/assets/kolicons/style.css';
import '@public-ui/theme-desy/assets/desy-icons/style.css';
import '@public-ui/theme-ecl/assets/ecl-icons/style.css';
import '@public-ui/theme-kern/assets/material-symbols-subset/style.css';
// App style
import './style.scss';

/* Optional theme CSS (e.g. font-face declarations) */
if (process.env.THEME_CSS) {
	if (process.env.PLATFORM === 'win32') {
		/* Add leading slash, required for ESBuild on Windows.
			 Note: process.env.THEME_CSS must be used literally in the import(). Moving it to a constant breaks the import. */
		process.env.THEME_CSS = `/${process.env.THEME_CSS}`;
	}
	void import(/* @vite-ignore */ process.env.THEME_CSS);
}

// App
import './react.main';
