import { Component, h } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true
})
export class AppRoot {

  render() {
    return (
      <div>
        <header>
          <h1>Books app</h1>

          <stencil-route-link url='/'>
            <dott-button text='Books'></dott-button>
          </stencil-route-link>

          <stencil-route-link url='/typescript-function'>
            <dott-button text='Typescript fn'></dott-button>
          </stencil-route-link>
        </header>

        <main>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0}>
              <stencil-route url='/' component='app-home' exact={true} />
              <stencil-route url='/typescript-function' component='typescript-fn' />
            </stencil-route-switch>
          </stencil-router>
        </main>
      </div>
    );
  }
}
