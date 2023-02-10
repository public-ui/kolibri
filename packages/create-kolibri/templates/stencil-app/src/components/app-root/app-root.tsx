import { Component, h, Host } from '@stencil/core';

import { register } from '@public-ui/core';
import { defineCustomElements } from '@public-ui/components/dist/loader';
import { ITZBund } from '@public-ui/themes';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  public state: any = {
    isLoaded: false,
  };

  private wakeUp = () => {
    register(ITZBund, defineCustomElements)
      .then(() => {
        this.state = {
          isLoaded: true,
        };
        const htmlElement: HTMLElement | null = document.querySelector<HTMLDivElement>('div#app');
        if (htmlElement instanceof HTMLElement) {
        }
      })
      .catch(console.warn);
  };

  render() {
    return (
      <Host ref={this.wakeUp}>
        {this.state.isLoaded ||
          (true && (
            <div>
              <header>
                <h1>Stencil App Starter</h1>
                <kol-heading _label="Test"></kol-heading>
              </header>
              <main>
                <stencil-router>
                  <stencil-route-switch scrollTopOffset={0}>
                    <stencil-route url="/" component="app-home" exact={true} />
                    <stencil-route url="/profile/:name" component="app-profile" />
                  </stencil-route-switch>
                </stencil-router>
              </main>
            </div>
          ))}
      </Host>
    );
  }
}
