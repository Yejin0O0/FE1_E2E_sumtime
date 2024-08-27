'use client';

import { Global, css } from '@emotion/react';

export const style = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* @font-face {
    font-family: 'NotoSansKR';
    //src: url('./../assets/fonts/NotoSansKR-VariableFont_wght.ttf');
    src: url('./../assets/fonts/Matemasie-Regular.ttf');
  }

  body {
    font-family: 'NotoSansKR';
  } */

  html {
    -moz-text-size-adjust: none;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd,
  button {
    margin: 0 !important;
    padding: 0;
  }

  /* 스크롤 없애는 css */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }

  /* 스크롤 없애는 css */
  body {
    -ms-overflow-style: none; /* Internet Explorer and Edge */
    scrollbar-width: none; /* Firefox */
  }

  ul,
  ol,
  li {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    list-style: none;
  }

  body {
    min-height: 100vh;
    line-height: 1.5;
  }

  h1,
  h2,
  h3,
  h4,
  button,
  input,
  label {
    line-height: 1.1;
  }

  h1,
  h2,
  h3,
  h4 {
    text-wrap: balance;
  }

  a:not([class]) {
    text-decoration-skip-ink: auto;
    color: currentColor;
  }

  img,
  picture {
    max-width: 100%;
    display: block;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  textarea:not([rows]) {
    min-height: 10em;
  }

  :target {
    scroll-margin-block: 5ex;
  }
`;

function GlobalStyle() {
  return <Global styles={style} />;
}

export { GlobalStyle };
