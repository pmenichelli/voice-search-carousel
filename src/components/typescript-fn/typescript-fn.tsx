import { Component, h, Prop, Element, Host } from '@stencil/core';

@Component({
  tag: 'typescript-fn',
  styleUrl: 'typescript-fn.scss',
  shadow: true
})
export class TypescriptFn {
  private input:HTMLInputElement;

  @Prop({mutable: true}) public value: number = 1;
  @Element() private element: HTMLElement;

  constructor() {
    this.onTestFnClick = this.onTestFnClick.bind(this);
  }

  onTestFnClick() {
    const addEight = this.addN(this.value);
    console.log(addEight(7)); // resolves to 15
    console.log(addEight(100)); // resolves to 108
  }

  addN(summand: number): (num: number) => number {
    return (num) => summand + num;
  }

  componentDidLoad(): void {
    this.input = this.element.shadowRoot.querySelector('input');
  }

  render() {
    return (
      <Host>
        <p>
          Here you can test the function. Enter the value and see the results!
        </p>

        <input value={this.value} onChange={() => this.value = parseInt(this.input.value)} type="number"/>

        <dott-button onClick={this.onTestFnClick} text='Call fn'>
        </dott-button>

        <stencil-route-link url='/'>
          <dott-button text='Home'>
          </dott-button>
        </stencil-route-link>
      </Host>
    );
  }
}
