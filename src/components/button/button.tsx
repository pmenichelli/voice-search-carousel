import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'dott-button',
  styleUrl: 'button.scss',
  shadow: true
})
export class DottButton {
  @Prop() text: string = '';

  render() {
    return (
        <button>
            {this.text}
            <slot></slot>
        </button>
    );
  }
}
