/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { JSX as KoliBripLocalJSX } from '@public-ui/components';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

type StencilProps<T> = {
	[P in keyof T]?: Omit<T[P], 'ref'> | HTMLAttributes<T>;
};

type ReactProps<T> = {
	[P in keyof T]?: DetailedHTMLProps<HTMLAttributes<T[P]>, T[P]>;
};

type StencilToReact<T = KoliBripLocalJSX.IntrinsicElements, U = HTMLElementTagNameMap> = StencilProps<T> & ReactProps<U>;

declare module 'react' {
	namespace JSX {
		type IntrinsicElements = StencilToReact;
	}
}
