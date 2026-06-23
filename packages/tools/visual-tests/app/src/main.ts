import 'uno.css'; // https://github.com/antfu/unocss
// App style
import './style.scss';

/* Optional theme CSS (e.g. font-face declarations). The CLI copies the theme's inject-assets.css
   into the served build root, so we load it via a normal stylesheet link with a relative URL.
   A dynamic import of the absolute filesystem path only resolves in the Vite dev server – in the
   statically served production build it fails and aborts the entry module (blank page). */
if (process.env.THEME_CSS) {
	const themeCssLink = document.createElement('link');
	themeCssLink.rel = 'stylesheet';
	themeCssLink.href = 'inject-assets.css';
	document.head.appendChild(themeCssLink);
}

// App
import './react.main';
