declare module '*.jpeg';
declare module '*.jpg';
declare module '*.png';
declare module '*.gif';

declare namespace JSX {
	interface IntrinsicElements {
		'kol-icon-benchmark': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
			count?: number;
			mode?: 'wc' | 'fc';
		};
	}
}
