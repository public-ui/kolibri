import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'kol-avatar',
  styleUrl: '../../style.sass',
  shadow: true,
})
export class KolAvatar {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
