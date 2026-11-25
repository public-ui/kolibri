// Ambient module declarations the internals sources rely on (copy of the components package's
// declare.d.ts; script-style, so the module declarations stay global ambient declarations).
declare module 'color-rgba' {
	const rgba: (value: string) => [number, number, number, number];
	export = rgba;
}

declare module 'rgba-convert' {
	const rgba: {
		arr: (value: string) => number[];
		css: (value: string) => string;
		hex: (value: string) => string;
	};
	export = rgba;
}

interface ContrastColor {
	bgColor?: string;
	fgDarkColor?: string;
	fgLightColor?: string;
	customNamedColors?: {
		water: string;
	};
}

declare const contrastColor: {
	contrastColor: (contrastColor: ContrastColor) => string;
};
