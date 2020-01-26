import { h, Component, Element, Listen, State, Prop } from '@stencil/core';

// TODO: Define books interface
@Component({
  shadow: true,
  styleUrl: './carousel.scss',
  tag: 'dt-carousel',
})
export class DottLazyCarousel {
  private animationTime: number;          // time used to animate the carrousel, varies according to slides quantity
  private threshold: number = 100;        // minimum distance the slider needs to move to change the slide that is displaying
  private posX1: number = 0;              // stores the initial pos of mousedown/touchstart events
  private posX2: number = 0;              // stores the final pos of mousedown/touchstart events
  private posInitial;                     // stores the initial position of the carousel slider when a drag starts
  private posFinal;                       // stores the final position of the carousel slider when a drag ends
  private slideGap = 0;                   // separation between slides
  private slidesContainer: HTMLElement;
  private slideWidth: number;
  private firstSlide: HTMLElement;
  private index = 0;
  private allowShift: boolean = true;
  private slides = [];

  @Element() private element: any;

  @State() private loop: boolean = true;

  @Prop() public books = [];
  @Prop() public slidesToShow: number = 1;

  constructor() {
    this.onPreviousSlideClick = this.onPreviousSlideClick.bind(this);
    this.onNextSlideClick = this.onNextSlideClick.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragAction = this.dragAction.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
    this.checkIndex = this.checkIndex.bind(this);
  }

  componentWillUpdate() {
  }

  componentDidUpdate() {
    this.updateLayout();
  }

  protected componentDidLoad(): void {
    this.init();
    this.updateLayout();
  }

  protected render(): unknown {
    const containerClasses = `dt-carousel__slides-container ${this.loop ? 'dt-carousel__slides-container--looping' : ''}`;
    return (
      <div class='dt-carousel'>
        <div class='dt-carousel__overflow'>
          <div class='dt-carousel__wrapper'>
            <div
              class={containerClasses}
              onTouchStart={this.dragStart}
              onTouchMove={this.dragAction}
              onTouchEnd={this.dragEnd}
              onMouseDown={this.dragStart}
              onTransitionEnd={this.checkIndex}
            >
              {
                this.renderBooks()
              }
            </div>
          </div>
        </div>
        <a class='dt-carousel__prev-button' onClick={this.onPreviousSlideClick} />
        <a class='dt-carousel__next-button' onClick={this.onNextSlideClick} />
      </div>
    );
  }

  private renderBooks(): any {
    if (!this.books || !this.books.length) {
      return null;
    }

    const lastCopy = Object.assign({}, this.books[0]);
    this.slides = [...this.books];
    this.slides.push(lastCopy);

    return this.slides.map(slide => {
      return (
        <div class='dt-carousel__slide'>
          <dt-card  key={slide.key} header={slide.title_suggest}>
              <p>{slide.author_name[0]}</p>
              <p>{slide.isbn[0]}</p>
          </dt-card>
        </div>
      )
    })
  }

  private animate() {
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
    `;
    this.element.shadowRoot.prepend(animationElement);
  }

  private init() {
    this.slidesContainer = this.element.shadowRoot.querySelector('.dt-carousel__slides-container');
    this.animate();
  }

  private updateLayout() {
    const slideElements = Array.from(this.element.shadowRoot.querySelectorAll('.dt-carousel__slide')) as HTMLElement[];
    if (!slideElements.length) {
      return;
    }
    this.slideWidth = slideElements[0].offsetWidth;
    this.firstSlide = slideElements[0];

    const style = window.getComputedStyle(this.firstSlide);
    this.slideGap = parseInt(style.marginLeft) + parseInt(style.marginRight);
    this.slidesContainer.style.width = `${(this.slideWidth + this.slideGap) * this.books.length}px`;
    this.animate();
  }

  private shiftSlide(dir: number, drag: boolean = false) {
    this.slidesContainer.classList.add('dt-carousel__slide--shifting');
    if (this.allowShift) {
      if (!drag) {
        this.posInitial = this.slidesContainer.offsetLeft;
      }
      if (dir == 1) {
        this.slidesContainer.style.left =  `${this.posInitial - this.slideWidth}px`;
        this.index++;
      } else if (dir == -1) {
        this.slidesContainer.style.left = `${this.posInitial + this.slideWidth}px`;
        this.index--;
      }
    };
    this.allowShift = false;
  }

  @Listen('visibilitychange', { target: 'document' })
  private handleVisibilityChange() {
    this.loop = !document.hidden;
  }

  private dragStart(event) {
    event.preventDefault();
    this.posInitial = this.slidesContainer.offsetLeft;
    if (event.type == 'touchstart') {
      this.posX1 = event.touches[0].clientX;
    } else {
      this.posX1 = event.clientX;
      document.onmouseup = this.dragEnd;
      document.onmousemove = this.dragAction;
    }
  }

  private dragAction(event) {
    if (event.type == 'touchmove') {
      this.posX2 = this.posX1 - event.touches[0].clientX;
      this.posX1 = event.touches[0].clientX;
    } else {
      this.posX2 = this.posX1 - event.clientX;
      this.posX1 = event.clientX;
    }
    this.slidesContainer.style.left = `${this.slidesContainer.offsetLeft - this.posX2}px`;
  }

  private dragEnd() {
    this.posFinal = this.slidesContainer.offsetLeft;
    const draggedDistance = this.posFinal - this.posInitial;
    if (draggedDistance < -this.threshold) {
      this.shiftSlide(1, true);
    } else if (draggedDistance > this.threshold) {
      this.shiftSlide(-1, true);
    } else {
      this.slidesContainer.style.left = `${this.posInitial}px`;
    }
    document.onmouseup = null;
    document.onmousemove = null;
  }

  private checkIndex (){
    this.slidesContainer.classList.remove('dt-carousel__slide--shifting');
    if (this.index == -1) {
      this.slidesContainer.style.left = `${-(this.slides.length * this.slideWidth)}px`;
      this.index = this.slides.length - 1;
    }
    if (this.index == this.slides.length) {
      this.slidesContainer.style.left = `${-this.slideWidth}px`;
      this.index = 0;
    }
    this.allowShift = true;
  }

  private onPreviousSlideClick() {
    this.shiftSlide(-1);
  }

  private onNextSlideClick() {
    this.shiftSlide(1);
  }
}
