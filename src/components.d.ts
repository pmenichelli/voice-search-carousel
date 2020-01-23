/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';
import {
  MatchResults,
} from '@stencil/router';

export namespace Components {
  interface AppHome {
    'slidesToShow': number;
  }
  interface AppProfile {
    'match': MatchResults;
  }
  interface AppRoot {}
  interface DottButton {
    'text': string;
  }
  interface DtCard {}
  interface DtCardContent {}
  interface DtCardHeader {
    'header': string;
  }
  interface DtLangSelector {}
  interface DtLazyCarousel {}
  interface DtSearchBar {
    'lang': string;
  }
  interface TypescriptFn {
    'value': number;
  }
}

declare global {


  interface HTMLAppHomeElement extends Components.AppHome, HTMLStencilElement {}
  var HTMLAppHomeElement: {
    prototype: HTMLAppHomeElement;
    new (): HTMLAppHomeElement;
  };

  interface HTMLAppProfileElement extends Components.AppProfile, HTMLStencilElement {}
  var HTMLAppProfileElement: {
    prototype: HTMLAppProfileElement;
    new (): HTMLAppProfileElement;
  };

  interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
  var HTMLAppRootElement: {
    prototype: HTMLAppRootElement;
    new (): HTMLAppRootElement;
  };

  interface HTMLDottButtonElement extends Components.DottButton, HTMLStencilElement {}
  var HTMLDottButtonElement: {
    prototype: HTMLDottButtonElement;
    new (): HTMLDottButtonElement;
  };

  interface HTMLDtCardElement extends Components.DtCard, HTMLStencilElement {}
  var HTMLDtCardElement: {
    prototype: HTMLDtCardElement;
    new (): HTMLDtCardElement;
  };

  interface HTMLDtCardContentElement extends Components.DtCardContent, HTMLStencilElement {}
  var HTMLDtCardContentElement: {
    prototype: HTMLDtCardContentElement;
    new (): HTMLDtCardContentElement;
  };

  interface HTMLDtCardHeaderElement extends Components.DtCardHeader, HTMLStencilElement {}
  var HTMLDtCardHeaderElement: {
    prototype: HTMLDtCardHeaderElement;
    new (): HTMLDtCardHeaderElement;
  };

  interface HTMLDtLangSelectorElement extends Components.DtLangSelector, HTMLStencilElement {}
  var HTMLDtLangSelectorElement: {
    prototype: HTMLDtLangSelectorElement;
    new (): HTMLDtLangSelectorElement;
  };

  interface HTMLDtLazyCarouselElement extends Components.DtLazyCarousel, HTMLStencilElement {}
  var HTMLDtLazyCarouselElement: {
    prototype: HTMLDtLazyCarouselElement;
    new (): HTMLDtLazyCarouselElement;
  };

  interface HTMLDtSearchBarElement extends Components.DtSearchBar, HTMLStencilElement {}
  var HTMLDtSearchBarElement: {
    prototype: HTMLDtSearchBarElement;
    new (): HTMLDtSearchBarElement;
  };

  interface HTMLTypescriptFnElement extends Components.TypescriptFn, HTMLStencilElement {}
  var HTMLTypescriptFnElement: {
    prototype: HTMLTypescriptFnElement;
    new (): HTMLTypescriptFnElement;
  };
  interface HTMLElementTagNameMap {
    'app-home': HTMLAppHomeElement;
    'app-profile': HTMLAppProfileElement;
    'app-root': HTMLAppRootElement;
    'dott-button': HTMLDottButtonElement;
    'dt-card': HTMLDtCardElement;
    'dt-card-content': HTMLDtCardContentElement;
    'dt-card-header': HTMLDtCardHeaderElement;
    'dt-lang-selector': HTMLDtLangSelectorElement;
    'dt-lazy-carousel': HTMLDtLazyCarouselElement;
    'dt-search-bar': HTMLDtSearchBarElement;
    'typescript-fn': HTMLTypescriptFnElement;
  }
}

declare namespace LocalJSX {
  interface AppHome {
    'slidesToShow'?: number;
  }
  interface AppProfile {
    'match'?: MatchResults;
  }
  interface AppRoot {}
  interface DottButton {
    'text'?: string;
  }
  interface DtCard {}
  interface DtCardContent {}
  interface DtCardHeader {
    'header'?: string;
  }
  interface DtLangSelector {
    'onDtDialectChange'?: (event: CustomEvent<any>) => void;
    'onDtLanguageChange'?: (event: CustomEvent<any>) => void;
  }
  interface DtLazyCarousel {}
  interface DtSearchBar {
    'lang'?: string;
    'onDtQueryChange'?: (event: CustomEvent<any>) => void;
  }
  interface TypescriptFn {
    'value'?: number;
  }

  interface IntrinsicElements {
    'app-home': AppHome;
    'app-profile': AppProfile;
    'app-root': AppRoot;
    'dott-button': DottButton;
    'dt-card': DtCard;
    'dt-card-content': DtCardContent;
    'dt-card-header': DtCardHeader;
    'dt-lang-selector': DtLangSelector;
    'dt-lazy-carousel': DtLazyCarousel;
    'dt-search-bar': DtSearchBar;
    'typescript-fn': TypescriptFn;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'app-home': LocalJSX.AppHome & JSXBase.HTMLAttributes<HTMLAppHomeElement>;
      'app-profile': LocalJSX.AppProfile & JSXBase.HTMLAttributes<HTMLAppProfileElement>;
      'app-root': LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
      'dott-button': LocalJSX.DottButton & JSXBase.HTMLAttributes<HTMLDottButtonElement>;
      'dt-card': LocalJSX.DtCard & JSXBase.HTMLAttributes<HTMLDtCardElement>;
      'dt-card-content': LocalJSX.DtCardContent & JSXBase.HTMLAttributes<HTMLDtCardContentElement>;
      'dt-card-header': LocalJSX.DtCardHeader & JSXBase.HTMLAttributes<HTMLDtCardHeaderElement>;
      'dt-lang-selector': LocalJSX.DtLangSelector & JSXBase.HTMLAttributes<HTMLDtLangSelectorElement>;
      'dt-lazy-carousel': LocalJSX.DtLazyCarousel & JSXBase.HTMLAttributes<HTMLDtLazyCarouselElement>;
      'dt-search-bar': LocalJSX.DtSearchBar & JSXBase.HTMLAttributes<HTMLDtSearchBarElement>;
      'typescript-fn': LocalJSX.TypescriptFn & JSXBase.HTMLAttributes<HTMLTypescriptFnElement>;
    }
  }
}


