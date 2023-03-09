import { Component, h, Host } from '@stencil/core';

import { SHADOW, STYLE } from '../config';

@Component({
  tag: 'kol-output',
  styleUrl: '../../style.sass',
  shadow: true,
})
export class KolOutput {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
