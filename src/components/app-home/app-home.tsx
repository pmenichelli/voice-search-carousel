import { Component, h, Prop, Listen, State } from '@stencil/core';
import { getBooksService } from '../../services/books/books';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.scss',
  shadow: true
})
export class AppHome {
  private booksService = getBooksService();

  @State() private lang: string = 'en-US';
  @State() private books = [];

  @Prop() public slidesToShow = 3;

  componentWillLoad() {
    return this.searchBooks('The Lord of the Rings');
  }

  render() {
    return (
      <div class='app-home'>

        <div class='top-bar'>
          <dt-search-bar lang={this.lang}></dt-search-bar>
          <dt-lang-selector></dt-lang-selector>
        </div>

        <div class='carousel-container'>
          <dt-carousel class='carousel' books={this.books}>
          </dt-carousel>
        </div>
      </div>
    );
  }

  private searchBooks(query: string) {
    return this.booksService.search(query)
      .then((docs: []) => {
        this.books = docs;
        console.log('updated books', this.books);
      });
  }

  @Listen('dtDialectChange')
  private onDialectChange(event: CustomEvent) {
    console.log('Lang change: ', event.detail);
  }

  @Listen('dtQueryChange')
  private onSearchQueryChange(event: CustomEvent) {
    this.searchBooks(event.detail);
    console.log('Query change: ', event.detail);
  }
}
