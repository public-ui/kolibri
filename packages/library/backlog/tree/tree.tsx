import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'kol-tree',
  styleUrl: '../../style.sass',
  shadow: true,
})
export class KolTree {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
