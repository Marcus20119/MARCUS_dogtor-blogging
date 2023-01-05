import { css } from 'styled-components';

export const ResetClasses = css`
  // Evondev reset
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  * {
    margin: 0;
  }

  html,
  body {
    height: 100%;
  }
  body {
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }
  input,
  button,
  textarea,
  select {
    font: inherit;
    outline: none;
    border: none;
  }
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  // My reset

  input,
  textarea {
    outline: none;
  }
  * {
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: transparent;
    box-sizing: border-box;
    scroll-behavior: smooth;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  a {
    text-decoration: none !important;
  }
  li {
    list-style: none;
  }
  select {
    -webkit-appearance: none;
    -moz-appearance: none;
    outline: none;
  }
  a:-webkit-any-link {
    color: unset;
  }
`;
