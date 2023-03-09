import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'kol-image',
  styleUrls: ['../style.sass'],
  shadow: true,
})
export class KolImage {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
