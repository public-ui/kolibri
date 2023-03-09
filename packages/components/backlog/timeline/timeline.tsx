import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'kol-listbox',
  styleUrl: '../../style.sass',
  shadow: true,
})
export class KolListbox {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
