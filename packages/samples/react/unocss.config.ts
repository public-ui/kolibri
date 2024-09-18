import { defineConfig } from '@unocss/webpack';
import { presetUno } from '@unocss/preset-uno';

function pxValueToRem(size: number): string {
	return `calc(${size}rem / var(--kolibri-root-font-size, 16))`;
}

function convertRem(value: number): string {
	return pxValueToRem(value * 16);
}

function convertDynamicClassValueToRem(value: string) {
	return pxValueToRem(Number.parseFloat(value) * 16 / 4);
}

// ts-prune-ignore-next
export default defineConfig({
	rules: [
		[/^p-(\d+)$/, ([, d]) => ({ 
			padding: convertDynamicClassValueToRem(d) 
		})],

		[/^px-(\d+)$/, ([, d]) => ({ 
			'padding-left': convertDynamicClassValueToRem(d),
			'padding-right': convertDynamicClassValueToRem(d)  
		})],
		[/^py-(\d+)$/, ([, d]) => ({ 
			'padding-top': convertDynamicClassValueToRem(d),
			'padding-bottom': convertDynamicClassValueToRem(d)  
		})],

		[/^ps-(\d+)$/, ([, d]) => ({ 
			'padding-inline-start': convertDynamicClassValueToRem(d) 
		})],
		[/^pe-(\d+)$/, ([, d]) => ({ 
			'padding-inline-end': convertDynamicClassValueToRem(d) 
		})],

		[/^pt-(\d+)$/, ([, d]) => ({ 
			'padding-top': convertDynamicClassValueToRem(d) 
		})],
		[/^pl-(\d+)$/, ([, d]) => ({ 
			'padding-left': convertDynamicClassValueToRem(d) 
		})],
		[/^pr-(\d+)$/, ([, d]) => ({ 
			'padding-right': convertDynamicClassValueToRem(d) 
		})],
		[/^pb-(\d+)$/, ([, d]) => ({ 
			'padding-bottom': convertDynamicClassValueToRem(d) 
		})],

		[/^p-t-(\d+)$/, ([, d]) => ({ 
			'padding-top': convertDynamicClassValueToRem(d) 
		})],
		[/^p-l-(\d+)$/, ([, d]) => ({ 
			'padding-left': convertDynamicClassValueToRem(d) 
		})],
		[/^p-r-(\d+)$/, ([, d]) => ({ 
			'padding-right': convertDynamicClassValueToRem(d) 
		})],
		[/^p-b-(\d+)$/, ([, d]) => ({ 
			'padding-bottom': convertDynamicClassValueToRem(d) 
		})],

		[/^m-(\d+)$/, ([, d]) => ({ 
			margin: convertDynamicClassValueToRem(d) 
		})],

		[/^mx-(\d+)$/, ([, d]) => ({ 
			'margin-left': convertDynamicClassValueToRem(d),
			'margin-right': convertDynamicClassValueToRem(d)  
		})],
		[/^my-(\d+)$/, ([, d]) => ({ 
			'margin-top': convertDynamicClassValueToRem(d),
			'margin-bottom': convertDynamicClassValueToRem(d)  
		})],

		[/^ms-(\d+)$/, ([, d]) => ({ 
			'margin-inline-start': convertDynamicClassValueToRem(d) 
		})],
		[/^me-(\d+)$/, ([, d]) => ({ 
			'margin-inline-end': convertDynamicClassValueToRem(d) 
		})],

		[/^mt$/, ([, d]) => ({ 
			'margin-top': pxValueToRem(16) 
		})],
		[/^ml$/, ([, d]) => ({ 
			'margin-left': pxValueToRem(16) 
		})],
		[/^mr$/, ([, d]) => ({ 
			'margin-right': pxValueToRem(16) 
		})],
		[/^mb$/, ([, d]) => ({ 
			'margin-bottom': pxValueToRem(16) 
		})],

		[/^mt-(\d+)$/, ([, d]) => ({ 
			'margin-top': convertDynamicClassValueToRem(d) 
		})],
		[/^ml-(\d+)$/, ([, d]) => ({ 
			'margin-left': convertDynamicClassValueToRem(d) 
		})],
		[/^mr-(\d+)$/, ([, d]) => ({ 
			'margin-right': convertDynamicClassValueToRem(d) 
		})],
		[/^mb-(\d+)$/, ([, d]) => ({ 
			'margin-bottom': convertDynamicClassValueToRem(d) 
		})],

		[/^m-t-(\d+)$/, ([, d]) => ({ 
			'margin-top': convertDynamicClassValueToRem(d) 
		})],
		[/^m-l-(\d+)$/, ([, d]) => ({ 
			'margin-left': convertDynamicClassValueToRem(d) 
		})],
		[/^m-r-(\d+)$/, ([, d]) => ({ 
			'margin-right': convertDynamicClassValueToRem(d) 
		})],
		[/^m-b-(\d+)$/, ([, d]) => ({ 
			'margin-bottom': convertDynamicClassValueToRem(d) 
		})],

		[/^mb-sm$/, ([, d]) => ({ 
			'margin-bottom': pxValueToRem(14) 
		})],

		[/^gap-(\d+)$/, ([, d]) => ({ gap: convertDynamicClassValueToRem(d) })],
		[/^gap-x-(\d+)$/, ([, d]) => ({ 'column-gap': convertDynamicClassValueToRem(d) })],
		[/^gap-y-(\d+)$/, ([, d]) => ({ 'row-gap': convertDynamicClassValueToRem(d) })],
	
		[/^w-(\d+)rem$/, ([, d]) => ({ 
			width: pxValueToRem(Number.parseInt(d) * 16) 
		})],

		[/^w-sm$/, () => ({ 
			width: pxValueToRem(24 * 16) // 24rem
		})],
	],
	extendTheme: (theme: any) => { 
		return {
			...theme,
			fontSize: {
				xs: [ convertRem(0.75), '1' ],
				sm: [ convertRem(0.875), '1.25' ],
				base: [ convertRem(1), '1.5' ],
				lg: [ convertRem(1.125), '1.75' ],
				xl: [ convertRem(1.25), '1.75' ],
				'2xl': [ convertRem(1.5), '2' ],
				'3xl': [ convertRem(1.875), '2.25' ],
				'4xl': [ convertRem(2.25), '2.5' ],
				'5xl': [ convertRem(3), '1' ],
				'6xl': [ convertRem(3.75), '1' ],
				'7xl': [ convertRem(4.5), '1' ],
				'8xl': [ convertRem(6), '1' ],
				'9xl': [ convertRem(8), '1' ],
				'kol-test': ['625%', '1']
			  },
		}
	},
	presets: [presetUno()],
});
