import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'kol-cookie-banner',
  styleUrl: '../../style.sass',
  shadow: true,
})
export class KolCookieBanner {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
