import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'kol-meter',
  styleUrl: '../../style.sass',
  shadow: true,
})
export class KolMeter {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
