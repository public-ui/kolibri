import 'uno.css'; // https://github.com/antfu/unocss
// App style
import './style.scss';

/* Optional theme CSS (e.g. font-face declarations) */
if (process.env.THEME_CSS) {
	import(/* @vite-ignore */ process.env.THEME_CSS);
}

// App
import './react.main';
