import { Component, h, JSX } from '@stencil/core';

@Component({
  tag: 'kol-dialog',
  styleUrl: '../style.sass',
  shadow: true,
})
export class KolDialog {
  public render(): JSX.Element {
    return (
      <fieldset>
        <legend>
          <slot name="legend" />
        </legend>

        <slot name="content" />
      </fieldset>
    );
  }
}
