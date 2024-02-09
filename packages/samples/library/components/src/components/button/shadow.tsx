import type { ButtonProps } from '@public-ui/library-schema';
import { Component, h, type JSX } from '@stencil/core';

@Component({
	tag: 'demo-button',
	shadow: true,
})
export class DemoButton implements ButtonProps {
	public render(): JSX.Element {
		return <demo-button-wc></demo-button-wc>;
	}
}
