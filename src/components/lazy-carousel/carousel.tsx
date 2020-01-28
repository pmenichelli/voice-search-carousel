import { h, Component, Element, Listen, State, Prop } from '@stencil/core';

// TODO: Define books interface
@Component({
  shadow: true,
  styleUrl: './carousel.scss',
  tag: 'dt-carousel',
})
export class DottLazyCarousel {
  private animationTime: number;          // time used to animate the carrousel, varies according to slides quantity
  private slideGap = 0;                   // separation between slides
  private slideWidth: number;
  private firstSlide: HTMLElement;
  private slides = [];
  private containerLeft: number = 0;
  private containerWidth: string = '100%';

  @Element() private element: any;

  @State() private looping: boolean = true;
  @State() private paused: boolean = false;

  @Prop() public books = [];
  @Prop() public slidesToShow: number = 1;

  protected componentDidUpdate() {
    this.updateLayout();
  }

  protected componentDidLoad(): void {
    this.init();
    this.updateLayout();
  }

  protected render(): unknown {
    const containerClasses = `dt-carousel__slides-container
      ${this.looping ? 'dt-carousel__slides-container--looping '  : ''}
      ${this.paused ? 'dt-carousel__slides-container--paused ' : ''}
    `;
    return (
      <div class='dt-carousel'>
        <div class='dt-carousel__wrapper'>
          <div
            class={containerClasses}
            style={{left: `${this.containerLeft}px`, width: this.containerWidth}}
          >
            {
              this.renderBooks()
            }
          </div>
        </div>
      </div>
    );
  }

  protected renderBooks(): any {
    if (!this.books || !this.books.length) {
      return null;
    }

    const lastCopy = Object.assign({}, this.books[0]);
    this.slides = [...this.books];
    this.slides.push(lastCopy);

    return this.slides.map(slide => {
      return (
        <div key={slide.key} class='dt-carousel__slide'>
          <dt-book
            title={slide.title_suggest}
            coverId={slide.cover_i}
          >
          </dt-book>
        </div>
      )
    })
  }

  protected animate() {
    const carouselSpeed = 158; // pixels per second
    const animationTime = (this.slideWidth + this.slideGap) * (this.slides.length) / carouselSpeed;

    // if speed cant be calculated, then don't create any animation tag
    if (!animationTime || this.animationTime === animationTime) {
      return;
    }
    this.animationTime = animationTime;

    // remove old animation tag if it exists
    const oldAnimation = this.element.shadowRoot.querySelector('style#animation');
    if (oldAnimation) {
      this.element.shadowRoot.removeChild(oldAnimation);
    }

    // create new animation style tag
    const animationElement = document.createElement('style');
    animationElement.id = 'animation';

    animationElement.innerHTML = `
      .dt-carousel__slides-container--looping {
        animation: slideshow ${animationTime}s linear infinite;
      }

      @keyframes slideshow {
        0%    { left: 0; }
        100%  { left: -${this.books.length * (this.slideWidth + this.slideGap)}px; }
      }
    `;
    this.element.shadowRoot.prepend(animationElement);
  }

  protected init() {
    this.animate();
  }

  protected updateLayout() {
    const slideElements = Array.from(this.element.shadowRoot.querySelectorAll('.dt-carousel__slide')) as HTMLElement[];
    if (!slideElements.length) {
      return;
    }
    this.slideWidth = slideElements[0].offsetWidth;
    this.firstSlide = slideElements[0];

    const style = window.getComputedStyle(this.firstSlide);
    this.slideGap = parseInt(style.marginLeft) + parseInt(style.marginRight);
    this.containerWidth = `${(this.slideWidth + this.slideGap) * this.books.length}px`;
    this.animate();
  }

  @Listen('visibilitychange', { target: 'document' })
  protected handleVisibilityChange() {
    this.looping = !document.hidden;
  }

  @Listen('mouseenter')
  protected onMouseEnter() {
    this.paused = true;
  }

  @Listen('mouseleave')
  protected onMouseLeave() {
    this.paused = false;
  }
}
