import { Component, h, Event, EventEmitter, State } from '@stencil/core';
import { LANGS, DEFAULT_DIALECT, DEFAULT_LANGUAGE } from './langs'

@Component({
  tag: 'dt-lang-selector',
  styleUrl: 'lang-selector.scss',
  shadow: true
})
export class LangSelector {
	private languageSelectElement: HTMLSelectElement;
  private dialectSelectElement: HTMLSelectElement;

  @State() private hideDialect: boolean = false;

  @Event() private dtLanguageChange: EventEmitter;
  @Event() private dtDialectChange: EventEmitter;

  constructor() {
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.onDialectChange = this.onDialectChange.bind(this);
  }

  componentDidLoad() {
    this.initLanguage();
  }

  render() {
    const dialectClasses = `dt-lang-selector__input dt-lang-selector__dialect ${this.hideDialect ? 'dt-lang-selector__dialect--hidden' : ''}`
    return (
      <div class='dt-lang-selector'>
        <select
          class='dt-lang-selector__input dt-lang-selector__language'
          ref={(element) => (this.languageSelectElement = element)}
          onChange={this.onLanguageChange}>
        </select>
        <select
          class={dialectClasses}
          ref={(element) => (this.dialectSelectElement = element)}
          onChange={this.onDialectChange}>>
        </select>
      </div>
    );
  }

  private initLanguage() {
    for (let i = 0; i < LANGS.length; i++) {
      this.languageSelectElement.options[i] = new Option(LANGS[i][0].toString(), String(i));
    }
    this.languageSelectElement.selectedIndex = DEFAULT_LANGUAGE;
    this.updateDialects();
    this.dialectSelectElement.selectedIndex = DEFAULT_DIALECT;
  }

  private updateDialects() {
    const { options } = this.dialectSelectElement;
    for (let i = options.length - 1; i >= 0; i--) {
      this.dialectSelectElement.remove(i);
    }
    const dialects = LANGS[this.languageSelectElement.selectedIndex];
    for (let i = 1; i < dialects.length; i++) {
      options.add(new Option(dialects[i][1], dialects[i][0]));
    }

    this.hideDialect = dialects[1].length === 1;
    this.dialectSelectElement.selectedIndex = 0;
  }

  private onLanguageChange() {
    this.dtLanguageChange.emit(this.languageSelectElement.value);
    this.updateDialects();
  }

  private onDialectChange() {
    this.dtDialectChange.emit(this.dialectSelectElement.value);
  }
}
