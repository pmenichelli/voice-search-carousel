import { Component, h, Prop, Element, Host, State } from '@stencil/core';

@Component({
  tag: 'typescript-fn',
  styleUrl: 'typescript-fn.scss',
  shadow: true
})
export class TypescriptFn {
  private input:HTMLInputElement;

  @Prop({mutable: true}) public value: number = 0;

  @State() result1: number;
  @State() result2: number;

  @Element() private element: HTMLElement;

  constructor() {
    this.onTestFnClick = this.onTestFnClick.bind(this);
  }

  protected onTestFnClick() {
    const addEight = this.addN(this.value);
    this.result1 = addEight(7);
    this.result2 = addEight(100);
    console.log(addEight(7)); // resolves to 15
    console.log(addEight(100)); // resolves to 108
  }

  protected addN(summand: number): (num: number) => number {
    return (num) => summand + num;
  }

  protected componentDidLoad(): void {
    this.input = this.element.shadowRoot.querySelector('input');
  }

  protected render() {
    return (
      <Host>
        <p>
          Here you can test the function. Enter the value and see the results in the Dev Tools!
        </p>

        <input value={this.value} onChange={() => this.value = parseInt(this.input.value)} type="number"/>

        <dott-button onClick={this.onTestFnClick} text='Call fn'>
        </dott-button>

        <div>
          { !isNaN(this.result1) && <p>{`Evaluating on 7 resolves to ${this.result1}`}</p> }
          { !isNaN(this.result2) && <p>{`Evaluating on 100 resolves to ${this.result2}`}</p> }
        </div>
      </Host>
    );
  }
}
