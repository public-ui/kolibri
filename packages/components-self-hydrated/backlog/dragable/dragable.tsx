import { Component, h, Host } from '@stencil/core';

@Component({
  tag: 'kol-dragable',
  styleUrls: ['../style.sass'],
  shadow: true,
})
export class KolDragable {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
