import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'kol-p',
  styleUrl: '../../style.sass',
  shadow: true,
})
export class KolP {
  @Prop() public text!: string;

  render() {
    return (
      <div class="fractal-preview-wrapper paragraph">
        <div class="kol-richtext fractal-component-markup-wrapper">
          <p>{this.text}</p>
        </div>
      </div>
    );
  }
}
