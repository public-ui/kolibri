import 'uno.css'; // https://github.com/antfu/unocss
// App style
import './style.scss';

/* Optional theme CSS (e.g. font-face declarations) */
if (process.env.THEME_CSS) {
	if (process.env.PLATFORM === 'win32') {
		/* Add leading slash, required for ESBuild on Windows.
			 Note: process.env.THEME_CSS must be used literally in the import(). Moving it to a constant breaks the import. */
		process.env.THEME_CSS = `/${process.env.THEME_CSS}`;
	}
	import(/* @vite-ignore */ process.env.THEME_CSS);
}

// App
import './react.main';
