import { h, Component, Element, Listen, State } from '@stencil/core';

@Component({
  shadow: true,
  styleUrl: './lazy-carousel.scss',
  tag: 'dt-lazy-carousel',
})
export class DottLazyCarousel {
  private threshold: number = 100;        // minimum distance the slider needs to move to change the slide that is displaying
  private posX1: number = 0;              // stores the initial pos of mousedown/touchstart events
  private posX2: number = 0;              // stores the final pos of mousedown/touchstart events
  private posInitial;                     // stores the initial position of the carousel slider when a drag starts
  private posFinal;                       // stores the final position of the carousel slider when a drag ends
  private slides: HTMLElement[];
  private slideGap = 0;                   // separation between slides
  private slidesContainer: HTMLElement;
  private slideSize: number;
  private firstSlide: HTMLElement;
  private lastSlide: HTMLElement;
  private cloneFirst: Node;
  private cloneLast: Node;
  private index = 0;
  private allowShift: boolean = true;

  @State() private loop: boolean = true;

  @Element() private element: any;

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
  }

  protected componentDidLoad(): void {
    this.init();
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
              <slot />
            </div>
          </div>
        </div>
        <a class='dt-carousel__prev-button' onClick={this.onPreviousSlideClick} />
        <a class='dt-carousel__next-button' onClick={this.onNextSlideClick} />
      </div>
    );
  }

  public init() {
    this.slides = Array.from(this.element.querySelectorAll('.dt-carousel__slide'));
    if (!this.slides.length) {
      return;
    }
    this.slideSize = this.slides[0].offsetWidth;
    this.firstSlide = this.slides[0];
    this.lastSlide = this.slides[this.slides.length - 1];
    this.cloneFirst = this.firstSlide.cloneNode(true);
    this.cloneLast = this.lastSlide.cloneNode(true);
    this.slidesContainer = this.element.shadowRoot.querySelector('.dt-carousel__slides-container');
    this.slidesContainer.appendChild(this.cloneFirst);
    // this.slidesContainer.prepend(this.cloneLast);

    let style = window.getComputedStyle(this.firstSlide);
    this.slideGap = parseInt(style.marginLeft) + parseInt(style.marginRight);
    this.slidesContainer.style.left = `-${this.slideSize + this.slideGap}px`;

    this.slidesContainer.style.width = `${(this.slideSize + this.slideGap) * this.slides.length}px`

    const carouselSpeed = 158; // pixels per second
    const animationTime = (this.slideSize + this.slideGap) * (this.slides.length + 1) / carouselSpeed;
    const animationRule = document.createElement('style');
    animationRule.innerHTML = `
      .dt-carousel__slides-container--looping {
        animation: slideshow ${animationTime}s linear infinite;
      }
    `;
    this.element.shadowRoot.prepend(animationRule);
  }

  private shiftSlide(dir: number, drag: boolean = false) {
    this.slidesContainer.classList.add('dt-carousel__slide--shifting');
    if (this.allowShift) {
      if (!drag) {
        this.posInitial = this.slidesContainer.offsetLeft;
      }
      if (dir == 1) {
        this.slidesContainer.style.left =  `${this.posInitial - this.slideSize}px`;
        this.index++;
      } else if (dir == -1) {
        this.slidesContainer.style.left = `${this.posInitial + this.slideSize}px`;
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
      this.slidesContainer.style.left = `${-(this.slides.length * this.slideSize)}px`;
      this.index = this.slides.length - 1;
    }
    if (this.index == this.slides.length) {
      this.slidesContainer.style.left = `${-this.slideSize}px`;
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
