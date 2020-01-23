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
        <dt-lang-selector></dt-lang-selector>
        <dt-search-bar lang={this.lang}></dt-search-bar>

        <h2>Books Galery</h2>
        <p>{this.renderSubTitle()}</p>

        <div class='carousel-container'>
          <dt-lazy-carousel class='carousel'>
            {
              this.books.map((book, index) => {
                return <div class='dt-carousel__slide'>
                  <dt-card  key={book.key}>
                    <dt-card-header header={'My new book'}></dt-card-header>
                    <dt-card-content>
                      {index} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lobortis libero
                      non euismod imperdiet. Nam vulputate ante eros, id viverra est rhoncus sit amet.
                      Donec iaculis, ligula ut interdum scelerisque, lacus nibh porta lectus, vitae
                      commodo nunc massa commodo ipsum. Maecenas et commodo dui, facilisis pulvinar quam.
                    </dt-card-content>
                  </dt-card>
                </div>
              })
            }
          </dt-lazy-carousel>
        </div>

        <stencil-route-link url='/typescript-function'>
          <dott-button text='Typescript fn'></dott-button>
        </stencil-route-link>
      </div>
    );
  }

  private renderSubTitle() {
    if (this.books.length) {
      return `Showing ${this.slidesToShow} of ${this.books.length} books.`;
    }

    return 'Nothing to show yet. Search some books!';
  }

  private searchBooks(query: string) {
    return this.booksService.search(query)
      .then(docs => {
        this.books = docs;
        console.log('updated books', this.books)
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
