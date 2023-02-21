import { Component, h, Host } from "@stencil/core";

@Component({
  tag: "app-root",
  styleUrl: "app-root.css",
  shadow: true,
})
export class AppRoot {
  render() {
    return (
      <Host>
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
      </Host>
    );
  }
}
