import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'kol-carousel',
  styleUrl: '../../style.sass',
  shadow: true,
})
export class KolCarousel {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
