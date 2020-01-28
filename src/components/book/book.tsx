import { h, Component, Prop, State, Watch, Element } from '@stencil/core';
import { BooksService } from '../../services/books/books';

@Component({
	shadow: true,
	styleUrl: './book.scss',
	tag: 'dt-book',
})
export class DottBook {
  private imageObserver: IntersectionObserver;

  @Prop() title: string;
  @Prop() coverId: string;

  @State() private loading: boolean = true;
  @State() private size: string = 'L';

  @Element() private element: HTMLElement;

  constructor() {
    this.onImageLoad = this.onImageLoad.bind(this);
  }

  @Watch('coverId')
  protected onConverIdChange() {
    this.loading = true;
  }

  @Watch('size')
  protected onSizeChange() {
    this.loading = true;
  }

  protected componentDidLoad() {
    this.imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          const lazyImage = entry.target as HTMLImageElement;
          lazyImage.src = lazyImage.dataset.src
        }
      });
    });

    this.imageObserver.observe(this.element.shadowRoot.querySelector('img'));
  }

	protected render(): unknown {
		return (
      <div class='dt-book'>
        { this.renderBook() }
        { this.renderSkeleton() }
      </div>
		);
  }

  protected renderBook() {
    return (
      <dt-card header={this.title}>
        <img
          data-src={`${BooksService.COVERS_BASE_URL}/${this.coverId}-${this.size}.jpg`}
          class='dt-book__cover'
          onLoad={this.onImageLoad}
        />
      </dt-card>
		);
  }

  protected renderSkeleton() {
    const visibility = {
      display: this.loading ? 'block' : 'none',
      // display: 'block',
    }
    return (
      <div class='skeleton' style={visibility}></div>
		);
  }

  protected onImageLoad() {
    console.log('on img load');
    this.loading = false;
  }
}
